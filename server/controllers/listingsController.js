const listings = require('../data/listings.json');

// Get all listings
exports.getAllListings = (req, res) => {
  // From Litings remove keys allImages, amenities, description
  const listings_filtered = listings.map(({ allImages, amenities, description, ...listing }) => listing);
  res.json(listings_filtered);
};

// Get listing by ID
exports.getListingById = (req, res) => {
  const id = parseInt(req.params.id);
  const listing = listings.find(l => l.id === id);
  if (listing) {
    res.json(listing);
  } else {
    res.status(404).json({ message: 'Listing not found' });
  }
};

// Post a new Listing
exports.postNewListing = (req, res) => {

  // Verify if all required fields are present in phase 3
  const newListing = req.body;
  listings.push(newListing);
  
  res.json(newListing);
};
// Search listings by location
exports.searchListings = (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredListings = listings.filter(l =>
    l.location.toLowerCase().includes(query)
  );
  res.json(filteredListings);
};
