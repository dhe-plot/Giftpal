import express from 'express';
import { body, validationResult, query as expressQuery } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken, requireVerifiedSeller, optionalAuth } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';

const router = express.Router();

// Validation rules
const productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('categoryId').isUUID().withMessage('Valid category ID is required'),
];

// @route   GET /api/products
// @desc    Get all products with filtering and pagination
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      seller,
      search,
      minPrice,
      maxPrice,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      featured
    } = req.query;

    const offset = (page - 1) * limit;
    
    // Build WHERE clause
    const conditions = ['p.status = $1'];
    const values = ['active'];
    let paramCount = 2;

    if (category) {
      conditions.push(`c.slug = $${paramCount}`);
      values.push(category);
      paramCount++;
    }

    if (seller) {
      conditions.push(`sp.business_name ILIKE $${paramCount}`);
      values.push(`%${seller}%`);
      paramCount++;
    }

    if (search) {
      conditions.push(`(p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`);
      values.push(`%${search}%`);
      paramCount++;
    }

    if (minPrice) {
      conditions.push(`p.price >= $${paramCount}`);
      values.push(parseFloat(minPrice));
      paramCount++;
    }

    if (maxPrice) {
      conditions.push(`p.price <= $${paramCount}`);
      values.push(parseFloat(maxPrice));
      paramCount++;
    }

    if (featured === 'true') {
      conditions.push('p.is_featured = true');
    }

    // Validate sort fields
    const allowedSortFields = ['created_at', 'price', 'name', 'average_rating', 'total_sales'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get products
    const productsQuery = `
      SELECT 
        p.id, p.name, p.description, p.short_description, p.price, 
        p.compare_at_price, p.images, p.tags, p.average_rating, 
        p.total_reviews, p.total_sales, p.is_featured, p.created_at,
        c.name as category_name, c.slug as category_slug,
        sp.business_name as seller_name,
        u.first_name as seller_first_name,
        u.last_name as seller_last_name,
        u.avatar_url as seller_avatar
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      LEFT JOIN seller_profiles sp ON u.id = sp.user_id
      ${whereClause}
      ORDER BY p.${sortField} ${order}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    values.push(parseInt(limit), offset);

    const result = await query(productsQuery, values);

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN seller_profiles sp ON p.seller_id = sp.user_id
      ${whereClause}
    `;

    const countResult = await query(countQuery, values.slice(0, -2)); // Remove limit and offset
    const total = parseInt(countResult.rows[0].total);

    res.json({
      success: true,
      data: {
        products: result.rows.map(product => ({
          ...product,
          images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await query(`
      SELECT 
        p.*,
        c.name as category_name, c.slug as category_slug,
        sp.business_name as seller_name, sp.average_rating as seller_rating,
        sp.total_reviews as seller_reviews, sp.verification_status,
        u.first_name as seller_first_name, u.last_name as seller_last_name,
        u.avatar_url as seller_avatar
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      LEFT JOIN seller_profiles sp ON u.id = sp.user_id
      WHERE p.id = $1 AND p.status = 'active'
    `, [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = result.rows[0];

    // Increment view count
    await query('UPDATE products SET view_count = view_count + 1 WHERE id = $1', [productId]);

    // Get related products
    const relatedProducts = await query(`
      SELECT id, name, price, images, average_rating
      FROM products 
      WHERE category_id = $1 AND id != $2 AND status = 'active'
      ORDER BY average_rating DESC, total_sales DESC
      LIMIT 4
    `, [product.category_id, productId]);

    res.json({
      success: true,
      data: {
        ...product,
        images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        dimensions: typeof product.dimensions === 'string' ? JSON.parse(product.dimensions) : product.dimensions,
        relatedProducts: relatedProducts.rows.map(p => ({
          ...p,
          images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images
        }))
      }
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (verified sellers only)
router.post('/', requireVerifiedSeller, uploadProductImages, productValidation, async (req, res) => {
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
      name, description, shortDescription, price, compareAtPrice,
      categoryId, sku, weight, dimensions, tags, inventoryQuantity,
      trackInventory, allowBackorders, requiresShipping, isDigital
    } = req.body;

    const sellerId = req.user.id;

    // Process uploaded images
    const images = req.files ? req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname
    })) : [];

    // Create product
    const result = await query(`
      INSERT INTO products (
        seller_id, category_id, name, description, short_description,
        price, compare_at_price, sku, weight, dimensions, images, tags,
        inventory_quantity, track_inventory, allow_backorders,
        requires_shipping, is_digital, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'active')
      RETURNING *
    `, [
      sellerId, categoryId, name, description, shortDescription,
      price, compareAtPrice, sku, weight, 
      dimensions ? JSON.stringify(dimensions) : null,
      JSON.stringify(images), tags,
      inventoryQuantity, trackInventory, allowBackorders,
      requiresShipping, isDigital
    ]);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        ...result.rows[0],
        images: typeof result.rows[0].images === 'string' 
          ? JSON.parse(result.rows[0].images) 
          : result.rows[0].images
      }
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during product creation'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (product owner only)
router.put('/:id', authenticateToken, uploadProductImages, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    // Check if user owns this product
    const ownerCheck = await query(
      'SELECT seller_id FROM products WHERE id = $1',
      [productId]
    );

    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (ownerCheck.rows[0].seller_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    const updates = req.body;
    
    // Process new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname
      }));
      updates.images = JSON.stringify(newImages);
    }

    // Build dynamic update query
    const allowedFields = [
      'name', 'description', 'short_description', 'price', 'compare_at_price',
      'sku', 'weight', 'dimensions', 'images', 'tags', 'inventory_quantity',
      'track_inventory', 'allow_backorders', 'requires_shipping', 'is_digital', 'status'
    ];

    const updateFields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(
          key === 'dimensions' && typeof updates[key] === 'object' 
            ? JSON.stringify(updates[key]) 
            : updates[key]
        );
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
    values.push(productId);

    const updateQuery = `
      UPDATE products 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(updateQuery, values);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        ...result.rows[0],
        images: typeof result.rows[0].images === 'string' 
          ? JSON.parse(result.rows[0].images) 
          : result.rows[0].images
      }
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (product owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    // Check ownership and delete
    const result = await query(
      'DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING id',
      [productId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or not authorized'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
