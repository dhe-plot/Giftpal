import React, { useState, useEffect } from 'react'
import { Plus, Camera, Video, Image } from 'lucide-react'

export function FloatingStoryButton({ onClick }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 300) // Show after scrolling 300px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function to get responsive positioning
  const getResponsivePosition = () => {
    const isMobile = windowSize.width <= 768
    return {
      bottom: isMobile ? '6rem' : '2rem', // 6rem = 96px to avoid bottom nav
      right: '2rem'
    }
  }

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        ...getResponsivePosition(),
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem'
      }}
    >
      {/* Expanded Options */}
      {isExpanded && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeInUp 0.3s ease-out'
          }}
        >
          <button
            onClick={() => {
              onClick('story')
              setIsExpanded(false)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 99, 71, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '0.75rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(255, 99, 71, 0.3)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 6px 25px rgba(255, 99, 71, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 4px 20px rgba(255, 99, 71, 0.3)'
            }}
          >
            <Image size={18} />
            Story
          </button>

          <button
            onClick={() => {
              onClick('reel')
              setIsExpanded(false)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 20, 147, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '0.75rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(255, 20, 147, 0.3)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 6px 25px rgba(255, 20, 147, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 4px 20px rgba(255, 20, 147, 0.3)'
            }}
          >
            <Video size={18} />
            Reel
          </button>

          <button
            onClick={() => {
              onClick('post')
              setIsExpanded(false)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(78, 205, 196, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '0.75rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(78, 205, 196, 0.3)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)'
              e.target.style.boxShadow = '0 6px 25px rgba(78, 205, 196, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.boxShadow = '0 4px 20px rgba(78, 205, 196, 0.3)'
            }}
          >
            <Camera size={18} />
            Post
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4ecdc4 0%, #45b7aa 100%)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 25px rgba(78, 205, 196, 0.4)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) {
            e.target.style.transform = 'scale(1.1) rotate(0deg)'
            e.target.style.boxShadow = '0 8px 30px rgba(78, 205, 196, 0.5)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) {
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.boxShadow = '0 6px 25px rgba(78, 205, 196, 0.4)'
          }
        }}
      >
        <Plus size={24} />
      </button>

      {/* Backdrop for closing */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'transparent',
            zIndex: -1
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
