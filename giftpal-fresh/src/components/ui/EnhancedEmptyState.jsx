import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedEmptyState = ({ 
  show,
  icon = "🔍",
  title = "Nothing found",
  description = "Try adjusting your search or filters",
  actions = [],
  theme = 'orange',
  className = ''
}) => {
  const getThemeColors = (theme) => {
    const themes = {
      orange: {
        primary: 'from-orange-500 to-pink-500',
        secondary: 'border-orange-500/50 text-orange-400 hover:bg-orange-500'
      },
      purple: {
        primary: 'from-purple-500 to-pink-500',
        secondary: 'border-purple-500/50 text-purple-400 hover:bg-purple-500'
      },
      blue: {
        primary: 'from-blue-500 to-cyan-500',
        secondary: 'border-blue-500/50 text-blue-400 hover:bg-blue-500'
      }
    };
    return themes[theme] || themes.orange;
  };

  const colors = getThemeColors(theme);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`text-center py-20 ${className}`}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-6"
          >
            {icon}
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mb-3"
          >
            {title}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-8 max-w-md mx-auto"
          >
            {description}
          </motion.p>
          
          {actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    action.primary 
                      ? `bg-gradient-to-r ${colors.primary} text-white hover:shadow-lg`
                      : `border ${colors.secondary} hover:text-white`
                  }`}
                >
                  {action.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedEmptyState;
