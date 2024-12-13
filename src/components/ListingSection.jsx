import React, { useState } from "react";
import ModalPopup from "./ModalPopup";
import { toast } from "react-toastify";
import { baseURL } from "../constants/api";

const ListingSection = ({ listings, setListings }) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchBookings = async (propertyId) => {
    setLoadingBookings(true);
    try {
      const response = await fetch(
        `${baseURL}/bookings/property/${propertyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      if (
        data.message &&
        data.message === "No bookings found for this property"
      ) {
        setBookings([]);
      } else {
        setBookings(data.bookings);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching bookings.");
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const response = await fetch(`${baseURL}/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      toast.success("Listing deleted successfully.");
      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      toast.error(error.message || "Error deleting listing.");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`${baseURL}/bookings/update-status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId: bookingId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking status");
      }

      const updatedBooking = await response.json();
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? updatedBooking.booking : booking
        )
      );
      toast.success("Booking status updated successfully.");
    } catch (error) {
      toast.error(error.message || "Error updating booking status.");
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
      {listings.length === 0 ? (
        <div className="text-gray-500 text-center">You have no listings.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="p-4 border rounded-md shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={listing.image || "/default-property.png"}
                    alt={listing.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <p className="text-sm text-gray-500">
                      Guests: {listing.guests} | Price: {listing.price}
                    </p>
                    <div>
                    <p className="text-sm text-gray-500">
                      Status: <span style={{ color: listing.isApproved ? "green" : "brown" }}>{listing.isApproved ? "Approved" : "Pending"}</span>
                    </p>
                  </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedListing(listing);
                      fetchBookings(listing._id);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    View Bookings
                  </button>
                  <button
                    onClick={() => {
                      setSelectedListing(listing);
                      setIsModalOpen(true);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {selectedListing && selectedListing._id === listing._id && (
                <div className="mt-4">
                  <h4 className="text-md font-bold mb-2">Bookings</h4>
                  {loadingBookings ? (
                    <p className="text-gray-500">Loading bookings...</p>
                  ) : bookings.length === 0 ? (
                    <p className="text-gray-500">
                      No bookings for this listing.
                    </p>
                  ) : (
                    <ul>
                      {bookings.map((booking) => (
                        <li
                          key={booking._id}
                          className="flex items-center justify-between p-2 border-b"
                        >
                          <div>
                            <p className="font-semibold">
                              {booking.guestName} Booked by - {booking.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Check-in:{" "}
                              {new Date(
                                booking.checkInDate
                              ).toLocaleDateString()}{" "}
                              | Check-out:{" "}
                              {new Date(
                                booking.checkOutDate
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Status: {booking.status}
                            </p>
                          </div>
                          {booking.status === "pending" ? (
                            <div className="space-x-2">
                              <button
                                onClick={() =>
                                  handleStatusChange(booking._id, "confirmed")
                                }
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(booking._id, "cancelled")
                                }
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div
                              className={`px-3 py-1 rounded ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {booking.status === "confirmed"
                                ? "Confirmed"
                                : "Cancelled"}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <ModalPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDeleteListing(selectedListing._id);
          setIsModalOpen(false);
        }}
        message="Are you sure you want to delete this listing?"
      />
    </div>
  );
};

export default ListingSection;
