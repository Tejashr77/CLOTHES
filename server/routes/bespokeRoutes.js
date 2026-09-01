const express = require('express');
const router = express.Router();
const { createBespokeOrder, getMyBespokeOrders, getBespokeOrderById, getAllBespokeOrders, updateBespokeOrder } = require('../controllers/bespokeController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', protect, upload.single('inspirationImage'), createBespokeOrder);
router.get('/my', protect, getMyBespokeOrders);
router.get('/all', protect, admin, getAllBespokeOrders);
router.get('/:id', protect, getBespokeOrderById);
router.put('/:id', protect, admin, updateBespokeOrder);

module.exports = router;
