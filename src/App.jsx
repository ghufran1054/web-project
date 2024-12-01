import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import { ListingsProvider } from "./contexts/listingsContext";
import ListingDetails from "./pages/ListingDetails";
import BookingPage from "./pages/BookingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthProvider from "./contexts/authContext";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";

// Function to check if the current route matches the specified list
const AppContent = () => {
  const location = useLocation();
  const excludeRoutes = ["/login", "/signup"]; // List of routes to exclude header and footer
  const isExcludedRoute = excludeRoutes.includes(location.pathname);

  // Sample categories list with placeholder icons
  const categories = [
    { name: "Stays", icon: "🏡" },
    { name: "Experiences", icon: "🎉" },
    { name: "Online Experiences", icon: "💻" },
    { name: "Restaurants", icon: "🍽️" },
    { name: "Cafes", icon: "☕" },
    { name: "Attractions", icon: "🎢" },
    { name: "Events", icon: "🎟️" },
    { name: "Tours", icon: "🗺️" },
    { name: "Adventure", icon: "🏞️" },
    { name: "Getaways", icon: "🏖️" },
  ];

  return (
    <>
      {/* Conditionally render the Header and Footer based on the current route */}
      {!isExcludedRoute && <Header categories={categories}></Header>}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
      {/* Conditionally render Footer */}
      {!isExcludedRoute && <Footer></Footer>}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ListingsProvider>
        <Router>
          <AppContent />
        </Router>
      </ListingsProvider>
    </AuthProvider>
  );
}

export default App;
