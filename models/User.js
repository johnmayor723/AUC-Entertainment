const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentBooking: {
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
  },
  bookingHistory: [
    {
      apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' },
      checkInDate: { type: Date },
      checkOutDate: { type: Date },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
