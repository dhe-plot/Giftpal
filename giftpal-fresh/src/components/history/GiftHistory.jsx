import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Gift,
  Calendar,
  DollarSign,
  TrendingUp,
  User,
  Heart,
  Star,
  Filter,
  Download,
  Eye,
  EyeOff,
  BarChart3,
  PieChart,
  Shield,
  Target
} from 'lucide-react'
import SectionWithMockup from '../ui/section-with-mockup'

const GiftHistory = () => {
  const [giftHistory, setGiftHistory] = useState([])
  const [stats, setStats] = useState({})
  const [filterYear, setFilterYear] = useState('all')
  const [filterPerson, setFilterPerson] = useState('all')
  const [showPrivateMode, setShowPrivateMode] = useState(true)

  // Sample gift history data - private to user only
  const sampleHistory = [
    {
      id: 1,
      recipientName: "Sarah Johnson",
      recipientAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      giftName: "Premium Yoga Mat",
      occasion: "Birthday",
      date: "2024-01-15",
      amount: 85,
      category: "Fitness",
      rating: 5,
      notes: "She loved it! Perfect for her morning yoga routine.",
      relationship: "Friend",
      success: true
    },
    {
      id: 2,
      recipientName: "Mike Chen",
      recipientAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      giftName: "Wireless Gaming Headset",
      occasion: "Christmas",
      date: "2023-12-25",
      amount: 120,
      category: "Tech",
      rating: 4,
      notes: "Good quality, he uses it daily for gaming.",
      relationship: "Brother",
      success: true
    },
    {
      id: 3,
      recipientName: "Emma Wilson",
      recipientAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      giftName: "Art Supply Set",
      occasion: "Graduation",
      date: "2023-06-10",
      amount: 65,
      category: "Art",
      rating: 5,
      notes: "Perfect for her new art hobby. She was thrilled!",
      relationship: "Colleague",
      success: true
    },
    {
      id: 4,
      recipientName: "Dad",
      recipientAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
      giftName: "Coffee Subscription",
      occasion: "Father's Day",
      date: "2023-06-18",
      amount: 45,
      category: "Food & Drink",
      rating: 4,
      notes: "Enjoys trying different coffee varieties.",
      relationship: "Family",
      success: true
    },
    {
      id: 5,
      recipientName: "Lisa Park",
      recipientAvatar: "https://randomuser.me/api/portraits/women/5.jpg",
      giftName: "Skincare Set",
      occasion: "Birthday",
      date: "2023-03-22",
      amount: 75,
      category: "Beauty",
      rating: 3,
      notes: "She liked it but already had similar products.",
      relationship: "Friend",
      success: false
    }
  ]

  useEffect(() => {
    setGiftHistory(sampleHistory)
    
    // Calculate stats
    const totalSpent = sampleHistory.reduce((sum, gift) => sum + gift.amount, 0)
    const avgRating = sampleHistory.reduce((sum, gift) => sum + gift.rating, 0) / sampleHistory.length
    const successRate = (sampleHistory.filter(gift => gift.success).length / sampleHistory.length) * 100
    
    setStats({
      totalSpent,
      totalGifts: sampleHistory.length,
      avgRating: avgRating.toFixed(1),
      successRate: successRate.toFixed(0)
    })
  }, [])

  const filteredHistory = giftHistory.filter(gift => {
    const yearMatch = filterYear === 'all' || new Date(gift.date).getFullYear().toString() === filterYear
    const personMatch = filterPerson === 'all' || gift.recipientName === filterPerson
    return yearMatch && personMatch
  })

  const getUniqueYears = () => {
    const years = giftHistory.map(gift => new Date(gift.date).getFullYear())
    return [...new Set(years)].sort((a, b) => b - a)
  }

  const getUniquePeople = () => {
    const people = giftHistory.map(gift => gift.recipientName)
    return [...new Set(people)].sort()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getOccasionIcon = (occasion) => {
    switch (occasion.toLowerCase()) {
      case 'birthday': return '🎂'
      case 'christmas': return '🎄'
      case 'graduation': return '🎓'
      case "father's day": return '👨'
      default: return '🎉'
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Tech': 'bg-blue-500/20 text-blue-300',
      'Fitness': 'bg-green-500/20 text-green-300',
      'Art': 'bg-purple-500/20 text-purple-300',
      'Food & Drink': 'bg-orange-500/20 text-orange-300',
      'Beauty': 'bg-pink-500/20 text-pink-300'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-300'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <SectionWithMockup
        title={
          <>
            Track Your
            <br />
            Gift-Giving Journey
          </>
        }
        description={
          <>
            Keep a private record of all your gifts and their success rates.
            <br />
            Analyze your spending patterns and improve your gift-giving skills.
            <br />
            Build meaningful relationships through thoughtful gift tracking.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop"
        secondaryImageSrc="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=600&fit=crop"
        reverseLayout={true}
      />

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">Gift History</h1>
              <div className="flex items-center gap-2">
                {showPrivateMode ? <EyeOff className="w-5 h-5 text-green-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                <span className="text-sm text-green-500 font-medium">Private</span>
              </div>
            </div>
            <p className="text-gray-400">Your personal gift-giving record (visible only to you)</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold">Total Spent</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">${stats.totalSpent}</p>
            <p className="text-sm text-gray-400">All-time gift investment</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold">Gifts Given</h3>
            </div>
            <p className="text-2xl font-bold text-blue-500">{stats.totalGifts}</p>
            <p className="text-sm text-gray-400">Total thoughtful presents</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-orange-500" />
              <h3 className="font-semibold">Avg Rating</h3>
            </div>
            <p className="text-2xl font-bold text-orange-500">{stats.avgRating}/5</p>
            <p className="text-sm text-gray-400">Gift satisfaction score</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold">Success Rate</h3>
            </div>
            <p className="text-2xl font-bold text-purple-500">{stats.successRate}%</p>
            <p className="text-sm text-gray-400">Well-received gifts</p>
          </div>
        </div>

        {/* Feature Showcase */}
        <SectionWithMockup
          title={
            <>
              Private & Secure
              <br />
              <span className="text-orange-500">Gift Analytics</span>
            </>
          }
          description={
            <>
              Your gift history is completely private and secure. Analyze your
              <br />
              giving patterns, track success rates, and discover insights to
              <br />
              become an even more thoughtful gift giver.
            </>
          }
          primaryImageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"
          secondaryImageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
          reverseLayout={true}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Years</option>
              {getUniqueYears().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <select
            value={filterPerson}
            onChange={(e) => setFilterPerson(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Recipients</option>
            {getUniquePeople().map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>

        {/* Gift History List */}
        <div className="space-y-4">
          {filteredHistory.map(gift => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={gift.recipientAvatar}
                    alt={gift.recipientName}
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {gift.giftName}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>For {gift.recipientName}</span>
                      <span>•</span>
                      <span>{gift.occasion}</span>
                      <span>•</span>
                      <span>{formatDate(gift.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-500">${gift.amount}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < gift.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(gift.category)}`}>
                    {gift.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {gift.relationship}
                  </span>
                  {gift.success && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      ✓ Success
                    </span>
                  )}
                </div>
                <div className="text-2xl">{getOccasionIcon(gift.occasion)}</div>
              </div>

              {gift.notes && (
                <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-300 text-sm italic">"{gift.notes}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No gifts found</h3>
            <p className="text-gray-500">Try adjusting your filters or start giving some gifts!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GiftHistory
