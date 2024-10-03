const SearchBar = () => {
return (
    <div className="bg-white shadow-md rounded-full px-5 py-3 flex items-center justify-between max-w-4xl mx-auto border-2 border-solid">
        {/* Location Input */}
        <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-600">Where</label>
            <input
                type="text"
                placeholder="Search destination"
                className="outline-none text-gray-900 font-medium text-sm"
            />
        </div>

        {/* Check-in Input */}
        <div className="flex flex-col border-l-2 pl-4">
            <label className="text-xs font-semibold text-gray-600">Check in</label>
            <input
                type="date"
                className="outline-none text-gray-900 font-medium text-sm"
            />
        </div>

        {/* Check-out Input */}
        <div className="flex flex-col border-l-2 pl-4">
            <label className="text-xs font-semibold text-gray-600">Check out</label>
            <input
                type="date"
                className="outline-none text-gray-900 font-medium text-sm"
            />
        </div>

        {/* Guests Input */}
        <div className="flex flex-col border-l-2 pl-4">
            <label className="text-xs font-semibold text-gray-600">Guests</label>
            <input
                type="number"
                min="1"
                placeholder="Add guests"
                className="outline-none text-gray-900 font-medium text-sm"
            />
        </div>

        {/* Search Button */}
        <button className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition duration-200">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 19a7 7 0 100-14 7 7 0 000 14zM21 21l-4.35-4.35"
                />
            </svg>
        </button>
    </div>
);
};

export default SearchBar;
