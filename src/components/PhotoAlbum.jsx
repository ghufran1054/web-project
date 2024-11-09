import React from 'react';

const PhotoAlbum = ({ images }) => {
  if (!images || images.length === 0) return null;

  // Display a maximum of 5 images (1 large and 4 smaller ones)
  const mainImage = images[0];
  const additionalImages = images.slice(1, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 max-w-6xl">
      {/* Main Image */}
      <div className="lg:col-span-3">
        <img
          src={mainImage}
          alt="Main"
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Additional Images */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-2">
        {additionalImages.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`Gallery Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}

        {/* Show All Photos Button */}
        {images.length > 5 && (
          <div className="relative">
            <img
              src={images[4]}
              alt="More"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              className="absolute inset-0 bg-black bg-opacity-50 text-white font-semibold flex items-center justify-center rounded-lg"
              onClick={() => alert('Open Photo Gallery')}
            >
              Show all photos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoAlbum;
