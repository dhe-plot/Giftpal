import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, connectDB } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  try {
    console.log('🚀 Starting GIFTPAL database setup...');

    // Connect to database
    await connectDB();

    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📋 Creating database schema...');
    await query(schema);

    console.log('✅ Database schema created successfully!');

    // Create default categories
    await createDefaultCategories();

    // Create placeholder data
    await createPlaceholderData();

    // Create admin user
    await createAdminUser();

    console.log('🎉 Database setup completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

async function createDefaultCategories() {
  console.log('📂 Creating default categories...');

  const categories = [
    { name: 'Electronics & Gadgets', slug: 'electronics-gadgets', description: 'Tech gifts and electronic accessories' },
    { name: 'Home & Living', slug: 'home-living', description: 'Home decor and lifestyle products' },
    { name: 'Fashion & Accessories', slug: 'fashion-accessories', description: 'Clothing, jewelry, and fashion items' },
    { name: 'Beauty & Wellness', slug: 'beauty-wellness', description: 'Skincare, makeup, and wellness products' },
    { name: 'Books & Stationery', slug: 'books-stationery', description: 'Books, journals, and writing materials' },
    { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Fitness and outdoor activity gear' },
    { name: 'Food & Beverages', slug: 'food-beverages', description: 'Gourmet foods and specialty drinks' },
    { name: 'Art & Crafts', slug: 'art-crafts', description: 'Handmade and artistic creations' },
    { name: 'Kids & Baby', slug: 'kids-baby', description: 'Toys and products for children' },
    { name: 'Personalized Gifts', slug: 'personalized-gifts', description: 'Custom and personalized items' }
  ];

  for (const category of categories) {
    await query(`
      INSERT INTO categories (name, slug, description, is_active)
      VALUES ($1, $2, $3, true)
      ON CONFLICT (slug) DO NOTHING
    `, [category.name, category.slug, category.description]);
  }

  console.log('✅ Default categories created');
}

async function createPlaceholderData() {
  console.log('🎭 Creating placeholder sellers and products...');

  const placeholderSellers = [
    {
      name: 'Sarah Johnson',
      businessName: 'Artisan Gifts Co.',
      description: 'Curating premium handmade gifts that create lasting memories. Specializing in luxury spa sets, personalized jewelry, and artisan crafts.',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      coverImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      location: 'New York, NY',
      category: 'Art & Crafts',
      specializations: ['Handmade Jewelry', 'Spa Products', 'Custom Gifts'],
      stats: { totalSales: 15420.50, totalOrders: 127, rating: 4.8, reviews: 89 }
    },
    {
      name: 'Michael Chen',
      businessName: 'Tech Treasures',
      description: 'Your go-to destination for innovative tech gifts and gadgets. From smart home devices to unique electronics that make perfect presents.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      coverImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
      location: 'San Francisco, CA',
      category: 'Electronics & Gadgets',
      specializations: ['Smart Devices', 'Gaming Accessories', 'Tech Gadgets'],
      stats: { totalSales: 23150.75, totalOrders: 156, rating: 4.9, reviews: 112 }
    },
    {
      name: 'Emma Rodriguez',
      businessName: 'Cozy Home Essentials',
      description: 'Transform any space into a cozy haven with our carefully selected home decor and lifestyle products. Perfect for housewarming gifts.',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      coverImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      location: 'Austin, TX',
      category: 'Home & Living',
      specializations: ['Home Decor', 'Candles', 'Textiles'],
      stats: { totalSales: 18900.25, totalOrders: 143, rating: 4.7, reviews: 98 }
    }
  ];

  for (const seller of placeholderSellers) {
    const result = await query(`
      INSERT INTO placeholder_sellers (
        name, business_name, description, avatar_url, cover_image_url,
        location, category, specializations, stats, replacement_priority
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      seller.name, seller.businessName, seller.description, seller.avatarUrl,
      seller.coverImageUrl, seller.location, seller.category, seller.specializations,
      JSON.stringify(seller.stats), Math.floor(Math.random() * 100)
    ]);

    const sellerId = result.rows[0].id;

    // Create products for each seller
    const products = getProductsForCategory(seller.category);
    for (const product of products) {
      await query(`
        INSERT INTO placeholder_products (
          placeholder_seller_id, name, description, price, images, category, tags, stats
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        sellerId, product.name, product.description, product.price,
        JSON.stringify(product.images), seller.category, product.tags,
        JSON.stringify(product.stats)
      ]);
    }
  }

  console.log('✅ Placeholder data created');
}

function getProductsForCategory(category) {
  const productsByCategory = {
    'Art & Crafts': [
      {
        name: 'Luxury Spa Gift Set',
        description: 'Premium spa collection with organic bath salts, essential oils, and handmade soaps.',
        price: 89.99,
        images: [{ url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' }],
        tags: ['spa', 'relaxation', 'organic'],
        stats: { sales: 45, rating: 4.8, reviews: 23 }
      },
      {
        name: 'Personalized Jewelry Box',
        description: 'Handcrafted wooden jewelry box with custom engraving options.',
        price: 129.99,
        images: [{ url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' }],
        tags: ['jewelry', 'personalized', 'handmade'],
        stats: { sales: 32, rating: 4.9, reviews: 18 }
      }
    ],
    'Electronics & Gadgets': [
      {
        name: 'Smart Home Starter Kit',
        description: 'Complete smart home package with voice assistant and connected devices.',
        price: 199.99,
        images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' }],
        tags: ['smart home', 'technology', 'automation'],
        stats: { sales: 67, rating: 4.7, reviews: 34 }
      },
      {
        name: 'Wireless Charging Station',
        description: 'Elegant wireless charging pad for multiple devices with LED indicators.',
        price: 79.99,
        images: [{ url: 'https://images.unsplash.com/photo-1609592806955-d0ae3d1e4b9e?auto=format&fit=crop&w=400&q=80' }],
        tags: ['wireless', 'charging', 'tech'],
        stats: { sales: 89, rating: 4.6, reviews: 45 }
      }
    ],
    'Home & Living': [
      {
        name: 'Artisan Candle Collection',
        description: 'Set of three hand-poured soy candles with unique seasonal scents.',
        price: 65.99,
        images: [{ url: 'https://images.unsplash.com/photo-1602874801006-e26c4e7e5b5e?auto=format&fit=crop&w=400&q=80' }],
        tags: ['candles', 'home decor', 'aromatherapy'],
        stats: { sales: 78, rating: 4.8, reviews: 41 }
      },
      {
        name: 'Cozy Throw Blanket Set',
        description: 'Ultra-soft throw blankets perfect for movie nights and home comfort.',
        price: 95.99,
        images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' }],
        tags: ['blankets', 'comfort', 'home'],
        stats: { sales: 56, rating: 4.9, reviews: 29 }
      }
    ]
  };

  return productsByCategory[category] || [];
}

async function createAdminUser() {
  console.log('👤 Creating admin user...');

  const bcrypt = await import('bcryptjs');
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await query(`
    INSERT INTO users (email, password_hash, first_name, last_name, user_type, email_verified, is_active)
    VALUES ($1, $2, $3, $4, $5, true, true)
    ON CONFLICT (email) DO NOTHING
  `, ['admin@giftpal.com', hashedPassword, 'Admin', 'User', 'admin']);

  console.log('✅ Admin user created (email: admin@giftpal.com, password: admin123)');
}

// Run setup
setupDatabase();
