const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  product_id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: String, required: true },
  features: { type: String, required: true }
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;