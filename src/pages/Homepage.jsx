import ListingsContainer from "../components/Listings";
import { useContext, useEffect, useState } from "react";
import { ListingsContext } from "../contexts/listingsContext";
import CategoriesSlider from "../components/CategoriesSlider";


  // Sample categories list with placeholder icons
  const categories = [
    { name: "Apartment", icon: "apartment.png" },
    { name: "Cabin", icon: "cabin.png" },
    { name: "suite", icon: "hotel.png" },
    { name: "room", icon: "room.png" },
  ];


function Homepage() {

  const { fetchListings } = useContext(ListingsContext);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(-1);


  useEffect(() => {
    fetchListings();
  }, []);


  return (
    <>
      <CategoriesSlider categories={categories} activeCategoryIndex={activeCategoryIndex} setActiveCategoryIndex={setActiveCategoryIndex}/>
      <ListingsContainer activeCategory={activeCategoryIndex === -1 ? "" : categories[activeCategoryIndex].name}></ListingsContainer>
    </>
  );
}

export default Homepage;
