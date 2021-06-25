const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photosSchema = new Schema({
  // photo_id: { type: Number, unique: true, required: true },
  style_id: { type: Number, required: true },
  url: { type: String, required: false },
  thumbnail_url: { type: String, required: false }
});

const Photos = mongoose.model('Photos', photosSchema);

module.exports = Photos;