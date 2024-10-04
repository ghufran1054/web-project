import ListingCard from './ListingCard';

const ListingsContainer = () => {
  const listing = {
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    title: 'Charming Cottage in the Woods',
    type: 'Entire home',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: '$120',
    rating: 4.8,
  };

  const listingsArray = Array.from({ length: 50 }, () => listing);

  return (
    <div className="flex flex-col items-center py-4 px-4 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl">
        {listingsArray.map((listing, index) => (
          <ListingCard key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsContainer;
