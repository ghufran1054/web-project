import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import { ListingsProvider } from "./contexts/listingsContext";
import ListingDetails from "./pages/ListingDetails";
import BookingPage from "./pages/BookingPage";
import Header from "./components/Header";

function App() {
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
    <ListingsProvider>
      <Router>
        <Header categories={categories}></Header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/book/:id" element={<BookingPage />} />
        </Routes>
      </Router>
    </ListingsProvider>
  );
}

export default App;
