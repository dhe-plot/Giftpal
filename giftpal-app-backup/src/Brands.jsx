import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlowCard } from "./components/ui/spotlight-card";
import { Users, Star, Heart } from "lucide-react";

const brands = [
  {
    id: 1,
    name: 'Giftify',
    logo: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=80&q=80',
    desc: 'Premium curated gifts for every occasion.',
    category: 'Luxury',
    location: 'New York, USA',
    founded: '2019',
    totalProducts: 150,
    followers: 12500,
    verified: true,
    products: [
      {
        id: 1,
        name: 'Luxury Spa Set',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80',
        price: '$89.99',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Premium Jewelry Box',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
        price: '$129.99',
        rating: 4.9
      },
      {
        id: 3,
        name: 'Artisan Leather Wallet',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80',
        price: '$59.99',
        rating: 4.7
      }
    ],
    rating: 4.8,
    reviews: 1250,
    specialties: ['Luxury Items', 'Personalized Gifts', 'Corporate Gifts'],
    story: 'Founded by a team of gift enthusiasts, Giftify specializes in curating premium gifts that create lasting memories.'
  },
  {
    id: 2,
    name: 'ChocoDelight',
    logo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80',
    desc: 'Delicious chocolate gifts and hampers.',
    category: 'Food & Beverage',
    location: 'Belgium',
    founded: '2015',
    totalProducts: 85,
    followers: 8900,
    verified: true,
    products: [
      {
        id: 4,
        name: 'Artisan Coffee Set',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
        price: '$45.99',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Gourmet Chocolate Box',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80',
        price: '$34.99',
        rating: 4.8
      }
    ],
    rating: 4.6,
    reviews: 890,
    specialties: ['Artisan Chocolates', 'Coffee Gifts', 'Sweet Treats'],
    story: 'Belgian chocolatiers bringing authentic European flavors to gift lovers worldwide.'
  },
  {
    id: 3,
    name: 'TechGenius',
    logo: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=80&q=80',
    desc: 'Latest gadgets and tech gifts.',
    category: 'Technology',
    location: 'Silicon Valley, USA',
    founded: '2020',
    totalProducts: 200,
    followers: 15600,
    verified: true,
    products: [
      {
        id: 6,
        name: 'Smart Fitness Tracker',
        image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=200&q=80',
        price: '$79.99',
        rating: 4.9
      },
      {
        id: 7,
        name: 'Wireless Charging Pad',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80',
        price: '$39.99',
        rating: 4.7
      },
      {
        id: 8,
        name: 'Bluetooth Speaker',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80',
        price: '$89.99',
        rating: 4.8
      }
    ],
    rating: 4.9,
    reviews: 1560,
    specialties: ['Smart Gadgets', 'Tech Accessories', 'Innovation'],
    story: 'Tech enthusiasts creating cutting-edge gadgets that make perfect gifts for the modern world.'
  },
  {
    id: 4,
    name: 'EcoGifts',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=80&q=80',
    desc: 'Sustainable and eco-friendly gift options.',
    category: 'Eco-Friendly',
    location: 'Portland, USA',
    founded: '2018',
    totalProducts: 120,
    followers: 9800,
    verified: true,
    products: [
      {
        id: 9,
        name: 'Bamboo Gift Set',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=200&q=80',
        price: '$29.99',
        rating: 4.5
      }
    ],
    rating: 4.7,
    reviews: 780,
    specialties: ['Sustainable Products', 'Eco-Friendly', 'Zero Waste'],
    story: 'Committed to creating beautiful gifts that don\'t harm our planet.'
  }
];

function BrandCard({ brand, onFollow, isFollowing }) {
  const [showProducts, setShowProducts] = useState(false);

  const getGlowColor = () => {
    if (brand.verified) return 'green';
    if (brand.rating >= 4.5) return 'blue';
    if (brand.followers >= 10000) return 'purple';
    return 'cyan';
  };

  return (
    <GlowCard
      glowColor={getGlowColor()}
      size="lg"
      intensity={brand.verified ? 'high' : 'medium'}
      animation={brand.verified ? 'breathe' : 'none'}
      hoverable={true}
      customSize={true}
      width="100%"
      height="auto"
      className="min-h-[400px]"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
          />
          {brand.verified && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <Star size={12} fill="white" className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-cyan-400 text-xl font-bold">{brand.name}</h3>
            {brand.verified && (
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Star size={14} fill="currentColor" className="text-yellow-400" />
              <span>{brand.rating}</span>
              <span className="text-gray-500">({brand.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{brand.followers.toLocaleString()} followers</span>
            </div>
            <span>📍 {brand.location}</span>
          </div>
        </div>
        <button
          onClick={() => onFollow(brand.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 ${
            isFollowing
              ? 'bg-gray-700 text-white border border-gray-600'
              : 'bg-cyan-400 text-black hover:bg-cyan-300'
          }`}
        >
          <Heart size={16} fill={isFollowing ? 'currentColor' : 'none'} />
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      {/* Brand Info */}
      <p style={{ color: '#b8a89c', marginBottom: '1rem', lineHeight: 1.5 }}>
        {brand.desc}
      </p>

      {/* Brand Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '1rem',
        background: '#0f0f0f',
        borderRadius: '8px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#4ecdc4', fontWeight: 600, fontSize: '1.1rem' }}>{brand.totalProducts}</div>
          <div style={{ color: '#888', fontSize: '0.8rem' }}>Products</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ff6347', fontWeight: 600, fontSize: '1.1rem' }}>{brand.followers.toLocaleString()}</div>
          <div style={{ color: '#888', fontSize: '0.8rem' }}>Followers</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ffd700', fontWeight: 600, fontSize: '1.1rem' }}>{brand.founded}</div>
          <div style={{ color: '#888', fontSize: '0.8rem' }}>Founded</div>
        </div>
      </div>

      {/* Specialties */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
          Specialties:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {brand.specialties.map((specialty, index) => (
            <span key={index} style={{
              background: '#ff6347',
              color: 'white',
              padding: '0.2rem 0.6rem',
              borderRadius: '12px',
              fontSize: '0.7rem'
            }}>
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Products Preview */}
      <div>
        <button
          onClick={() => setShowProducts(!showProducts)}
          style={{
            background: 'transparent',
            color: '#4ecdc4',
            border: '1px solid #4ecdc4',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            width: '100%'
          }}
        >
          {showProducts ? 'Hide Products' : `View Products (${brand.products.length})`}
        </button>

        {showProducts && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
            {brand.products.map((product) => (
              <div key={product.id} style={{
                background: '#0f0f0f',
                borderRadius: '8px',
                padding: '0.8rem',
                textAlign: 'center'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.5rem' }}
                />
                <div style={{ color: '#fff', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                  {product.name}
                </div>
                <div style={{ color: '#4ecdc4', fontSize: '0.9rem', fontWeight: 600 }}>
                  {product.price}
                </div>
                <div style={{ color: '#ffd700', fontSize: '0.7rem' }}>
                  ⭐ {product.rating}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlowCard>
  );
}

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [followedBrands, setFollowedBrands] = useState(new Set());

  const categories = ['All', 'Luxury', 'Food & Beverage', 'Technology', 'Eco-Friendly'];

  const handleFollow = (brandId) => {
    const newFollowed = new Set(followedBrands);
    if (newFollowed.has(brandId)) {
      newFollowed.delete(brandId);
    } else {
      newFollowed.add(brandId);
    }
    setFollowedBrands(newFollowed);
  };

  const filteredBrands = brands
    .filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || brand.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'followers':
          return b.followers - a.followers;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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
          <Link
            to="/seller-dashboard"
            style={{
              background: '#ff6347',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            Become a Seller
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
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
            Trusted Brands
          </h1>
          <p style={{ color: '#b8a89c', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover amazing brands and their unique products. Follow your favorites to stay updated with their latest offerings.
          </p>
        </div>

        {/* Filters */}
        <div style={{
          background: '#1a1a1a',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '1px solid #333'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                Search Brands
              </label>
              <input
                type="text"
                placeholder="Search by brand name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  background: '#0f0f0f',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ color: '#b8a89c', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  background: '#0f0f0f',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '0.9rem'
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
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              >
                <option value="rating">Rating</option>
                <option value="followers">Followers</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem', color: '#b8a89c' }}>
          Showing {filteredBrands.length} of {brands.length} brands
        </div>

        {/* Brands Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {filteredBrands.map(brand => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onFollow={handleFollow}
              isFollowing={followedBrands.has(brand.id)}
            />
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #333'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>No brands found</h3>
            <p style={{ color: '#b8a89c' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}