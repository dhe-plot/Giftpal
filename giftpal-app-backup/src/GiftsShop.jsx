import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlowCard } from "./components/ui/spotlight-card";
import { Heart, ShoppingCart, Star, Eye, Package } from "lucide-react";

const giftProducts = [
  {
    id: 1,
    name: 'Luxury Spa Set',
    desc: 'Indulge in relaxation with our premium spa collection',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 49.99,
    originalPrice: 69.99,
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
    price: 29.99,
    originalPrice: 39.99,
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
    price: 89.99,
    originalPrice: 129.99,
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
    price: 39.99,
    originalPrice: 59.99,
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
    price: 24.99,
    originalPrice: 34.99,
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
    price: 59.99,
    originalPrice: 79.99,
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
    price: 34.99,
    originalPrice: 49.99,
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
    price: 44.99,
    originalPrice: 59.99,
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
    price: 19.99,
    originalPrice: 29.99,
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
    price: 79.99,
    originalPrice: 99.99,
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
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{ color: '#6b7280', textDecoration: 'line-through', fontSize: '14px' }}>
              ${product.originalPrice}
            </span>
          )}
          {product.discount && (
            <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 500 }}>
              Save ${(product.originalPrice - product.price).toFixed(2)}
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

  const filteredAndSortedProducts = products
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
    <div style={{ background: '#181312', minHeight: '100vh', color: 'white' }}>
      {/* Navigation */}
      <nav style={{
        background: '#181111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Home
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ color: '#b8a89c' }}>🛒 Cart ({cart.length})</span>
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#ff6347',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem'
              }}>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
          <span style={{ color: '#b8a89c' }}>❤️ Wishlist ({wishlist.size})</span>
          <span style={{ color: '#4ecdc4', fontWeight: 600 }}>
            Total: ${cartTotal.toFixed(2)}
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #4ecdc4, #ff6347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Gifts Shop
          </h1>
          <p style={{ color: '#b8a89c', fontSize: '1.1rem' }}>
            Discover amazing gifts from trusted sellers. Find the perfect gift for any occasion.
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: '#1a1a1a',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #333'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search for gifts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: '#4ecdc4',
              color: '#000',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              marginBottom: showFilters ? '1rem' : '0'
            }}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters */}
          {showFilters && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              <div>
                <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0f0f0f',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: '#0f0f0f',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <option value="distance">Distance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem', color: '#b8a89c' }}>
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {filteredAndSortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isInWishlist={wishlist.has(product.id)}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #333'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>No products found</h3>
            <p style={{ color: '#b8a89c' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            minWidth: '300px',
            zIndex: 1000
          }}>
            <h4 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Cart Summary</h4>
            {cart.slice(0, 3).map(item => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#b8a89c' }}>{item.name} x{item.quantity}</span>
                <span style={{ color: '#4ecdc4' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {cart.length > 3 && (
              <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                +{cart.length - 3} more items
              </div>
            )}
            <hr style={{ border: '1px solid #333', margin: '1rem 0' }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              <span style={{ color: '#fff' }}>Total:</span>
              <span style={{ color: '#4ecdc4' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/payment-success"
              style={{
                display: 'block',
                background: '#4ecdc4',
                color: '#000',
                padding: '0.8rem',
                borderRadius: '6px',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 600,
                marginTop: '1rem'
              }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}