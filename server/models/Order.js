const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, required: true },
  selectedSize: { type: String, default: null },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
  },
  paymentMethod: { type: String, default: 'razorpay' },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
  },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date,
  trackingNumber: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
