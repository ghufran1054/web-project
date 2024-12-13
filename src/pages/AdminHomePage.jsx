import { useContext, useEffect } from "react";
import { ListingsContext } from "../contexts/listingsContext";
import AdminListingsContainer from "../components/AdminListings";
import { useNavigate } from "react-router-dom";
function AdminHomepage() {

    const { fetchListingsAdmin } = useContext(ListingsContext);
    const adminToken = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    if (!adminToken) {
      // Redirect to admin login page
      navigate("/admin/login");
    }

    useEffect(() => {
      fetchListingsAdmin();
    }, []);
  return (
    <>
     <AdminListingsContainer></AdminListingsContainer>
    </>
  );
}

export default AdminHomepage;
