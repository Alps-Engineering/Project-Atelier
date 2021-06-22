const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photosSchema = new Schema({
  photo_id: { type: Number, unique: true, required: true },
  thumbnail_url: { type: String, required: false },
  url: { type: String, required: false },
  style_id: { type: Number, required: true }
});

const Photos = mongoose.model('Photos', photosSchema);

module.exports = Photos;