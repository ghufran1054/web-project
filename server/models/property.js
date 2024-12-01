const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true }, // e.g., "Entire apartment"
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price: { type: String, required: true }, // e.g., "$205"
    rating: { type: Number, default: 0 },
    allImages: [{ type: String }], // Array of image URLs
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
});

module.exports = mongoose.model('Property', PropertySchema);
