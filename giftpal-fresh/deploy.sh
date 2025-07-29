#!/bin/bash

# GIFTPAL Frontend Deployment Script
# This script builds and deploys the GIFTPAL frontend

set -e  # Exit on any error

echo "🎁 Starting GIFTPAL Frontend Deployment..."

# Configuration
APP_NAME="giftpal-frontend"
NODE_VERSION="18"
BUILD_DIR="dist"
DEPLOY_DIR="/var/www/giftpal"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
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

# Function to deploy to different environments
deploy_to_environment() {
    local env=$1
    local env_file=".env.${env}"
    
    print_step "Deploying to $env environment..."
    
    # Copy environment file
    if [ -f "$env_file" ]; then
        print_status "Using environment file: $env_file"
        cp "$env_file" .env
    else
        print_warning "Environment file $env_file not found. Using default .env"
    fi
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm ci
    
    # Run linting
    print_status "Running linter..."
    npm run lint || print_warning "Linting failed, continuing with deployment"
    
    # Build the application
    print_status "Building application for $env..."
    npm run build
    
    # Check if build was successful
    if [ ! -d "$BUILD_DIR" ]; then
        print_error "Build failed - $BUILD_DIR directory not found"
        exit 1
    fi
    
    print_status "Build completed successfully"
    
    # Show build size
    if command -v du &> /dev/null; then
        BUILD_SIZE=$(du -sh $BUILD_DIR | cut -f1)
        print_status "Build size: $BUILD_SIZE"
    fi
    
    return 0
}

# Function to deploy to static hosting (Netlify, Vercel, etc.)
deploy_static() {
    local platform=$1
    
    case $platform in
        "netlify")
            if command -v netlify &> /dev/null; then
                print_status "Deploying to Netlify..."
                netlify deploy --prod --dir=$BUILD_DIR
            else
                print_error "Netlify CLI not installed. Install with: npm install -g netlify-cli"
                exit 1
            fi
            ;;
        "vercel")
            if command -v vercel &> /dev/null; then
                print_status "Deploying to Vercel..."
                vercel --prod
            else
                print_error "Vercel CLI not installed. Install with: npm install -g vercel"
                exit 1
            fi
            ;;
        "surge")
            if command -v surge &> /dev/null; then
                print_status "Deploying to Surge..."
                surge $BUILD_DIR
            else
                print_error "Surge CLI not installed. Install with: npm install -g surge"
                exit 1
            fi
            ;;
        *)
            print_error "Unknown platform: $platform"
            print_status "Supported platforms: netlify, vercel, surge"
            exit 1
            ;;
    esac
}

# Function to deploy to traditional server
deploy_server() {
    local server=$1
    local user=$2
    local path=$3
    
    print_status "Deploying to server: $server"
    
    # Create deployment archive
    print_status "Creating deployment archive..."
    tar -czf giftpal-frontend.tar.gz -C $BUILD_DIR .
    
    # Upload to server
    print_status "Uploading to server..."
    scp giftpal-frontend.tar.gz $user@$server:/tmp/
    
    # Extract on server
    print_status "Extracting on server..."
    ssh $user@$server "
        sudo mkdir -p $path &&
        sudo tar -xzf /tmp/giftpal-frontend.tar.gz -C $path &&
        sudo chown -R www-data:www-data $path &&
        sudo chmod -R 755 $path &&
        rm /tmp/giftpal-frontend.tar.gz
    "
    
    # Clean up local archive
    rm giftpal-frontend.tar.gz
    
    print_status "Server deployment completed"
}

# Main deployment logic
case "${1:-production}" in
    "development"|"dev")
        deploy_to_environment "development"
        print_status "Development build completed. Serve with: npm run preview"
        ;;
    "staging")
        deploy_to_environment "staging"
        if [ -n "$2" ]; then
            deploy_static "$2"
        else
            print_status "Staging build completed. Deploy manually or specify platform."
        fi
        ;;
    "production"|"prod")
        deploy_to_environment "production"
        if [ -n "$2" ]; then
            case "$2" in
                "netlify"|"vercel"|"surge")
                    deploy_static "$2"
                    ;;
                "server")
                    if [ -n "$3" ] && [ -n "$4" ] && [ -n "$5" ]; then
                        deploy_server "$3" "$4" "$5"
                    else
                        print_error "Server deployment requires: server user path"
                        print_status "Usage: ./deploy.sh production server <server> <user> <path>"
                        exit 1
                    fi
                    ;;
                *)
                    print_error "Unknown deployment target: $2"
                    exit 1
                    ;;
            esac
        else
            print_status "Production build completed."
            print_status "Deploy manually or specify platform:"
            print_status "  ./deploy.sh production netlify"
            print_status "  ./deploy.sh production vercel"
            print_status "  ./deploy.sh production server <server> <user> <path>"
        fi
        ;;
    "help"|"-h"|"--help")
        echo "GIFTPAL Frontend Deployment Script"
        echo ""
        echo "Usage:"
        echo "  ./deploy.sh [environment] [platform] [options]"
        echo ""
        echo "Environments:"
        echo "  development, dev    - Build for development"
        echo "  staging            - Build for staging"
        echo "  production, prod   - Build for production (default)"
        echo ""
        echo "Platforms:"
        echo "  netlify            - Deploy to Netlify"
        echo "  vercel             - Deploy to Vercel"
        echo "  surge              - Deploy to Surge"
        echo "  server             - Deploy to traditional server"
        echo ""
        echo "Examples:"
        echo "  ./deploy.sh production netlify"
        echo "  ./deploy.sh staging vercel"
        echo "  ./deploy.sh production server myserver.com deploy /var/www/giftpal"
        echo ""
        exit 0
        ;;
    *)
        print_error "Unknown environment: $1"
        print_status "Use './deploy.sh help' for usage information"
        exit 1
        ;;
esac

print_status "🎉 GIFTPAL Frontend deployment completed successfully!"

# Show next steps
echo ""
echo "🔗 Next steps:"
echo "  1. Test your deployment"
echo "  2. Update DNS if needed"
echo "  3. Configure SSL certificate"
echo "  4. Set up monitoring"
echo ""
