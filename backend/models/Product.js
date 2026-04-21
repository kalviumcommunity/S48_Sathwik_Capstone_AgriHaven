const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['tools', 'manure', 'seeds', 'irrigation', 'pest control'] },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  supplier: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
