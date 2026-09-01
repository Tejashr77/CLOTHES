const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  selectedSize: { type: String, default: null },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

cartSchema.methods.getTotal = function() {
  return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

module.exports = mongoose.model('Cart', cartSchema);
