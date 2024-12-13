const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const dir = path.join(__dirname, `../data/images`);
      fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
      cb(null, dir);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post('/upload-images/:id', upload.array('images'), listingsController.uploadImages);
router.post('/new-listing', authMiddleware, listingsController.postNewListing);
router.get('/', listingsController.getAllApprovedListings);
router.get('/:id', listingsController.getListingById);
router.get('/search', listingsController.searchListings);
router.get('/host/:hostId', authMiddleware, listingsController.getListingofHostById);
router.delete('/:id', authMiddleware, listingsController.deleteListingById);
module.exports = router;
