import React, { useState, useEffect } from 'react'
import { Gift, Sparkles, Heart, ArrowRight, Users, Brain, Star } from 'lucide-react'
import giftpalLogo from '../../assets/giftpal_logo.png'

export default function LandingPage({ onGetStarted }) {
  const [showContent, setShowContent] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Show content with animation
    setTimeout(() => setShowContent(true), 300)

    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      speed: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      type: ['gift', 'sparkle', 'heart', 'star'][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -10 ? 110 : particle.y - particle.speed * 0.05,
        x: particle.x + Math.sin(Date.now() * 0.0008 + particle.id) * 0.05
      })))
    }

    const particleInterval = setInterval(animateParticles, 100)
    return () => clearInterval(particleInterval)
  }, [])

  const renderParticle = (particle) => {
    const icons = {
      gift: <Gift size={particle.size} />,
      sparkle: <Sparkles size={particle.size} />,
      heart: <Heart size={particle.size} />,
      star: <Star size={particle.size} />
    }

    const colors = {
      gift: '#FFB1EE',
      sparkle: '#5E9BFF',
      heart: '#48F08B',
      star: '#FFD700'
    }

    return (
      <div
        key={particle.id}
        style={{
          position: 'absolute',
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          color: colors[particle.type],
          opacity: particle.opacity,
          transform: `scale(${0.4 + Math.sin(Date.now() * 0.002 + particle.id) * 0.1})`,
          transition: 'transform 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        {icons[particle.type]}
      </div>
    )
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
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 177, 238, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(94, 155, 255, 0.08) 0%, transparent 50%)
        `
      }} />

      {/* Floating Particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {particles.map(renderParticle)}
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
        zIndex: 1,
        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
        opacity: showContent ? 1 : 0,
        transition: 'all 0.8s ease-out'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '2rem',
          transform: showContent ? 'scale(1)' : 'scale(0.8)',
          transition: 'transform 0.8s ease-out 0.2s'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 15px 30px rgba(78, 205, 196, 0.2)'
          }}>
            <img 
              src={giftpalLogo} 
              alt="GIFTPAL" 
              style={{ 
                width: '65px', 
                height: '65px',
                filter: 'brightness(1.2)'
              }} 
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 50%, #5E9BFF 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          margin: '0 0 1rem 0',
          letterSpacing: '0.05em',
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          opacity: showContent ? 1 : 0,
          transition: 'all 0.8s ease-out 0.4s'
        }}>
          GIFTPAL
        </h1>

        {/* Main Description */}
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.3rem',
          lineHeight: '1.6',
          margin: '0 0 2.5rem 0',
          fontWeight: '300',
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          opacity: showContent ? 1 : 0,
          transition: 'all 0.8s ease-out 0.6s'
        }}>
          Let our intelligent gift recommendation engine find the perfect presents for your loved ones. 
          Simply tell us about the recipient and occasion, and we'll curate personalized gift suggestions 
          that create lasting memories.
        </p>

        {/* Feature Icons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          margin: '2rem 0 3rem 0',
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          opacity: showContent ? 1 : 0,
          transition: 'all 0.8s ease-out 0.8s'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255, 177, 238, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem auto',
              border: '2px solid rgba(255, 177, 238, 0.3)'
            }}>
              <Brain size={24} color="#FFB1EE" />
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              AI-Powered
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(78, 205, 196, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem auto',
              border: '2px solid rgba(78, 205, 196, 0.3)'
            }}>
              <Users size={24} color="#4ecdc4" />
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Personalized
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(94, 155, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem auto',
              border: '2px solid rgba(94, 155, 255, 0.3)'
            }}>
              <Heart size={24} color="#5E9BFF" />
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
              Memorable
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={onGetStarted}
          style={{
            background: 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 100%)',
            border: 'none',
            borderRadius: '50px',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#0f0f23',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto',
            boxShadow: '0 10px 25px rgba(78, 205, 196, 0.3)',
            transform: showContent ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
            opacity: showContent ? 1 : 0,
            transition: 'all 0.8s ease-out 1s, transform 0.2s ease-out',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)'
            e.target.style.boxShadow = '0 15px 35px rgba(78, 205, 196, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)'
            e.target.style.boxShadow = '0 10px 25px rgba(78, 205, 196, 0.3)'
          }}
        >
          Get Started
          <ArrowRight size={20} />
          
          {/* Button shine effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            animation: showContent ? 'shine 2s ease-in-out infinite' : 'none'
          }} />
        </button>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  )
}