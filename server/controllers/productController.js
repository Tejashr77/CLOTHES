const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, page = 1, limit = 50 } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.$text = { $search: search };

    let sortObj = { createdAt: -1 };
    if (sort === 'price-low') sortObj = { price: 1 };
    if (sort === 'price-high') sortObj = { price: -1 };

    const count = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortObj).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
    res.json({ products, page: Number(page), pages: Math.ceil(count / Number(limit)), total: count });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};
