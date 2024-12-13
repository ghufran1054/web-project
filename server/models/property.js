const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
    image: { type: String, default: '' },
    title: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Entire apartment"
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price: { type: String, required: true }, // e.g., "$205"
    rating: { type: Number, default: 0 },
    allImages: [{ type: String }], // Array of image URLs
    isApproved: { type: Boolean, default: false },
    amenities: [
        {
            amenity: { type: String, required: true },
            description: { type: String, default: '' },
        },
    ],
    description: { type: String, required: true },
    host: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, // Ensure every property is linked to a user
    },
    location: { type: String, required: true },
    availableDates: [
        {
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
        }
    ]
});

module.exports = mongoose.model('Property', PropertySchema);


