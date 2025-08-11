import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, notes } = req.body;
    const buyerId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required'
      });
    }

    // Calculate order totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await query(
        'SELECT id, name, price, seller_id, inventory_quantity FROM products WHERE id = $1 AND status = $2',
        [item.productId, 'active']
      );

      if (product.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.productId} not found or unavailable`
        });
      }

      const productData = product.rows[0];
      
      if (productData.inventory_quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for product ${productData.name}`
        });
      }

      const itemTotal = productData.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: productData.id,
        sellerId: productData.seller_id,
        quantity: item.quantity,
        unitPrice: productData.price,
        totalPrice: itemTotal,
        productSnapshot: {
          name: productData.name,
          price: productData.price
        }
      });
    }

    // Group items by seller for separate orders
    const ordersBySeller = {};
    orderItems.forEach(item => {
      if (!ordersBySeller[item.sellerId]) {
        ordersBySeller[item.sellerId] = [];
      }
      ordersBySeller[item.sellerId].push(item);
    });

    const createdOrders = [];

    // Create separate orders for each seller
    for (const [sellerId, sellerItems] of Object.entries(ordersBySeller)) {
      const sellerSubtotal = sellerItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const taxAmount = sellerSubtotal * 0.08; // 8% tax
      const shippingAmount = 10.00; // Flat shipping rate
      const totalAmount = sellerSubtotal + taxAmount + shippingAmount;

      // Generate order number
      const orderNumber = `GP${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

      // Create order
      const orderResult = await query(`
        INSERT INTO orders (
          order_number, buyer_id, seller_id, subtotal, tax_amount, 
          shipping_amount, total_amount, shipping_address, billing_address, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `, [
        orderNumber, buyerId, sellerId, sellerSubtotal, taxAmount,
        shippingAmount, totalAmount, JSON.stringify(shippingAddress),
        JSON.stringify(billingAddress), notes
      ]);

      const order = orderResult.rows[0];

      // Create order items
      for (const item of sellerItems) {
        await query(`
          INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price, product_snapshot)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          order.id, item.productId, item.quantity, item.unitPrice,
          item.totalPrice, JSON.stringify(item.productSnapshot)
        ]);

        // Update product inventory
        await query(
          'UPDATE products SET inventory_quantity = inventory_quantity - $1 WHERE id = $2',
          [item.quantity, item.productId]
        );
      }

      createdOrders.push({
        ...order,
        items: sellerItems
      });
    }

    res.status(201).json({
      success: true,
      message: 'Orders created successfully',
      data: { orders: createdOrders }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during order creation'
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE (o.buyer_id = $1 OR o.seller_id = $1)';
    const values = [userId];
    let paramCount = 2;

    if (status) {
      whereClause += ` AND o.status = $${paramCount}`;
      values.push(status);
      paramCount++;
    }

    const result = await query(`
      SELECT 
        o.*,
        buyer.first_name as buyer_first_name,
        buyer.last_name as buyer_last_name,
        seller.first_name as seller_first_name,
        seller.last_name as seller_last_name,
        sp.business_name
      FROM orders o
      LEFT JOIN users buyer ON o.buyer_id = buyer.id
      LEFT JOIN users seller ON o.seller_id = seller.id
      LEFT JOIN seller_profiles sp ON seller.id = sp.user_id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `, [...values, parseInt(limit), offset]);

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      result.rows.map(async (order) => {
        const items = await query(`
          SELECT oi.*, p.name as product_name, p.images
          FROM order_items oi
          LEFT JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = $1
        `, [order.id]);

        return {
          ...order,
          items: items.rows.map(item => ({
            ...item,
            images: typeof item.images === 'string' ? JSON.parse(item.images) : item.images
          }))
        };
      })
    );

    res.json({
      success: true,
      data: { orders: ordersWithItems }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const result = await query(`
      SELECT 
        o.*,
        buyer.first_name as buyer_first_name,
        buyer.last_name as buyer_last_name,
        buyer.email as buyer_email,
        seller.first_name as seller_first_name,
        seller.last_name as seller_last_name,
        sp.business_name
      FROM orders o
      LEFT JOIN users buyer ON o.buyer_id = buyer.id
      LEFT JOIN users seller ON o.seller_id = seller.id
      LEFT JOIN seller_profiles sp ON seller.id = sp.user_id
      WHERE o.id = $1 AND (o.buyer_id = $2 OR o.seller_id = $2)
    `, [orderId, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const order = result.rows[0];

    // Get order items
    const items = await query(`
      SELECT oi.*, p.name as product_name, p.images
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [orderId]);

    res.json({
      success: true,
      data: {
        ...order,
        shipping_address: typeof order.shipping_address === 'string' 
          ? JSON.parse(order.shipping_address) 
          : order.shipping_address,
        billing_address: typeof order.billing_address === 'string' 
          ? JSON.parse(order.billing_address) 
          : order.billing_address,
        items: items.rows.map(item => ({
          ...item,
          images: typeof item.images === 'string' ? JSON.parse(item.images) : item.images,
          product_snapshot: typeof item.product_snapshot === 'string' 
            ? JSON.parse(item.product_snapshot) 
            : item.product_snapshot
        }))
      }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (sellers only)
// @access  Private
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    const { status, trackingNumber } = req.body;

    const allowedStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    // Check if user is the seller for this order
    const orderCheck = await query(
      'SELECT seller_id FROM orders WHERE id = $1',
      [orderId]
    );

    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (orderCheck.rows[0].seller_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    // Update order status
    const updateFields = ['status = $1', 'updated_at = CURRENT_TIMESTAMP'];
    const values = [status];
    let paramCount = 2;

    if (status === 'shipped' && trackingNumber) {
      updateFields.push(`tracking_number = $${paramCount}`, `shipped_at = CURRENT_TIMESTAMP`);
      values.push(trackingNumber);
      paramCount++;
    }

    if (status === 'delivered') {
      updateFields.push('delivered_at = CURRENT_TIMESTAMP');
    }

    values.push(orderId);

    const result = await query(`
      UPDATE orders 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, values);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
