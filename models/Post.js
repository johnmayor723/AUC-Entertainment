const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  content: String,
  date: String
});

module.exports = mongoose.model('Post', PostSchema);
