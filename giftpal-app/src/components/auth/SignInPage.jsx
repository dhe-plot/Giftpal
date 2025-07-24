import React, { useState, useEffect, useRef } from 'react'
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
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [particles, setParticles] = useState([])
  const containerRef = useRef(null)

  const { intelligentSignIn } = useAuth()
  const { withLoading } = useLoading()
  const navigate = useNavigate()

  // Initialize particles and form animation
  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }))
    setParticles(newParticles)

    // Animate form entrance
    setTimeout(() => setIsFormVisible(true), 300)

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -5 ? 105 : particle.y - particle.speed * 0.1
      })))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleInputBlur = () => {
    setFocusedField(null)
  }

  const createRipple = (e) => {
    const button = e.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('ripple')

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
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
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes rippleEffect {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
        }

        .signin-card {
          animation: ${isFormVisible ? 'slideInUp 0.8s ease-out' : 'none'};
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .signin-input {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .signin-input:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(78, 205, 196, 0.2);
        }

        .signin-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .signin-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(78, 205, 196, 0.3);
        }

        .signin-button:active {
          transform: translateY(0);
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          animation: rippleEffect 0.6s linear;
          pointer-events: none;
        }

        .error-shake {
          animation: shake 0.5s ease-in-out;
        }

        .field-glow {
          box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
        }

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

      <div
        ref={containerRef}
        className="signin-container"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite reverse'
        }} />
        <div className="signin-card" style={{
          borderRadius: '24px',
          padding: '3rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              <img
                src={giftpalLogo}
                alt="GIFTPAL Logo"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1) rotate(5deg)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'}
              />
              <div style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '20px',
                height: '20px',
                background: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
            </div>
            <h1 style={{
              color: '#333',
              fontSize: '2.5rem',
              fontWeight: 800,
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              GIFTPAL
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              opacity: 0.8
            }}>
              ✨ One click to sign in or get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.8rem',
                color: '#333',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}>
                👤 Full Name <span style={{ color: '#999', fontWeight: 400 }}>(optional for new users)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`signin-input ${focusedField === 'name' ? 'field-glow' : ''}`}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('name')}
                  onBlur={handleInputBlur}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: `2px solid ${focusedField === 'name' ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.2rem',
                  color: focusedField === 'name' ? '#4ecdc4' : '#999',
                  transition: 'color 0.3s ease'
                }}>
                  👤
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.8rem',
                color: '#333',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}>
                📧 Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`signin-input ${focusedField === 'email' ? 'field-glow' : ''}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('email')}
                  onBlur={handleInputBlur}
                  required
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: `2px solid ${focusedField === 'email' ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.2rem',
                  color: focusedField === 'email' ? '#4ecdc4' : '#999',
                  transition: 'color 0.3s ease'
                }}>
                  📧
                </div>
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#666',
                marginTop: '0.8rem',
                padding: '0.5rem',
                background: 'rgba(78, 205, 196, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(78, 205, 196, 0.2)'
              }}>
                💡 Try "new@example.com" to see new user flow, or "user@example.com" for existing user
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.8rem',
                color: '#333',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}>
                🔒 Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`signin-input ${focusedField === 'password' ? 'field-glow' : ''}`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={handleInputBlur}
                  required
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: `2px solid ${focusedField === 'password' ? '#4ecdc4' : '#e1e5e9'}`,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.9)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.2rem',
                  color: focusedField === 'password' ? '#4ecdc4' : '#999',
                  transition: 'color 0.3s ease'
                }}>
                  🔒
                </div>
              </div>
            </div>

            {error && (
              <div
                className="error-shake"
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="signin-button"
              onClick={createRipple}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                color: 'white',
                border: 'none',
                padding: '1.2rem',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 25px rgba(78, 205, 196, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🚀</span>
              Continue
            </button>
        </form>

          {/* Info Text */}
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(68, 160, 141, 0.1))',
            borderRadius: '16px',
            border: '1px solid rgba(78, 205, 196, 0.2)'
          }}>
            <p style={{
              color: '#555',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              margin: 0
            }}>
              🤖 <strong>Smart Sign-In:</strong> We'll automatically create an account if you're new, or sign you in if you're returning.
              {formData.name && (
                <span style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  color: '#4ecdc4',
                  fontWeight: 600
                }}>
                  ✨ Providing your name helps us personalize your experience!
                </span>
              )}
            </p>
          </div>

          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link
              to="/"
              style={{
                color: '#666',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#4ecdc4'
                e.target.style.background = 'rgba(78, 205, 196, 0.1)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#666'
                e.target.style.background = 'rgba(255, 255, 255, 0.5)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span>←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
