import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Star,
  DollarSign,
  ArrowLeft,
  Search
} from 'lucide-react'
import { Link } from 'react-router-dom'

const suggestions = [
  {
    id: 1,
    name: "Smart Fitness Tracker",
    price: 89,
    category: "Tech & Fitness",
    aiScore: 95,
    reasoning: "Based on their love for yoga and fitness tracking habits",
    tags: ["Health", "Tech", "Daily Use"],
    popularity: 4.8,
    match: "Perfect Match"
  },
  {
    id: 2,
    name: "Artisan Coffee Subscription",
    price: 45,
    category: "Food & Beverage",
    aiScore: 88,
    reasoning: "They mentioned loving specialty coffee and trying new blends",
    tags: ["Coffee", "Monthly", "Gourmet"],
    popularity: 4.6,
    match: "Great Match"
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    price: 199,
    category: "Technology",
    aiScore: 82,
    reasoning: "Perfect for their daily commute and music preferences",
    tags: ["Audio", "Commute", "Premium"],
    popularity: 4.7,
    match: "Good Match"
  },
  {
    id: 4,
    name: "Succulent Garden Kit",
    price: 35,
    category: "Home & Garden",
    aiScore: 76,
    reasoning: "They enjoy indoor plants and low-maintenance gardening",
    tags: ["Plants", "DIY", "Relaxing"],
    popularity: 4.4,
    match: "Good Match"
  }
]

export default function GiftSuggestionEngine() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All Suggestions')

  const filters = ['All Suggestions (4)', 'Perfect Match (1)', 'Great Match (1)', 'Good Match (2)']

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getScoreColor = (score) => {
    if (score >= 90) return '#4caf50'
    if (score >= 80) return '#ffa726'
    return '#ff6b6b'
  }

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
              AI Suggestions
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Get personalized gift recommendations powered by AI. Our smart algorithm analyzes preferences, occasions, and trends to find the perfect gifts.
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
              <Brain size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>{suggestions.length}</span>
              <span style={{ color: '#888' }}>AI Suggestions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>95%</span>
              <span style={{ color: '#888' }}>Match Score</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>4.6</span>
              <span style={{ color: '#888' }}>Avg Rating</span>
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
              placeholder="Search AI suggestions..."
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

      {/* Suggestions Grid */}
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
          {filteredSuggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
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
              {/* AI Score Badge */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: getScoreColor(suggestion.aiScore) + '20',
                  color: getScoreColor(suggestion.aiScore),
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Sparkles size={12} />
                  {suggestion.aiScore}% AI Match
                </div>
                <span style={{ 
                  color: '#888', 
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {suggestion.match}
                </span>
              </div>

              {/* Product Info */}
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
                  🎁
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {suggestion.name}
                  </h3>
                  <p style={{ 
                    color: '#888', 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {suggestion.category}
                  </p>
                </div>
              </div>

              {/* Price and Rating */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <DollarSign size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '1rem', fontWeight: '700' }}>${suggestion.price}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Star size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{suggestion.popularity}</span>
                </div>
              </div>

              {/* AI Reasoning */}
              <div style={{ 
                background: '#3a3a3a',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem'
              }}>
                <p style={{ 
                  color: '#ff69b4', 
                  fontSize: '0.8rem', 
                  margin: 0,
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  AI Reasoning
                </p>
                <p style={{ 
                  color: '#aaa', 
                  fontSize: '0.8rem', 
                  margin: 0
                }}>
                  {suggestion.reasoning}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {suggestion.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      background: '#4a5568',
                      color: '#fff',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
