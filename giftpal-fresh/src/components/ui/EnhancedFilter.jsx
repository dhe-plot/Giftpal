import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SlidersHorizontal, ChevronDown } from 'lucide-react';

const EnhancedFilter = ({ 
  categories,
  selectedCategory,
  onCategoryChange,
  showFilters,
  onToggleFilters,
  title = "Categories",
  theme = 'orange',
  additionalFilters = null,
  className = ''
}) => {
  const getThemeColors = (theme) => {
    const themes = {
      orange: {
        gradient: 'from-orange-500 to-pink-500',
        icon: 'text-orange-500',
        border: 'hover:border-orange-500/50'
      },
      purple: {
        gradient: 'from-purple-500 to-pink-500',
        icon: 'text-purple-500',
        border: 'hover:border-purple-500/50'
      },
      blue: {
        gradient: 'from-blue-500 to-cyan-500',
        icon: 'text-blue-500',
        border: 'hover:border-blue-500/50'
      }
    };
    return themes[theme] || themes.orange;
  };

  const colors = getThemeColors(theme);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`mb-8 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className={`w-5 h-5 ${colors.icon}`} />
          {title}
        </h3>
        {additionalFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleFilters}
            className={`flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white ${colors.border} transition-all duration-300`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>
        )}
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id || category}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            onClick={() => onCategoryChange(category.id || category)}
            className={`group relative px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              selectedCategory === (category.id || category)
                ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg shadow-${theme}-500/25`
                : `bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/50 ${colors.border}`
            }`}
          >
            <span className="relative z-10">
              {category.name || category}
              {category.count && ` (${category.count})`}
            </span>
            {selectedCategory === (category.id || category) && (
              <motion.div
                layoutId="activeFilter"
                className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-2xl`}
                style={{ zIndex: -1 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Additional Filters */}
      {additionalFilters && (
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
            >
              {additionalFilters}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default EnhancedFilter;
