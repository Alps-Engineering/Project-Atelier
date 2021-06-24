const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const relatedSchema = new Schema({
  // related_id: { type: Number, unique: true, required: true },
  current_product_id: { type: Number, required: true },
  related_product_id: { type: Number, required: false }
});

const Related = mongoose.model('Related', relatedSchema);

module.exports = Related;