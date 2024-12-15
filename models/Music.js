const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  category: String,
  title: String,
  fileUrl: String,
  imageUrl: String,
  author: String,
  year: Number
});

module.exports = mongoose.model('Music', MusicSchema);
