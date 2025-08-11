import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Bell,
  Clock,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

const occasions = [
  {
    id: 1,
    title: "Sarah's Birthday",
    type: 'birthday',
    date: '2024-02-15',
    person: {
      name: 'Sarah Johnson',
      relationship: 'Friend'
    },
    reminderSet: true
  },
  {
    id: 2,
    title: "Wedding Anniversary",
    type: 'anniversary',
    date: '2024-02-20',
    person: {
      name: 'Mike & Lisa',
      relationship: 'Friends'
    },
    reminderSet: true
  },
  {
    id: 3,
    title: "Mom's Birthday",
    type: 'birthday',
    date: '2024-03-01',
    person: {
      name: 'Mom',
      relationship: 'Family'
    },
    reminderSet: false
  },
  {
    id: 4,
    title: "Graduation Day",
    type: 'graduation',
    date: '2024-03-15',
    person: {
      name: 'Alex Chen',
      relationship: 'Cousin'
    },
    reminderSet: true
  }
]

const getOccasionIcon = (type) => {
  const icons = {
    birthday: '🎂',
    anniversary: '💕',
    graduation: '🎓',
    wedding: '💒',
    holiday: '🎄'
  }
  return icons[type] || '🎁'
}

export default function OccasionCalendar() {
  const [selectedFilter, setSelectedFilter] = useState('All Events')

  const filters = ['All Events (4)', 'This Month (3)', 'Upcoming (2)']

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
              Calendar
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Visual calendar view of all upcoming birthdays and special events. Plan ahead and never miss an important celebration again.
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
              <Calendar size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>24</span>
              <span style={{ color: '#888' }}>Events</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>8</span>
              <span style={{ color: '#888' }}>Reminders</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>3</span>
              <span style={{ color: '#888' }}>This Week</span>
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

      {/* Events Grid */}
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
          {occasions.map((occasion, index) => {
            const daysUntil = Math.ceil((new Date(occasion.date) - new Date()) / (1000 * 60 * 60 * 24))
            
            return (
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
                {/* Event Info */}
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
                    {getOccasionIcon(occasion.type)}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {occasion.title}
                    </h3>
                    <p style={{ 
                      color: '#888', 
                      margin: 0,
                      fontSize: '0.9rem'
                    }}>
                      {occasion.person.name} • {occasion.person.relationship}
                    </p>
                  </div>
                </div>

                {/* Date and Days Until */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <Calendar size={16} style={{ color: '#ff69b4' }} />
                  <span style={{ fontSize: '0.9rem', color: '#aaa' }}>
                    {new Date(occasion.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span style={{ 
                    marginLeft: 'auto',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: daysUntil <= 7 ? '#ff6b6b' : daysUntil <= 14 ? '#ffa726' : '#4caf50'
                  }}>
                    {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
                  </span>
                </div>

                {/* Reminder Status */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem'
                }}>
                  <Bell size={14} style={{ color: occasion.reminderSet ? '#4caf50' : '#666' }} />
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>
                    {occasion.reminderSet ? 'Reminder set' : 'No reminder'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
