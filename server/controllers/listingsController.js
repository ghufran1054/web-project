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
};

// Get listing by ID
exports.getListingById = async (req, res) => {
    const id = req.params.id;
    try {
        // Find the property by ID
        const listing = await Property.findById(id);
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

// Search listings by location
exports.searchListings = async (req, res) => {
    const query = req.query.query.toLowerCase();
    try {
        // Search listings where the `location` field matches the query
        const filteredListings = await Property.find({
            location: { $regex: query, $options: "i" }, // Case-insensitive search
        });
        res.json(filteredListings);
    } catch (error) {
        console.error("Error searching listings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
