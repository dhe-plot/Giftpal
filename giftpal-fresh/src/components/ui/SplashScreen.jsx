import React, { useState, useEffect } from 'react'
import { Gift, Sparkles, Heart, Star } from 'lucide-react'
import giftpalLogo from '../../assets/giftpal_logo.png'

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [showText, setShowText] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      type: ['gift', 'sparkle', 'heart', 'star'][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)

    // Animation sequence
    setTimeout(() => setShowLogo(true), 300)
    setTimeout(() => setShowText(true), 800)

    // Progress animation - slower for 3-5 seconds total
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => onComplete(), 300)
          return 100
        }
        return prev + 1 // Slower progress increment
      })
    }, 40) // Slightly faster interval but smaller increment

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -10 ? 110 : particle.y - particle.speed * 0.1,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
      })))
    }

    const particleInterval = setInterval(animateParticles, 50)

    return () => {
      clearInterval(progressInterval)
      clearInterval(particleInterval)
    }
  }, [onComplete])

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
          transform: `scale(${0.5 + Math.sin(Date.now() * 0.003 + particle.id) * 0.2})`,
          transition: 'transform 0.3s ease'
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
      zIndex: 10000,
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 177, 238, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(94, 155, 255, 0.1) 0%, transparent 50%)
        `
      }} />

      {/* Floating Particles */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {particles.map(renderParticle)}
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        zIndex: 1
      }}>
        {/* Logo */}
        <div style={{
          transform: showLogo ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
          opacity: showLogo ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(78, 205, 196, 0.3)',
            animation: showLogo ? 'pulse 2s ease-in-out infinite' : 'none'
          }}>
            <img 
              src={giftpalLogo} 
              alt="GIFTPAL" 
              style={{ 
                width: '80px', 
                height: '80px',
                filter: 'brightness(1.2)'
              }} 
            />
          </div>
          
          {/* Glow effect */}
          <div style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 100%)',
            opacity: 0.3,
            filter: 'blur(20px)',
            animation: showLogo ? 'glow 3s ease-in-out infinite alternate' : 'none'
          }} />
        </div>

        {/* Brand Text */}
        <div style={{
          transform: showText ? 'translateY(0)' : 'translateY(30px)',
          opacity: showText ? 1 : 0,
          transition: 'all 0.8s ease-out 0.3s',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #FFB1EE 0%, #4ecdc4 50%, #5E9BFF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            margin: 0,
            letterSpacing: '0.1em'
          }}>
            GIFTPAL
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.2rem',
            margin: '0.5rem 0 0 0',
            fontWeight: '300'
          }}>
            The Social Gifting Platform
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '300px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          transform: showText ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.5s ease-out 0.6s'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFB1EE 0%, #4ecdc4 50%, #5E9BFF 100%)',
            borderRadius: '2px',
            transition: 'width 0.3s ease-out',
            boxShadow: '0 0 10px rgba(78, 205, 196, 0.5)'
          }} />
        </div>

        {/* Loading Text */}
        <div style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem',
          transform: showText ? 'translateY(0)' : 'translateY(20px)',
          opacity: showText ? 1 : 0,
          transition: 'all 0.5s ease-out 0.8s'
        }}>
          Loading amazing gifts... {Math.round(progress)}%
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes glow {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
