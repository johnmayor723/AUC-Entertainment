const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: String,
  author: String,
  fileUrl: String,
  year: Number
});

module.exports = mongoose.model('Video', VideoSchema);