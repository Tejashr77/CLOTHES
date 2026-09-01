const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ['Statement', 'Premium', 'Accessible'] },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL'] }],
  countInStock: { type: Number, default: 0, min: 0 },
  scarcity: { type: String, default: '' },
  isPreorder: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
