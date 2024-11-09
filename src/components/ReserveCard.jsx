import React, { useState } from 'react';

const ReserveCard = ({ pricePerNight }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Calculate number of nights
  const getNumberOfNights = () => {
    if (!checkIn || !checkOut) return 0;
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const differenceInTime = endDate - startDate;
    return Math.max(1, differenceInTime / (1000 * 3600 * 24));
  };

  const nights = getNumberOfNights();
  const totalPrice = nights * pricePerNight;
  

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
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </label>

        <label>
          <span className="block text-sm text-gray-700">Check-out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
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
        onClick={() => alert(`Reserved for ${nights} nights`)}
      >
        Reserve
      </button>

      {/* Total Price Calculation */}
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
        <span className="text-gray-500 text-sm">({nights} nights)</span>
      </div>
    </div>
  );
};

export default ReserveCard;
