import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  Gift,
  Star,
  Calendar,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const OccasionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All Occasions')

  const occasions = [
    {
      id: 'birthday',
      name: 'Birthday',
      icon: '🎂',
      description: 'Make their special day unforgettable',
      giftCount: 1250,
      categories: ['Kids Birthday', 'Adult Birthday', 'Milestone Birthday', '+1 more']
    },
    {
      id: 'anniversary',
      name: 'Anniversary',
      icon: '💜',
      description: 'Celebrate love and milestones',
      giftCount: 890,
      categories: ['Wedding Anniversary', 'Dating Anniversary', 'Work Anniversary']
    },
    {
      id: 'graduation',
      name: 'Graduation',
      icon: '🎓',
      description: 'Honor their achievements',
      giftCount: 650,
      categories: ['High School', 'College', 'Masters', 'PhD']
    },
    {
      id: 'wedding',
      name: 'Wedding',
      icon: '💍',
      description: 'Celebrate new beginnings',
      giftCount: 980,
      categories: ['Engagement', 'Wedding Day', 'Bridal Shower', 'Bachelor Party']
    },
    {
      id: 'baby',
      name: 'Baby Shower',
      icon: '👶',
      description: 'Welcome the little one',
      giftCount: 720,
      categories: ['Baby Boy', 'Baby Girl', 'Gender Neutral', 'New Parents']
    },
    {
      id: 'holiday',
      name: 'Holidays',
      icon: '🎄',
      description: 'Spread holiday cheer',
      giftCount: 1500,
      categories: ['Christmas', 'New Year', 'Easter', 'Halloween']
    }
  ]

  const filters = ['All Occasions (8)', 'Trending (4)', 'Seasonal (3)']

  const filteredOccasions = occasions.filter(occasion => 
    occasion.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              Occasions
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Discover the perfect gift for every special moment in life. From birthdays to weddings, we've curated collections that make every occasion unforgettable.
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
              <Gift size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>5,000+</span>
              <span style={{ color: '#888' }}>Gifts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>50+</span>
              <span style={{ color: '#888' }}>Occasions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>4.9</span>
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
              placeholder="Search occasions, categories, or gift types..."
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

      {/* Occasions Grid */}
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
          {filteredOccasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
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
                  {occasion.icon}
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {occasion.name}
                  </h3>
                  <p style={{ 
                    color: '#888', 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {occasion.description}
                  </p>
                </div>
              </div>

              {/* Gift Count */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <Gift size={16} style={{ color: '#ff69b4' }} />
                <span style={{ fontWeight: '600' }}>{occasion.giftCount} gifts</span>
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

              {/* Popular Categories */}
              <div>
                <p style={{ 
                  color: '#888', 
                  fontSize: '0.8rem', 
                  margin: 0,
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  Popular Categories
                </p>
                <p style={{ 
                  color: '#aaa', 
                  fontSize: '0.8rem', 
                  margin: 0
                }}>
                  {occasion.categories.join(' • ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OccasionsPage
