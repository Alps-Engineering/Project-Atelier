const mongoose = require('mongoose');
const db = require('../database');

const reviewsSchema = new mongoose.Schema({
  review_id: { type: Number, unique: true, required: true, index: true },
  product_id: { type: Number, index: true },
  rating: { type: Number, index: true },
  summary: String,
  body: String,
  recommend: { type: Boolean, index: true },
  response: String,
  date: { type: String, index: true },
  reviewer_name: String,
  helpfulness: { type: Number, index: true },
  email: String,
  reported: { type: Boolean, index: true },
  characteristics: [Mixed],
  photos: [Mixed],
});

module.exports.Review = db.model('Review', reviewsSchema);
