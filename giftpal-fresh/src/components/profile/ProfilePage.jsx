import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Gift, Star, Settings,
  Edit3, Camera, Award, Crown, Sparkles, Users,
  ArrowLeft, Home, ShoppingBag, Building2, Info, X, Save
} from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import mrGiftLogo from '../../assets/giftpal_logo.png';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editForm, setEditForm] = useState({});
  const fileInputRef = useRef(null);

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
    // Update profile with edit form data
    const updatedProfile = { ...profile, ...editForm };
    setProfile(updatedProfile);

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    // Update the authenticated user data
    updateUser({
      name: updatedProfile.fullName,
      avatar: updatedProfile.avatar,
      preferences: {
        interests: updatedProfile.interests,
        giftingStyle: updatedProfile.giftingStyle,
        occasions: updatedProfile.occasions
      }
    });

    setIsEditing(false);
    setEditForm({});
  };

  const handleProfileChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfileChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      // Check if we're on mobile and camera is available
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user', // Front camera
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });

        // Create video element to capture photo
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0);

          // Convert to base64
          const dataURL = canvas.toDataURL('image/jpeg', 0.8);
          handleProfileChange('avatar', dataURL);

          // Stop camera stream
          stream.getTracks().forEach(track => track.stop());
        };
      } else {
        // Fallback to file input
        fileInputRef.current?.click();
      }
    } catch (error) {
      console.error('Camera access failed:', error);
      // Fallback to file input
      fileInputRef.current?.click();
    }
  };

  const startEditing = () => {
    setEditForm({
      fullName: profile.fullName,
      bio: profile.bio,
      location: profile.location,
      avatar: profile.avatar
    });
    setIsEditing(true);
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
      fontFamily: 'Inter, system-ui, sans-serif',
      paddingBottom: window.innerWidth <= 768 ? '80px' : '0' // Space for mobile bottom nav
    }}>
      {/* Navigation Header */}
      <header style={{
        background: '#181111',
        padding: '1rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <img src={mrGiftLogo} alt="GIFTPAL Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>GIFTPAL</div>
            <div style={{ fontSize: '0.7rem', color: '#b0b8c1' }}>BY DHE-PLOT</div>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
          <Link to="/" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Home size={16} />
            <span style={{ display: window.innerWidth > 640 ? 'inline' : 'none' }}>Home</span>
          </Link>
          <Link to="/gifts" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <ShoppingBag size={16} />
            <span style={{ display: window.innerWidth > 640 ? 'inline' : 'none' }}>Gifts</span>
          </Link>
          <Link to="/brands" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Building2 size={16} />
            <span style={{ display: window.innerWidth > 640 ? 'inline' : 'none' }}>Brands</span>
          </Link>
          <Link to="/about" style={{ color: '#b0b8c1', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <Info size={16} />
            <span style={{ display: window.innerWidth > 640 ? 'inline' : 'none' }}>About</span>
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
            transition: 'all 0.2s ease',
            fontSize: '0.9rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <ArrowLeft size={16} />
          <span style={{ display: window.innerWidth > 480 ? 'inline' : 'none' }}>Back to Home</span>
        </button>
      </header>

      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        padding: '1rem',
        borderRadius: '0 0 20px 20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          gap: '1.5rem',
          alignItems: window.innerWidth <= 768 ? 'center' : 'flex-start',
          textAlign: window.innerWidth <= 768 ? 'center' : 'left'
        }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: window.innerWidth <= 768 ? '100px' : '120px',
              height: window.innerWidth <= 768 ? '100px' : '120px',
              borderRadius: '50%',
              background: (isEditing ? editForm.avatar : profile.avatar)
                ? `url(${isEditing ? editForm.avatar : profile.avatar})`
                : 'linear-gradient(135deg, #FFB1EE, #5E9BFF)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid rgba(255, 177, 238, 0.3)'
            }}>
              {!(isEditing ? editForm.avatar : profile.avatar) && <User size={window.innerWidth <= 768 ? 50 : 60} color="#fff" />}
            </div>
            {isEditing && (
              <>
                <button
                  onClick={handleCameraCapture}
                  style={{
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
                  }}
                >
                  <Camera size={18} color="#000" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </div>

          {/* Profile Info */}
          <div style={{ flex: 1, width: '100%' }}>
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
              alignItems: window.innerWidth <= 768 ? 'center' : 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.fullName || ''}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  style={{
                    fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                    fontWeight: '700',
                    margin: 0,
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    textAlign: window.innerWidth <= 768 ? 'center' : 'left'
                  }}
                  placeholder="Enter your name"
                />
              ) : (
                <h1 style={{
                  fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                  fontWeight: '700',
                  margin: 0,
                  color: '#fff'
                }}>
                  {profile.fullName}
                </h1>
              )}
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

            {isEditing ? (
              <textarea
                value={editForm.bio || ''}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                style={{
                  color: '#fff',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  margin: '0 0 1.5rem 0',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  width: '100%',
                  minHeight: '80px',
                  resize: 'vertical',
                  textAlign: window.innerWidth <= 768 ? 'center' : 'left'
                }}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p style={{
                color: '#fff',
                fontSize: '1rem',
                lineHeight: '1.5',
                margin: '0 0 1.5rem 0'
              }}>
                {profile.bio}
              </p>
            )}

            <div style={{
              display: 'flex',
              gap: window.innerWidth <= 768 ? '1rem' : '2rem',
              marginBottom: '1.5rem',
              justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'
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
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
              width: window.innerWidth <= 768 ? '100%' : 'auto'
            }}>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #48F08B, #5E9BFF)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flex: window.innerWidth <= 480 ? '1' : 'none'
                    }}
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({});
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flex: window.innerWidth <= 480 ? '1' : 'none'
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEditing}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, #FFB1EE, #5E9BFF)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flex: window.innerWidth <= 480 ? '1' : 'none'
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
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flex: window.innerWidth <= 480 ? '1' : 'none'
                  }}>
                    <Settings size={16} />
                    Settings
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: window.innerWidth <= 480 ? '1rem' : '2rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {['overview', 'stories', 'gifts', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab ? '#FFB1EE' : 'rgba(255, 255, 255, 0.7)',
                fontSize: window.innerWidth <= 480 ? '0.9rem' : '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '0.5rem 0',
                borderBottom: activeTab === tab ? '2px solid #FFB1EE' : 'none',
                textTransform: 'capitalize',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
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
