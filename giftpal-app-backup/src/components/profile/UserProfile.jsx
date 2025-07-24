import { useState } from 'react'
import { X, Star, Award, Calendar, MapPin, Heart, MessageCircle, UserPlus, UserCheck } from 'lucide-react'

export function UserProfile({ user, isOpen, onClose, onFollow, isFollowing = false }) {
  if (!isOpen || !user) return null

  const getStarColor = (level) => {
    const colors = {
      1: '#94a3b8', // Gray
      2: '#10b981', // Green  
      3: '#3b82f6', // Blue
      4: '#8b5cf6', // Purple
      5: '#f59e0b'  // Gold
    }
    return colors[level] || colors[1]
  }

  const getStarTitle = (level) => {
    const titles = {
      1: "Gift Seeker",
      2: "Gift Explorer", 
      3: "Gift Master",
      4: "Gift Guru",
      5: "Gift Legend"
    }
    return titles[level] || titles[1]
  }

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal user-profile-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="profile-header">
          <div className="profile-avatar-section">
            <div style={{ position: 'relative' }}>
              <img src={user.avatar} alt={user.name} className="profile-avatar" />
              {user.isVerified && (
                <div className="verified-badge-large">
                  <Award size={16} />
                </div>
              )}
            </div>
            <div className="profile-basic-info">
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-username">{user.username}</p>
              <div className="gifting-star-large" style={{ background: `linear-gradient(135deg, ${getStarColor(user.giftingStar.level)}, ${getStarColor(user.giftingStar.level)}dd)` }}>
                <Star size={16} fill="currentColor" />
                <span>Level {user.giftingStar.level} - {getStarTitle(user.giftingStar.level)}</span>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{user.stats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.stats.following}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.stats.storiesPosted}</span>
              <span className="stat-label">Stories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.stats.giftsGiven}</span>
              <span className="stat-label">Gifts Given</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-bio">
            <p>Passionate about finding the perfect gifts for every occasion. Love discovering unique items that bring joy to others! 🎁✨</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <Calendar size={16} />
              <span>Joined December 2024</span>
            </div>
            <div className="detail-item">
              <MapPin size={16} />
              <span>San Francisco, CA</span>
            </div>
          </div>

          <div className="gifting-achievements">
            <h3>Gifting Achievements</h3>
            <div className="achievement-stats">
              <div className="achievement-item">
                <Award size={16} style={{ color: getStarColor(user.giftingStar.level) }} />
                <span>Total Orders: {user.giftingStar.totalOrders}</span>
              </div>
              <div className="achievement-item">
                <span style={{ color: '#10b981' }}>💰</span>
                <span>Total Spent: ${user.giftingStar.totalSpent}</span>
              </div>
            </div>
            <div className="badges">
              {user.giftingStar.badges.map((badge, index) => (
                <span key={index} className="badge">{badge}</span>
              ))}
            </div>
          </div>

          <div className="gifting-preferences">
            <h3>Gifting Preferences</h3>
            <div className="preferences-grid">
              <div className="preference-item">
                <strong>Favorite Categories:</strong> Tech & Gadgets, Home & Garden, Books
              </div>
              <div className="preference-item">
                <strong>Budget Range:</strong> $25 - $100
              </div>
              <div className="preference-item">
                <strong>Gifting Style:</strong> Thoughtful & Personal
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className={`follow-btn-large ${isFollowing ? 'following' : ''}`}
            onClick={() => onFollow(user.id)}
          >
            {isFollowing ? (
              <>
                <UserCheck size={18} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Follow
              </>
            )}
          </button>
          <button className="message-btn">
            <MessageCircle size={18} />
            Message
          </button>
        </div>
      </div>
    </div>
  )
}
