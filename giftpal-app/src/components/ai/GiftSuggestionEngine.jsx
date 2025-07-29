import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Heart,
  Star,
  Filter,
  RefreshCw,
  ShoppingBag,
  User,
  Calendar,
  DollarSign,
  Zap,
  Cpu,
  Award
} from 'lucide-react'
import SectionWithMockup from '../ui/SectionWithMockup'

const GiftSuggestionEngine = ({ recipient, occasion, budget }) => {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
    popularity: 'all'
  })

  // AI-powered gift suggestions based on multiple factors
  const generateSuggestions = async (recipientData, occasionType, budgetRange) => {
    setLoading(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const aiSuggestions = [
      {
        id: 1,
        name: "Smart Fitness Tracker",
        price: 89,
        category: "Tech & Fitness",
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300",
        aiScore: 95,
        reasoning: "Based on their love for yoga and fitness tracking habits",
        tags: ["Health", "Tech", "Daily Use"],
        popularity: 4.8,
        reviews: 1247,
        personalizedNote: "Perfect for tracking yoga sessions and daily activity",
        giftWrapAvailable: true,
        deliveryTime: "2-3 days",
        similarGifts: 3
      },
      {
        id: 2,
        name: "Premium Tea Collection",
        price: 45,
        category: "Food & Beverage",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300",
        aiScore: 92,
        reasoning: "Matches their preference for mindful living and wellness",
        tags: ["Wellness", "Relaxation", "Premium"],
        popularity: 4.6,
        reviews: 892,
        personalizedNote: "Curated selection of calming herbal teas",
        giftWrapAvailable: true,
        deliveryTime: "1-2 days",
        similarGifts: 5
      },
      {
        id: 3,
        name: "Meditation Cushion Set",
        price: 65,
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
        aiScore: 88,
        reasoning: "Complements their yoga practice and mindfulness journey",
        tags: ["Meditation", "Comfort", "Mindfulness"],
        popularity: 4.7,
        reviews: 634,
        personalizedNote: "Ergonomic design for comfortable meditation",
        giftWrapAvailable: true,
        deliveryTime: "3-5 days",
        similarGifts: 4
      },
      {
        id: 4,
        name: "Artisan Coffee Subscription",
        price: 35,
        category: "Food & Beverage",
        image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300",
        aiScore: 85,
        reasoning: "Monthly surprise aligns with their love for new experiences",
        tags: ["Subscription", "Coffee", "Monthly"],
        popularity: 4.5,
        reviews: 2156,
        personalizedNote: "3-month subscription to discover new flavors",
        giftWrapAvailable: false,
        deliveryTime: "Next month",
        similarGifts: 7
      },
      {
        id: 5,
        name: "Sustainable Yoga Mat",
        price: 78,
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
        aiScore: 90,
        reasoning: "Eco-friendly option matching their environmental values",
        tags: ["Eco-Friendly", "Yoga", "Premium"],
        popularity: 4.9,
        reviews: 543,
        personalizedNote: "Made from recycled materials, perfect grip",
        giftWrapAvailable: true,
        deliveryTime: "2-4 days",
        similarGifts: 2
      },
      {
        id: 6,
        name: "Mindfulness Journal",
        price: 28,
        category: "Books & Stationery",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
        aiScore: 82,
        reasoning: "Supports their reflective and mindful lifestyle",
        tags: ["Journaling", "Mindfulness", "Self-Care"],
        popularity: 4.4,
        reviews: 789,
        personalizedNote: "Guided prompts for daily reflection",
        giftWrapAvailable: true,
        deliveryTime: "1-2 days",
        similarGifts: 6
      }
    ]
    
    setSuggestions(aiSuggestions)
    setLoading(false)
  }

  useEffect(() => {
    if (recipient && occasion) {
      generateSuggestions(recipient, occasion, budget)
    }
  }, [recipient, occasion, budget])

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-yellow-500'
    return 'text-orange-500'
  }

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-500/20'
    if (score >= 80) return 'bg-yellow-500/20'
    return 'bg-orange-500/20'
  }

  const filteredSuggestions = suggestions.filter(suggestion => {
    const priceMatch = filters.priceRange === 'all' || 
      (filters.priceRange === 'under50' && suggestion.price < 50) ||
      (filters.priceRange === '50to100' && suggestion.price >= 50 && suggestion.price <= 100) ||
      (filters.priceRange === 'over100' && suggestion.price > 100)
    
    const categoryMatch = filters.category === 'all' || suggestion.category.toLowerCase().includes(filters.category.toLowerCase())
    
    const popularityMatch = filters.popularity === 'all' ||
      (filters.popularity === 'high' && suggestion.popularity >= 4.5) ||
      (filters.popularity === 'medium' && suggestion.popularity >= 4.0 && suggestion.popularity < 4.5)
    
    return priceMatch && categoryMatch && popularityMatch
  })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <SectionWithMockup
        title={
          <>
            AI-Powered
            <br />
            Gift Intelligence
          </>
        }
        description={
          <>
            Advanced algorithms analyze personality, preferences, and trends.
            <br />
            Get personalized recommendations with 95% accuracy matching.
            <br />
            Discover perfect gifts that create lasting memories.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
        secondaryImageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      />

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Gift Suggestions</h1>
              <p className="text-gray-400">Powered by advanced recommendation algorithms</p>
            </div>
          </div>
          <button
            onClick={() => generateSuggestions(recipient, occasion, budget)}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold">Personality Match</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">95%</p>
            <p className="text-sm text-gray-400">AI personality analysis accuracy</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold">Trend Alignment</h3>
            </div>
            <p className="text-2xl font-bold text-blue-500">87%</p>
            <p className="text-sm text-gray-400">Current market trend matching</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-pink-500" />
              <h3 className="font-semibold">Satisfaction Rate</h3>
            </div>
            <p className="text-2xl font-bold text-pink-500">91%</p>
            <p className="text-sm text-gray-400">Predicted recipient happiness</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold">AI Confidence</h3>
            </div>
            <p className="text-2xl font-bold text-purple-500">96%</p>
            <p className="text-sm text-gray-400">Machine learning certainty</p>
          </div>
        </div>

        {/* Feature Showcase */}
        <SectionWithMockup
          title={
            <>
              Advanced Machine Learning
              <br />
              <span className="text-purple-500">Algorithms</span>
            </>
          }
          description={
            <>
              Our AI processes millions of gift preferences, purchase patterns,
              <br />
              and social signals to deliver personalized recommendations with
              <br />
              industry-leading accuracy and satisfaction rates.
            </>
          }
          primaryImageSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600"
          secondaryImageSrc="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="over100">Over $100</option>
            </select>
          </div>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Categories</option>
            <option value="tech">Tech & Gadgets</option>
            <option value="wellness">Wellness</option>
            <option value="food">Food & Beverage</option>
            <option value="fitness">Fitness</option>
          </select>
          
          <select
            value={filters.popularity}
            onChange={(e) => setFilters({...filters, popularity: e.target.value})}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Ratings</option>
            <option value="high">4.5+ Stars</option>
            <option value="medium">4.0+ Stars</option>
          </select>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center gap-3 bg-gray-800 rounded-xl px-6 py-4">
                <Zap className="w-6 h-6 text-purple-500 animate-pulse" />
                <span className="text-lg">AI is analyzing preferences...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-colors group"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={suggestion.image}
                    alt={suggestion.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 right-3 ${getScoreBg(suggestion.aiScore)} rounded-full px-2 py-1`}>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span className={`text-sm font-bold ${getScoreColor(suggestion.aiScore)}`}>
                        {suggestion.aiScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white text-lg">{suggestion.name}</h3>
                    <span className="text-xl font-bold text-green-500">${suggestion.price}</span>
                  </div>

                  <p className="text-gray-400 text-sm mb-3">{suggestion.personalizedNote}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-yellow-500">{suggestion.popularity}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({suggestion.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestion.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-400 mb-1">AI Reasoning:</p>
                    <p className="text-sm text-gray-300">{suggestion.reasoning}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors">
                      Add to Cart
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredSuggestions.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No suggestions found</h3>
            <p className="text-gray-500">Try adjusting your filters or refresh for new suggestions</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GiftSuggestionEngine
