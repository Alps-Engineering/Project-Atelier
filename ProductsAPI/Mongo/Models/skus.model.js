const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skusSchema = new Schema({
  // sku_id: { type: Number, unique: true, required: true },
  style_id: { type: Number, required: true },
  size: { type: String, required: false },
  quantity: { type: Number, required: false }
});

const Skus = mongoose.model('Skus', skusSchema);

module.exports = Skus;