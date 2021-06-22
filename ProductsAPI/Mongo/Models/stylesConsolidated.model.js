const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skusSchema = new Schema({
  sku_id: { type: Number, unique: true, required: true },
  quantity: { type: Number, required: false },
  size: { type: String, required: false }
  // style_id: { type: Number, required: true }
});

const photosSchema = new Schema({
  photo_id: { type: Number, unique: true, required: true },
  thumbnail_url: { type: String, required: false },
  url: { type: String, required: false }
  // style_id: { type: Number, required: true }
});

const stylesSchema = new Schema({
  style_id: { type: Number, unique: true, required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
  original_price: { type: String, required: true },
  sale_price: { type: String, required: false },
  default_style: { type: Boolean, required: true },
  photos: { type: photosSchema, required: true },
  skus: { type: skusSchema, required: true }
});

const Styles = mongoose.model('Styles', stylesSchema);

module.exports = Styles;