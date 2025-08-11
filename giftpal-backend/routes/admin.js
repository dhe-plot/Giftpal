import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require admin authorization
router.use(authenticateToken);
router.use(authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (admin only)
router.get('/dashboard', async (req, res) => {
  try {
    // Get overall statistics
    const stats = await Promise.all([
      query('SELECT COUNT(*) as total_users FROM users'),
      query('SELECT COUNT(*) as total_sellers FROM seller_profiles'),
      query('SELECT COUNT(*) as verified_sellers FROM seller_profiles WHERE verification_status = $1', ['verified']),
      query('SELECT COUNT(*) as total_products FROM products WHERE status = $1', ['active']),
      query('SELECT COUNT(*) as total_orders FROM orders'),
      query('SELECT SUM(total_amount) as total_revenue FROM orders WHERE status NOT IN ($1, $2)', ['cancelled', 'refunded']),
      query('SELECT COUNT(*) as pending_queue FROM replacement_queue WHERE status = $1', ['pending'])
    ]);

    // Get recent activity
    const recentSellers = await query(`
      SELECT sp.business_name, sp.created_at, sp.verification_status,
             u.first_name, u.last_name
      FROM seller_profiles sp
      JOIN users u ON sp.user_id = u.id
      ORDER BY sp.created_at DESC
      LIMIT 10
    `);

    const recentOrders = await query(`
      SELECT o.order_number, o.total_amount, o.status, o.created_at,
             buyer.first_name as buyer_name, sp.business_name as seller_name
      FROM orders o
      JOIN users buyer ON o.buyer_id = buyer.id
      JOIN seller_profiles sp ON o.seller_id = sp.user_id
      ORDER BY o.created_at DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        statistics: {
          totalUsers: parseInt(stats[0].rows[0].total_users),
          totalSellers: parseInt(stats[1].rows[0].total_sellers),
          verifiedSellers: parseInt(stats[2].rows[0].verified_sellers),
          totalProducts: parseInt(stats[3].rows[0].total_products),
          totalOrders: parseInt(stats[4].rows[0].total_orders),
          totalRevenue: parseFloat(stats[5].rows[0].total_revenue || 0),
          pendingQueue: parseInt(stats[6].rows[0].pending_queue)
        },
        recentActivity: {
          sellers: recentSellers.rows,
          orders: recentOrders.rows
        }
      }
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/admin/sellers/pending
// @desc    Get sellers pending verification
// @access  Private (admin only)
router.get('/sellers/pending', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        sp.*,
        u.first_name, u.last_name, u.email, u.created_at as user_created_at
      FROM seller_profiles sp
      JOIN users u ON sp.user_id = u.id
      WHERE sp.verification_status = 'pending'
      ORDER BY sp.created_at ASC
    `);

    res.json({
      success: true,
      data: result.rows.map(seller => ({
        ...seller,
        business_address: typeof seller.business_address === 'string' 
          ? JSON.parse(seller.business_address) 
          : seller.business_address,
        verification_documents: typeof seller.verification_documents === 'string' 
          ? JSON.parse(seller.verification_documents) 
          : seller.verification_documents
      }))
    });

  } catch (error) {
    console.error('Get pending sellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/admin/sellers/:id/verify
// @desc    Verify or reject seller
// @access  Private (admin only)
router.put('/sellers/:id/verify', async (req, res) => {
  try {
    const sellerId = req.params.id;
    const { status, notes } = req.body; // status: 'verified' or 'rejected'

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification status'
      });
    }

    const result = await query(`
      UPDATE seller_profiles 
      SET verification_status = $1, approved_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [status, sellerId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Seller not found'
      });
    }

    // If verified, add to replacement queue
    if (status === 'verified') {
      const seller = result.rows[0];
      await addToReplacementQueue(seller.user_id);
    }

    res.json({
      success: true,
      message: `Seller ${status} successfully`,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Verify seller error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/admin/replacement-queue
// @desc    Get replacement queue status
// @access  Private (admin only)
router.get('/replacement-queue', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        rq.*,
        sp.business_name, sp.verification_status,
        u.first_name, u.last_name, u.email
      FROM replacement_queue rq
      JOIN seller_profiles sp ON rq.seller_id = sp.user_id
      JOIN users u ON rq.seller_id = u.id
      WHERE rq.status = 'pending'
      ORDER BY rq.priority_score DESC, rq.created_at ASC
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get replacement queue error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/admin/manual-replacement
// @desc    Manually trigger placeholder replacement
// @access  Private (admin only)
router.post('/manual-replacement', async (req, res) => {
  try {
    const { sellerId, placeholderId } = req.body;

    if (!sellerId || !placeholderId) {
      return res.status(400).json({
        success: false,
        message: 'Seller ID and Placeholder ID are required'
      });
    }

    // Execute manual replacement
    await executeManualReplacement(placeholderId, sellerId);

    res.json({
      success: true,
      message: 'Manual replacement executed successfully'
    });

  } catch (error) {
    console.error('Manual replacement error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during manual replacement'
    });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed platform analytics
// @access  Private (admin only)
router.get('/analytics', async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;

    // Revenue analytics
    const revenueData = await query(`
      SELECT 
        DATE_TRUNC('day', created_at) as date,
        SUM(total_amount) as revenue,
        COUNT(*) as orders
      FROM orders 
      WHERE created_at >= NOW() - INTERVAL '${timeframe}'
        AND status NOT IN ('cancelled', 'refunded')
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date
    `);

    // Seller growth
    const sellerGrowth = await query(`
      SELECT 
        DATE_TRUNC('day', created_at) as date,
        COUNT(*) as new_sellers
      FROM seller_profiles 
      WHERE created_at >= NOW() - INTERVAL '${timeframe}'
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date
    `);

    // Product categories
    const categoryStats = await query(`
      SELECT 
        c.name as category,
        COUNT(p.id) as product_count,
        AVG(p.price) as avg_price
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
      GROUP BY c.id, c.name
      ORDER BY product_count DESC
    `);

    res.json({
      success: true,
      data: {
        revenue: revenueData.rows,
        sellerGrowth: sellerGrowth.rows,
        categories: categoryStats.rows
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Helper function to add seller to replacement queue
async function addToReplacementQueue(sellerId) {
  try {
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

// Helper function for manual replacement
async function executeManualReplacement(placeholderId, sellerId) {
  try {
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
      VALUES ($1, $2, 'manual', true)
    `, [placeholderId, sellerId]);

    // Update queue status
    await query(`
      UPDATE replacement_queue 
      SET status = 'completed', processed_at = CURRENT_TIMESTAMP
      WHERE seller_id = $1
    `, [sellerId]);

    await query('COMMIT');
  } catch (error) {
    await query('ROLLBACK');
    throw error;
  }
}

export default router;
