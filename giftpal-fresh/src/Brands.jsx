import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Star,
  ArrowLeft,
  ChevronRight,
  Search,
  Package
} from 'lucide-react'
import { Link } from 'react-router-dom'

const brands = [
  {
    id: 1,
    name: 'Giftify',
    icon: '🎁',
    description: 'Premium curated gifts for every occasion',
    followers: 12500,
    rating: 4.8,
    categories: ['Luxury', 'Premium', 'Curated', 'Occasions']
  },
  {
    id: 2,
    name: 'TechGifts',
    icon: '📱',
    description: 'Latest technology and gadget gifts',
    followers: 8900,
    rating: 4.7,
    categories: ['Technology', 'Gadgets', 'Electronics', 'Innovation']
  },
  {
    id: 3,
    name: 'HomeStyle',
    icon: '🏠',
    description: 'Beautiful home decor and lifestyle gifts',
    followers: 15200,
    rating: 4.9,
    categories: ['Home', 'Decor', 'Lifestyle', 'Interior']
  },
  {
    id: 4,
    name: 'FashionForward',
    icon: '👗',
    description: 'Trendy fashion and accessory gifts',
    followers: 11800,
    rating: 4.6,
    categories: ['Fashion', 'Accessories', 'Style', 'Trendy']
  },
  {
    id: 5,
    name: 'EcoFriendly',
    icon: '🌱',
    description: 'Sustainable and eco-conscious gifts',
    followers: 9600,
    rating: 4.8,
    categories: ['Eco-Friendly', 'Sustainable', 'Green', 'Natural']
  },
  {
    id: 6,
    name: 'KidsJoy',
    icon: '🧸',
    description: 'Fun and educational gifts for children',
    followers: 13400,
    rating: 4.9,
    categories: ['Kids', 'Educational', 'Fun', 'Toys']
  }
]

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All Brands')

  const filters = ['All Brands (6)', 'Popular (4)', 'Trending (3)']

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a1a', 
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '1.5rem 1rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Title Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#ff69b4', 
              marginBottom: '0.5rem',
              margin: 0
            }}>
              Brands
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Discover amazing brands and their curated gift collections. Follow your favorites and never miss new arrivals.
            </p>
          </div>

          {/* Stats */}
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>{brands.length}</span>
              <span style={{ color: '#888' }}>Brands</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>
                {brands.reduce((sum, brand) => sum + brand.followers, 0).toLocaleString()}
              </span>
              <span style={{ color: '#888' }}>Followers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>4.8</span>
              <span style={{ color: '#888' }}>Rating</span>
            </div>
          </div>

          {/* Back to Home */}
          <Link 
            to="/" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#4a9eff', 
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '1rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Search Bar */}
          <div style={{ 
            position: 'relative', 
            marginBottom: '1rem',
            maxWidth: '500px'
          }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#888' 
              }} 
            />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: '#2a2a2a',
                border: '1px solid #444',
                borderRadius: '12px',
                padding: '0.75rem 1rem 0.75rem 3rem',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {filters.map((filter, index) => (
              <button
                key={index}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  background: selectedFilter === filter ? '#4a5568' : '#2a2a2a',
                  color: selectedFilter === filter ? '#fff' : '#888',
                  border: '1px solid #444',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div style={{ 
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filteredBrands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #333',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              whileHover={{ 
                scale: 1.02,
                borderColor: '#ff69b4'
              }}
            >
              {/* Icon and Title */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1rem' 
              }}>
                <div style={{ 
                  fontSize: '2rem',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#3a3a3a',
                  borderRadius: '12px'
                }}>
                  {brand.icon}
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {brand.name}
                  </h3>
                  <p style={{ 
                    color: '#888', 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {brand.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{brand.followers.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Star size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{brand.rating}</span>
                </div>
              </div>

              {/* Explore Button */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#4a9eff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Explore <ChevronRight size={16} />
                </button>
              </div>

              {/* Categories */}
              <div>
                <p style={{ 
                  color: '#888', 
                  fontSize: '0.8rem', 
                  margin: 0,
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  Categories
                </p>
                <p style={{ 
                  color: '#aaa', 
                  fontSize: '0.8rem', 
                  margin: 0
                }}>
                  {brand.categories.join(' • ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
