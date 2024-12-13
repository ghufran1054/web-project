import React, { useState, useContext } from "react";
import { ListingsContext } from "../contexts/listingsContext"; // Import the context
import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  // State management for each input field
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const { searchListings } = useContext(ListingsContext);

  const navigate = useNavigate();

  // Handle input changes
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleCheckInChange = (e) => setCheckIn(e.target.value);
  const handleCheckOutChange = (e) => setCheckOut(e.target.value);
  const handleGuestsChange = (e) => setGuests(e.target.value);

  const handleSearch = async () => {

    // if all fields are empty don't do anything
    if (!location && !checkIn && !checkOut && !guests) {
      return;
    }
    await searchListings(location, checkIn, checkOut, guests); // Use searchListings from context

    // Redirect to the search results page
    navigate("/search-results");
  };
  return (
    <div className="bg-white shadow-md rounded-full px-5 py-3 flex lg:flex-row items-center justify-between max-w-4xl mx-auto border-2 border-solid">
      {/* Inputs for mobile */}
      <div className="flex w-full items-center justify-between lg:w-auto">
        {/* Location Input (Always Visible) */}
        <div className="flex flex-col w-full lg:w-auto mb-4 lg:mb-0">
          <label className="text-xs font-semibold text-gray-600">Where</label>
          <input
            type="text"
            placeholder="Search destination"
            value={location}
            onChange={handleLocationChange}
            className="outline-none text-gray-900 font-medium text-sm"
          />
        </div>
      </div>

      {/* Only Visible on Screens Wider Than 900px */}
      <div className="hidden lg:flex w-full lg:w-auto">
        {/* Check-in Input */}
        <div className="flex flex-col w-full lg:w-auto mb-4 lg:mb-0 border-l-2 lg:pl-4 pt-2 lg:pt-0">
          <label className="text-xs font-semibold text-gray-600">Check in</label>
          <input
            type="date"
            value={checkIn}
            onChange={handleCheckInChange}
            className="outline-none text-gray-900 font-medium text-sm"
          />
        </div>

        {/* Check-out Input */}
        <div className="flex flex-col w-full lg:w-auto mb-4 lg:mb-0 border-l-2 lg:pl-4 pt-2 lg:pt-0">
          <label className="text-xs font-semibold text-gray-600">Check out</label>
          <input
            type="date"
            value={checkOut}
            onChange={handleCheckOutChange}
            className="outline-none text-gray-900 font-medium text-sm"
          />
        </div>

        {/* Guests Input */}
        <div className="flex flex-col w-full lg:w-auto mb-4 lg:mb-0 border-l-2 lg:pl-4 pt-2 lg:pt-0">
          <label className="text-xs font-semibold text-gray-600">Guests</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={handleGuestsChange}
            placeholder="Add guests"
            className="outline-none text-gray-900 font-medium text-sm"
          />
        </div>
      </div>

      {/* Search Button (Always at the End) */}
      <button
        className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition duration-200"
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 19a7 7 0 100-14 7 7 0 000 14zM21 21l-4.35-4.35"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
