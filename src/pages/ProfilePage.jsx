import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/ProfileSection";
import BookingsSection from "../components/BookingsSection";
import ListingSection from "../components/ListingSection";
import { baseURL } from "../constants/api";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [user, setUser] = useState({});
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user details
    const userId = localStorage.getItem("user");

    // Get the user by making a fetch get request
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseURL}/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user.");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Error fetching user.");
      }
    };

    // Fetch listings dynamically
    const fetchListings = async () => {
      try {
        const response = await fetch(`${baseURL}/listings/host/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch listings.");
        }

        const data = await response.json();
        if (
          data.message &&
          data.message === "No listings found for this host"
        ) {
          setListings([]);
        } else {
          setListings(data.listings);
        }
      } catch (error) {
        toast.error(error.message || "Error fetching listings.");
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${baseURL}/bookings/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const data = await response.json();
        if (
          data.message &&
          data.message === "No bookings found for this user"
        ) {
          setBookings([]);
        } else {
          setBookings(data.bookings);
        }
      } catch (error) {
        toast.error(error.message || "Error fetching bookings.");
      }
    };
    if (userId) {
      fetchListings();
      fetchUser();
      fetchBookings();
    }
  }, [user._id]);

  return (
    <div className="flex h-screen">
      <Sidebar
        sections={["Profile", "Bookings", "Listings"]}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="w-3/4 p-4">
        {activeSection === "Profile" && <ProfileSection user={user} />}
        {activeSection === "Bookings" && <BookingsSection bookings={bookings} setBookings={setBookings} />}
        {activeSection === "Listings" && (
          <ListingSection listings={listings} setListings={setListings} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
