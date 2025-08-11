import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Users,
  Target,
  Heart,
  Award,
  TrendingUp,
  Star
} from 'lucide-react'

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Recommendations',
      description: 'Our advanced AI analyzes preferences, occasions, and relationships to suggest the perfect gifts.'
    },
    {
      icon: '💳',
      title: 'Seamless Payment Integration',
      description: 'Secure payments with Stripe integration, supporting multiple payment methods and currencies.'
    },
    {
      icon: '📦',
      title: 'Real-Time Order Tracking',
      description: 'Track your orders from purchase to delivery with real-time updates and notifications.'
    },
    {
      icon: '🌟',
      title: 'Community Stories',
      description: 'Share and discover gifting stories from our community of thoughtful gift-givers.'
    },
    {
      icon: '🏪',
      title: 'Seller Marketplace',
      description: 'Join our marketplace as a seller and reach customers looking for unique, thoughtful gifts.'
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Enjoy a seamless experience across all devices with our responsive design.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Former tech executive with a passion for meaningful connections through thoughtful gifting.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'AI specialist with 10+ years experience building recommendation systems.'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Design',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'UX designer focused on creating delightful and intuitive user experiences.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '100K+', label: 'Gifts Delivered' },
    { number: '500+', label: 'Trusted Sellers' },
    { number: '4.9/5', label: 'Customer Rating' }
  ];

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
              About GIFTPAL
            </h1>
            <p style={{
              color: '#888',
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              We're revolutionizing the way people give and receive gifts by combining AI technology with human emotion to create meaningful connections.
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
              <span style={{ fontWeight: '600' }}>50K+</span>
              <span style={{ color: '#888' }}>Happy Customers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>100K+</span>
              <span style={{ color: '#888' }}>Gifts Delivered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>4.9/5</span>
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

      {/* Tab Navigation */}
      <div style={{
        background: '#1a1a1a',
        padding: '1rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['mission', 'team', 'features'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? '#4a5568' : '#2a2a2a',
                  color: activeTab === tab ? '#fff' : '#888',
                  border: '1px solid #444',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Mission Tab */}
        {activeTab === 'mission' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #333'
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                🎯
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                margin: 0,
                marginBottom: '1rem',
                color: '#ff69b4'
              }}>
                Our Mission
              </h3>
              <p style={{
                color: '#aaa',
                fontSize: '0.9rem',
                margin: 0,
                lineHeight: '1.6'
              }}>
                To revolutionize gift-giving by combining artificial intelligence with human emotion, creating meaningful connections through thoughtful, personalized gifts that strengthen relationships and spread joy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #333'
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                👁️
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                margin: 0,
                marginBottom: '1rem',
                color: '#ff69b4'
              }}>
                Our Vision
              </h3>
              <p style={{
                color: '#aaa',
                fontSize: '0.9rem',
                margin: 0,
                lineHeight: '1.6'
              }}>
                To become the world's most trusted platform for meaningful gift-giving, where every gift tells a story and every gesture strengthens the bonds between people across the globe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #333'
              }}
            >
              <div style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                💝
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                margin: 0,
                marginBottom: '1rem',
                color: '#ff69b4'
              }}>
                Our Values
              </h3>
              <p style={{
                color: '#aaa',
                fontSize: '0.9rem',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Authenticity, thoughtfulness, and innovation guide everything we do. We believe that the perfect gift comes from understanding, caring, and the desire to make someone smile.
              </p>
            </motion.div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
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
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p style={{
                  color: '#aaa',
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ff69b4'
                    }}
                  />
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {member.name}
                    </h3>
                    <p style={{
                      color: '#ff69b4',
                      margin: 0,
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {member.role}
                    </p>
                  </div>
                </div>
                <p style={{
                  color: '#aaa',
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}