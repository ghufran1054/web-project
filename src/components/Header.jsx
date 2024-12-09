import Navbar from './Navbar';
import CategoriesSlider from './CategoriesSlider';
import { useLocation } from 'react-router-dom';
const Header = ({ categories }) => {
    const location = useLocation();
    return (
        <div className="sticky top-0 left-0 right-0 z-50">
            <Navbar />
            {/* Conditionally render the CategoriesSlider based on the current route */}
            {location.pathname === "/" && <CategoriesSlider categories={categories} />}
        </div>
    );
};

export default Header;