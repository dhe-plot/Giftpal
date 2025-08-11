import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

// Mock mode for development without database
const MOCK_MODE = process.env.DB_ENABLED === 'false';

const router = express.Router();

// @route   GET /api/placeholders/sellers
// @desc    Get all placeholder sellers
// @access  Public
router.get('/sellers', async (req, res) => {
  try {
    const { limit = 20, category } = req.query;

    if (MOCK_MODE) {
      // Mock implementation for development
      const mockPlaceholders = {
        businessName: process.env.DEFAULT_BUSINESS_NAME || 'Your Business Name',
        businessDescription: process.env.DEFAULT_BUSINESS_DESCRIPTION || 'Your business description will appear here',
        contactEmail: process.env.DEFAULT_CONTACT_EMAIL || 'contact@yourbusiness.com',
        contactPhone: process.env.DEFAULT_CONTACT_PHONE || '+1-555-0123',
        businessAddress: process.env.DEFAULT_BUSINESS_ADDRESS || '123 Business St, City, State 12345'
      };

      return res.json({
        success: true,
        data: {
          placeholders: mockPlaceholders
        }
      });
    }

    let whereClause = 'WHERE is_active = true';
    const values = [];
    let paramCount = 1;

    if (category) {
      whereClause += ` AND category = $${paramCount}`;
      values.push(category);
      paramCount++;
    }

    const result = await query(`
      SELECT
        id, name, business_name, description, avatar_url,
        cover_image_url, location, category, specializations, stats
      FROM placeholder_sellers
      ${whereClause}
      ORDER BY replacement_priority DESC, created_at ASC
      LIMIT $${paramCount}
    `, [...values, parseInt(limit)]);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get placeholder sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/placeholders/products
// @desc    Get placeholder products
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const { limit = 20, sellerId, category } = req.query;

    let whereClause = 'WHERE pp.is_active = true';
    const values = [];
    let paramCount = 1;

    if (sellerId) {
      whereClause += ` AND pp.placeholder_seller_id = $${paramCount}`;
      values.push(sellerId);
      paramCount++;
    }

    if (category) {
      whereClause += ` AND pp.category = $${paramCount}`;
      values.push(category);
      paramCount++;
    }

    const result = await query(`
      SELECT 
        pp.id, pp.name, pp.description, pp.price, pp.images, 
        pp.category, pp.tags, pp.stats,
        ps.name as seller_name, ps.business_name, ps.avatar_url
      FROM placeholder_products pp
      JOIN placeholder_sellers ps ON pp.placeholder_seller_id = ps.id
      ${whereClause}
      ORDER BY pp.created_at DESC
      LIMIT $${paramCount}
    `, [...values, parseInt(limit)]);

    res.json({
      success: true,
      data: result.rows.map(product => ({
        ...product,
        images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        stats: typeof product.stats === 'string' ? JSON.parse(product.stats) : product.stats
      }))
    });

  } catch (error) {
    console.error('Get placeholder products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/placeholders/process-queue
// @desc    Process replacement queue (automated system)
// @access  Private (admin only)
router.post('/process-queue', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const result = await processReplacementQueue();
    
    res.json({
      success: true,
      message: 'Replacement queue processed successfully',
      data: result
    });

  } catch (error) {
    console.error('Process queue error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during queue processing'
    });
  }
});

// @route   GET /api/placeholders/replacement-analytics
// @desc    Get replacement system analytics
// @access  Private (admin only)
router.get('/replacement-analytics', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;

    // Get replacement statistics
    const stats = await query(`
      SELECT 
        COUNT(*) as total_replacements,
        AVG(priority_score) as avg_priority_score,
        COUNT(DISTINCT real_seller_id) as unique_sellers_replaced
      FROM seller_replacements 
      WHERE replaced_at >= NOW() - INTERVAL '${timeframe}'
    `);

    // Get queue statistics
    const queueStats = await query(`
      SELECT 
        COUNT(*) as total_in_queue,
        AVG(priority_score) as avg_queue_priority,
        MIN(created_at) as oldest_in_queue
      FROM replacement_queue 
      WHERE status = 'pending'
    `);

    // Get category distribution
    const categoryDist = await query(`
      SELECT 
        ps.category,
        COUNT(*) as placeholder_count,
        COUNT(sr.id) as replaced_count
      FROM placeholder_sellers ps
      LEFT JOIN seller_replacements sr ON ps.id = sr.placeholder_seller_id
      GROUP BY ps.category
      ORDER BY placeholder_count DESC
    `);

    res.json({
      success: true,
      data: {
        replacementStats: stats.rows[0],
        queueStats: queueStats.rows[0],
        categoryDistribution: categoryDist.rows
      }
    });

  } catch (error) {
    console.error('Get replacement analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Replacement queue processing function
async function processReplacementQueue() {
  try {
    // Get pending sellers in queue ordered by priority
    const queuedSellers = await query(`
      SELECT rq.*, sp.verification_status
      FROM replacement_queue rq
      JOIN seller_profiles sp ON rq.seller_id = sp.user_id
      WHERE rq.status = 'pending' AND sp.verification_status = 'verified'
      ORDER BY rq.priority_score DESC, rq.created_at ASC
      LIMIT 10
    `);

    const results = [];

    for (const queuedSeller of queuedSellers.rows) {
      try {
        // Find suitable placeholder to replace
        const placeholder = await findPlaceholderForReplacement(queuedSeller.seller_id);
        
        if (placeholder) {
          await executeReplacement(placeholder.id, queuedSeller.seller_id);
          results.push({
            sellerId: queuedSeller.seller_id,
            placeholderId: placeholder.id,
            status: 'replaced'
          });
        } else {
          results.push({
            sellerId: queuedSeller.seller_id,
            status: 'no_placeholder_available'
          });
        }
      } catch (error) {
        console.error(`Error processing seller ${queuedSeller.seller_id}:`, error);
        results.push({
          sellerId: queuedSeller.seller_id,
          status: 'error',
          error: error.message
        });
      }
    }

    return results;
  } catch (error) {
    console.error('Process replacement queue error:', error);
    throw error;
  }
}

// Find suitable placeholder for replacement
async function findPlaceholderForReplacement(sellerId) {
  try {
    // Get seller's category preferences
    const sellerInfo = await query(`
      SELECT sp.specializations
      FROM seller_profiles sp
      WHERE sp.user_id = $1
    `, [sellerId]);

    if (sellerInfo.rows.length === 0) return null;

    const specializations = sellerInfo.rows[0].specializations || [];

    // Try to find placeholder in same category first
    if (specializations.length > 0) {
      const categoryMatch = await query(`
        SELECT ps.* 
        FROM placeholder_sellers ps
        LEFT JOIN seller_replacements sr ON ps.id = sr.placeholder_seller_id
        WHERE ps.is_active = true 
          AND sr.id IS NULL 
          AND ps.category = ANY($1)
        ORDER BY ps.replacement_priority ASC, ps.created_at ASC
        LIMIT 1
      `, [specializations]);

      if (categoryMatch.rows.length > 0) {
        return categoryMatch.rows[0];
      }
    }

    // If no category match, get oldest placeholder
    const oldestPlaceholder = await query(`
      SELECT ps.* 
      FROM placeholder_sellers ps
      LEFT JOIN seller_replacements sr ON ps.id = sr.placeholder_seller_id
      WHERE ps.is_active = true AND sr.id IS NULL
      ORDER BY ps.replacement_priority ASC, ps.created_at ASC
      LIMIT 1
    `);

    return oldestPlaceholder.rows.length > 0 ? oldestPlaceholder.rows[0] : null;
  } catch (error) {
    console.error('Find placeholder error:', error);
    return null;
  }
}

// Execute the replacement
async function executeReplacement(placeholderId, sellerId) {
  try {
    // Start transaction
    await query('BEGIN');

    // Archive placeholder
    await query(`
      UPDATE placeholder_sellers 
      SET is_active = false 
      WHERE id = $1
    `, [placeholderId]);

    // Record replacement
    await query(`
      INSERT INTO seller_replacements (placeholder_seller_id, real_seller_id, replacement_type, admin_approved)
      VALUES ($1, $2, 'automatic', true)
    `, [placeholderId, sellerId]);

    // Update queue status
    await query(`
      UPDATE replacement_queue 
      SET status = 'completed', processed_at = CURRENT_TIMESTAMP
      WHERE seller_id = $1
    `, [sellerId]);

    // Commit transaction
    await query('COMMIT');

    console.log(`✅ Replacement completed: Placeholder ${placeholderId} replaced with seller ${sellerId}`);
  } catch (error) {
    // Rollback on error
    await query('ROLLBACK');
    throw error;
  }
}

// @route   GET /api/placeholders
// @desc    Get current placeholder values
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (MOCK_MODE) {
      // Mock implementation for development
      const mockPlaceholders = {
        businessName: process.env.DEFAULT_BUSINESS_NAME || 'Your Business Name',
        businessDescription: process.env.DEFAULT_BUSINESS_DESCRIPTION || 'Your business description will appear here',
        contactEmail: process.env.DEFAULT_CONTACT_EMAIL || 'contact@yourbusiness.com',
        contactPhone: process.env.DEFAULT_CONTACT_PHONE || '+1-555-0123',
        businessAddress: process.env.DEFAULT_BUSINESS_ADDRESS || '123 Business St, City, State 12345'
      };

      return res.json({
        success: true,
        data: {
          placeholders: mockPlaceholders
        }
      });
    }

    // Database implementation would go here
    res.json({
      success: true,
      data: {
        placeholders: {}
      }
    });

  } catch (error) {
    console.error('Get placeholders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/placeholders
// @desc    Update placeholder values
// @access  Private
router.put('/', authenticateToken, async (req, res) => {
  try {
    const placeholderData = req.body;

    if (MOCK_MODE) {
      // Mock implementation for development
      return res.json({
        success: true,
        message: 'Placeholders updated successfully',
        data: {
          placeholders: placeholderData
        }
      });
    }

    // Database implementation would go here
    res.json({
      success: true,
      message: 'Placeholders updated successfully',
      data: {
        placeholders: placeholderData
      }
    });

  } catch (error) {
    console.error('Update placeholders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/placeholders/reset
// @desc    Reset placeholders to defaults
// @access  Private
router.post('/reset', authenticateToken, async (req, res) => {
  try {
    if (MOCK_MODE) {
      // Mock implementation for development
      const defaultPlaceholders = {
        businessName: process.env.DEFAULT_BUSINESS_NAME || 'Your Business Name',
        businessDescription: process.env.DEFAULT_BUSINESS_DESCRIPTION || 'Your business description will appear here',
        contactEmail: process.env.DEFAULT_CONTACT_EMAIL || 'contact@yourbusiness.com',
        contactPhone: process.env.DEFAULT_CONTACT_PHONE || '+1-555-0123',
        businessAddress: process.env.DEFAULT_BUSINESS_ADDRESS || '123 Business St, City, State 12345'
      };

      return res.json({
        success: true,
        message: 'Placeholders reset to defaults',
        data: {
          placeholders: defaultPlaceholders
        }
      });
    }

    // Database implementation would go here
    res.json({
      success: true,
      message: 'Placeholders reset to defaults',
      data: {
        placeholders: {}
      }
    });

  } catch (error) {
    console.error('Reset placeholders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
