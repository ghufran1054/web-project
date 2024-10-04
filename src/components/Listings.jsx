import ListingCard from './ListingCard';
import { useEffect, useState } from 'react';

const ListingsContainer = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/data/propertyListings.json');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 px-4 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl">
        {listings.map((listing, index) => (
          <ListingCard key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsContainer;
