import React, { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function PersonalizationFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState({
    giftingStyle: '',
    relationships: [],
    occasions: [],
    budget: '',
    interests: []
  })

  const steps = [
    {
      title: "What's your gifting style?",
      subtitle: "Help us understand how you like to give gifts",
      type: 'single',
      key: 'giftingStyle',
      options: [
        { id: 'thoughtful', label: 'Thoughtful & Personal', icon: '💝', desc: 'I love meaningful, personalized gifts' },
        { id: 'practical', label: 'Practical & Useful', icon: '🎯', desc: 'I prefer gifts people will actually use' },
        { id: 'fun', label: 'Fun & Surprising', icon: '🎉', desc: 'I enjoy unique and unexpected gifts' },
        { id: 'luxury', label: 'Premium & Elegant', icon: '✨', desc: 'I appreciate high-quality, luxurious items' }
      ]
    },
    {
      title: "Who do you usually shop for?",
      subtitle: "Select all that apply",
      type: 'multiple',
      key: 'relationships',
      options: [
        { id: 'family', label: 'Family Members', icon: '👨👩👧👦' },
        { id: 'friends', label: 'Close Friends', icon: '👫' },
        { id: 'romantic', label: 'Romantic Partner', icon: '💕' },
        { id: 'colleagues', label: 'Colleagues', icon: '👔' },
        { id: 'kids', label: 'Children', icon: '🧸' },
        { id: 'pets', label: 'Pet Parents', icon: '🐕' }
      ]
    },
    {
      title: "What occasions do you shop for?",
      subtitle: "We'll help you never miss an important date",
      type: 'multiple',
      key: 'occasions',
      options: [
        { id: 'birthdays', label: 'Birthdays', icon: '🎂' },
        { id: 'holidays', label: 'Holidays', icon: '🎄' },
        { id: 'anniversaries', label: 'Anniversaries', icon: '💍' },
        { id: 'graduations', label: 'Graduations', icon: '🎓' },
        { id: 'baby', label: 'Baby Showers', icon: '👶' },
        { id: 'housewarming', label: 'Housewarming', icon: '🏠' }
      ]
    },
    {
      title: "What's your typical budget range?",
      subtitle: "We'll show you the perfect gifts within your comfort zone",
      type: 'single',
      key: 'budget',
      options: [
        { id: 'under25', label: 'Under $25', icon: '💰', desc: 'Thoughtful gifts on a budget' },
        { id: '25-50', label: '$25 - $50', icon: '💵', desc: 'Great value gifts' },
        { id: '50-100', label: '$50 - $100', icon: '💸', desc: 'Premium gift range' },
        { id: 'over100', label: '$100+', icon: '💎', desc: 'Luxury gift experiences' }
      ]
    },
    {
      title: "What interests you most?",
      subtitle: "Help us curate the perfect gift categories for you",
      type: 'multiple',
      key: 'interests',
      options: [
        { id: 'tech', label: 'Tech & Gadgets', icon: '📱' },
        { id: 'fashion', label: 'Fashion & Style', icon: '👗' },
        { id: 'home', label: 'Home & Living', icon: '🏡' },
        { id: 'wellness', label: 'Health & Wellness', icon: '🧘♀️' },
        { id: 'food', label: 'Food & Drinks', icon: '🍷' },
        { id: 'hobbies', label: 'Hobbies & Crafts', icon: '🎨' }
      ]
    }
  ]

  const currentStepData = steps[currentStep]

  const handleOptionSelect = (optionId) => {
    if (currentStepData.type === 'single') {
      setPreferences(prev => ({
        ...prev,
        [currentStepData.key]: optionId
      }))
    } else {
      setPreferences(prev => ({
        ...prev,
        [currentStepData.key]: prev[currentStepData.key].includes(optionId)
          ? prev[currentStepData.key].filter(id => id !== optionId)
          : [...prev[currentStepData.key], optionId]
      }))
    }
  }

  const canProceed = () => {
    const value = preferences[currentStepData.key]
    return currentStepData.type === 'single' ? value : value.length > 0
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete(preferences)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '2rem'
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${((currentStep + 1) / steps.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #FFB1EE 0%, #4ecdc4 100%)',
          borderRadius: '2px',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Step Counter */}
      <div style={{
        position: 'absolute',
        top: '3.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.9rem'
      }}>
        Step {currentStep + 1} of {steps.length}
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          margin: '0 0 0.5rem 0'
        }}>
          {currentStepData.title}
        </h2>

        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.1rem',
          margin: '0 0 3rem 0'
        }}>
          {currentStepData.subtitle}
        </p>

        {/* Options Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: currentStepData.options.length > 4 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {currentStepData.options.map((option) => {
            const isSelected = currentStepData.type === 'single' 
              ? preferences[currentStepData.key] === option.id
              : preferences[currentStepData.key].includes(option.id)

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected 
                    ? '2px solid transparent'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  color: isSelected ? '#0f0f23' : 'white'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{option.icon}</span>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      marginBottom: '0.25rem'
                    }}>
                      {option.label}
                    </div>
                    {option.desc && (
                      <div style={{
                        fontSize: '0.9rem',
                        opacity: 0.8
                      }}>
                        {option.desc}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            style={{
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              padding: '0.75rem 1.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: currentStep === 0 ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              background: canProceed() 
                ? 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50px',
              padding: '0.75rem 2rem',
              color: canProceed() ? '#0f0f23' : 'rgba(255, 255, 255, 0.5)',
              cursor: canProceed() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}