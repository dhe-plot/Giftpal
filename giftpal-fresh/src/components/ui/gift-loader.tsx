'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Gift, Heart, Star, Sparkles } from 'lucide-react';

export const GiftLoader = () => {
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [giftCount, setGiftCount] = useState(8);
  const [speed, setSpeed] = useState(0.5);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Inject animation styles
    const styleId = 'gift-loader-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes giftMagic {
          0% {
            transform: scale(0) rotate(0deg);
            filter: blur(0px);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            filter: blur(0.5px);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(360deg);
            filter: blur(1px);
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .gift-box {
          animation: giftMagic calc(3s / var(--speed, 1)) ease infinite alternate;
          animation-delay: var(--delay);
          animation-play-state: var(--play-state, running);
          transform-origin: center;
          will-change: transform;
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
          animation-delay: var(--float-delay);
        }

        .sparkle-icon {
          animation: sparkle 2s ease-in-out infinite;
          animation-delay: var(--sparkle-delay);
        }

        .heart-icon {
          animation: heartbeat 1.5s ease-in-out infinite;
          animation-delay: var(--heart-delay);
        }

        /* Control panel styles */
        .control-panel {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-track {
          background: rgba(255, 177, 238, 0.2);
          height: 4px;
          border-radius: 2px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background: #FFB1EE;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-top: -6px;
          box-shadow: 0 0 10px rgba(255, 177, 238, 0.5);
          transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 177, 238, 0.8);
        }

        @media (max-width: 640px) {
          .control-panel {
            flex-direction: column !important;
            width: calc(100vw - 2rem) !important;
            max-width: 320px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      const style = document.getElementById(styleId);
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const gifts = useMemo(() => {
    return Array.from({ length: giftCount }, (_, i) => {
      const index = i + 1;
      const hue = (index * 360 / giftCount) % 360;
      return {
        id: index,
        padding: index * 15,
        offset: index * -15,
        color: `hsl(${300 + hue / 4}, 70%, 65%)`, // Pink to purple gradient
        delay: i * 0.15,
        size: 20 + (index * 2),
      };
    });
  }, [giftCount]);

  if (!mounted) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#181A20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Gift size={48} color="#FFB1EE" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'radial-gradient(ellipse at center, #181A20 0%, #0a0a0a 100%)',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Floating gift icons background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={`bg-gift-${i}`}
            className="floating-icon"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--float-delay': `${Math.random() * 3}s`,
            }}
          >
            <Gift 
              size={12 + Math.random() * 8} 
              color="#FFB1EE" 
              style={{ opacity: 0.3 + Math.random() * 0.4 }}
            />
          </div>
        ))}
        
        {/* Sparkle effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="sparkle-icon"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--sparkle-delay': `${Math.random() * 2}s`,
            }}
          >
            <Sparkles 
              size={8 + Math.random() * 6} 
              color="#5E9BFF" 
              style={{ opacity: 0.4 + Math.random() * 0.6 }}
            />
          </div>
        ))}

        {/* Heart effects */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="heart-icon"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--heart-delay': `${Math.random() * 1.5}s`,
            }}
          >
            <Heart 
              size={10 + Math.random() * 8} 
              color="#48F08B" 
              style={{ opacity: 0.3 + Math.random() * 0.5 }}
            />
          </div>
        ))}
      </div>

      {/* Main gift animation */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}>
        <div style={{ position: 'relative' }}>
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="gift-box"
              style={{
                position: 'absolute',
                boxSizing: 'content-box',
                padding: `${gift.padding}px`,
                top: `${gift.offset}px`,
                left: `${gift.offset}px`,
                border: `2px solid ${gift.color}`,
                borderRadius: '8px',
                background: `linear-gradient(45deg, ${gift.color}20, transparent)`,
                boxShadow: `0 0 ${gift.size}px ${gift.color}, inset 0 0 ${gift.size/2}px rgba(255, 255, 255, 0.1)`,
                '--delay': `${gift.delay}s`,
                '--speed': speed,
                '--play-state': isPaused ? 'paused' : 'running',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Gift 
                size={gift.size} 
                color={gift.color}
                style={{ 
                  filter: `drop-shadow(0 0 ${gift.size/4}px ${gift.color})`,
                  opacity: 0.8 
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Brand title */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: '120px',
        textAlign: 'center',
        zIndex: 10,
      }}>
        <h1 style={{
          color: '#FFB1EE',
          fontSize: '3rem',
          fontWeight: '700',
          letterSpacing: '2px',
          textShadow: '0 0 20px rgba(255, 177, 238, 0.5)',
          margin: '0 0 0.5rem 0',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          MR GIFT
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '1.2rem',
          fontWeight: '400',
          letterSpacing: '1px',
          margin: 0,
        }}>
          Discover Perfect Gifts
        </p>
      </div>

      {/* Loading indicator */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          border: '2px solid transparent',
          borderTopColor: '#FFB1EE',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        Loading your gift experience...
      </div>
    </div>
  );
};
