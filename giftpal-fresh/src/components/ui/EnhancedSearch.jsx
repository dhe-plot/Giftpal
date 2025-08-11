import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const EnhancedSearch = ({ 
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  theme = 'orange',
  className = ''
}) => {
  const getThemeColors = (theme) => {
    const themes = {
      orange: {
        focus: 'focus:ring-orange-500/50 focus:border-orange-500/50',
        icon: 'group-focus-within:text-orange-500'
      },
      purple: {
        focus: 'focus:ring-purple-500/50 focus:border-purple-500/50',
        icon: 'group-focus-within:text-purple-500'
      },
      blue: {
        focus: 'focus:ring-blue-500/50 focus:border-blue-500/50',
        icon: 'group-focus-within:text-blue-500'
      }
    };
    return themes[theme] || themes.orange;
  };

  const colors = getThemeColors(theme);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`mb-8 ${className}`}
    >
      <div className="relative group">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 ${colors.icon} transition-colors`} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full pl-12 pr-12 py-4 bg-gray-800/80 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${colors.focus} focus:bg-gray-800 transition-all duration-300 backdrop-blur-sm`}
        />
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedSearch;
