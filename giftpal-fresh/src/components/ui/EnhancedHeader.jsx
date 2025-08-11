import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EnhancedHeader = ({ 
  title,
  subtitle,
  backTo = "/",
  theme = 'orange',
  actions = [],
  stats = [],
  className = ''
}) => {
  const getThemeColors = (theme) => {
    const themes = {
      orange: {
        gradient: 'from-white to-orange-200',
        border: 'hover:border-orange-500/50',
        text: 'group-hover:text-orange-400'
      },
      purple: {
        gradient: 'from-white to-purple-200',
        border: 'hover:border-purple-500/50',
        text: 'group-hover:text-purple-400'
      },
      blue: {
        gradient: 'from-white to-blue-200',
        border: 'hover:border-blue-500/50',
        text: 'group-hover:text-blue-400'
      }
    };
    return themes[theme] || themes.orange;
  };

  const colors = getThemeColors(theme);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to={backTo}
              className={`group p-3 hover:bg-gray-700/50 rounded-2xl transition-all duration-300 border border-gray-700/50 ${colors.border}`}
            >
              <ArrowLeft className={`w-6 h-6 text-white ${colors.text} group-hover:-translate-x-1 transition-all`} />
            </Link>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-sm md:text-base mt-1"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          {actions.length > 0 && (
            <div className="flex items-center gap-3">
              {actions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.onClick}
                  className={`${action.className || 'p-3 hover:bg-gray-700/50 rounded-2xl transition-all duration-300 border border-gray-700/50 hover:border-gray-500/50'}`}
                >
                  {action.icon}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Stats section */}
        {stats.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-8 text-sm"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedHeader;
