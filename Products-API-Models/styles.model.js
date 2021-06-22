const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stylesSchema = new Schema({
  style_id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  original_price: { type: String, required: true },
  sale_price: { type: String, required: false },
  default_price: { type: Boolean, required: true },
  product_id: { type: Number, required: true }
});

const Styles = mongoose.model('Styles', stylesSchema);

module.exports = Styles;