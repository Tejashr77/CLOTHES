const express = require('express');
const router = express.Router();
const Order = require('../models/Product');
const User = require('../models/User');
const Contact = require('../models/Contact');
const BespokeOrder = require('../models/BespokeOrder');
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments({ status: 'new' });
    const totalBespoke = await BespokeOrder.countDocuments({ status: 'submitted' });

    const OrderModel = require('../models/Order');
    const revenueData = await OrderModel.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' }, avgOrder: { $avg: '$totalPrice' } } }
    ]);

    res.json({
      totalOrders,
      totalUsers,
      pendingContacts: totalContacts,
      pendingBespoke: totalBespoke,
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      avgOrderValue: Math.round(revenueData[0]?.avgOrder || 0),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
