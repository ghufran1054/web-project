import React, { useState } from 'react';
import { baseURL } from '../constants/api';
import { toast } from 'react-toastify';
import ModalPopup from './ModalPopup'; // Import your ModalPopup component

const BookingsSection = ({ bookings, setBookings }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your token retrieval logic
      const response = await fetch(`${baseURL}/bookings/update-status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId: selectedBookingId,
          status: 'cancelled',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }

      const data = await response.json();
      toast.success('Booking canceled successfully!');
      // UPdate the bookings by just changing the status of that particular bookingin the array from pending to cancelled manually becuase data doesn't have the booking object
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === selectedBookingId
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      
      setShowModal(false); // Close the modal after successful cancellation
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error canceling booking.');
    }
  };

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  return (
    <>
      {/* Modal Popup */}
      <ModalPopup
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleCancelBooking}
        message="Are you sure you want to cancel this booking?"
      />
  
      {/* Bookings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">You have no bookings.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
              >
                {/* Left Section - Property Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.property.image}
                    alt={booking.property.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{booking.property.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Check-In:</span>{' '}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Check-Out:</span>{' '}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Guests:</span> {booking.guests}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Total Price:</span> ${booking.totalPrice}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        booking.status === 'confirmed'
                          ? 'text-green-500'
                          : booking.status === 'cancelled'
                          ? 'text-red-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </p>
                  </div>
                </div>
  
                {/* Right Section - Cancel Button */}
                {booking.status === 'pending' && (
                  <button
                    onClick={() => openModal(booking._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Cancel Booking
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
  
};

export default BookingsSection;
