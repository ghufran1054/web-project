import { useRef } from 'react';

const CategoriesSlider = () => {
  // Sample categories list with placeholder icons
  const categories = [
    { name: 'Stays', icon: '🏡' },
    { name: 'Experiences', icon: '🎉' },
    { name: 'Online Experiences', icon: '💻' },
    { name: 'Restaurants', icon: '🍽️' },
    { name: 'Cafes', icon: '☕' },
    { name: 'Attractions', icon: '🎢' },
    { name: 'Events', icon: '🎟️' },
    { name: 'Tours', icon: '🗺️' },
    { name: 'Adventure', icon: '🏞️' },
    { name: 'Getaways', icon: '🏖️' },
  ];

  const containerRef = useRef(null);

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
    <div className="bg-white py-4">
      <div className="container mx-auto">
        
        {/* Scrollable container for categories */}
        <div className="flex items-center">
          <button onClick={scrollLeft} className="text-gray-700 p-2 rounded-md hover:bg-gray-200 transition duration-200">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/left--v1.png" alt="left--v1"/> {/* Left Arrow */}
          </button>
          <div
            className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide"
            ref={containerRef}
          >
            {categories.map((category, index) => (
              <div key={index} className="min-w-max">
                <button className="catButton flex flex-col items-center text-gray-700 py-2 px-4" style={{ width: '120px' }}>
                  <span className="text-2xs">{category.icon}</span>
                  <span className="mt-1 text-xs">{category.name}</span>
                </button>
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="text-gray-700 p-2 rounded-md hover:bg-gray-200 transition duration-200">
          <img width="50" height="50" src="https://img.icons8.com/ios/50/right--v1.png" alt="right--v1"/> {/* Right Arrow */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSlider;
