import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'
import { useLoading } from '../../providers/LoadingProvider'
import giftpalLogo from '../../assets/giftpal_logo.png'

export default function SignInPage() {
  const [showNameField, setShowNameField] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState('')

  const { intelligentSignIn } = useAuth()
  const { withLoading } = useLoading()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const result = await withLoading(
        async () => {
          return await intelligentSignIn(
            formData.email,
            formData.password,
            formData.name || null
          )
        },
        'Signing you in...'
      )

      if (result.success) {
        // Check if user is new and needs onboarding
        if (result.isNewUser && !result.user?.onboardingComplete) {
          navigate('/onboarding')
        } else {
          // Redirect to profile page for both new and existing users
          navigate('/profile')
        }
      } else {
        setError(result.error || 'Authentication failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .signin-container {
            padding: 1rem !important;
            margin: 0 !important;
          }
          .signin-card {
            padding: 2rem !important;
            margin: 1rem !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .signin-input {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }
      `}</style>

      <div className="signin-container" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
      <div className="signin-card" style={{
        background: 'white',
        borderRadius: '16px',
        padding: '3rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src={giftpalLogo} 
            alt="GIFTPAL Logo" 
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '1rem' }} 
          />
          <h1 style={{ color: '#333', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            GIFTPAL
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            One click to sign in or get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 500 }}>
              Full Name <span style={{ color: '#999', fontWeight: 400 }}>(optional for new users)</span>
            </label>
            <input
              className="signin-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4ecdc4'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 500 }}>
              Email Address
            </label>
            <input
              className="signin-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4ecdc4'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
            <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
              💡 Try "new@example.com" to see new user flow, or "user@example.com" for existing user
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4ecdc4'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7aa 100%)',
              color: 'white',
              border: 'none',
              padding: '0.875rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              marginBottom: '1.5rem'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Continue
          </button>
        </form>

        {/* Info Text */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.4 }}>
            🤖 <strong>Smart Sign-In:</strong> We'll automatically create an account if you're new, or sign you in if you're returning.
            {formData.name && ' ✨ Providing your name helps us personalize your experience.'}
          </p>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#666', 
              textDecoration: 'none', 
              fontSize: '0.9rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#4ecdc4'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
