const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  price: Number,
  description: String
});

module.exports = mongoose.model('Product', ProductSchema);
