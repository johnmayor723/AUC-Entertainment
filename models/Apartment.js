const mongoose = require('mongoose');


const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Apartment', apartmentSchema);
