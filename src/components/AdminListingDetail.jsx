// Updated ListingDetails Component
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../constants/api";
import PhotoAlbum from "../components/PhotoAlbum";
import ModalPopup from "../components/ModalPopup";
import defaultPic from "../assets/react.svg";
import { toast } from "react-toastify";

const AdminListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        if (!response.ok) {
          // Check if we get 401 status code we need to login again
          if (response.status === 401) {
            // Navigate to /admin/login with respect to the root
            navigate("/admin/login");

            return;
          }
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

  const handleAction = async () => {
    if (!modalAction) return;

    try {
      const endpoint =
        modalAction === "delete"
          ? `${baseURL}/admin/delete/${id}`
          : `${baseURL}/admin/update/${id}`;

      const method = modalAction === "delete" ? "DELETE" : "PUT";
      const body =
        modalAction === "delete"
          ? null
          : JSON.stringify({
              isApproved: !listing.isApproved,
            });

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Action failed");
      }

      if (modalAction === "delete") {
        // Redirect or update state if needed
        navigate("/admin/dashboard");
      } else {
        setListing((prev) => ({ ...prev, isApproved: !prev.isApproved }));
      }
    } catch (error) {
      console.error("Error performing action:", error);
      toast.error(error.message || "Error performing action.");
    } finally {
      setModalOpen(false);
      setModalAction(null);
    }
  };

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

        {/* Right Column: Admin Actions */}
        <div className="relative">
          <div className="lg:sticky top-20 space-y-4">
            <button
              onClick={() => {
                setModalOpen(true);
                setModalAction("delete");
              }}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Delete Listing
            </button>
            <button
              onClick={() => {
                setModalOpen(true);
                setModalAction("approve");
              }}
              className={`w-full px-4 py-2 rounded-lg ${
                listing.isApproved
                  ? "bg-gray-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {listing.isApproved ? "Disapprove Listing" : "Approve Listing"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <ModalPopup
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAction}
        message={`Are you sure you want to ${
          modalAction === "delete"
            ? "delete"
            : listing.isApproved
            ? "disapprove"
            : "approve"
        } this listing?`}
      />
    </div>
  );
};

export default AdminListingDetails;
