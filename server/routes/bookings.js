const express = require('express');
const { createBooking, updateBookingStatus, getBookingsofUserbyId, getBookingsonPropertybyId} = require('../controllers/bookingsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a booking - protected route
router.post('/create', authMiddleware, createBooking);

// Update booking status - protected route
router.patch('/update-status', authMiddleware, updateBookingStatus);

router.get('/:userId', authMiddleware, getBookingsofUserbyId);

router.get('/property/:propertyId', authMiddleware, getBookingsonPropertybyId);

module.exports = router;
