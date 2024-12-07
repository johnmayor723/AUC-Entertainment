const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  description: String
});

module.exports = mongoose.model('Post', PostSchema);
