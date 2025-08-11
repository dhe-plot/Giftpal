import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

// Authenticate JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const result = await query(`
      SELECT 
        u.id, u.email, u.first_name, u.last_name, u.user_type, u.is_active,
        sp.verification_status
      FROM users u
      LEFT JOIN seller_profiles sp ON u.id = sp.user_id
      WHERE u.id = $1
    `, [decoded.id]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      userType: user.user_type,
      verificationStatus: user.verification_status
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

// Authorize specific user types
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Require verified seller
export const requireVerifiedSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.userType !== 'seller') {
    return res.status(403).json({
      success: false,
      message: 'Seller account required'
    });
  }

  if (req.user.verificationStatus !== 'verified') {
    return res.status(403).json({
      success: false,
      message: 'Verified seller account required'
    });
  }

  next();
};

// Optional authentication (for public endpoints that can benefit from user context)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const result = await query(`
      SELECT 
        u.id, u.email, u.first_name, u.last_name, u.user_type, u.is_active,
        sp.verification_status
      FROM users u
      LEFT JOIN seller_profiles sp ON u.id = sp.user_id
      WHERE u.id = $1 AND u.is_active = true
    `, [decoded.id]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      req.user = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        userType: user.user_type,
        verificationStatus: user.verification_status
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user context
    req.user = null;
    next();
  }
};

export default {
  authenticateToken,
  authorize,
  requireVerifiedSeller,
  optionalAuth
};
