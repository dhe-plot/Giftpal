# GIFTPAL Deployment Guide

This guide covers deploying both the GIFTPAL backend and frontend to production environments.

## 🎯 Overview

GIFTPAL consists of two main components:
- **Backend**: Node.js + Express API server (`giftpal-backend/`)
- **Frontend**: React + Vite application (`giftpal-app/`)

## 📋 Prerequisites

### System Requirements
- Node.js 18+ 
- npm or yarn
- Git
- PM2 (for backend process management)
- PostgreSQL (for production database)

### Required Accounts/Services
- Domain name and DNS management
- SSL certificate (Let's Encrypt recommended)
- Database hosting (PostgreSQL)
- File storage (Cloudinary for images)
- Email service (for notifications)
- Payment processing (Stripe)

## 🔧 Backend Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

### 2. Database Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE giftpal_production;
CREATE USER giftpal_prod_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE giftpal_production TO giftpal_prod_user;
\q
```

### 3. Application Deployment

```bash
# Clone repository
git clone https://github.com/your-username/giftpal-backend.git
cd giftpal-backend

# Copy and configure production environment
cp .env.production .env
nano .env  # Update with your production values

# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Environment Configuration

Update `.env.production` with your production values:

```env
# Database
DB_HOST=your-production-db-host
DB_PASSWORD=your-secure-production-password

# JWT Secrets (generate secure random strings)
JWT_SECRET=your-super-secure-jwt-secret
JWT_REFRESH_SECRET=your-super-secure-refresh-secret

# Stripe (use live keys)
STRIPE_SECRET_KEY=sk_live_your-stripe-live-secret-key

# Email
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
```

### 5. SSL and Reverse Proxy (Nginx)

```nginx
# /etc/nginx/sites-available/giftpal-api
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🌐 Frontend Deployment

### Option 1: Static Hosting (Recommended)

#### Netlify Deployment
```bash
cd giftpal-app

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
./deploy.sh production netlify
```

#### Vercel Deployment
```bash
cd giftpal-app

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
./deploy.sh production vercel
```

### Option 2: Traditional Server

```bash
# On your server
sudo mkdir -p /var/www/giftpal
sudo chown $USER:$USER /var/www/giftpal

# Deploy
./deploy.sh production server your-server.com deploy /var/www/giftpal
```

### Frontend Environment Configuration

Update `.env.production`:

```env
# API URL (your backend domain)
VITE_API_BASE_URL=https://api.yourdomain.com/api

# Stripe (use live publishable key)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-live-publishable-key

# Disable debug mode
VITE_DEBUG_MODE=false
VITE_SHOW_API_LOGS=false
```

## 🔒 Security Checklist

### Backend Security
- [ ] Use strong JWT secrets
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable database SSL
- [ ] Set up firewall rules
- [ ] Regular security updates

### Frontend Security
- [ ] Use HTTPS only
- [ ] Configure CSP headers
- [ ] Sanitize user inputs
- [ ] Use secure cookies
- [ ] Implement proper authentication
- [ ] Regular dependency updates

## 📊 Monitoring and Maintenance

### Backend Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs giftpal-api

# Restart application
pm2 restart giftpal-api

# Check status
pm2 status
```

### Health Checks
- Backend: `https://api.yourdomain.com/health`
- Frontend: Check main page loads correctly

### Log Management
```bash
# Rotate logs
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 🚀 Deployment Commands Quick Reference

### Backend
```bash
# Development
npm run dev

# Production deployment
./deploy.sh

# Check status
pm2 status
pm2 logs giftpal-api
```

### Frontend
```bash
# Build for production
npm run build

# Deploy to Netlify
./deploy.sh production netlify

# Deploy to Vercel
./deploy.sh production vercel

# Deploy to server
./deploy.sh production server <server> <user> <path>
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials
   - Verify database server is running
   - Check firewall rules

2. **CORS Errors**
   - Update FRONTEND_URL in backend .env
   - Check CORS configuration

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

4. **PM2 Process Not Starting**
   - Check application logs
   - Verify file permissions
   - Check port availability

### Useful Commands
```bash
# Backend debugging
pm2 logs giftpal-api --lines 100
pm2 restart giftpal-api
pm2 delete giftpal-api

# Frontend debugging
npm run build -- --debug
npm run preview

# System monitoring
htop
df -h
free -m
```

## 📞 Support

For deployment issues:
1. Check the logs first
2. Verify environment configuration
3. Test locally before deploying
4. Check firewall and DNS settings

## 🔄 Updates and Maintenance

### Regular Updates
1. Update dependencies monthly
2. Monitor security advisories
3. Backup database regularly
4. Test updates in staging first
5. Monitor application performance

### Backup Strategy
- Database: Daily automated backups
- Application files: Version control
- Environment configs: Secure storage
- SSL certificates: Renewal monitoring

## 🐳 Docker Deployment (Alternative)

For containerized deployment, use the provided Docker configurations:

### Backend Docker
```bash
cd giftpal-backend
docker build -t giftpal-backend .
docker run -p 4000:4000 --env-file .env.production giftpal-backend
```

### Frontend Docker
```bash
cd giftpal-app
docker build -t giftpal-frontend .
docker run -p 3000:3000 giftpal-frontend
```

### Docker Compose
```bash
# Run entire stack
docker-compose -f docker-compose.prod.yml up -d
```
