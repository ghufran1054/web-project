import Navbar from "./Navbar";
import CategoriesSlider from "./CategoriesSlider";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
const Header = ({ categories }) => {
  const location = useLocation();
  const isAdmin = window.location.href.includes("admin");
  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      {isAdmin ? (
        <AdminNavbar />
      ) : (
        <>
          <Navbar />
          {/* Conditionally render the CategoriesSlider based on the current route */}
          {location.pathname === "/" && (
            <CategoriesSlider categories={categories} />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
