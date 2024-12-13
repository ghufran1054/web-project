import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constants/api";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main stylesheet
import "react-date-range/dist/theme/default.css"; // Theme stylesheet
import { toast } from "react-toastify";

const StepAmenities = ({ formData, handleChange }) => {
  const [amenityName, setAmenityName] = useState("");
  const [amenityDescription, setAmenityDescription] = useState("");

  const addAmenity = () => {
    if (!amenityName) {
      alert("Please enter an amenity name.");
      return;
    }

    const newAmenity = {
      amenity: amenityName,
      description: amenityDescription,
    };
    const updatedAmenities = [...formData.amenities, newAmenity];
    handleChange("amenities", updatedAmenities);

    // Reset fields
    setAmenityName("");
    setAmenityDescription("");
  };

  const removeAmenity = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    handleChange("amenities", updatedAmenities);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Amenities</h2>
      <div>
        <label className="block font-medium text-gray-700">Amenity Name</label>
        <input
          type="text"
          value={amenityName}
          onChange={(e) => setAmenityName(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-pink-500"
          placeholder="e.g., Free Wi-Fi"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">
          Amenity Description
        </label>
        <textarea
          value={amenityDescription}
          onChange={(e) => setAmenityDescription(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-pink-500"
          placeholder="e.g., High-speed internet available throughout the property"
        ></textarea>
      </div>
      <button
        onClick={addAmenity}
        className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-lg"
      >
        Add Amenity
      </button>

      {formData.amenities.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-medium text-gray-700">Added Amenities</h3>
          <ul className="space-y-2 mt-2">
            {formData.amenities.map((amenity, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-50 border rounded-lg p-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{amenity.amenity}</p>
                  <p className="text-sm text-gray-600">{amenity.description}</p>
                </div>
                <button
                  onClick={() => removeAmenity(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PublishListingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    type: "apartment",
    description: "",
    amenities: [],
    guests: "",
    bathrooms: "",
    bedrooms: "",
    images: [],
    price: "",
    location: "",
    availableDates: [
      {
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.dismiss();
      toast.info("Please login to publish a listing");
      navigate("/login");
    }
  }, []);
  const uploadImages = async (propertyId, images) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to publish a listing");

      navigate("/login");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(
        `${baseURL}/listings/upload-images/${propertyId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 401) {
        toast.info("Please login to publish a listing");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await response.json();
      console.log("Images uploaded successfully:", data);

      // Optionally, update the UI with the uploaded images or redirect to another page
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Something went wrong while uploading images. Please try again.");
    }
  };
  const postListing = async (formData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to publish a listing");

      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/listings/new-listing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.name,
          type: formData.type,
          description: formData.description,
          amenities: formData.amenities,
          guests: Number(formData.guests),
          bathrooms: Number(formData.bathrooms),
          bedrooms: Number(formData.bedrooms),
          price: formData.price,
        }),
      });

      if (response.status === 401) {
        toast.info("Please login to publish a listing");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to post property");
      }

      const data = await response.json();
      const propertyId = data._id;

      // Now upload images using the propertyId
      uploadImages(propertyId, formData.images);
    } catch (error) {
      console.error("Error posting the property:", error);
      alert(
        "Something went wrong while posting the property. Please try again."
      );
    }
  };
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 5) {
      alert("Please upload at least 5 images.");
    } else {
      handleChange("images", files);
    }
  };
  let nextDisabled = false;
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    handleChange("images", updatedImages);
  };

  const handleReplaceImage = (index, newFile) => {
    const updatedImages = formData.images.map((img, i) =>
      i === index ? newFile : img
    );
    handleChange("images", updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postListing(formData);
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        nextDisabled =
          formData.name === "" ||
          formData.type === "" ||
          formData.description === "";
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Basic Details
            </h2>
            <div>
              <label className="block font-medium text-gray-700">
                Name of the Listing
              </label>
              <input
                type="text"
                maxLength={50}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                placeholder="e.g., Cozy Apartment in NYC"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Type of Listing
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                rows={4}
                placeholder="Describe your place in detail..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <StepAmenities
            formData={formData}
            handleChange={handleChange}
          ></StepAmenities>
        );
      case 3:
        nextDisabled =
          formData.guests === "" ||
          formData.bathrooms === "" ||
          formData.bedrooms === "";
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Space Details
            </h2>
            <div>
              <label className="block font-medium text-gray-700">
                Number of Guests
              </label>
              <input
                type="number"
                value={formData.guests}
                onChange={(e) => handleChange("guests", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                placeholder="e.g., 4"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Number of Bathrooms
              </label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleChange("bathrooms", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                placeholder="e.g., 2"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Number of Bedrooms
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleChange("bedrooms", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                placeholder="e.g., 3"
              />
            </div>
          </div>
        );

      case 4:
        nextDisabled = formData.images.length < 5;
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Upload Images
            </h2>
            <p className="text-gray-600">
              Please upload at least 5 images of your place. The first image
              will be used as the cover photo.
            </p>

            {/* Upload Button */}
            <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-gray-600 font-medium">
                Click to Upload Images
              </span>
            </label>

            {/* Display Uploaded Images */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden shadow-sm"
                  >
                    {/* Display the image */}
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />

                    {/* Cover Photo Label */}
                    {index === 0 && (
                      <div className="absolute top-0 left-0 bg-pink-500 text-white text-xs uppercase px-2 py-1">
                        Cover Photo
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-60 text-white text-sm flex justify-between">
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="w-1/2 text-center py-1 hover:bg-red-500"
                      >
                        Remove
                      </button>
                      <label className="w-1/2 text-center py-1 hover:bg-blue-500 cursor-pointer">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleReplaceImage(index, e.target.files[0])
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Validation Message */}
            {formData.images.length < 5 && (
              <p className="text-red-500 text-sm">
                Please upload at least {5 - formData.images.length} more images.
              </p>
            )}
          </div>
        );

      case 5:
        nextDisabled =
          formData.price === "" ||
          formData.location === "" ||
          formData.availableDates.length === 0;

        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Set Location, Availability, and Price
            </h2>

            {/* Location Input */}
            <div>
              <label className="block font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                placeholder="Enter the location, e.g., Lahore"
              />
            </div>

            {/* Date Range Selector */}
            <div>
              <label className="block font-medium text-gray-700">
                Available Dates
              </label>
              <DateRange
                editableDateInputs={true}
                onChange={(ranges) => {
                  let selectedRanges = Object.values(ranges).map((range) => ({
                    startDate: range.startDate,
                    endDate: range.endDate,
                  }));
                  // If the start and end date of the first range is the same remove that
                  if (
                    formData.availableDates.length > 0 &&
                    formData.availableDates[0].startDate.getTime() ===
                      formData.availableDates[0].endDate.getTime()
                  ) {
                    formData.availableDates = [];
                  }

                  selectedRanges = [
                    ...selectedRanges,
                    ...formData.availableDates,
                  ];
                  handleChange("availableDates", selectedRanges);
                }}
                moveRangeOnFirstSelection={false}
                ranges={formData.availableDates}
              />
              <p className="text-sm text-gray-500 mt-2">
                Select one or more date ranges when the property is available.
              </p>
            </div>

            {/* Price Input */}
            <div>
              <label className="block font-medium text-gray-700">
                Price per Night (in USD)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-pink-500"
                placeholder="e.g., 100"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Review and Submit
            </h2>
            <p className="text-gray-600">
              Please review your details below before submitting your listing.
            </p>

            {/* Review Section */}
            <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
              {/* Basic Details */}
              <h3 className="font-medium text-gray-700">Basic Details:</h3>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Type:</strong> {formData.type}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>

              {/* Space Details */}
              <h3 className="font-medium text-gray-700 mt-4">Space Details:</h3>
              <p>
                <strong>Guests:</strong> {formData.guests}
              </p>
              <p>
                <strong>Bathrooms:</strong> {formData.bathrooms}
              </p>
              <p>
                <strong>Bedrooms:</strong> {formData.bedrooms}
              </p>

              {/* Location */}
              <h3 className="font-medium text-gray-700 mt-4">Location:</h3>
              <p>
                <strong>Location:</strong> {formData.location}
              </p>

              {/* Available Dates */}
              <h3 className="font-medium text-gray-700 mt-4">
                Available Dates:
              </h3>
              <ul className="list-disc pl-5">
                {formData.availableDates.map((range, index) => (
                  <li key={index}>
                    {new Date(range.startDate).toLocaleDateString()} -{" "}
                    {new Date(range.endDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>

              {/* Amenities */}
              <h3 className="font-medium text-gray-700 mt-4">Amenities:</h3>
              <ul className="list-disc pl-5">
                {formData.amenities.map((amenity, index) => (
                  <li key={index}>{amenity.name}</li>
                ))}
              </ul>

              {/* Images */}
              <h3 className="font-medium text-gray-700 mt-4">Images:</h3>
              <p>{formData.images.length} images uploaded.</p>

              {/* Price */}
              <h3 className="font-medium text-gray-700 mt-4">Price:</h3>
              <p>
                <strong>${formData.price}</strong> per night
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg"
            >
              Submit Listing
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {renderStep()}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            >
              Back
            </button>
          )}
          {step < 6 && (
            <button
              disabled={nextDisabled}
              onClick={handleNext}
              className={`px-4 py-2 rounded-lg ${
                nextDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-500 text-white"
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishListingPage;
