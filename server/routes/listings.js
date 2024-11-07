const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');

router.get('/', listingsController.getAllListings);
router.get('/:id', listingsController.getListingById);
router.get('/search', listingsController.searchListings);
router.post('/', listingsController.postNewListing);
module.exports = router;
