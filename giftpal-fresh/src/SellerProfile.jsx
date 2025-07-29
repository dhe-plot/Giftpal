import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SellerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@giftify.com',
    phone: '+1 (555) 123-4567',
    businessName: 'Giftify Premium',
    description: 'Curating premium gifts that create lasting memories. Specializing in luxury spa sets, personalized jewelry, and artisan crafts.',
    location: 'New York, NY',
    website: 'https://giftify.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  });

  const [editForm, setEditForm] = useState(profile);

  const stats = {
    totalSales: 15420.50,
    totalOrders: 127,
    rating: 4.8,
    reviews: 89,
    followers: 1250,
    joinDate: 'January 2023'
  };

  const achievements = [
    { icon: '🏆', title: 'Top Seller', description: 'Achieved top seller status 3 months in a row' },
    { icon: '⭐', title: 'Excellent Reviews', description: 'Maintained 4.8+ rating for 6 months' },
    { icon: '🎯', title: 'Fast Shipping', description: '95% orders shipped within 24 hours' },
    { icon: '💎', title: 'Premium Partner', description: 'Verified premium seller since 2023' }
  ];

  const recentProducts = [
    {
      id: 1,
      name: 'Luxury Spa Set',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80',
      price: 89.99,
      sales: 45
    },
    {
      id: 2,
      name: 'Artisan Coffee Set',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
      price: 45.99,
      sales: 32
    },
    {
      id: 3,
      name: 'Personalized Jewelry',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
      price: 129.99,
      sales: 28
    }
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

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
        <Link to="/seller-dashboard" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Dashboard
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#b8a89c', textDecoration: 'none', fontWeight: 500 }}>
            Home
          </Link>
          <button style={{
            background: '#ff6347',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600
          }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Cover Image */}
        <div style={{
          height: '200px',
          backgroundImage: `url(${profile.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem'
          }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: isEditing ? '#ff6347' : '#4ecdc4',
                color: isEditing ? 'white' : '#000',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div style={{
          background: '#1a1a1a',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid #333',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <img
              src={profile.avatar}
              alt={profile.name}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '4px solid #4ecdc4'
              }}
            />

            <div style={{ flex: 1 }}>
              {isEditing ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    style={{
                      background: '#0f0f0f',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '0.8rem',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 700
                    }}
                  />
                  <input
                    type="text"
                    value={editForm.businessName}
                    onChange={(e) => setEditForm({...editForm, businessName: e.target.value})}
                    style={{
                      background: '#0f0f0f',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '0.8rem',
                      color: 'white',
                      fontSize: '1.1rem'
                    }}
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    style={{
                      background: '#0f0f0f',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      padding: '0.8rem',
                      color: 'white',
                      minHeight: '80px',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={handleSave}
                      style={{
                        background: '#4ecdc4',
                        color: '#000',
                        border: 'none',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        background: 'transparent',
                        color: '#b8a89c',
                        border: '1px solid #333',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{profile.name}</h1>
                    <span style={{
                      background: '#4ecdc4',
                      color: '#000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      ✓ Verified
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: '1.3rem',
                    color: '#4ecdc4',
                    margin: '0 0 1rem 0',
                    fontWeight: 600
                  }}>
                    {profile.businessName}
                  </h2>
                  <p style={{
                    color: '#b8a89c',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                    fontSize: '1.1rem'
                  }}>
                    {profile.description}
                  </p>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ color: '#888' }}>
                      📍 {profile.location}
                    </div>
                    <div style={{ color: '#888' }}>
                      🌐 {profile.website}
                    </div>
                    <div style={{ color: '#888' }}>
                      📅 Joined {stats.joinDate}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#4ecdc4', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              ${stats.totalSales.toLocaleString()}
            </div>
            <div style={{ color: '#b8a89c' }}>Total Sales</div>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ff6347', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {stats.totalOrders}
            </div>
            <div style={{ color: '#b8a89c' }}>Orders Completed</div>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ffd700', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              ⭐ {stats.rating}
            </div>
            <div style={{ color: '#b8a89c' }}>{stats.reviews} Reviews</div>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#4ecdc4', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {stats.followers.toLocaleString()}
            </div>
            <div style={{ color: '#b8a89c' }}>Followers</div>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Achievements</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {achievements.map((achievement, index) => (
              <div key={index} style={{
                background: '#1a1a1a',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '2.5rem' }}>{achievement.icon}</div>
                <div>
                  <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                    {achievement.title}
                  </h3>
                  <p style={{ color: '#b8a89c', fontSize: '0.9rem', margin: 0 }}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem' }}>Featured Products</h2>
            <Link
              to="/seller-dashboard"
              style={{
                color: '#4ecdc4',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              View All Products →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {recentProducts.map(product => (
              <div key={product.id} style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid #333',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}
                />
                <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  {product.name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#b8a89c', fontWeight: 600, fontSize: '1.1rem' }}>
                    ${product.price}
                  </span>
                  <span style={{ color: '#ffd700', fontSize: '0.9rem' }}>
                    {product.sales} sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}