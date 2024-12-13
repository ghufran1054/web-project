import React, { createContext, useState, useEffect } from "react";
import { baseURL } from "../constants/api";
import { useNavigate } from "react-router-dom";

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // Fetch all listings
  const fetchListings = async () => {
    try {
      const response = await fetch(`${baseURL}/listings`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // Fetch listings for admin (already provided in your code)
  const fetchListingsAdmin = async () => {
    try {
      const response = await fetch(`${baseURL}/admin/listings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) {
        // Check if we get 401 status code we need to login again
        if (response.status === 401) {
          navigate("/admin/login");
          return;
        }
      }
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // Search listings based on location, check-in, check-out, and guests
  const searchListings = async (location, checkIn, checkOut, guests) => {
    let searchParams = [];

    if (location) searchParams.push(`location=${location}`);
    if (checkIn) searchParams.push(`checkIn=${checkIn}`);
    if (checkOut) searchParams.push(`checkOut=${checkOut}`);
    if (guests) searchParams.push(`guests=${guests}`);

    if (searchParams.length === 0) {
      return;
    }

    const queryString = searchParams.length ? `?${searchParams.join("&")}` : "";

    try {
      const response = await fetch(`${baseURL}/listings/search${queryString}`);
      const data = await response.json();
      setListings(data.data); // Update the listings with the search results
    } catch (error) {
      console.error("Error searching listings:", error);
    }
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        setListings,
        fetchListings,
        fetchListingsAdmin,
        searchListings, // New function for searching
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
