import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../constants/api";
import PhotoAlbum from "../components/PhotoAlbum";
import ReserveCard from "../components/ReserveCard";
import defaultPic from "../assets/react.svg";
const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="max-w-7xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>

      {/* Photo Album */}
      <PhotoAlbum images={[listing.image, ...listing.allImages]} />

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Left Column: About This Place */}
        <div className="lg:col-span-2">
          {/* Host Info Section */}

          <div className="flex items-center space-x-4 ">
            <img
              src={
                listing.host.profileImage && listing.host.profileImage !== ""
                  ? listing.host.profileImage
                  : defaultPic
              }
              alt={listing.host.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-col items-center">
              <h2 className="text-2xl font-semibold">
                Hosted by {listing.host.name}
              </h2>
            <p className="text-gray-600 mb-4">{listing.host.email}</p>
            </div>
          </div>

          {/* About This Place Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">About This Place</h2>
            <p className="text-gray-700 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* What This Place Offers Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              What This Place Offers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {listing.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-700">{amenity.amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reserve Card (Sticky) */}
        <div className="relative">
          <div className="lg:sticky top-80">
            <ReserveCard listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
