const BespokeOrder = require('../models/BespokeOrder');

exports.createBespokeOrder = async (req, res, next) => {
  try {
    const { measurements, fabricPreference, colorPreference, additionalNotes } = req.body;
    const inspirationImage = req.file ? `/uploads/${req.file.filename}` : '';

    const bespokeOrder = await BespokeOrder.create({
      user: req.user._id,
      inspirationImage,
      measurements,
      fabricPreference,
      colorPreference,
      additionalNotes,
    });

    res.status(201).json(bespokeOrder);
  } catch (error) {
    next(error);
  }
};

exports.getMyBespokeOrders = async (req, res, next) => {
  try {
    const orders = await BespokeOrder.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getBespokeOrderById = async (req, res, next) => {
  try {
    const order = await BespokeOrder.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Bespoke order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.getAllBespokeOrders = async (req, res, next) => {
  try {
    const orders = await BespokeOrder.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateBespokeOrder = async (req, res, next) => {
  try {
    const order = await BespokeOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Bespoke order not found' });

    Object.assign(order, req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
};
