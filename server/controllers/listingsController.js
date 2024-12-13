const Property = require('../models/property'); // Import the Property model


exports.uploadImages = async (req, res) => {
  try {
    // EXtract the property ID from the request parameters
    const propertyId = req.params.id;
      // Validate uploaded files
      if (!req.files || req.files.length < 5) {
          return res.status(400).json({ message: "You must upload at least 5 images." });
      }

      let imagePaths = req.files.map(file => file.path.replace(/\\/g, "/"));
      imagePaths = imagePaths.map(path => path.split("/")[path.split("/").length - 1]);
      for (path in imagePaths) {
          imagePaths[path] = "http://localhost:3000/data/images/" + imagePaths[path];
      }

      if (!propertyId) {
          return res.status(400).json({ message: "Property ID is required." });
      }

      // Fetch the property
      const property = await Property.findById(propertyId);

      if (!property) {
          return res.status(404).json({ message: "Property not found." });
      }

      // Set cover photo if not already set
      if (!property.image) {
          property.image = imagePaths[0]; // First image is the cover photo
      }

      // Append remaining images to allImages
      property.allImages = [...property.allImages];

      // Save the property
      await property.save();

      res.json({ message: "Images uploaded successfully", property });
  } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Get all listings
exports.getAllApprovedListings = async (req, res) => {
    try {
        // Fetch all properties from the database
        let properties = await Property.find();

        // Filter those properties which have isApproved = true
        properties = properties.filter(property => property.isApproved);

        // Also Filter those where availableDates is empty
        properties = properties.filter(property => property.availableDates.length > 0);
        
        // Exclude `allImages`, `amenities`, and `description` from the response
        const listings_filtered = properties.map(({ allImages, amenities, description, ...listing }) => listing._doc);

        res.json(listings_filtered);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllListings = async (req, res) => {
    
    try {
        // Fetch all properties from the database
        const properties = await Property.find();
        // Exclude `allImages`, `amenities`, and `description` from the response
        const listings_filtered = properties.map(({ allImages, amenities, description, ...listing }) => listing._doc);
        res.json(listings_filtered);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// Get listing by ID
exports.getListingById = async (req, res) => {
    console.log("HELLO");
    const id = req.params.id;
    try {
        // Find the property by ID
        const listing = await Property.findById(id).populate('host').exec();
        if (listing) {
            res.json(listing);
        } else {
            res.status(404).json({ message: "Listing not found" });
        }
    } catch (error) {
        console.error("Error fetching listing by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Post a new listing
exports.postNewListing = async (req, res) => {
    try {
        // Create a new property using the request body
        req.body.host = req.user.id;
        const newListing = new Property(req.body);

        // Save the property to the database
        const savedListing = await newListing.save();
        res.json(savedListing._doc);
    } catch (error) {
        console.error("Error creating a new listing:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.searchProperties = async (req, res) => {
    try {
      const { location, checkIn, checkOut, guests } = req.query;
  
      // Parse checkIn and checkOut dates
      const checkInDate = checkIn ? new Date(checkIn) : null;
      const checkOutDate = checkOut ? new Date(checkOut) : null;
  
      // Build the query object dynamically
      const query = {};
  
      // Add location filter if provided
      if (location) {
        query.location = { $regex: new RegExp(location, 'i') }; // Case-insensitive partial match
      }
  
      // Add guest filter if provided
      if (guests) {
        query.guests = { $gte: parseInt(guests, 10) };
      }
  
      // Add availability filter if dates are provided
      if (checkInDate && checkOutDate) {
        query.availableDates = {
          $elemMatch: {
            startDate: { $lt: checkOutDate },
            endDate: { $gt: checkInDate },
          },
        };
      }
  
      // Add isApproved filter
      query.isApproved = true;
  
      // Fetch properties based on query
      const properties = await Property.find(query);
  
      // Send response
      return res.status(200).json({ success: true, data: properties });
    } catch (error) {
      console.error('Error in searchProperties:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

exports.getListingofHostById = async (req, res) => {
    try {
        // Get host ID from the request parameters
        const hostId = req.params.hostId;

        // Check if the host ID is provided
        if (!hostId) {
            return res.status(400).json({ error: 'Host ID is required' });
        }

        // Fetch all properties associated with the host ID
        const listings = await Property.find({ host: hostId });

        // Check if any listings are found
        if (!listings || listings.length === 0) {
            return res.status(200).json({ message: 'No listings found for this host' });
        }

        // Respond with the listings
        res.status(200).json({ listings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteListingById = async (req, res) => {
    try {
        // Get the listing ID from the request parameters
        const listingId = req.params.id;

        // Check if the listing ID is provided
        if (!listingId) {
            return res.status(400).json({ error: 'Listing ID is required' });
        }

        // Find and delete the listing by its ID
        const deletedListing = await Property.findByIdAndDelete(listingId);

        // If no listing is found, return a 404 error
        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Return a success response
        res.status(200).json({
            message: 'Listing deleted successfully',
            deletedListing,
        });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
