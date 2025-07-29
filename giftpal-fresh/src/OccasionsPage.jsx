import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Heart, 
  Gift, 
  Star, 
  Cake, 
  GraduationCap,
  Home,
  Baby,
  Search,
  Filter,
  ArrowRight,
  Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'

const OccasionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const occasions = [
    {
      id: 'birthday',
      name: 'Birthday',
      icon: <Cake className="w-8 h-8" />,
      description: 'Make their special day unforgettable',
      color: 'from-pink-500 to-rose-500',
      giftCount: 1250,
      trending: true,
      subcategories: ['Kids Birthday', 'Adult Birthday', 'Milestone Birthday', 'Surprise Party']
    },
    {
      id: 'anniversary',
      name: 'Anniversary',
      icon: <Heart className="w-8 h-8" />,
      description: 'Celebrate love and milestones',
      color: 'from-red-500 to-pink-500',
      giftCount: 890,
      trending: false,
      subcategories: ['Wedding Anniversary', 'Dating Anniversary', 'Work Anniversary']
    },
    {
      id: 'graduation',
      name: 'Graduation',
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Honor their achievements',
      color: 'from-blue-500 to-indigo-500',
      giftCount: 650,
      trending: true,
      subcategories: ['High School', 'College', 'Graduate School', 'Professional Certification']
    },
    {
      id: 'wedding',
      name: 'Wedding',
      icon: <Gift className="w-8 h-8" />,
      description: 'Perfect gifts for the happy couple',
      color: 'from-purple-500 to-pink-500',
      giftCount: 980,
      trending: false,
      subcategories: ['Engagement', 'Bridal Shower', 'Bachelor Party', 'Wedding Day']
    },
    {
      id: 'housewarming',
      name: 'Housewarming',
      icon: <Home className="w-8 h-8" />,
      description: 'Welcome them to their new home',
      color: 'from-green-500 to-emerald-500',
      giftCount: 420,
      trending: false,
      subcategories: ['First Home', 'New Apartment', 'Office Space', 'Renovation']
    },
    {
      id: 'baby-shower',
      name: 'Baby Shower',
      icon: <Baby className="w-8 h-8" />,
      description: 'Celebrate the new arrival',
      color: 'from-yellow-500 to-orange-500',
      giftCount: 780,
      trending: true,
      subcategories: ['Baby Boy', 'Baby Girl', 'Gender Neutral', 'Mom-to-be']
    },
    {
      id: 'holiday',
      name: 'Holiday',
      icon: <Star className="w-8 h-8" />,
      description: 'Seasonal and holiday celebrations',
      color: 'from-indigo-500 to-purple-500',
      giftCount: 1500,
      trending: true,
      subcategories: ['Christmas', 'Valentine\'s Day', 'Mother\'s Day', 'Father\'s Day', 'Easter']
    },
    {
      id: 'just-because',
      name: 'Just Because',
      icon: <Heart className="w-8 h-8" />,
      description: 'Show you care any day',
      color: 'from-teal-500 to-cyan-500',
      giftCount: 950,
      trending: false,
      subcategories: ['Thank You', 'Thinking of You', 'Apology', 'Random Acts of Kindness']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Occasions', count: occasions.length },
    { id: 'trending', name: 'Trending', count: occasions.filter(o => o.trending).length },
    { id: 'seasonal', name: 'Seasonal', count: 3 },
    { id: 'milestone', name: 'Milestones', count: 4 }
  ]

  const filteredOccasions = occasions.filter(occasion => {
    const matchesSearch = occasion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         occasion.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'trending' && occasion.trending) ||
                           (selectedCategory === 'seasonal' && ['holiday'].includes(occasion.id)) ||
                           (selectedCategory === 'milestone' && ['graduation', 'wedding', 'anniversary'].includes(occasion.id))
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Occasions</h1>
              <p className="text-gray-400">Find the perfect gift for every special moment</p>
            </div>
            <Link 
              to="/" 
              className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search occasions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Occasions Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOccasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Icon and Trending Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${occasion.color} text-white`}>
                    {occasion.icon}
                  </div>
                  {occasion.trending && (
                    <div className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                      <Clock className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{occasion.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{occasion.description}</p>
                
                {/* Gift Count */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm">{occasion.giftCount} gifts available</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
                </div>

                {/* Subcategories */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Popular Categories</p>
                  <div className="flex flex-wrap gap-1">
                    {occasion.subcategories.slice(0, 3).map(sub => (
                      <span 
                        key={sub}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                    {occasion.subcategories.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{occasion.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOccasions.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No occasions found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl p-6 border border-orange-500/20">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Can't find the right occasion?</h3>
            <p className="text-gray-400 mb-4">Browse our full gift collection or get personalized recommendations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/gifts"
                className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                Browse All Gifts
              </Link>
              <button className="px-6 py-3 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-colors">
                Get Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OccasionsPage
