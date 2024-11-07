// Mock booking creation
exports.createBooking = (req, res) => {
    const { listingId, user, date } = req.body;
    if (listingId && user && date) {
      res.status(201).json({ message: 'Booking created', booking: { listingId, user, date } });
    } else {
      res.status(400).json({ message: 'Invalid booking data' });
    }
  };
  