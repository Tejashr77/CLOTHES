const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'No order items' });

    let itemsPrice = 0;
    const orderItems = items.map(item => {
      itemsPrice += item.price * item.quantity;
      return { ...item };
    });

    const shippingPrice = itemsPrice >= 50000 ? 0 : 1500;
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Clear cart after order
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    if (req.body.trackingNumber) order.trackingNumber = req.body.trackingNumber;
    if (req.body.status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    if (req.body.isPaid !== undefined) {
      order.isPaid = req.body.isPaid;
      order.paidAt = req.body.isPaid ? Date.now() : null;
    }
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.deleteOne();
    res.json({ message: 'Order deleted' });
  } catch (error) {
    next(error);
  }
};
