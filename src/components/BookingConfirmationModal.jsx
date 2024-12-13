import React from 'react';

const BookingConfirmationModal = ({ isOpen, listing, nights, guests, checkIn, checkOut, totalPrice, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Confirm Your Booking</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Listing Name */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">{listing.title}</h3>
        </div>

        {/* Booking Details */}
        <div className="mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Check-in</span>
            <span>{checkIn}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Check-out</span>
            <span>{checkOut}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Guests</span>
            <span>{guests}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total Nights</span>
            <span>{nights}</span>
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t-2 pt-4 mb-6">
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total Bill</span>
            <span>${totalPrice}</span>
          </div>
          <p className="text-sm text-gray-500">Pay Cash on Spot</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 focus:outline-none transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none transition duration-200"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
