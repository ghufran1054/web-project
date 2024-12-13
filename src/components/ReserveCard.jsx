import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BookingConfirmationModal from './BookingConfirmationModal';
import { toast } from 'react-toastify';
import {baseURL} from '../constants/api';

const ReserveCard = ({ listing }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableDates = listing.availableDates.map(dateRange => ({
    start: new Date(dateRange.startDate),
    end: new Date(dateRange.endDate),
  }));
  const handleConfirmBooking = async () => {
    try {
      const bookingData = {
        propertyId: listing._id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests,
        totalPrice: totalPrice,
      };
  
      // Send the booking request to the server using fetch
      const response = await fetch(`${baseURL}/bookings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingData),
      });
  
      // If booking is successful, show a success toast
      if (response.ok) {
        const responseData = await response.json();
        toast.success('Booking created successfully!');
        setIsModalOpen(false);
        
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'There was an issue with your booking. Please try again.');
        setIsModalOpen(false);
      }
    } catch (error) {
      // If there is an error, show an error toast
      console.error(error);
      toast.error('There was an issue with your booking. Please try again.');
      setIsModalOpen(false);
    }
    
    setIsModalOpen(false);
  };
  
  const handleCancelBooking = () => {
    setIsModalOpen(false);
  };

  // Calculate number of nights
  const getNumberOfNights = () => {
    if (!checkIn || !checkOut) return 0;
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const differenceInTime = endDate - startDate;
    return Math.max(1, differenceInTime / (1000 * 3600 * 24));
  };

  const pricePerNight = listing.price.slice(1); // Removing the '$' sign
  const nights = getNumberOfNights();
  const totalPrice = nights * pricePerNight;

  // Function to check if a date is available
  const isDateAvailable = (date) => {
    return availableDates.some(({ start, end }) => {
      start = new Date(start.toDateString());
      end = new Date(end.toDateString());
      return date >= start && date <= end;
    });
  };


  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-xl p-6">
      {/* Price per night */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-2xl font-semibold">${pricePerNight}</span>
          <span className="text-gray-500"> / night</span>
        </div>
      </div>

      {/* Check-in and Check-out Dates */}
      <div className="flex flex-col space-y-4 mb-4">
        <label>
          <span className="block text-sm text-gray-700">Check-in</span>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            filterDate={isDateAvailable}
            selectsStart
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholderText="Select Check-in Date"
          />
        </label>

        <label>
          <span className="block text-sm text-gray-700">Check-out</span>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            startDate={checkIn}
            minDate={checkIn || new Date()}
            filterDate={isDateAvailable}
            selectsEnd
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholderText="Select Check-out Date"
            disabled={!checkIn}
          />
        </label>
      </div>

      {/* Number of Guests */}
      <div className="mb-4">
        <span className="block text-sm text-gray-700">Guests</span>
        <div className="flex items-center space-x-4 mt-1">
          <button
            onClick={() => setGuests(Math.max(1, guests - 1))}
            className="w-10 h-10 border rounded-md flex items-center justify-center text-xl hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-lg">{guests}</span>
          <button
            onClick={() => setGuests(guests + 1)}
            className="w-10 h-10 border rounded-md flex items-center justify-center text-xl hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Reserve Button */}
      <button
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        Reserve
      </button>

      {/* Modal */}
      <BookingConfirmationModal
        isOpen={isModalOpen}
        listing={listing}
        nights={nights}
        guests={guests}
        checkIn={formatDate(checkIn)}
        checkOut={formatDate(checkOut)}
        totalPrice={totalPrice}
        onConfirm={handleConfirmBooking}
        onCancel={handleCancelBooking}
      />
    </div>
  );
};

export default ReserveCard;
