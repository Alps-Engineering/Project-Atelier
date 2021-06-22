const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  feature_id: { type: Number, unique: true, required: true },
  feature: { type: String, required: true },
  value: { type: String, required: true },
  product_id: { type: Number, required: true }
});

const Features = mongoose.model('Features', featuresSchema);

module.exports = Features;