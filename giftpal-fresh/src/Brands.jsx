import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GlowCard } from "./components/ui/spotlight-card";
import { Users, Star, Heart, ArrowLeft, ChevronRight, Search } from "lucide-react";
import SponsoredAdDisplay from "./components/ads/SponsoredAdDisplay";

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
        price: '₦35,996',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Premium Jewelry Box',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
        price: '₦51,996',
        rating: 4.9
      },
      {
        id: 3,
        name: 'Artisan Leather Wallet',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80',
        price: '₦23,996',
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
        price: '₦18,396',
        rating: 4.6
      },
      {
        id: 5,
        name: 'Gourmet Chocolate Box',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80',
        price: '₦13,996',
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
        price: '₦31,996',
        rating: 4.9
      },
      {
        id: 7,
        name: 'Wireless Charging Pad',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80',
        price: '₦15,996',
        rating: 4.7
      },
      {
        id: 8,
        name: 'Bluetooth Speaker',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=200&q=80',
        price: '₦35,996',
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
        price: '₦11,996',
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">Brands</h1>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Search className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Brands List with Sponsored Ads */}
        <div className="space-y-3">
          {/* Banner Ad at Top */}
          <SponsoredAdDisplay
            placement="banner"
            category="brands"
            maxAds={1}
          />

          {filteredBrands.map((brand, index) => (
            <React.Fragment key={brand.id}>
              <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{brand.name}</h3>
                        {brand.verified && (
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{brand.desc}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">{brand.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">{brand.followers.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Insert sponsored ad after every 5th brand */}
              {(index + 1) % 5 === 0 && (
                <SponsoredAdDisplay
                  placement="feed"
                  category="brands"
                  maxAds={1}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-purple-400 text-lg font-semibold mb-2">No brands found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
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
          <Link to="/gifts" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🎁</div>
            <span className="text-xs">Gifts</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-3 text-purple-500">
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}