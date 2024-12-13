const express = require("express");
const {
  login,
  deleteProperty,
  updatePropertyStatus,
} = require("../controllers/adminController");
const listingsController = require("../controllers/listingsController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin login route
router.post("/login", login);

// Delete property route
router.delete("/delete/:id", adminMiddleware, deleteProperty);

// Update property status route
router.put("/update/:id", adminMiddleware, updatePropertyStatus);

router.get("/listings", adminMiddleware, listingsController.getAllListings);
router.get("/listings/:id", adminMiddleware, listingsController.getListingById);

module.exports = router;
