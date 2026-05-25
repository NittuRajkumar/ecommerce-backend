import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder
} from '../controllers/orderController.js';
import { admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Public
 */
router.post('/', createOrder);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin)
 * @access  Private/Admin
 */
router.get('/', admin, getAllOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order
 * @access  Public
 */
router.get('/:id', getOrder);

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status
 * @access  Private/Admin
 */
router.put('/:id', admin, updateOrder);

export default router;
