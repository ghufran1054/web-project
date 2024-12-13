import React, { createContext, useState, useEffect } from "react";
import { baseURL } from "../constants/api";
import { useNavigate } from "react-router-dom";
export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const fetchListings = async () => {
    try {
      const response = await fetch(`${baseURL}/listings`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

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

  return (
    <ListingsContext.Provider
      value={{ listings, setListings, fetchListings, fetchListingsAdmin }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
