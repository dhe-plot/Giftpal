import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Package, Star, TrendingUp, Gift, Search, Filter, User, Clock, CheckCircle } from 'lucide-react'

// Sample data for buyer dashboard
const sampleOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 149.99,
    items: [
      {
        name: 'Personalized Jewelry Box',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80',
        price: 149.99,
        recipient: 'Sarah (Wife)'
      }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 89.99,
    items: [
      {
        name: 'Artisan Coffee Set',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80',
        price: 89.99,
        recipient: 'Dad (Birthday)'
      }
    ]
  }
]

const sampleWishlist = [
  {
    id: 1,
    name: 'Smart Home Starter Kit',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    inStock: true,
    priceDropped: true
  },
  {
    id: 2,
    name: 'Luxury Spa Collection',
    price: 79,
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80',
    rating: 4.6,
    inStock: true,
    priceDropped: false
  }
]

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const theme = {
    background: isDarkMode ? '#0a0a0a' : '#ffffff',
    cardBackground: isDarkMode ? '#1a1a1a' : '#f8f9fa',
    textPrimary: isDarkMode ? '#ffffff' : '#1a1a1a',
    textSecondary: isDarkMode ? '#b8a89c' : '#6b7280',
    textMuted: isDarkMode ? '#6b7280' : '#9ca3af',
    border: isDarkMode ? '#333333' : '#e5e7eb',
    accent: '#4ecdc4',
    accentHover: '#45b7aa'
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'recommendations', label: 'For You', icon: Star }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#10b981'
      case 'shipped': return '#3b82f6'
      case 'processing': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} />
      case 'shipped': return <Package size={16} />
      case 'processing': return <Clock size={16} />
      default: return <Package size={16} />
    }
  }

  return (
    <div style={{ background: theme.background, minHeight: '100vh', color: theme.textPrimary }}>
      {/* Header */}
      <header style={{
        background: theme.cardBackground,
        padding: '1rem 2rem',
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <Link to="/" style={{ color: theme.accent, textDecoration: 'none', fontWeight: 600 }}>
            ← Back to GIFTPAL
          </Link>
          <h1 style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 }}>
            My Dashboard
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{
            background: 'transparent',
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            padding: '0.5rem',
            color: theme.textPrimary,
            cursor: 'pointer'
          }}>
            <Search size={20} />
          </button>
          
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: theme.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: 600
          }}>
            JD
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '2rem', padding: '2rem' }}>
        {/* Sidebar */}
        <aside style={{ width: '250px', flexShrink: 0 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '1rem',
                    background: activeTab === tab.id ? `${theme.accent}20` : 'transparent',
                    border: activeTab === tab.id ? `1px solid ${theme.accent}` : `1px solid transparent`,
                    borderRadius: '12px',
                    color: activeTab === tab.id ? theme.accent : theme.textSecondary,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.background = `${theme.accent}10`
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.background = 'transparent'
                    }
                  }}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Welcome back! 👋</h2>
              
              {/* Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  background: theme.cardBackground,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Package size={20} style={{ color: theme.accent }} />
                    <span style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>Total Orders</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.textPrimary }}>12</div>
                </div>
                
                <div style={{
                  background: theme.cardBackground,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Heart size={20} style={{ color: '#ff4757' }} />
                    <span style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>Wishlist Items</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.textPrimary }}>{sampleWishlist.length}</div>
                </div>
                
                <div style={{
                  background: theme.cardBackground,
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Star size={20} style={{ color: '#ffd700' }} />
                    <span style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>Avg Rating</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: theme.textPrimary }}>4.8</div>
                </div>
              </div>

              {/* Recent Orders */}
              <div style={{
                background: theme.cardBackground,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
                padding: '1.5rem'
              }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={20} style={{ color: theme.accent }} />
                  Recent Orders
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sampleOrders.slice(0, 3).map(order => (
                    <div key={order.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: isDarkMode ? '#0f0f0f' : '#ffffff',
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`
                    }}>
                      <img
                        src={order.items[0].image}
                        alt={order.items[0].name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{order.items[0].name}</div>
                        <div style={{ color: theme.textSecondary, fontSize: '0.8rem' }}>
                          Order #{order.id} • {order.date}
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        color: getStatusColor(order.status),
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                      
                      <div style={{ fontWeight: 600, color: theme.accent }}>
                        ${order.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Order History</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sampleOrders.map(order => (
                  <div key={order.id} style={{
                    background: theme.cardBackground,
                    borderRadius: '12px',
                    border: `1px solid ${theme.border}`,
                    padding: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Order #{order.id}</div>
                        <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>{order.date}</div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: getStatusColor(order.status),
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        background: `${getStatusColor(order.status)}20`,
                        padding: '0.5rem 1rem',
                        borderRadius: '20px'
                      }}>
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </div>
                    </div>
                    
                    {order.items.map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: isDarkMode ? '#0f0f0f' : '#ffffff',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{item.name}</div>
                          <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
                            For: {item.recipient}
                          </div>
                        </div>
                        
                        <div style={{ fontWeight: 600, color: theme.accent, fontSize: '1.1rem' }}>
                          ${item.price}
                        </div>
                      </div>
                    ))}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${theme.border}` }}>
                      <button style={{
                        background: 'transparent',
                        border: `1px solid ${theme.border}`,
                        color: theme.textSecondary,
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        Track Order
                      </button>
                      
                      <div style={{ fontWeight: 700, fontSize: '1.2rem', color: theme.textPrimary }}>
                        Total: ${order.total}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>My Wishlist</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {sampleWishlist.map(item => (
                  <div key={item.id} style={{
                    background: theme.cardBackground,
                    borderRadius: '12px',
                    border: `1px solid ${theme.border}`,
                    padding: '1rem',
                    position: 'relative'
                  }}>
                    {item.priceDropped && (
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: '#ff4757',
                        color: 'white',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}>
                        Price Drop!
                      </div>
                    )}
                    
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
                    />
                    
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{item.name}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: theme.accent, fontSize: '1.2rem', fontWeight: 700 }}>
                        ${item.price}
                      </span>
                      {item.originalPrice > item.price && (
                        <span style={{ color: theme.textMuted, textDecoration: 'line-through', fontSize: '0.9rem' }}>
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
                      <Star size={14} style={{ color: '#ffd700', fill: '#ffd700' }} />
                      <span style={{ color: theme.textSecondary, fontSize: '0.8rem' }}>
                        {item.rating} rating
                      </span>
                      <span style={{
                        marginLeft: 'auto',
                        color: item.inStock ? '#10b981' : '#ff4757',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{
                        flex: 1,
                        background: theme.accent,
                        color: '#000',
                        border: 'none',
                        padding: '0.8rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Add to Cart
                      </button>
                      
                      <button style={{
                        background: 'transparent',
                        border: `1px solid ${theme.border}`,
                        color: theme.textSecondary,
                        padding: '0.8rem',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div>
              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Recommended for You</h2>
              
              <div style={{
                background: `linear-gradient(135deg, ${theme.accent}10 0%, ${theme.accent}05 100%)`,
                borderRadius: '16px',
                padding: '2rem',
                border: `1px solid ${theme.accent}20`,
                textAlign: 'center'
              }}>
                <div style={{
                  background: theme.accent,
                  color: '#000',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: '0 auto 1rem'
                }}>
                  AI
                </div>
                
                <h3 style={{ marginBottom: '1rem' }}>Personalized Recommendations Coming Soon!</h3>
                <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>
                  Our AI is learning your preferences to suggest the perfect gifts for every occasion.
                </p>
                
                <button style={{
                  background: theme.accent,
                  color: '#000',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '25px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Browse Gifts to Get Started
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
