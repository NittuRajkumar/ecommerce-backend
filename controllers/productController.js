import Product from '../models/Product.js';

/**
 * Get all products
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single product by ID
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new product (Admin only)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, image, category } = req.body;

    // Validate required fields
    if (!title || !description || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      image: image || 'https://via.placeholder.com/300x300?text=Product+Image',
      category: category || 'General'
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update a product (Admin only)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Update fields
    const { title, description, price, stock, image, category } = req.body;
    
    if (title) product.title = title;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (image) product.image = image;
    if (category) product.category = category;

    product = await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a product (Admin only)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
