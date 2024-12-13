import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import PublishListingPage from "./pages/PublishListingPage";
import AdminLogin from "./pages/AdminLoginPage";
import AdminHomepage from "./pages/AdminHomePage";
import AdminListingDetails from "./components/AdminListingDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage";
import SearchResultsPage from "./pages/SearchResultPage";

// Function to check if the current route matches the specified list
const AppContent = () => {
  const location = useLocation();
  const excludeRoutes = ["/login", "/signup", "/admin/login"]; // List of routes to exclude header and footer
  const isExcludedRoute = excludeRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render the Header and Footer based on the current route */}
      {!isExcludedRoute && <Header></Header>}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-listing" element={<PublishListingPage />} />
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path='/search-results' element={<SearchResultsPage />}></Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminHomepage />}></Route>
        <Route
          path="/admin/listings/:id"
          element={<AdminListingDetails />}
        ></Route>
      </Routes>
      {/* Conditionally render Footer */}
      {!isExcludedRoute && <Footer></Footer>}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ListingsProvider>
          <AppContent />
        </ListingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
