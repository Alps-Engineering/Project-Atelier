const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skusSchema = new Schema({
  sku_id: { type: Number, unique: true, required: true },
  quantity: { type: Number, required: false },
  size: { type: String, required: false },
  style_id: { type: Number, required: true }
});

const Skus = mongoose.model('Skus', skusSchema);

module.exports = Skus;