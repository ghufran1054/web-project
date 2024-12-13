import React, { createContext, useState, useEffect } from 'react';
import { baseURL } from '../constants/api';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${baseURL}/listings`);
      const data = await response.json();
      setListings(data); 
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // useEffect(() => {
  //   fetchListings();
  // }, []);

  return (
    <ListingsContext.Provider value={{ listings, setListings, fetchListings }}>
      {children}
    </ListingsContext.Provider>
  );
};
