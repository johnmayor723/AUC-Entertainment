const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    validate: [arrayLimit, 'You can only upload a maximum of 4 images']
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

// Function to enforce a maximum of 4 images
function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model('Shop', ProductSchema);