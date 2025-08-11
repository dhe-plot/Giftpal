import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Bell,
  Calendar,
  ArrowLeft,
  Search,
  UserPlus
} from 'lucide-react'
import { Link } from 'react-router-dom'

const following = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarah_j",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    relationship: "Friend",
    isFollowing: true,
    notificationsEnabled: true,
    mutualFriends: 5,
    upcomingOccasions: [
      { type: "Birthday", date: "2024-02-15", daysUntil: 12 }
    ]
  },
  {
    id: 2,
    name: "Mike Chen",
    username: "@mike_c",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    relationship: "Colleague",
    isFollowing: true,
    notificationsEnabled: false,
    mutualFriends: 3,
    upcomingOccasions: []
  },
  {
    id: 3,
    name: "Emma Wilson",
    username: "@emma_w",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    relationship: "Family",
    isFollowing: true,
    notificationsEnabled: true,
    mutualFriends: 8,
    upcomingOccasions: [
      { type: "Anniversary", date: "2024-02-25", daysUntil: 22 }
    ]
  },
  {
    id: 4,
    name: "David Brown",
    username: "@david_b",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    relationship: "Friend",
    isFollowing: true,
    notificationsEnabled: true,
    mutualFriends: 12,
    upcomingOccasions: []
  }
]

export default function FollowingSystem() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filters = ['All (12)', 'Friends (8)', 'Family (4)']

  const filteredFollowing = following.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              Following
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Build your social network and never miss their special occasions. Track friends' preferences and get notified about upcoming events.
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
              <Users size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>{following.length}</span>
              <span style={{ color: '#888' }}>Following</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>12</span>
              <span style={{ color: '#888' }}>Notifications</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>5</span>
              <span style={{ color: '#888' }}>Upcoming</span>
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
              placeholder="Search friends and family..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Following Grid */}
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
          {filteredFollowing.map((person, index) => (
            <motion.div
              key={person.id}
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
              {/* Person Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1rem' 
              }}>
                <img
                  src={person.avatar}
                  alt={person.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '700', 
                    margin: 0,
                    marginBottom: '0.25rem'
                  }}>
                    {person.name}
                  </h3>
                  <p style={{ 
                    color: '#888', 
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {person.username} • {person.relationship}
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
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{person.mutualFriends}</span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>mutual</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Bell size={14} style={{ color: person.notificationsEnabled ? '#4caf50' : '#666' }} />
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>
                    {person.notificationsEnabled ? 'Notifications on' : 'Notifications off'}
                  </span>
                </div>
              </div>

              {/* Upcoming Occasions */}
              {person.upcomingOccasions.length > 0 && (
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
                    Upcoming Event
                  </p>
                  <p style={{ 
                    color: '#aaa', 
                    fontSize: '0.8rem', 
                    margin: 0
                  }}>
                    {person.upcomingOccasions[0].type} in {person.upcomingOccasions[0].daysUntil} days
                  </p>
                </div>
              )}

              {/* Follow Button */}
              <button style={{
                background: person.isFollowing ? '#4a5568' : '#ff69b4',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <UserPlus size={16} />
                {person.isFollowing ? 'Following' : 'Follow'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
