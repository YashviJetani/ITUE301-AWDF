const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validateInput');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret-jwt-key-2026-lab-practical';

/**
 * Helper to generate JWT Token with 1-hour expiration
 */
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * @route   POST /auth/register
 * @desc    Register a new user, hash password, and return JWT
 * @access  Public
 */
router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Conflict',
        message: 'An account with this email address already exists.',
      });
    }

    // Password hashing is handled automatically by Mongoose pre-save hook in User model
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Developer',
    });

    const token = generateToken({ id: user._id, email: user.email, name: user.name });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /auth/login
 * @desc    Authenticate user, verify password hash, and sign JWT
 * @access  Public
 */
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid email or password credentials',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid email or password credentials',
      });
    }

    const token = generateToken({ id: user._id, email: user.email, name: user.name });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /auth/me
 * @desc    Get current logged-in user profile from decoded JWT
 * @access  Private (Protected by authMiddleware)
 */
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User account not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile fetched successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
