import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const CategoriesSlider = ({ categories }) => {
  const containerRef = useRef(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(-1);

  // Function to scroll the categories to the right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll the categories to the left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex justify-center bg-white py-4 px-4">
      <div className="container">
        {/* Scrollable container for categories */}
        <div className="flex justify-center">
          <button
            onClick={scrollLeft}
            className="text-gray-700 p-2 rounded-full hover:bg-gray-200 transition duration-200"
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios/50/left--v1.png"
              alt="left arrow"
            />
          </button>
          <div
            className="flex overflow-x-hidden space-x-4 pb-2 scrollbar-hide"
            ref={containerRef}
          >
            {categories.map((category, index) => (
              <div key={index} className="min-w-max">
                <button onClick={() => setActiveCategoryIndex(index)}
                  className={`catButton flex flex-col items-center text-gray-700 py-2 px-4 ${
                    index === activeCategoryIndex ? 'bg-gray-200 rounded-lg' : ''
                  }`}
                  style={{ width: '100px' }}
                >
                  <span className="text-2xs">{category.icon}</span>
                  <span className="mt-1 text-xs">{category.name}</span>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="text-gray-700 p-2 rounded-full hover:bg-gray-200 transition duration-200"
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios/50/right--v1.png"
              alt="right arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
CategoriesSlider.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default CategoriesSlider;
