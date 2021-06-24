const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  // feature_id: { type: Number, unique: true, required: true },
  feature: { type: String, required: false },
  value: { type: String, required: false }
    // product_id: { type: Number, required: true }
});

const Features = mongoose.model('Features', featuresSchema);

module.exports = Features;