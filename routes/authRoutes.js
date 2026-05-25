import express from 'express';
import { login, register, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new admin user
 * @access  Public (should be protected in production)
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login admin user
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', protect, getMe);

export default router;
