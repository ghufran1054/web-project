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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  useEffect(() => {
    const userId = localStorage.getItem("user");

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
        if (data.message && data.message === "No listings found for this host") {
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
        if (data.message && data.message === "No bookings found for this user") {
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
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Sidebar */}
      <div className={`lg:w-1/4 bg-gray-100 p-4 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
        <Sidebar
          sections={["Profile", "Bookings", "Listings"]}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-xl text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>

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
