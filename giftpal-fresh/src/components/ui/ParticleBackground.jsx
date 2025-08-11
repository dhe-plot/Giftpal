import React from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({ 
  particleCount = 20, 
  color = 'orange', 
  size = 'w-2 h-2',
  opacity = 0.3,
  speed = 10,
  className = ''
}) => {
  const getColorClass = (color) => {
    const colorMap = {
      orange: 'bg-orange-500/20',
      purple: 'bg-purple-500/20',
      blue: 'bg-blue-500/20',
      pink: 'bg-pink-500/20',
      cyan: 'bg-cyan-500/20',
      green: 'bg-green-500/20'
    };
    return colorMap[color] || 'bg-orange-500/20';
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Floating particles */}
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${size} ${getColorClass(color)} rounded-full`}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * -100, 0],
            opacity: [opacity * 0.5, opacity, opacity * 0.5],
          }}
          transition={{
            duration: speed + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
