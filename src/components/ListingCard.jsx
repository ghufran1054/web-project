/* eslint-disable react/prop-types */
const ListingCard = ({ listing }) => {

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img 
        className="w-full h-48 object-cover" 
        src={listing.image} 
        alt={listing.title} 
      />
      <div className="p-4">
        <h2 className="text-m    font-semibold">{listing.title}</h2>
        <p className="text-gray-500">{listing.type}</p>
        <p className="text-gray-700">
          {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms
        </p>
        <div className="flex-col justify-between items-center mt-2">
          <span className="text-s">{listing.price} night</span>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">{listing.rating}</span>
            <svg 
              className="w-5 h-5 text-yellow-500" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10 15.27L16.18 18l-1.64-7.03L18 7.24l-7.19-.61L10 0 9.19 6.63 2 7.24l5.46 3.73L5.82 18z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
