const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/all', protect, admin, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;
