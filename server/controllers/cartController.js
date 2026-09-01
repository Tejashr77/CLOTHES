const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, selectedSize = null } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const existingIndex = cart.items.findIndex(
      item => item.product.toString() === productId && item.selectedSize === selectedSize
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, selectedSize });
    }

    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId, size } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      i => i.product.toString() === productId && i.selectedSize === (size === 'null' ? null : size)
    );

    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        i => !(i.product.toString() === productId && i.selectedSize === (size === 'null' ? null : size))
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId, size } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      i => !(i.product.toString() === productId && i.selectedSize === (size === 'null' ? null : size))
    );
    await cart.save();
    cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
