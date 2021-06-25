const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stylesSchema = new Schema({
  // style_id: { type: Number, unique: true, required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  sale_price: { type: String, required: false },
  original_price: { type: String, required: true },
  default_style: { type: Boolean, required: true },
  photos: { type: String, required: true },
  skus: { type: String, required: true }
});

const Styles = mongoose.model('Styles', stylesSchema);

module.exports = Styles;