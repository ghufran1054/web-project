import "./index.css";
import Navbar from "./components/Navbar";
import CategoriesSlider from "./components/CategoriesSlider";
import ListingsContainer from "./components/Listings";
import Footer from "./components/Footer";

CategoriesSlider;
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
    <>
      <Navbar></Navbar>
      <CategoriesSlider categories={categories}></CategoriesSlider>
      <div className="flex justify-center mb-4"></div>
      <ListingsContainer></ListingsContainer>
      <Footer></Footer>
    </>
  );
}

export default App;
