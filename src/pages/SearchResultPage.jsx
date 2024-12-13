import React, { useContext } from "react";
import ListingsContainer from "../components/Listings"; // Adjust the path as necessary
import { ListingsContext } from "../contexts/listingsContext";

const SearchResultsPage = ({ location, checkIn, checkOut, guests }) => {
  const { listings } = useContext(ListingsContext);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-8">Search Results</h1>

      {/* Listings Container with search parameters */}
      <ListingsContainer
        activeCategory=""
      />
    </div>
  );
};

export default SearchResultsPage;
