import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, MapPin, Calendar, Gift, Heart, Star, Settings,
  Edit3, Camera, Award, Crown, Sparkles, Users, MessageCircle,
  ArrowLeft, Home, ShoppingBag, Building2, Info
} from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import mrGiftLogo from '../../assets/giftpal_logo.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Redirect to sign-in if not authenticated
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    // Load profile data from authenticated user or localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Create profile from authenticated user data
      setProfile({
        fullName: user?.name || 'Gift Enthusiast',
        username: user?.email?.split('@')[0] || 'giftlover',
        bio: 'Passionate about finding the perfect gifts for every occasion! 🎁✨',
        location: 'New York, NY',
        birthday: '1990-01-01',
        avatar: user?.avatar || null,
        email: user?.email || '',
        interests: user?.preferences?.interests || ['Electronics', 'Fashion', 'Books', 'Home & Garden'],
        giftingStyle: user?.preferences?.giftingStyle || 'thoughtful',
        budgetRange: user?.preferences?.budget || '$50 - $100',
        occasions: user?.preferences?.occasions || ['Birthday', 'Anniversary', 'Holiday'],
        followedUsers: [1, 2],
        stats: {
          followers: 245,
          following: 89,
          giftsGiven: 34,
          storiesShared: 12,
          level: 'L2',
          title: 'Rising Gifter',
          totalSpent: 1250,
          avgRating: 4.8
        }
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSaveProfile = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));

    // Update the authenticated user data
    updateUser({
      name: profile.fullName,
      avatar: profile.avatar,
      preferences: {
        interests: profile.interests,
        giftingStyle: profile.giftingStyle,
        budget: profile.budgetRange,
        occasions: profile.occasions
      }
    });

    setIsEditing(false);
  };

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!profile) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#181A20',
        color: '#fff'
      }}>
        Loading profile...
      </div>
    );
  }

  const renderOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <Gift size={24} color="#FFB1EE" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
            {profile.stats.giftsGiven}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Gifts Given
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <Users size={24} color="#5E9BFF" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
            {profile.stats.followers}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Followers
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <Star size={24} color="#48F08B" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
            {profile.stats.avgRating}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Avg Rating
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <Award size={24} color="#9C75FF" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
            {profile.stats.level}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Level
          </div>
        </div>
      </div>

      {/* Interests */}
      <div>
        <h3 style={{
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: '600',
          margin: '0 0 1rem 0'
        }}>
          Interests
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {profile.interests.map((interest) => (
            <span
              key={interest}
              style={{
                background: 'linear-gradient(135deg, #FFB1EE, #5E9BFF)',
                color: '#fff',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Gifting Preferences */}
      <div>
        <h3 style={{
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: '600',
          margin: '0 0 1rem 0'
        }}>
          Gifting Preferences
        </h3>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                Style
              </div>
              <div style={{ color: '#fff', fontWeight: '500', textTransform: 'capitalize' }}>
                {profile.giftingStyle.replace(/([A-Z])/g, ' $1')}
              </div>
            </div>
            <div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                Budget Range
              </div>
              <div style={{ color: '#fff', fontWeight: '500' }}>
                {profile.budgetRange}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: '#181A20',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Navigation Header */}
      <header style={{
        background: '#181111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <img src={mrGiftLogo} alt="Mr. Gift Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>MR.GIFT</div>
            <div style={{ fontSize: '0.7rem', color: '#b0b8c1' }}>BY DHE-PLOT</div>
          </div>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={16} />
            Home
          </Link>
          <Link to="/gifts" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={16} />
            Gifts
          </Link>
          <Link to="/brands" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={16} />
            Brands
          </Link>
          <Link to="/about" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={16} />
            About
          </Link>
        </nav>
        
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#fff',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </header>

      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        padding: '2rem',
        borderRadius: '0 0 20px 20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: profile.avatar 
                ? `url(${profile.avatar})` 
                : 'linear-gradient(135deg, #FFB1EE, #5E9BFF)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid rgba(255, 177, 238, 0.3)'
            }}>
              {!profile.avatar && <User size={60} color="#fff" />}
            </div>
            <button style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '36px',
              height: '36px',
              background: '#FFB1EE',
              borderRadius: '50%',
              border: '3px solid #181A20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Camera size={18} color="#000" />
            </button>
          </div>

          {/* Profile Info */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                margin: 0,
                color: '#fff'
              }}>
                {profile.fullName}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#000'
              }}>
                <Crown size={16} />
                {profile.stats.level} {profile.stats.title}
              </div>
            </div>

            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1rem',
              margin: '0 0 1rem 0'
            }}>
              @{profile.username}
            </p>

            <p style={{
              color: '#fff',
              fontSize: '1rem',
              lineHeight: '1.5',
              margin: '0 0 1.5rem 0'
            }}>
              {profile.bio}
            </p>

            <div style={{
              display: 'flex',
              gap: '2rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFB1EE' }}>
                  {profile.stats.followers}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Followers
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#5E9BFF' }}>
                  {profile.stats.following}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Following
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#48F08B' }}>
                  {profile.stats.giftsGiven}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Gifts Given
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #FFB1EE, #5E9BFF)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(255, 177, 238, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem'
        }}>
          {['overview', 'stories', 'gifts', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab ? '#FFB1EE' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '0.5rem 0',
                borderBottom: activeTab === tab ? '2px solid #FFB1EE' : 'none',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'stories' && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'rgba(255, 255, 255, 0.5)' }}>
            <Sparkles size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>No stories shared yet</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Start sharing your gifting experiences!</p>
          </div>
        )}
        {activeTab === 'gifts' && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'rgba(255, 255, 255, 0.5)' }}>
            <Gift size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>No gifts showcased yet</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Showcase your favorite gifts and recommendations!</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'rgba(255, 255, 255, 0.5)' }}>
            <Star size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>No reviews yet</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Share your thoughts on gifts you've given or received!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
