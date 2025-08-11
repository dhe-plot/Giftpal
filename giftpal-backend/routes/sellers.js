import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

// Mock mode for development without database
const MOCK_MODE = process.env.DB_ENABLED === 'false';

const router = express.Router();

// Validation rules
const sellerRegistrationValidation = [
  body('businessName').notEmpty().withMessage('Business name is required'),
  body('businessDescription').isLength({ min: 50 }).withMessage('Business description must be at least 50 characters'),
  body('businessType').notEmpty().withMessage('Business type is required'),
  body('businessPhone').isMobilePhone().withMessage('Valid phone number is required'),
  body('businessAddress').isObject().withMessage('Business address is required'),
  body('specializations').isArray().withMessage('Specializations must be an array'),
];

// @route   POST /api/sellers/register
// @desc    Register a new seller
// @access  Private (authenticated users)
router.post('/register', authenticateToken, sellerRegistrationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      businessName,
      businessDescription,
      businessType,
      businessRegistrationNumber,
      taxId,
      websiteUrl,
      businessAddress,
      businessPhone,
      specializations
    } = req.body;

    const userId = req.user.id;

    if (MOCK_MODE) {
      // Mock implementation for development
      const mockSeller = {
        id: `seller_${Date.now()}`,
        user_id: userId,
        business_name: businessName,
        business_description: businessDescription,
        business_type: businessType,
        business_registration_number: businessRegistrationNumber,
        tax_id: taxId,
        website_url: websiteUrl,
        business_address: businessAddress,
        business_phone: businessPhone,
        specializations: specializations,
        verification_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return res.status(201).json({
        success: true,
        message: 'Seller registration submitted successfully',
        data: {
          seller: mockSeller
        }
      });
    }

    // Check if user already has a seller profile
    const existingProfile = await query(
      'SELECT id FROM seller_profiles WHERE user_id = $1',
      [userId]
    );

    if (existingProfile.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Seller profile already exists for this user'
      });
    }

    // Create seller profile
    const result = await query(`
      INSERT INTO seller_profiles (
        user_id, business_name, business_description, business_type,
        business_registration_number, tax_id, website_url, business_address,
        business_phone, specializations, verification_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
      RETURNING id, business_name, verification_status, created_at
    `, [
      userId, businessName, businessDescription, businessType,
      businessRegistrationNumber, taxId, websiteUrl, JSON.stringify(businessAddress),
      businessPhone, specializations
    ]);

    // Update user type to seller
    await query(
      'UPDATE users SET user_type = $1 WHERE id = $2',
      ['seller', userId]
    );

    // Add to replacement queue for placeholder replacement
    await addToReplacementQueue(userId);

    res.status(201).json({
      success: true,
      message: 'Seller registration submitted successfully',
      data: {
        sellerId: result.rows[0].id,
        businessName: result.rows[0].business_name,
        verificationStatus: result.rows[0].verification_status,
        registeredAt: result.rows[0].created_at
      }
    });

  } catch (error) {
    console.error('Seller registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during seller registration'
    });
  }
});

// @route   GET /api/sellers/profile
// @desc    Get seller profile
// @access  Private (seller only)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(`
      SELECT 
        sp.*,
        u.first_name,
        u.last_name,
        u.email,
        u.avatar_url,
        (SELECT COUNT(*) FROM products WHERE seller_id = u.id AND status = 'active') as active_products,
        (SELECT COUNT(*) FROM orders WHERE seller_id = u.id) as total_orders
      FROM seller_profiles sp
      JOIN users u ON sp.user_id = u.id
      WHERE sp.user_id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Seller profile not found'
      });
    }

    const profile = result.rows[0];
    
    res.json({
      success: true,
      data: {
        ...profile,
        business_address: typeof profile.business_address === 'string' 
          ? JSON.parse(profile.business_address) 
          : profile.business_address
      }
    });

  } catch (error) {
    console.error('Get seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/sellers/profile
// @desc    Update seller profile
// @access  Private (seller only)
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Build dynamic update query
    const allowedFields = [
      'business_name', 'business_description', 'business_type',
      'website_url', 'business_address', 'business_phone', 'specializations'
    ];

    const updateFields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(key === 'business_address' ? JSON.stringify(updates[key]) : updates[key]);
        paramCount++;
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(userId);

    const updateQuery = `
      UPDATE seller_profiles 
      SET ${updateFields.join(', ')}
      WHERE user_id = $${paramCount}
      RETURNING *
    `;

    const result = await query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Seller profile not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update seller profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/sellers/upload-documents
// @desc    Upload verification documents
// @access  Private (seller only)
router.post('/upload-documents', 
  authenticateToken, 
  upload.array('documents', 5), 
  async (req, res) => {
    try {
      const userId = req.user.id;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No documents uploaded'
        });
      }

      // Process uploaded files and store URLs
      const documentUrls = files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        url: `/uploads/${file.filename}`,
        uploadedAt: new Date()
      }));

      // Update seller profile with document URLs
      await query(`
        UPDATE seller_profiles 
        SET verification_documents = $1, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2
      `, [JSON.stringify(documentUrls), userId]);

      res.json({
        success: true,
        message: 'Documents uploaded successfully',
        data: { documents: documentUrls }
      });

    } catch (error) {
      console.error('Document upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during document upload'
      });
    }
  }
);

// @route   GET /api/sellers/queue-status
// @desc    Get seller's position in replacement queue
// @access  Private (seller only)
router.get('/queue-status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(`
      SELECT 
        rq.*,
        (SELECT COUNT(*) FROM replacement_queue WHERE status = 'pending' AND priority_score > rq.priority_score) + 1 as queue_position
      FROM replacement_queue rq
      WHERE rq.seller_id = $1 AND rq.status = 'pending'
    `, [userId]);

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        data: { inQueue: false, message: 'Not in replacement queue' }
      });
    }

    const queueData = result.rows[0];

    res.json({
      success: true,
      data: {
        inQueue: true,
        queuePosition: queueData.queue_position,
        priorityScore: queueData.priority_score,
        status: queueData.status,
        addedAt: queueData.created_at
      }
    });

  } catch (error) {
    console.error('Queue status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Helper function to add seller to replacement queue
async function addToReplacementQueue(sellerId) {
  try {
    // Calculate priority score based on seller profile
    const priorityScore = await calculateSellerPriorityScore(sellerId);

    await query(`
      INSERT INTO replacement_queue (seller_id, priority_score, status)
      VALUES ($1, $2, 'pending')
      ON CONFLICT (seller_id) DO UPDATE SET
        priority_score = $2,
        created_at = CURRENT_TIMESTAMP
    `, [sellerId, priorityScore]);

  } catch (error) {
    console.error('Error adding to replacement queue:', error);
  }
}

// Helper function to calculate seller priority score
async function calculateSellerPriorityScore(sellerId) {
  try {
    const result = await query(`
      SELECT 
        sp.*,
        (SELECT COUNT(*) FROM products WHERE seller_id = $1) as product_count
      FROM seller_profiles sp
      WHERE sp.user_id = $1
    `, [sellerId]);

    if (result.rows.length === 0) return 0;

    const seller = result.rows[0];
    let score = 0;

    // Business verification
    if (seller.verification_status === 'verified') score += 30;
    if (seller.business_registration_number) score += 20;

    // Profile completeness
    if (seller.business_description && seller.business_description.length >= 100) score += 15;
    if (seller.website_url) score += 10;
    if (seller.specializations && seller.specializations.length > 0) score += 10;

    // Product count
    score += Math.min(seller.product_count * 5, 25);

    return score;
  } catch (error) {
    console.error('Error calculating priority score:', error);
    return 0;
  }
}

export default router;
