import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Heart, 
  User, 
  Baby,
  Crown,
  Briefcase,
  Search,
  Filter,
  ArrowRight,
  Star,
  Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'

const RecipientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const recipients = [
    {
      id: 'mom',
      name: 'Mom',
      icon: <Heart className="w-8 h-8" />,
      description: 'Show your appreciation for the most important woman',
      color: 'from-pink-500 to-rose-500',
      giftCount: 1450,
      popular: true,
      ageRanges: ['30-40', '40-50', '50-60', '60+'],
      interests: ['Home & Garden', 'Beauty', 'Books', 'Jewelry'],
      priceRange: '$25 - $200'
    },
    {
      id: 'dad',
      name: 'Dad',
      icon: <Crown className="w-8 h-8" />,
      description: 'Perfect gifts for the king of the family',
      color: 'from-blue-500 to-indigo-500',
      giftCount: 1320,
      popular: true,
      ageRanges: ['30-40', '40-50', '50-60', '60+'],
      interests: ['Tech', 'Sports', 'Tools', 'Grilling'],
      priceRange: '$30 - $300'
    },
    {
      id: 'wife',
      name: 'Wife',
      icon: <Sparkles className="w-8 h-8" />,
      description: 'Romantic and thoughtful gifts for your partner',
      color: 'from-purple-500 to-pink-500',
      giftCount: 1680,
      popular: true,
      ageRanges: ['20-30', '30-40', '40-50', '50+'],
      interests: ['Jewelry', 'Fashion', 'Spa', 'Experiences'],
      priceRange: '$50 - $500'
    },
    {
      id: 'husband',
      name: 'Husband',
      icon: <User className="w-8 h-8" />,
      description: 'Thoughtful gifts for your life partner',
      color: 'from-gray-600 to-gray-800',
      giftCount: 1520,
      popular: true,
      ageRanges: ['20-30', '30-40', '40-50', '50+'],
      interests: ['Tech', 'Sports', 'Fashion', 'Hobbies'],
      priceRange: '$40 - $400'
    },
    {
      id: 'friend',
      name: 'Friend',
      icon: <Users className="w-8 h-8" />,
      description: 'Celebrate your friendship with perfect gifts',
      color: 'from-green-500 to-emerald-500',
      giftCount: 2100,
      popular: true,
      ageRanges: ['18-25', '25-35', '35-45', '45+'],
      interests: ['Books', 'Games', 'Food', 'Experiences'],
      priceRange: '$15 - $150'
    },
    {
      id: 'kids',
      name: 'Kids',
      icon: <Baby className="w-8 h-8" />,
      description: 'Fun and educational gifts for children',
      color: 'from-yellow-500 to-orange-500',
      giftCount: 1890,
      popular: true,
      ageRanges: ['0-2', '3-5', '6-10', '11-15'],
      interests: ['Toys', 'Books', 'Games', 'Educational'],
      priceRange: '$10 - $100'
    },
    {
      id: 'colleague',
      name: 'Colleague',
      icon: <Briefcase className="w-8 h-8" />,
      description: 'Professional and appropriate workplace gifts',
      color: 'from-teal-500 to-cyan-500',
      giftCount: 850,
      popular: false,
      ageRanges: ['25-35', '35-45', '45-55', '55+'],
      interests: ['Office', 'Coffee', 'Books', 'Desk Accessories'],
      priceRange: '$20 - $100'
    },
    {
      id: 'grandparents',
      name: 'Grandparents',
      icon: <Heart className="w-8 h-8" />,
      description: 'Thoughtful gifts for the wise generation',
      color: 'from-amber-500 to-orange-500',
      giftCount: 720,
      popular: false,
      ageRanges: ['60-70', '70-80', '80+'],
      interests: ['Photos', 'Comfort', 'Health', 'Memories'],
      priceRange: '$25 - $150'
    },
    {
      id: 'teen',
      name: 'Teenager',
      icon: <Star className="w-8 h-8" />,
      description: 'Trendy gifts for the young generation',
      color: 'from-indigo-500 to-purple-500',
      giftCount: 1250,
      popular: true,
      ageRanges: ['13-15', '16-18'],
      interests: ['Tech', 'Fashion', 'Music', 'Gaming'],
      priceRange: '$20 - $200'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Recipients', count: recipients.length },
    { id: 'popular', name: 'Most Popular', count: recipients.filter(r => r.popular).length },
    { id: 'family', name: 'Family', count: 6 },
    { id: 'friends', name: 'Friends & Others', count: 3 }
  ]

  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipient.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'popular' && recipient.popular) ||
                           (selectedCategory === 'family' && ['mom', 'dad', 'wife', 'husband', 'kids', 'grandparents'].includes(recipient.id)) ||
                           (selectedCategory === 'friends' && ['friend', 'colleague', 'teen'].includes(recipient.id))
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Recipients</h1>
              <p className="text-gray-400">Find the perfect gift for everyone in your life</p>
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
                placeholder="Search recipients..."
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

      {/* Recipients Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipients.map((recipient, index) => (
            <motion.div
              key={recipient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Icon and Popular Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${recipient.color} text-white`}>
                    {recipient.icon}
                  </div>
                  {recipient.popular && (
                    <div className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{recipient.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{recipient.description}</p>
                
                {/* Gift Count and Price Range */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm">{recipient.giftCount} gifts</span>
                  <span className="text-orange-400 text-sm font-medium">{recipient.priceRange}</span>
                </div>

                {/* Popular Interests */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Popular Interests</p>
                    <div className="flex flex-wrap gap-1">
                      {recipient.interests.map(interest => (
                        <span 
                          key={interest}
                          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Age Ranges */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Age Ranges</p>
                    <div className="flex flex-wrap gap-1">
                      {recipient.ageRanges.slice(0, 3).map(age => (
                        <span 
                          key={age}
                          className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full"
                        >
                          {age}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Browse gifts</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-orange-500 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRecipients.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No recipients found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl p-6 border border-orange-500/20">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Need help choosing?</h3>
            <p className="text-gray-400 mb-4">Take our gift finder quiz or browse by occasion</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors">
                Take Gift Quiz
              </button>
              <Link 
                to="/occasions"
                className="px-6 py-3 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-colors"
              >
                Browse by Occasion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipientsPage
