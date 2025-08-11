import React from 'react';
import { motion } from 'framer-motion';

const GradientOrbs = ({ 
  mousePosition = { x: 0, y: 0 },
  theme = 'orange',
  className = ''
}) => {
  const getThemeGradients = (theme) => {
    const themes = {
      orange: {
        orb1: 'from-orange-500/10 to-pink-500/10',
        orb2: 'from-purple-500/10 to-blue-500/10'
      },
      purple: {
        orb1: 'from-purple-500/10 to-pink-500/10',
        orb2: 'from-blue-500/10 to-cyan-500/10'
      },
      blue: {
        orb1: 'from-blue-500/10 to-cyan-500/10',
        orb2: 'from-purple-500/10 to-pink-500/10'
      },
      green: {
        orb1: 'from-green-500/10 to-emerald-500/10',
        orb2: 'from-teal-500/10 to-cyan-500/10'
      }
    };
    return themes[theme] || themes.orange;
  };

  const gradients = getThemeGradients(theme);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary gradient orb */}
      <motion.div
        className={`absolute w-96 h-96 bg-gradient-to-r ${gradients.orb1} rounded-full blur-3xl`}
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        style={{ left: '10%', top: '20%' }}
      />
      
      {/* Secondary gradient orb */}
      <motion.div
        className={`absolute w-80 h-80 bg-gradient-to-r ${gradients.orb2} rounded-full blur-3xl`}
        animate={{
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
        }}
        style={{ right: '10%', bottom: '20%' }}
      />
      
      {/* Additional smaller orbs */}
      <motion.div
        className={`absolute w-64 h-64 bg-gradient-to-r ${gradients.orb1} rounded-full blur-2xl opacity-50`}
        animate={{
          x: mousePosition.x * 0.015,
          y: mousePosition.y * 0.015,
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ left: '60%', top: '60%' }}
      />
    </div>
  );
};

export default GradientOrbs;
