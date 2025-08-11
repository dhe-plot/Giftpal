import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

// Mock mode for development without database
const MOCK_MODE = process.env.DB_ENABLED === 'false';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );

  return { accessToken, refreshToken };
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, userType = 'buyer' } = req.body;

    if (MOCK_MODE) {
      // Mock implementation for development
      const mockUser = {
        id: `user_${Date.now()}`,
        email: email,
        firstName: firstName,
        lastName: lastName,
        userType: userType,
        createdAt: new Date().toISOString()
      };

      const { accessToken, refreshToken } = generateTokens(mockUser.id);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: mockUser,
          accessToken,
          refreshToken
        }
      });
    }

    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await query(`
      INSERT INTO users (email, password_hash, first_name, last_name, user_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, first_name, last_name, user_type, created_at
    `, [email, passwordHash, firstName, lastName, userType]);

    const user = result.rows[0];

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
          createdAt: user.created_at
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    if (MOCK_MODE) {
      // Mock implementation for development
      const mockUser = {
        id: `user_${Date.now()}`,
        email: email,
        firstName: 'Demo',
        lastName: 'User',
        userType: 'buyer',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        isActive: true,
        createdAt: new Date().toISOString()
      };

      const { accessToken, refreshToken } = generateTokens(mockUser.id);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: mockUser,
          accessToken,
          refreshToken
        }
      });
    }

    // Find user
    const result = await query(`
      SELECT
        u.id, u.email, u.password_hash, u.first_name, u.last_name,
        u.user_type, u.avatar_url, u.is_active,
        sp.business_name, sp.verification_status
      FROM users u
      LEFT JOIN seller_profiles sp ON u.id = sp.user_id
      WHERE u.email = $1
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type,
          avatarUrl: user.avatar_url,
          businessName: user.business_name,
          verificationStatus: user.verification_status
        },
        accessToken,
        refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Check if user still exists and is active
    const result = await query(
      'SELECT id, is_active FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0 || !result.rows[0].is_active) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.id);

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    if (MOCK_MODE) {
      // Mock implementation for development
      const mockUser = {
        id: userId,
        email: 'demo@giftpal.com',
        firstName: 'Demo',
        lastName: 'User',
        userType: 'buyer',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        phone: '+1-555-0123',
        emailVerified: true,
        createdAt: new Date().toISOString()
      };

      return res.json({
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          user: mockUser
        }
      });
    }

    const result = await query(`
      SELECT
        u.id, u.email, u.first_name, u.last_name, u.user_type,
        u.avatar_url, u.phone, u.email_verified, u.created_at,
        sp.business_name, sp.verification_status, sp.total_sales,
        sp.total_orders, sp.average_rating
      FROM users u
      LEFT JOIN seller_profiles sp ON u.id = sp.user_id
      WHERE u.id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        avatarUrl: user.avatar_url,
        phone: user.phone,
        emailVerified: user.email_verified,
        createdAt: user.created_at,
        businessName: user.business_name,
        verificationStatus: user.verification_status,
        totalSales: user.total_sales,
        totalOrders: user.total_orders,
        averageRating: user.average_rating
      }
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone } = req.body;

    const result = await query(`
      UPDATE users 
      SET first_name = $1, last_name = $2, phone = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING id, email, first_name, last_name, phone, avatar_url
    `, [firstName, lastName, phone, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
