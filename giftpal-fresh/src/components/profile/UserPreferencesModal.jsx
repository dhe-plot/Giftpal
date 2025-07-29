import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { X, Settings, Heart, DollarSign, Tag } from 'lucide-react'

export function UserPreferencesModal({ isOpen, onClose, onSave }) {
  const { user } = useUser()
  const [preferences, setPreferences] = useState({
    favoriteCategories: ['Tech', 'Home & Living', 'Books'],
    priceRange: '$25-$100',
    giftingStyle: 'Practical & Thoughtful',
    notifications: {
      newStories: true,
      followUpdates: true,
      giftRecommendations: true,
      priceAlerts: false
    }
  })

  const categories = [
    'Tech & Gadgets', 'Fashion & Style', 'Home & Garden', 'Books & Learning',
    'Sports & Fitness', 'Art & Crafts', 'Food & Cooking', 'Travel & Adventure',
    'Music & Entertainment', 'Health & Wellness', 'Kids & Family', 'Luxury Items'
  ]

  const giftingStyles = [
    'Thoughtful & Personal',
    'Practical & Useful', 
    'Luxury & Premium',
    'Creative & Unique',
    'Experiential'
  ]

  const priceRanges = [
    '$0 - $25', '$25 - $50', '$50 - $100', '$100 - $250', '$250 - $500', '$500+'
  ]

  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      favoriteCategories: prev.favoriteCategories.includes(category)
        ? prev.favoriteCategories.filter(c => c !== category)
        : [...prev.favoriteCategories, category]
    }))
  }

  const handleNotificationToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handleSave = () => {
    onSave?.(preferences)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal preferences-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <Settings size={20} />
            Gifting Preferences
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="preferences-content">
          <div className="preference-section">
            <h3>
              <Tag size={16} />
              Favorite Categories
            </h3>
            <p className="section-description">Select categories you're interested in for better recommendations</p>
            <div className="categories-grid">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-tag ${preferences.favoriteCategories.includes(category) ? 'selected' : ''}`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="preference-section">
            <h3>
              <Heart size={16} />
              Gifting Style
            </h3>
            <div className="style-options">
              {giftingStyles.map(style => (
                <button
                  key={style}
                  className={`style-option ${preferences.giftingStyle === style ? 'selected' : ''}`}
                  onClick={() => setPreferences(prev => ({ ...prev, giftingStyle: style }))}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="preference-section">
            <h3>
              <DollarSign size={16} />
              Price Range
            </h3>
            <div className="price-options">
              {priceRanges.map(range => (
                <button
                  key={range}
                  className={`price-option ${preferences.priceRange === range ? 'selected' : ''}`}
                  onClick={() => setPreferences(prev => ({ ...prev, priceRange: range }))}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="preference-section">
            <h3>Notifications</h3>
            <div className="notification-options">
              <label className="notification-item">
                <input
                  type="checkbox"
                  checked={preferences.notifications.newStories}
                  onChange={() => handleNotificationToggle('newStories')}
                />
                <span>New stories from people I follow</span>
              </label>
              <label className="notification-item">
                <input
                  type="checkbox"
                  checked={preferences.notifications.followUpdates}
                  onChange={() => handleNotificationToggle('followUpdates')}
                />
                <span>Follow updates and activity</span>
              </label>
              <label className="notification-item">
                <input
                  type="checkbox"
                  checked={preferences.notifications.giftRecommendations}
                  onChange={() => handleNotificationToggle('giftRecommendations')}
                />
                <span>Personalized gift recommendations</span>
              </label>
              <label className="notification-item">
                <input
                  type="checkbox"
                  checked={preferences.notifications.priceAlerts}
                  onChange={() => handleNotificationToggle('priceAlerts')}
                />
                <span>Price drop alerts on saved items</span>
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
