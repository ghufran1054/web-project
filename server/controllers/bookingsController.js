const Booking = require('../models/booking');
const Property = require('../models/property');
const User = require('../models/user');

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { propertyId, guests, totalPrice } = req.body;
    let {checkInDate, checkOutDate} = req.body;

    // Validate the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // If the req.userId and property.host are same then return an error message saying you cannot book your own property

    if (req.user.id === String(property.host._id)) {
      return res.status(400).json({ message: 'You cannot book your own property' });
    }

    // Create a new booking
    const booking = new Booking({
      property: propertyId,
      user: req.user.id, // Get user from authenticated session
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: 'pending',
    });

    const newAvailableDates = [];
    property.availableDates.forEach((dateRange) => {
      const { startDate, endDate } = dateRange;

      const rangeStart = new Date(startDate.toDateString());
      const rangeEnd = new Date(endDate.toDateString());

      checkInDate = new Date(checkInDate);
      checkOutDate = new Date(checkOutDate);

      // If the booking does not overlap with this range, keep it as is
      if (checkOutDate <= rangeStart || checkInDate >= rangeEnd) {
        newAvailableDates.push(dateRange);
        return;
      }

      // Booking overlaps with the range, adjust or split the range
      // If check in date and checkout date are exactly the same as the range above (according to day) then just remove the range
      if (checkInDate === rangeStart && checkOutDate === rangeEnd) {
        return;
      }
      if (checkInDate > rangeStart) { 
        // Keep the part before the booking
        newAvailableDates.push({
          startDate: rangeStart,
          endDate: new Date(checkInDate.getTime() - (1 * 24 * 60 * 60 * 1000)),
        });
      }

      if (checkOutDate < rangeEnd) {
        // Keep the part after the booking
        newAvailableDates.push({
          startDate: new Date(checkOutDate.getTime() + (1 * 24 * 60 * 60 * 1000)),
          endDate: rangeEnd,
        });
      }
    });

    // Update the property's availableDates with the new array
    property.availableDates = newAvailableDates;
    await property.save();
    // Save the booking to the database
    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status (confirm or cancel)

const updateAvailableDates = async (booking) => {
  
    const property = await Property.findById(booking.property);
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
  
    // Extract and process existing availableDates
    let newAvailableDates = [];
  
    property.availableDates.forEach((dateRange) => {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
  
      if (checkOutDate < startDate || checkInDate > endDate) {
        // No overlap; retain the current range as is
        newAvailableDates.push(dateRange);
      } else {
        // Overlap; split or merge ranges
        if (checkInDate > startDate) {
          // Retain the portion before the check-in date
          newAvailableDates.push({
            startDate: startDate.toISOString(),
            endDate: new Date(checkInDate - 1).toISOString(),
          });
        }
        if (checkOutDate < endDate) {
          // Retain the portion after the check-out date
          newAvailableDates.push({
            startDate: new Date(checkOutDate + 1).toISOString(),
            endDate: endDate.toISOString(),
          });
        }
      }
    });
  
    // Add the canceled booking's dates back as a new range
    newAvailableDates.push({
      startDate: checkInDate.toISOString(),
      endDate: checkOutDate.toISOString(),
    });
  
    // Sort and merge overlapping/adjacent ranges
    newAvailableDates.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
    const mergedAvailableDates = [];
    for (let i = 0; i < newAvailableDates.length; i++) {
      const currentRange = newAvailableDates[i];
      if (
        mergedAvailableDates.length > 0 &&
        new Date(mergedAvailableDates[mergedAvailableDates.length - 1].endDate) >=
          new Date(new Date(currentRange.startDate).getTime() - (1 * 24 * 60 * 60 * 1000))
      ) {
        // Merge with the previous range
        mergedAvailableDates[mergedAvailableDates.length - 1].endDate = new Date(
          Math.max(
            new Date(mergedAvailableDates[mergedAvailableDates.length - 1].endDate),
            new Date(currentRange.endDate)
          )
        ).toISOString();
      } else {
        // Add as a new range
        mergedAvailableDates.push(currentRange);
      }
    }
  
    // Update and save property
    property.availableDates = mergedAvailableDates;
    await property.save();
  
}
exports.updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  // Check if status is valid
  if (!['confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    // Find the booking by ID
    const booking = await Booking.findById(bookingId).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the status
    booking.status = status;
    await booking.save();

    // if the status = cancelled then we have to update the property's availableDates
    if (status === 'cancelled') {
      await updateAvailableDates(booking);
    }

    res.status(200).json({ message: `Booking status updated to ${status}`, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBookingsofUserbyId = async (req, res) => {
    try {
        // Get user ID from the request parameters
        const userId = req.params.userId;

        // Check if the user ID is valid
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        } 

        // Fetch bookings for the given user ID
        const bookings = await Booking.find({ user: userId })
            .populate('property', 'name location image') // Populate property details (if needed)
            .exec();

        // Check if bookings exist
        if (!bookings || bookings.length === 0) {
            return res.status(200).json({ message: 'No bookings found for this user' });
        }

        // Respond with the bookings
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBookingsonPropertybyId = async (req, res) => {
    try {
        // Get property ID from the request parameters
        const propertyId = req.params.propertyId;

        // Check if the property ID is valid
        if (!propertyId) {
            return res.status(400).json({ error: 'Property ID is required' });
        }

        // We will have to find all Bookings having this propertyId
        // Fetch bookings for the given property ID
        const bookings = await Booking.find({ property: propertyId })
            .populate('user', 'name email') // Populate user details (if needed)
            .exec();

        // Check if bookings exist
        if (!bookings || bookings.length === 0) {
            return res.status(200).json({ message: 'No bookings found for this property' });
        }

        // Respond with the bookings
        res.status(200).json({ bookings });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};









