const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Ideally hashed
    profileImage: { type: String, default: '' },
    phone: { type: String, required: true },
    isHost: { type: Boolean, default: false }, // True if the user lists properties
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }], // Properties listed by the user
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], // User's bookings
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
