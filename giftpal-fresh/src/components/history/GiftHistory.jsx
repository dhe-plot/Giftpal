import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Gift,
  Calendar,
  DollarSign,
  Star,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

const giftHistory = [
  {
    id: 1,
    recipientName: "Sarah Johnson",
    giftName: "Premium Yoga Mat",
    occasion: "Birthday",
    date: "2024-01-15",
    amount: 85,
    rating: 5,
    notes: "She loved it! Perfect for her morning yoga routine."
  },
  {
    id: 2,
    recipientName: "Mike Chen",
    giftName: "Wireless Gaming Headset",
    occasion: "Christmas",
    date: "2023-12-25",
    amount: 120,
    rating: 4,
    notes: "Great sound quality, he uses it daily."
  },
  {
    id: 3,
    recipientName: "Emma Wilson",
    giftName: "Artisan Coffee Set",
    occasion: "Anniversary",
    date: "2023-11-10",
    amount: 65,
    rating: 5,
    notes: "Perfect for coffee lovers, beautifully packaged."
  },
  {
    id: 4,
    recipientName: "Mom",
    giftName: "Silk Scarf Collection",
    occasion: "Mother's Day",
    date: "2023-05-14",
    amount: 95,
    rating: 5,
    notes: "Elegant and timeless, she wears them often."
  }
]

const stats = {
  totalSpent: 365,
  avgRating: 4.8
}

export default function GiftHistory() {
  const [selectedFilter, setSelectedFilter] = useState('All Gifts')

  const filters = ['All Gifts (4)', 'This Year (2)', 'Last Year (2)']

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
              Gift History
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Keep a private record of all your gifts and their success rates. Analyze your spending patterns and improve your gift-giving skills.
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
              <span style={{ fontWeight: '600' }}>{giftHistory.length}</span>
              <span style={{ color: '#888' }}>Gifts Given</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>${stats.totalSpent}</span>
              <span style={{ color: '#888' }}>Total Spent</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>{stats.avgRating}</span>
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

      {/* Filters */}
      <div style={{ 
        background: '#1a1a1a', 
        padding: '1rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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

      {/* Gift History Grid */}
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
          {giftHistory.map((gift, index) => (
            <motion.div
              key={gift.id}
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
              {/* Gift Info */}
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
                    {gift.giftName}
                  </h3>
                  <p style={{ 
                    color: '#888', 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    For {gift.recipientName} • {gift.occasion}
                  </p>
                </div>
              </div>

              {/* Gift Details */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <DollarSign size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>${gift.amount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Star size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{gift.rating}/5</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>
                    {new Date(gift.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {gift.notes && (
                <div style={{ 
                  background: '#3a3a3a',
                  borderRadius: '8px',
                  padding: '0.75rem'
                }}>
                  <p style={{ 
                    color: '#aaa', 
                    fontSize: '0.8rem', 
                    margin: 0
                  }}>
                    "{gift.notes}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
