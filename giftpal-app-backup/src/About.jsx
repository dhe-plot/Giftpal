import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const [activeTab, setActiveTab] = useState('features');

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
  ];

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
    <div style={{ background: '#181312', minHeight: '100vh', color: 'white' }}>
      {/* Navigation */}
      <nav style={{
        background: '#181111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Home
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <button
            onClick={() => setActiveTab('features')}
            style={{
              background: activeTab === 'features' ? '#4ecdc4' : 'transparent',
              color: activeTab === 'features' ? '#000' : '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('team')}
            style={{
              background: activeTab === 'team' ? '#4ecdc4' : 'transparent',
              color: activeTab === 'team' ? '#000' : '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Team
          </button>
          <button
            onClick={() => setActiveTab('mission')}
            style={{
              background: activeTab === 'mission' ? '#4ecdc4' : 'transparent',
              color: activeTab === 'mission' ? '#000' : '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Mission
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #4ecdc4, #ff6347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            About GIFTPAL
          </h1>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto',
            color: '#b8a89c'
          }}>
            We're revolutionizing the way people give and receive gifts by combining AI technology
            with human emotion to create meaningful connections through thoughtful gifting.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              background: '#231b18',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #333'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#4ecdc4',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{ color: '#b8a89c', fontSize: '1rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'features' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              Platform Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {features.map((feature, index) => (
                <div key={index} style={{
                  background: '#1a1a1a',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #333',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#4ecdc4' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#b8a89c', lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              Meet Our Team
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {team.map((member, index) => (
                <div key={index} style={{
                  background: '#1a1a1a',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #333',
                  textAlign: 'center'
                }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      marginBottom: '1rem',
                      border: '3px solid #4ecdc4'
                    }}
                  />
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#4ecdc4' }}>
                    {member.name}
                  </h3>
                  <p style={{ color: '#ff6347', marginBottom: '1rem', fontWeight: 600 }}>
                    {member.role}
                  </p>
                  <p style={{ color: '#b8a89c', lineHeight: 1.6 }}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
              Our Mission & Vision
            </h2>
            <div style={{
              background: '#1a1a1a',
              padding: '3rem',
              borderRadius: '12px',
              border: '1px solid #333'
            }}>
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#4ecdc4' }}>
                  🎯 Our Mission
                </h3>
                <p style={{ color: '#b8a89c', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  To make thoughtful gifting accessible to everyone by leveraging technology to understand
                  personal preferences, relationships, and occasions, while supporting local businesses
                  and artisans in reaching customers who value meaningful gifts.
                </p>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ff6347' }}>
                  🌟 Our Vision
                </h3>
                <p style={{ color: '#b8a89c', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  To create a world where every gift tells a story, strengthens relationships, and
                  brings joy to both the giver and receiver. We envision a global community where
                  thoughtful gifting is the norm, not the exception.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ffd700' }}>
                  💝 Our Values
                </h3>
                <ul style={{ color: '#b8a89c', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Thoughtfulness:</strong> Every recommendation is carefully crafted
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Community:</strong> Supporting sellers and building connections
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Innovation:</strong> Using technology to enhance human relationships
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Trust:</strong> Secure, reliable, and transparent platform
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Contact & Social Links Section */}
        <div style={{
          marginTop: '4rem',
          background: '#1a1a1a',
          padding: '3rem',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <div>
              <h3 style={{ color: '#4ecdc4', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Contact Us</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ color: '#b8a89c' }}>
                  <strong>Email:</strong> hello@giftpal.com
                </div>
                <div style={{ color: '#b8a89c' }}>
                  <strong>Support:</strong> support@giftpal.com
                </div>
                <div style={{ color: '#b8a89c' }}>
                  <strong>Business:</strong> business@giftpal.com
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#4ecdc4', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link to="/gifts" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Browse Gifts</Link>
                <Link to="/brands" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Trusted Brands</Link>
                <Link to="/seller-dashboard" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Become a Seller</Link>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Privacy Policy</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Terms of Service</a>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#4ecdc4', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Follow Us</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Discord Community</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>X (Twitter)</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>TikTok</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Instagram</a>
                <a href="#" style={{ color: '#b8a89c', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
                  onMouseLeave={(e) => e.target.style.color = '#b8a89c'}>Facebook</a>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #333',
            marginTop: '3rem',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#666'
          }}>
            © 2025 GIFTPAL by DHE-PLOT. All rights reserved.
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 99, 71, 0.1))',
          padding: '3rem',
          borderRadius: '12px',
          border: '1px solid rgba(78, 205, 196, 0.3)'
        }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            Ready to Start Your Gifting Journey?
          </h3>
          <p style={{ color: '#b8a89c', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join thousands of thoughtful gift-givers and discover the perfect gifts for every occasion.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/gifts"
              style={{
                background: '#4ecdc4',
                color: '#000',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              Explore Gifts
            </Link>
            <Link
              to="/seller-dashboard"
              style={{
                background: 'transparent',
                color: '#4ecdc4',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                border: '2px solid #4ecdc4'
              }}
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}