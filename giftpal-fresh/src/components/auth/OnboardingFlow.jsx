import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'
import giftpalLogo from '../../assets/giftpal_logo.png'

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState({
    interests: [],
    giftingStyle: '',
    budget: '',
    occasions: []
  })
  
  const { updateUser } = useAuth()
  const navigate = useNavigate()

  const interests = [
    '🎮 Gaming', '📚 Books', '🎵 Music', '🎨 Art', '🏃 Fitness',
    '🍳 Cooking', '🌱 Gardening', '📱 Tech', '✈️ Travel', '🎬 Movies'
  ]

  const giftingStyles = [
    { id: 'thoughtful', label: 'Thoughtful & Personal', desc: 'I love meaningful, personalized gifts' },
    { id: 'practical', label: 'Practical & Useful', desc: 'I prefer gifts that serve a purpose' },
    { id: 'luxurious', label: 'Luxurious & Premium', desc: 'I enjoy high-quality, premium items' },
    { id: 'creative', label: 'Creative & Unique', desc: 'I like unusual and creative gifts' }
  ]

  const budgetRanges = [
    '$10 - $25', '$25 - $50', '$50 - $100', '$100 - $250', '$250+'
  ]

  const occasions = [
    '🎂 Birthdays', '💝 Anniversaries', '🎄 Holidays', '🎓 Graduations',
    '💍 Weddings', '👶 Baby Showers', '🏠 Housewarming', '🎉 Just Because'
  ]

  const handleInterestToggle = (interest) => {
    setUserData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleOccasionToggle = (occasion) => {
    setUserData(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion]
    }))
  }

  const handleComplete = () => {
    updateUser({
      onboardingComplete: true,
      preferences: userData
    })
    navigate('/profile')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 style={{ color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
              What are your interests?
            </h2>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '2rem' }}>
              Select the topics you're passionate about
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {interests.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${userData.interests.includes(interest) ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    background: userData.interests.includes(interest) ? '#f0fffe' : 'white',
                    color: userData.interests.includes(interest) ? '#4ecdc4' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 style={{ color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
              What's your gifting style?
            </h2>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '2rem' }}>
              Choose the style that best describes you
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {giftingStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setUserData(prev => ({ ...prev, giftingStyle: style.id }))}
                  style={{
                    padding: '1.5rem',
                    border: `2px solid ${userData.giftingStyle === style.id ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    background: userData.giftingStyle === style.id ? '#f0fffe' : 'white',
                    color: userData.giftingStyle === style.id ? '#4ecdc4' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{style.label}</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{style.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 style={{ color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
              What's your typical budget?
            </h2>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '2rem' }}>
              This helps us recommend gifts in your price range
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
              {budgetRanges.map(budget => (
                <button
                  key={budget}
                  onClick={() => setUserData(prev => ({ ...prev, budget }))}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${userData.budget === budget ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    background: userData.budget === budget ? '#f0fffe' : 'white',
                    color: userData.budget === budget ? '#4ecdc4' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 style={{ color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
              What occasions do you shop for?
            </h2>
            <p style={{ color: '#666', textAlign: 'center', marginBottom: '2rem' }}>
              Select all that apply
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {occasions.map(occasion => (
                <button
                  key={occasion}
                  onClick={() => handleOccasionToggle(occasion)}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${userData.occasions.includes(occasion) ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    background: userData.occasions.includes(occasion) ? '#f0fffe' : 'white',
                    color: userData.occasions.includes(occasion) ? '#4ecdc4' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <img 
            src={giftpalLogo} 
            alt="GIFTPAL Logo" 
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '1rem' }} 
          />
          <h1 style={{ color: '#333', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Let's personalize your experience
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: step <= currentStep ? '#4ecdc4' : '#e1e5e9',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div style={{ marginBottom: '3rem' }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={{
              background: 'transparent',
              border: '2px solid #e1e5e9',
              color: '#666',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 1 ? 0.5 : 1,
              fontWeight: 500
            }}
          >
            Previous
          </button>

          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            Step {currentStep} of 4
          </span>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              style={{
                background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7aa 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              style={{
                background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7aa 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
