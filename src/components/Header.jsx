import Navbar from './Navbar';
import CategoriesSlider from './CategoriesSlider';
const Header = ({ categories }) => {
    return (
        <div className="sticky top-0 left-0 right-0 z-50">
            <Navbar />
            <CategoriesSlider categories={categories} />
        </div>
    );
};

export default Header;