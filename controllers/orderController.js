import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * Create a new order
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, customerInfo } = req.body;

    // Validate input
    if (!items || items.length === 0 || !totalPrice || !customerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check stock availability
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${item.title}`
        });
      }
    }

    // Reduce stock for each product
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Create order
    const order = await Order.create({
      items,
      totalPrice,
      customerInfo,
      paymentStatus: 'completed',
      orderStatus: 'pending'
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all orders (Admin only)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single order by ID
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update order status (Admin only)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateOrder = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    order = await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
