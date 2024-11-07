import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../constants/api';
const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch listing details directly from the API
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/listings/${id}`);
        if (!response.ok) {
          throw new Error("Listing not found");
        }
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListingDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>Listing not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Image */}
      <img src={listing.image} alt={listing.title} className="w-full h-72 object-cover rounded-lg mb-4" />

      {/* Title and Type */}
      <h1 className="text-3xl font-semibold mb-1">{listing.title}</h1>
      <p className="text-gray-600">{listing.type} · {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms</p>

      {/* Price and Rating */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-2xl font-bold">{listing.price} per night</span>
        <span className="text-yellow-500 text-lg">⭐ {listing.rating}</span>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{listing.description}</p>

      {/* Image Gallery */}
      {listing.allImages && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {listing.allImages.map((imgUrl, index) => (
            <img key={index} src={imgUrl} alt={`Listing Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
          ))}
        </div>
      )}

      {/* Amenities */}
      {listing.amenities && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
          <ul className="grid grid-cols-2 gap-2">
            {listing.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="font-medium">{amenity.amenity}</span>
                {amenity.description && <span className="text-gray-500">{amenity.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
