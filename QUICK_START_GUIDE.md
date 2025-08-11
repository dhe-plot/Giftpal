# GIFTPAL Quick Start Guide (No Docker Required)

## 🚀 Running GIFTPAL Locally

You can run GIFTPAL without Docker! Here's how to get started quickly:

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd giftpal-backend

# Install dependencies (if not already done)
npm install

# Start the server
npm start
# OR
node server.js
```

The backend will start on **http://localhost:4000**

### 2. Start the Frontend Application

```bash
# Open a new terminal and navigate to frontend directory
cd giftpal-app

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The frontend will start on **http://localhost:3000**

### 3. Test the Application

Visit these URLs to test different features:

- **Main App**: http://localhost:3000
- **API Health Check**: http://localhost:4000/health
- **Seller Onboarding**: http://localhost:3000/seller-onboarding
- **Profile Page**: http://localhost:3000/profile
- **API Test Suite**: http://localhost:3000/backend-test
- **Seller Flow Test**: http://localhost:3000/seller-flow-test

## 🎯 Key Features Working

### ✅ Instagram-Style Bottom Navigation
- **Home**: Navigate to main feed
- **Search**: Browse gifts and products
- **Camera**: Create stories (Instagram-style)
- **Cart**: Shopping cart with items (click to open)
- **Profile**: User profile (editable with image upload)

### ✅ Seller Registration Flow
1. **Business Information**: Name, description, type
2. **Email Verification**: Mock verification system
3. **Contact Information**: Address and phone
4. **Specializations**: Product categories

### ✅ Responsive Design
- **Desktop**: Left/right sidebars with explore menu
- **Mobile**: Bottom navigation maintained
- **Adaptive**: Automatically adjusts to screen size

### ✅ Profile Management
- **Editable Profiles**: Both buyer and seller profiles
- **Image Upload**: Click camera icon to change profile picture
- **Form Validation**: Real-time validation and error handling
- **Auto-save**: Changes saved to backend

### ✅ Shopping Cart
- **Add/Remove Items**: Full cart functionality
- **Quantity Controls**: Increase/decrease quantities
- **Price Calculation**: Subtotal, tax, shipping
- **Responsive Modal**: Slides in from right

## 🔧 Development Mode Features

The application runs in **mock mode** by default, which means:
- No database required
- Mock authentication (any email/password works)
- Sample data for testing
- All API endpoints return mock responses

## 📱 Mobile Experience

The app is fully responsive:
- **Bottom Navigation**: Instagram-style icons
- **Touch-Friendly**: Large tap targets
- **Swipe Gestures**: Smooth animations
- **Mobile-First**: Optimized for mobile devices

## 🛒 Shopping Experience

### Cart Functionality
- Click the cart icon in bottom navigation
- Add/remove items
- Adjust quantities
- View price breakdown
- Proceed to checkout (mock)

### Profile Features
- Click profile icon to access profile
- Edit personal information
- Upload profile pictures from gallery
- Update business information (for sellers)

## 🎨 UI Features

### Instagram-Style Elements
- **Story Creation**: Camera button opens story modal
- **Bottom Navigation**: Home, Search, Camera, Cart, Profile
- **Smooth Animations**: Framer Motion animations
- **Modern Design**: Dark theme with orange accents

### Responsive Navigation
- **Desktop**: Sidebar navigation with explore menu
- **Mobile**: Bottom navigation bar
- **Adaptive**: Automatically switches based on screen size

## 🔄 Next Steps

1. **Test the seller flow**: Go to `/seller-onboarding`
2. **Try the cart**: Click cart icon and interact with items
3. **Edit your profile**: Click profile icon and edit information
4. **Upload images**: Use camera icon to change profile picture
5. **Test responsiveness**: Resize browser window

## 🚫 Docker Not Required

Docker is completely optional! The application runs perfectly without it:
- **Development**: Use `npm run dev` for both frontend and backend
- **Production**: Use the deployment scripts provided
- **Flexibility**: Choose your preferred deployment method

## 📞 Support

If you encounter any issues:
1. Check that both servers are running
2. Verify ports 3000 and 4000 are available
3. Check browser console for errors
4. Test API endpoints directly

The application is designed to work out-of-the-box with minimal setup!
