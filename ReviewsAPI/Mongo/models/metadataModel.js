const mongoose = require('mongoose');
const db = require('../database');

const metadataSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
    required: true,
    index: true,
  },
  ratings: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
  },
  recommended: {
    false: String,
    true: String,
  },
  characteristics: {
    Size: {
      id: Number,
      value: String,
      sum: Number,
      quantity: Number,
    },
    Width: {
      id: Number,
      value: String,
      sum: Number,
      quantity: Number,
    },
    Comfort: {
      id: Number,
      value: String,
      sum: Number,
      quantity: Number,
    },
    Quality: {
      id: Number,
      value: String,
      sum: Number,
      quantity: Number,
    },
    Length: {
      id: Number,
      value: String,
      sum: Number,
      quantity: Number,
    },
    Fit: {
      id: Number,
      value: String,
      sum: Number,
      quantity: Number,
    },
  },
});

module.exports.Metadata = db.model('Review', metadataSchema);
