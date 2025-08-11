#!/bin/bash

# GIFTPAL Backend Deployment Script
# This script deploys the GIFTPAL backend to production

set -e  # Exit on any error

echo "🎁 Starting GIFTPAL Backend Deployment..."

# Configuration
APP_NAME="giftpal-backend"
NODE_VERSION="18"
PM2_APP_NAME="giftpal-api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js $NODE_VERSION or later."
    exit 1
fi

# Check Node.js version
NODE_CURRENT_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_CURRENT_VERSION" -lt "$NODE_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION or later is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version check passed: $(node -v)"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci --only=production

# Copy production environment file
if [ -f ".env.production" ]; then
    print_status "Copying production environment configuration..."
    cp .env.production .env
else
    print_warning "Production environment file (.env.production) not found. Using existing .env file."
fi

# Create logs directory
print_status "Creating logs directory..."
mkdir -p logs

# Create uploads directory
print_status "Creating uploads directory..."
mkdir -p uploads

# Run database migrations (if applicable)
if [ -f "scripts/migrate.js" ]; then
    print_status "Running database migrations..."
    npm run db:migrate || print_warning "Database migration failed or not configured"
fi

# Build the application (if there's a build step)
if grep -q "build" package.json; then
    print_status "Building application..."
    npm run build
fi

# Stop existing PM2 process
print_status "Stopping existing PM2 process..."
pm2 stop $PM2_APP_NAME || print_warning "No existing PM2 process found"

# Start the application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup || print_warning "PM2 startup setup failed. You may need to run this manually with sudo."

# Show PM2 status
print_status "PM2 Status:"
pm2 status

# Show application logs
print_status "Recent application logs:"
pm2 logs $PM2_APP_NAME --lines 20

print_status "🎉 GIFTPAL Backend deployment completed successfully!"
print_status "Application is running on PM2 process: $PM2_APP_NAME"
print_status "You can monitor logs with: pm2 logs $PM2_APP_NAME"
print_status "You can restart with: pm2 restart $PM2_APP_NAME"
print_status "You can stop with: pm2 stop $PM2_APP_NAME"

echo ""
echo "🔗 Useful commands:"
echo "  pm2 status              - Show all PM2 processes"
echo "  pm2 logs $PM2_APP_NAME  - Show application logs"
echo "  pm2 monit               - Monitor all processes"
echo "  pm2 restart $PM2_APP_NAME - Restart the application"
echo ""
echo "📊 Health check: curl http://localhost:4000/health"
