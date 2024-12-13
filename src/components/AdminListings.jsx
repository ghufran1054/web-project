import ListingCard from './ListingCard';
import { useEffect, useState, useContext } from 'react';
import { ListingsContext } from '../contexts/listingsContext';

const AdminListingsContainer = () => {
  const { listings, setListings } = useContext(ListingsContext);
  const [loading, setLoading] = useState(true);

  // Separate listings into "Waiting Approval" and "Live Listings"
  const waitingApproval = listings.filter((listing) => !listing.isApproved);
  const liveListings = listings.filter((listing) => listing.isApproved);

  useEffect(() => {
    if (listings.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [listings]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 px-4 h-full">
      <div className="w-full max-w-screen-xl">
        {/* Waiting Approval Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Waiting Approval</h2>
          {waitingApproval.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {waitingApproval.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No listings in this area!</p>
          )}
        </div>

        {/* Live Listings Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Live Listings</h2>
          {liveListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {liveListings.map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No listings in this area!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminListingsContainer;
