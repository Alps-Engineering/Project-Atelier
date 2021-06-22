const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featuresSchema = new Schema({
  feature_id: { type: Number, unique: true, required: true },
  feature: { type: String, required: true },
  value: { type: String, required: true }
  // product_id: { type: Number, required: true }
});

const productsSchema = new Schema({
  product_id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: String, required: true },
  features: { type: featuresSchema, required: true }
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;