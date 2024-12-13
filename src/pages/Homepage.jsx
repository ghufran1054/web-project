import ListingsContainer from "../components/Listings";
import { useContext, useEffect } from "react";
import { ListingsContext } from "../contexts/listingsContext";

function Homepage() {

  const { fetchListings } = useContext(ListingsContext);

  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <>
      <ListingsContainer></ListingsContainer>
    </>
  );
}

export default Homepage;
