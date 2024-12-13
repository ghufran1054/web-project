import React from 'react';

const Sidebar = ({ sections, activeSection, setActiveSection }) => {

  return (
    <div className="w-1/4 h-full bg-gray-200 p-4">
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            className={`p-2 cursor-pointer ${
                activeSection === section
                  ? 'bg-[#FD7B82] text-white' // Slightly lighter Airbnb coral
                  : 'hover:bg-gray-200'       // Light gray for hover
              }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
