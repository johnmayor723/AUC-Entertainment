const mongoose = require('mongoose');

const EntertainmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  fileUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Comedy Videos', 'AUC Entertainment Videos', 'Street Shows', 'Podcast', 'Freestyle', 'News'] 
  }
});

module.exports = mongoose.model('Entertainment', EntertainmentSchema);
