import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Package,
  Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'

const benefits = [
  {
    icon: '💰',
    title: 'Competitive Commission',
    description: 'Keep 85% of your sales revenue with our low commission structure',
    highlight: '85% Revenue Share'
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    description: 'Access to customers worldwide looking for unique, thoughtful gifts',
    highlight: '50K+ Active Buyers'
  },
  {
    icon: '📈',
    title: 'Marketing Support',
    description: 'AI-powered recommendations and featured placements for your products',
    highlight: 'AI-Powered Promotion'
  },
  {
    icon: '🚀',
    title: 'Easy Setup',
    description: 'Get started in minutes with our streamlined onboarding process',
    highlight: '24h Approval'
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Track your sales, customer insights, and performance metrics',
    highlight: 'Real-time Analytics'
  },
  {
    icon: '🛡️',
    title: 'Secure Payments',
    description: 'Fast, secure payments with fraud protection and dispute resolution',
    highlight: 'Protected Transactions'
  }
]

const steps = [
  {
    number: 1,
    title: 'Create Account',
    description: 'Sign up and verify your business information'
  },
  {
    number: 2,
    title: 'Add Products',
    description: 'Upload your products with photos and descriptions'
  },
  {
    number: 3,
    title: 'Get Approved',
    description: 'Our team reviews your application within 24 hours'
  },
  {
    number: 4,
    title: 'Start Selling',
    description: 'Begin receiving orders and growing your business'
  }
]

export default function SellerOnboarding() {
  const [selectedTab, setSelectedTab] = useState('benefits')
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    businessType: '',
    description: ''
  })

  const handleStartApplication = () => {
    setShowApplicationForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert('Application submitted successfully! We will review your application within 24 hours.')
    setShowApplicationForm(false)
    setFormData({
      businessName: '',
      email: '',
      phone: '',
      businessType: '',
      description: ''
    })
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
              Become a Seller
            </h1>
            <p style={{ 
              color: '#888', 
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Join our marketplace and reach customers looking for thoughtful gifts. Start your seller journey with GIFTPAL today.
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
              <Building2 size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>500+</span>
              <span style={{ color: '#888' }}>Active Sellers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>95%</span>
              <span style={{ color: '#888' }}>Success Rate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowRight size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>24h</span>
              <span style={{ color: '#888' }}>Approval Time</span>
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
            {['benefits', 'process', 'apply'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                style={{
                  background: selectedTab === tab ? '#4a5568' : '#2a2a2a',
                  color: selectedTab === tab ? '#fff' : '#888',
                  border: '1px solid #444',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'benefits' ? 'Why Sell With Us' : tab === 'process' ? 'How It Works' : 'Apply Now'}
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
        {/* Benefits Tab */}
        {selectedTab === 'benefits' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
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
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {benefit.title}
                    </h3>
                    <div style={{
                      background: '#ff69b4',
                      color: '#fff',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      {benefit.highlight}
                    </div>
                  </div>
                </div>
                <p style={{ 
                  color: '#aaa', 
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Process Tab */}
        {selectedTab === 'process' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: '#2a2a2a',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #333',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#ff69b4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#fff'
                }}>
                  {step.number}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  {step.title}
                </h3>
                <p style={{ 
                  color: '#aaa', 
                  fontSize: '0.9rem',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Apply Tab */}
        {selectedTab === 'apply' && (
          <div style={{ 
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #333'
              }}
            >
              <div style={{ 
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                🚀
              </div>
              <h3 style={{ 
                fontSize: '2rem', 
                fontWeight: '700', 
                margin: 0,
                marginBottom: '1rem',
                color: '#ff69b4'
              }}>
                Ready to Start Selling?
              </h3>
              <p style={{ 
                color: '#aaa', 
                fontSize: '1rem',
                margin: 0,
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Join thousands of successful sellers on GIFTPAL. Start your application today and begin reaching customers who value thoughtful, unique gifts.
              </p>
              <button
                onClick={handleStartApplication}
                style={{
                  background: '#ff69b4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  margin: '0 auto',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e55a9c'}
                onMouseLeave={(e) => e.target.style.background = '#ff69b4'}
              >
                Start Application <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#2a2a2a',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #333',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#ff69b4'
              }}>
                Seller Application
              </h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#3a3a3a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your business name"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#3a3a3a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your email address"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#3a3a3a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  placeholder="Enter your phone number"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  Business Type *
                </label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  style={{
                    width: '100%',
                    background: '#3a3a3a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  <option value="">Select business type</option>
                  <option value="individual">Individual/Sole Proprietorship</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontWeight: '600'
                }}>
                  Business Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    background: '#3a3a3a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  placeholder="Describe your business and the products you plan to sell..."
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  style={{
                    background: '#4a4a4a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#ff69b4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
