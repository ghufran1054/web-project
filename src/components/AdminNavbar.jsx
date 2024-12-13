import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalPopup from "./ModalPopup";

const AdminNavbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // State to toggle the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const handleAction = () => {
    if (modalAction == "logout") {
      // Remove admin token from localStorage
      localStorage.removeItem("adminToken");
      setModalOpen(false);

      // Navigate to admin login page
      navigate("/admin/login");
    }
  };

  const handleBookings = () => {
    navigate("/admin/bookings");
  };

  return (
    <div className="bg-white p-4 border-b-2 flex-col justify-center item-center space-y-4">
      <nav>
        <div className="px-10 flex justify-between items-center">
          {/* Logo on the extreme left */}
          <a
            href="/admin/dashboard"
            className="text-black text-2xl font-bold flex flex-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ff5252"
                d="M42.459,32.519c-1.037-3.336-9.539-19.596-12.12-24.5l-0.026-0.048C29.153,5.559,26.676,4,24,4 s-5.153,1.559-6.291,3.929L17.661,8.02C15.08,12.923,6.578,29.183,5.542,32.518C5.261,33.421,5,34.407,5,35.5 c0,4.687,3.813,8.5,8.5,8.5c4.654,0,7.612-1.949,10.5-5.184C26.888,42.051,29.846,44,34.5,44c4.687,0,8.5-3.813,8.5-8.5 C43,34.407,42.739,33.421,42.459,32.519z M23.999,34.662C22.33,32.515,20,28.881,20,26c0-2.206,1.794-4,4-4s4,1.794,4,4 C28,28.872,25.668,32.511,23.999,34.662z M34.5,41c-3.287,0-5.521-1.107-8.325-4.258C27.878,34.596,31,30.104,31,26 c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,4.104,3.122,8.596,4.825,10.742C19.021,39.893,16.787,41,13.5,41C10.468,41,8,38.533,8,35.5 c0-0.653,0.162-1.308,0.406-2.09C9.17,30.95,15.3,18.948,20.316,9.417l0.076-0.146C21.055,7.891,22.471,7,24,7 s2.945,0.891,3.615,2.285l0.068,0.132C32.7,18.948,38.83,30.95,39.595,33.411C39.838,34.192,40,34.847,40,35.5 C40,38.533,37.532,41,34.5,41z"
              ></path>
            </svg>
            airbnb
          </a>

          {/* Center text: Admin Dashboard */}
          <div className="flex justify-center space-x-10 ml-50px flex-1">
            <h1 className="text-gray-700 text-xl font-semibold">
              Admin Dashboard
            </h1>
          </div>

          {/* Right side: Bookings Button and Dropdown */}
          <div className="flex flex-1 justify-end items-center space-x-4">
            {/* Bookings Button */}
            <button
              onClick={handleBookings}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Bookings
            </button>

            {/* Profile and Dropdown Menu */}
            <div
              className="relative flex items-center space-x-2 border p-2 rounded-full hover:shadow-md cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {/* Profile Icon */}
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/user-male-circle.png"
                alt="user-male-circle"
              />

              {/* Hamburger Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
              </svg>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
                  <button
                    onClick={() => {
                      setModalAction("logout");
                      setModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Modal Popup */}
      <ModalPopup
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleAction}
        message={`Are you sure you want to ${
          modalAction === "logout" ? "logout" : ""
        }?`}
      />
      {/* Conditional rendering of SearchBar */}
      {pathname === "/" && <SearchBar></SearchBar>}
    </div>
  );
};

export default AdminNavbar;
