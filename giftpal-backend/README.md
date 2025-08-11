# 🎁 GIFTPAL Backend API

The complete backend infrastructure for GIFTPAL marketplace platform with automated placeholder replacement system.

## 🚀 Features

- **User Authentication**: JWT-based auth with refresh tokens
- **Seller Management**: Registration, verification, and onboarding
- **Product Catalog**: Full CRUD operations with image uploads
- **Order Processing**: Multi-seller order management
- **Automated Placeholder System**: Smart replacement of demo content
- **Admin Dashboard**: Platform management and analytics
- **File Uploads**: Cloudinary integration for images
- **Payment Processing**: Stripe integration ready
- **Security**: Rate limiting, input validation, SQL injection protection

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **File Storage**: Cloudinary
- **Payments**: Stripe
- **Validation**: Joi + express-validator
- **Security**: Helmet, CORS, Rate limiting

## 📋 Prerequisites

Before running the backend, ensure you have:

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- Cloudinary account (for image uploads)
- Stripe account (for payments)

## 🔧 Installation

### 1. Clone and Install Dependencies

```bash
cd giftpal-backend
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE giftpal_db;
CREATE USER giftpal_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE giftpal_db TO giftpal_user;
```

### 3. Environment Configuration

Copy the environment template:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://giftpal_user:your_secure_password@localhost:5432/giftpal_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=giftpal_db
DB_USER=giftpal_user
DB_PASSWORD=your_secure_password

# JWT Secrets (generate secure random strings)
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here

# Cloudinary (get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe (get from stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Email (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Database Migration

Run the setup script to create tables and seed data:

```bash
npm run db:migrate
```

This will:
- Create all database tables
- Insert default categories
- Create placeholder sellers and products
- Create admin user (admin@giftpal.com / admin123)

## 🚀 Running the Server

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:4000` with auto-reload.

### Production Mode

```bash
npm start
```

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register     - Register new user
POST /api/auth/login        - User login
POST /api/auth/refresh      - Refresh access token
GET  /api/auth/me          - Get current user profile
PUT  /api/auth/profile     - Update user profile
POST /api/auth/logout      - Logout user
```

### Seller Endpoints

```
POST /api/sellers/register           - Register as seller
GET  /api/sellers/profile           - Get seller profile
PUT  /api/sellers/profile           - Update seller profile
POST /api/sellers/upload-documents  - Upload verification docs
GET  /api/sellers/queue-status      - Check replacement queue status
```

### Product Endpoints

```
GET    /api/products        - Get all products (with filters)
GET    /api/products/:id    - Get single product
POST   /api/products        - Create new product (sellers only)
PUT    /api/products/:id    - Update product (owner only)
DELETE /api/products/:id    - Delete product (owner only)
```

### Order Endpoints

```
POST /api/orders           - Create new order
GET  /api/orders          - Get user's orders
GET  /api/orders/:id      - Get single order
PUT  /api/orders/:id/status - Update order status (sellers only)
```

### Placeholder System

```
GET  /api/placeholders/sellers              - Get placeholder sellers
GET  /api/placeholders/products             - Get placeholder products
POST /api/placeholders/process-queue        - Process replacement queue (admin)
GET  /api/placeholders/replacement-analytics - Get replacement analytics (admin)
```

### Admin Endpoints

```
GET  /api/admin/dashboard              - Admin dashboard stats
GET  /api/admin/sellers/pending        - Pending seller verifications
PUT  /api/admin/sellers/:id/verify     - Verify/reject seller
GET  /api/admin/replacement-queue      - View replacement queue
POST /api/admin/manual-replacement     - Manual placeholder replacement
GET  /api/admin/analytics             - Platform analytics
```

## 🔄 Automated Placeholder Replacement

The system automatically replaces placeholder content with real sellers:

### How It Works

1. **Seller Registration**: New sellers enter the replacement queue
2. **Priority Scoring**: Sellers get scored based on:
   - Business verification status (30 points)
   - Profile completeness (20 points)
   - Product count and quality (25 points)
   - Geographic diversity (15 points)
   - Category balance (10 points)

3. **Smart Replacement**: System finds best placeholder match:
   - Same category preference
   - Oldest placeholder fallback
   - Quality control checks

4. **Gradual Transition**: Replaces 1-2 placeholders per verified seller

### Manual Control

Admins can:
- View replacement queue and priorities
- Manually trigger specific replacements
- Adjust replacement criteria
- Monitor replacement analytics

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Rate Limiting** (100 requests per 15 minutes)
- **Input Validation** on all endpoints
- **SQL Injection Protection** with parameterized queries
- **File Upload Security** with type and size restrictions
- **CORS Configuration** for frontend domains
- **Helmet.js** for security headers

## 📊 Database Schema

Key tables:
- `users` - User accounts (buyers, sellers, admins)
- `seller_profiles` - Seller business information
- `products` - Product catalog
- `orders` & `order_items` - Order management
- `placeholder_sellers` & `placeholder_products` - Demo content
- `replacement_queue` - Automated replacement system
- `seller_replacements` - Replacement history

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CLOUDINARY_*` | Image upload credentials | Yes |
| `STRIPE_*` | Payment processing keys | Yes |
| `SMTP_*` | Email service configuration | No |

## 🚀 Deployment

### Using PM2 (Recommended)

```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### Using Docker

```bash
docker build -t giftpal-backend .
docker run -p 4000:4000 giftpal-backend
```

## 📈 Monitoring

The API includes:
- Health check endpoint: `GET /health`
- Request logging with Morgan
- Error tracking and reporting
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

**GIFTPAL Backend** - Powering the future of gift marketplace platforms 🎁
