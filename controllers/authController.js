import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @param {boolean} isAdmin - Is user admin
 * @returns {string} - JWT Token
 */
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

/**
 * Admin Login
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for user (include password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }

    // Create token
    const token = generateToken(user._id, user.isAdmin);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Register Admin User (for initial setup only)
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    user = await User.create({
      email,
      password,
      isAdmin: true
    });

    // Create token
    const token = generateToken(user._id, user.isAdmin);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Current User
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
