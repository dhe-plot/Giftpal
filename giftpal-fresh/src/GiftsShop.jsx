import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./components/ui/spotlight-card";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  Package,
  ArrowLeft,
  Search,
  Grid,
  List,
  SlidersHorizontal,
  TrendingUp,
  Zap,
  Sparkles,
  ChevronDown,
  X
} from "lucide-react";
import SponsoredAdDisplay from "./components/ads/SponsoredAdDisplay";

const giftProducts = [
  {
    id: 1,
    name: 'Luxury Spa Set',
    desc: 'Indulge in relaxation with our premium spa collection',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 19996,
    originalPrice: 27996,
    lat: 40.7128, // New York
    lng: -74.0060,
    category: 'Beauty & Wellness',
    occasion: ['Birthday', 'Anniversary', 'Self-care'],
    recipient: ['Mother', 'Wife', 'Friend'],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    seller: 'Giftify',
    tags: ['luxury', 'spa', 'relaxation'],
    discount: 29
  },
  {
    id: 2,
    name: 'Gourmet Chocolate Box',
    desc: 'A sweet treat for any special occasion',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    price: 11996,
    originalPrice: 15996,
    lat: 41.8781, // Chicago
    lng: -87.6298,
    category: 'Food & Beverage',
    occasion: ['Valentine\'s Day', 'Birthday', 'Thank You'],
    recipient: ['Anyone', 'Colleague', 'Friend'],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    seller: 'ChocoDelight',
    tags: ['chocolate', 'sweet', 'gourmet'],
    discount: 25
  },
  {
    id: 3,
    name: 'Personalized Jewelry',
    desc: 'Custom-made jewelry with a personal touch',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    price: 35996,
    originalPrice: 51996,
    lat: 34.0522, // Los Angeles
    lng: -118.2437,
    category: 'Jewelry & Accessories',
    occasion: ['Anniversary', 'Engagement', 'Birthday'],
    recipient: ['Wife', 'Girlfriend', 'Daughter'],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    seller: 'Giftify',
    tags: ['personalized', 'jewelry', 'custom'],
    discount: 31
  },
  {
    id: 4,
    name: 'Handcrafted Leather Wallet',
    desc: 'A stylish and durable wallet for everyday use',
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    price: 15996,
    originalPrice: 23996,
    lat: 29.7604, // Houston
    lng: -95.3698,
    category: 'Fashion & Accessories',
    occasion: ['Birthday', 'Father\'s Day', 'Graduation'],
    recipient: ['Father', 'Husband', 'Brother'],
    rating: 4.7,
    reviews: 78,
    inStock: true,
    seller: 'CraftMasters',
    tags: ['leather', 'handcrafted', 'wallet'],
    discount: 33
  },
  {
    id: 5,
    name: 'Artisan Coffee Sampler',
    desc: 'A selection of premium coffees from around the world',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: 9996,
    originalPrice: 13996,
    lat: 47.6062, // Seattle
    lng: -122.3321,
    category: 'Food & Beverage',
    occasion: ['Birthday', 'Thank You', 'Housewarming'],
    recipient: ['Coffee Lover', 'Colleague', 'Friend'],
    rating: 4.5,
    reviews: 92,
    inStock: true,
    seller: 'ChocoDelight',
    tags: ['coffee', 'artisan', 'sampler'],
    discount: 29
  },
  {
    id: 6,
    name: 'Cozy Knit Blanket',
    desc: 'A soft and warm blanket perfect for cold nights',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    price: 23996,
    originalPrice: 31996,
    lat: 39.7392, // Denver
    lng: -104.9903,
    category: 'Home & Living',
    occasion: ['Housewarming', 'Birthday', 'Winter'],
    recipient: ['Anyone', 'Family', 'Friend'],
    rating: 4.4,
    reviews: 67,
    inStock: true,
    seller: 'CozyHome',
    tags: ['blanket', 'cozy', 'warm'],
    discount: 25
  },
  {
    id: 7,
    name: 'Tech Gadget Organizer',
    desc: 'Keep your gadgets organized and easily accessible',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    price: 13996,
    originalPrice: 19996,
    lat: 37.7749, // San Francisco
    lng: -122.4194,
    category: 'Technology',
    occasion: ['Birthday', 'Back to School', 'Office'],
    recipient: ['Tech Enthusiast', 'Student', 'Professional'],
    rating: 4.6,
    reviews: 103,
    inStock: true,
    seller: 'TechGenius',
    tags: ['organizer', 'tech', 'gadgets'],
    discount: 30
  },
  {
    id: 8,
    name: 'Gourmet Cheese Selection',
    desc: 'A variety of fine cheeses for the connoisseur',
    img: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    price: 17996,
    originalPrice: 23996,
    lat: 42.3601, // Boston
    lng: -71.0589,
    category: 'Food & Beverage',
    occasion: ['Dinner Party', 'Thank You', 'Holiday'],
    recipient: ['Food Lover', 'Host', 'Family'],
    rating: 4.7,
    reviews: 85,
    inStock: false,
    seller: 'GourmetDelights',
    tags: ['cheese', 'gourmet', 'selection'],
    discount: 25
  },
  {
    id: 9,
    name: 'Scented Candle Set',
    desc: 'Fill your home with delightful aromas',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    price: 7996,
    originalPrice: 11996,
    lat: 25.7617, // Miami
    lng: -80.1918,
    category: 'Home & Living',
    occasion: ['Housewarming', 'Relaxation', 'Gift'],
    recipient: ['Anyone', 'Friend', 'Family'],
    rating: 4.3,
    reviews: 76,
    inStock: true,
    seller: 'AromaBliss',
    tags: ['candles', 'scented', 'relaxation'],
    discount: 33
  },
  {
    id: 10,
    name: 'Fitness Tracker',
    desc: 'Track your health and fitness goals with style',
    img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    price: 31996,
    originalPrice: 39996,
    lat: 33.4484, // Phoenix
    lng: -112.0740,
    category: 'Technology',
    occasion: ['New Year', 'Birthday', 'Fitness Journey'],
    recipient: ['Fitness Enthusiast', 'Health Conscious', 'Anyone'],
    rating: 4.8,
    reviews: 142,
    inStock: true,
    seller: 'TechGenius',
    tags: ['fitness', 'tracker', 'health'],
    discount: 20
  }
];

function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist }) {
  const [showDetails, setShowDetails] = useState(false);

  const getGlowColor = () => {
    if (!product.inStock) return 'red';
    if (product.discount >= 30) return 'orange';
    if (product.rating >= 4.7) return 'green';
    if (product.price <= 30) return 'cyan';
    return 'blue';
  };

  return (
    <GlowCard
      glowColor={getGlowColor()}
      size="md"
      intensity={product.discount >= 20 ? 'high' : 'medium'}
      animation={product.discount >= 30 ? 'pulse' : 'none'}
      hoverable={true}
      disabled={!product.inStock}
      customSize={true}
      width="100%"
      height="auto"
      className=""
      style={{ minHeight: '500px', position: 'relative' }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
        {!product.inStock && (
          <div style={{ background: 'rgba(239, 68, 68, 0.9)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Package size={12} />
            Out of Stock
          </div>
        )}
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          {product.discount && (
            <div style={{ background: 'rgba(249, 115, 22, 0.9)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
              -{product.discount}%
            </div>
          )}
          {product.rating >= 4.7 && (
            <div style={{ background: 'rgba(34, 197, 94, 0.9)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 8px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={10} fill="currentColor" />
              Top Rated
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', marginBottom: '16px' }}>
        <img
          src={product.img}
          alt={product.name}
          style={{ width: '100%', height: '192px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', opacity: 0, transition: 'opacity 0.3s ease' }}
             onMouseEnter={(e) => e.target.style.opacity = 1}
             onMouseLeave={(e) => e.target.style.opacity = 0} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3 style={{ color: '#22d3ee', fontSize: '18px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.name}
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.desc}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
            <Star size={14} fill="currentColor" />
            <span style={{ fontWeight: 500 }}>{product.rating}</span>
          </div>
          <span style={{ color: '#6b7280' }}>({product.reviews})</span>
          <span style={{ color: '#6b7280' }}>•</span>
          <span style={{ color: '#9ca3af', fontSize: '12px' }}>{product.seller}</span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#22d3ee', fontWeight: 700, fontSize: '20px' }}>
            {formatNairaPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span style={{ color: '#6b7280', textDecoration: 'line-through', fontSize: '14px' }}>
              {formatNairaPrice(product.originalPrice)}
            </span>
          )}
          {product.discount && (
            <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 500 }}>
              Save {formatNairaPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} style={{ background: 'rgba(31, 41, 55, 0.5)', color: '#d1d5db', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Distance */}
        {product.distance && (
          <div style={{ color: '#6b7280', fontSize: '12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            📍 {product.distance.toFixed(1)} km away
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid #22d3ee',
              color: '#22d3ee',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(34, 211, 238, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <Eye size={16} />
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                border: 'none',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                background: product.inStock ? '#22d3ee' : '#4b5563',
                color: product.inStock ? '#000' : '#9ca3af'
              }}
              onMouseEnter={(e) => {
                if (product.inStock) {
                  e.target.style.background = '#06b6d4';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (product.inStock) {
                  e.target.style.background = '#22d3ee';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              <ShoppingCart size={16} />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={() => onAddToWishlist(product.id)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ef4444',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                background: isInWishlist ? '#ef4444' : 'transparent',
                color: isInWishlist ? 'white' : '#ef4444'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                if (!isInWishlist) e.target.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                if (!isInWishlist) e.target.style.background = 'transparent';
              }}
            >
              <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Details Panel */}
        {showDetails && (
          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(4px)', borderRadius: '12px', border: '1px solid rgba(55, 65, 81, 0.5)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '14px' }}>Category:</span>
                <span style={{ color: '#d1d5db', marginLeft: '8px', fontSize: '14px' }}>{product.category}</span>
              </div>
              <div>
                <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '14px' }}>Perfect for:</span>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {product.occasion.map((occ, index) => (
                    <span key={index} style={{ background: 'rgba(249, 115, 22, 0.8)', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '12px' }}>
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span style={{ color: '#22d3ee', fontWeight: 600, fontSize: '14px' }}>Great for:</span>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {product.recipient.map((rec, index) => (
                    <span key={index} style={{ background: 'rgba(234, 179, 8, 0.8)', color: 'black', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 500 }}>
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}

// Helper function to format Naira prices
const formatNairaPrice = (price) => {
  return `₦${price.toLocaleString()}`;
};

export default function GiftsShop() {
  const [products, setProducts] = useState(giftProducts);
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState('distance');
  const [filterCategory, setFilterCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = ['All', 'Beauty & Wellness', 'Food & Beverage', 'Jewelry & Accessories', 'Fashion & Accessories', 'Home & Living', 'Technology'];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'All' || product.category === filterCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .map(product => ({
      ...product,
      distance: userLocation && product.lat && product.lng
        ? calculateDistance(userLocation.lat, userLocation.lng, product.lat, product.lng)
        : null
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          if (a.distance !== null && b.distance !== null) {
            return a.distance - b.distance;
          }
          return 0;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.01,
            y: mousePosition.y * 0.01,
          }}
          style={{ left: '20%', top: '10%' }}
        />
      </div>

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50"
      >
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="group p-3 hover:bg-gray-700/50 rounded-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
            >
              <ArrowLeft className="w-6 h-6 text-white group-hover:text-purple-400 group-hover:-translate-x-1 transition-all" />
            </Link>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight"
              >
                Gift Shop
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-sm font-bold"
              >
                Discover amazing gifts for every occasion
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-3 hover:bg-gray-700/50 rounded-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5 text-white" /> : <Grid className="w-5 h-5 text-white" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 hover:bg-gray-700/50 rounded-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
            >
              <Search className="w-5 h-5 text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 hover:bg-gray-700/50 rounded-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                >
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Content */}
      <div className="relative p-4 sm:p-6 pb-24">
        {/* Enhanced Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              placeholder="Search for the perfect gift..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-800/80 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-gray-800 transition-all duration-300 backdrop-blur-sm"
            />
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Enhanced Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2 tracking-tight">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Categories
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white hover:border-purple-500/50 transition-all duration-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                onClick={() => setFilterCategory(category)}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/50 hover:border-purple-500/50'
                }`}
              >
                <span className="relative z-10">{category}</span>
                {filterCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl"
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="distance">Distance</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                      <option value="name">Name</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Price Range</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">₦{priceRange[0].toLocaleString()}</span>
                      <div className="flex-1 h-2 bg-gray-700 rounded-full relative">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${(priceRange[1] / 200) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">₦{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFilterCategory('All');
                        setSearchTerm('');
                        setPriceRange([0, 200]);
                        setSortBy('distance');
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-medium"
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="space-y-6"
        >
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-black text-white tracking-tight">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Gift' : 'Gifts'} Found
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="w-4 h-4" />
              <span className="font-bold">Updated just now</span>
            </div>
          </div>

          {/* Banner Ad at Top */}
          <SponsoredAdDisplay
            placement="banner"
            category={filterCategory.toLowerCase()}
            maxAds={1}
          />

          {/* Enhanced Products Grid */}
          <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="group cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <motion.div
                      className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50"
                      whileHover={{
                        scale: 1.02,
                        rotateY: 2,
                        rotateX: 2,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          {product.discount > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                            >
                              -{product.discount}%
                            </motion.div>
                          )}

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAddToWishlist(product.id)}
                            className="ml-auto p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/70 transition-all"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                          </motion.button>
                        </div>

                        {/* Quick view button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: hoveredProduct === product.id ? 1 : 0, y: hoveredProduct === product.id ? 0 : 20 }}
                          className="absolute bottom-3 left-3 right-3"
                        >
                          <button className="w-full py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl font-medium hover:bg-white transition-all">
                            <Eye className="w-4 h-4 inline mr-2" />
                            Quick View
                          </button>
                        </motion.div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <motion.h3
                          className="font-black text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors tracking-tight"
                          whileHover={{ scale: 1.02 }}
                        >
                          {product.name}
                        </motion.h3>

                        <p className="text-gray-400 text-sm mb-3 line-clamp-2 font-bold">{product.desc}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-bold text-white">{product.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{product.seller}</span>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-purple-400 font-black text-xl">{formatNairaPrice(product.price)}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-gray-500 text-sm line-through">
                                {formatNairaPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(product)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Insert sponsored ad after every 6th product */}
                  {(index + 1) % 6 === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="col-span-full"
                    >
                      <SponsoredAdDisplay
                        placement="feed"
                        category={filterCategory.toLowerCase()}
                        maxAds={1}
                      />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced Empty State */}
        <AnimatePresence>
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-6"
              >
                🎁
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-3"
              >
                No gifts found
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg mb-8"
              >
                Try adjusting your search or filters to discover amazing gifts
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('All');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Clear Filters
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-purple-500/50 text-purple-400 rounded-xl font-medium hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Browse All Categories
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/reminders" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🔔</div>
            <span className="text-xs">Reminders</span>
          </Link>
          <Link to="/gifts" className="flex flex-col items-center p-3 text-purple-500">
            <div className="w-6 h-6 mb-1">🎁</div>
            <span className="text-xs">Gifts</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}