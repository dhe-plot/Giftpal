import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  UserPlus,
  UserMinus,
  Search,
  Calendar,
  Gift,
  Heart,
  Star,
  Bell,
  BellOff,
  Filter,
  MoreVertical,
  MessageCircle,
  Share2,
  Network,
  UserCheck
} from 'lucide-react'
import SectionWithMockup from '../ui/section-with-mockup'

const FollowingSystem = () => {
  const [following, setFollowing] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showSuggestions, setShowSuggestions] = useState(true)

  // Sample following data
  const sampleFollowing = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarah_j",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      relationship: "Friend",
      isFollowing: true,
      notificationsEnabled: true,
      mutualFriends: 5,
      upcomingOccasions: [
        { type: "Birthday", date: "2024-02-15", daysUntil: 12 }
      ],
      preferences: ["Yoga", "Books", "Coffee", "Travel"],
      giftHistory: [
        { occasion: "Birthday 2023", gift: "Yoga Mat", rating: 5 }
      ],
      lastActive: "2 hours ago",
      joinedDate: "2023-06-15"
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "@mike_tech",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      relationship: "Brother",
      isFollowing: true,
      notificationsEnabled: true,
      mutualFriends: 12,
      upcomingOccasions: [
        { type: "Anniversary", date: "2024-02-20", daysUntil: 17 }
      ],
      preferences: ["Gaming", "Tech", "Photography", "Music"],
      giftHistory: [
        { occasion: "Christmas 2023", gift: "Gaming Headset", rating: 4 }
      ],
      lastActive: "1 day ago",
      joinedDate: "2023-03-10"
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "@emma_art",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      relationship: "Colleague",
      isFollowing: true,
      notificationsEnabled: false,
      mutualFriends: 3,
      upcomingOccasions: [
        { type: "Graduation", date: "2024-03-05", daysUntil: 30 }
      ],
      preferences: ["Art", "Fashion", "Design", "Wine"],
      giftHistory: [],
      lastActive: "3 days ago",
      joinedDate: "2023-08-22"
    }
  ]

  // Sample suggested users
  const suggestedUsers = [
    {
      id: 4,
      name: "Alex Rodriguez",
      username: "@alex_fit",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      mutualFriends: 8,
      reason: "Mutual friends with Sarah and Mike",
      preferences: ["Fitness", "Nutrition", "Hiking"]
    },
    {
      id: 5,
      name: "Lisa Park",
      username: "@lisa_chef",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      mutualFriends: 4,
      reason: "Similar interests in cooking and travel",
      preferences: ["Cooking", "Travel", "Wine"]
    }
  ]

  useEffect(() => {
    setFollowing(sampleFollowing)
  }, [])

  const toggleFollow = (userId) => {
    setFollowing(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ))
  }

  const toggleNotifications = (userId) => {
    setFollowing(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, notificationsEnabled: !user.notificationsEnabled }
        : user
    ))
  }

  const filteredFollowing = following.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'notifications' && user.notificationsEnabled) ||
                         (filterStatus === 'upcoming' && user.upcomingOccasions.length > 0)
    
    return matchesSearch && matchesFilter && user.isFollowing
  })

  const getRelationshipColor = (relationship) => {
    const colors = {
      'Friend': 'bg-blue-500/20 text-blue-300',
      'Family': 'bg-green-500/20 text-green-300',
      'Brother': 'bg-green-500/20 text-green-300',
      'Sister': 'bg-green-500/20 text-green-300',
      'Colleague': 'bg-purple-500/20 text-purple-300',
      'Partner': 'bg-pink-500/20 text-pink-300'
    }
    return colors[relationship] || 'bg-gray-500/20 text-gray-300'
  }

  const getOccasionUrgency = (daysUntil) => {
    if (daysUntil <= 7) return 'text-red-500 bg-red-500/10'
    if (daysUntil <= 14) return 'text-orange-500 bg-orange-500/10'
    return 'text-green-500 bg-green-500/10'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <SectionWithMockup
        title={
          <>
            Connect & Follow
            <br />
            Friends & Family
          </>
        }
        description={
          <>
            Build your social network and never miss their special occasions.
            <br />
            Track friends' preferences and get notified about upcoming events.
            <br />
            Strengthen relationships through thoughtful gift-giving.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
        secondaryImageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
        reverseLayout={true}
      />

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Following</h1>
            <p className="text-gray-400">Keep track of friends and their special occasions</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">
              {following.filter(u => u.isFollowing).length} following
            </span>
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
              <UserPlus className="w-4 h-4" />
              Find Friends
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search following..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="all">All Following</option>
              <option value="notifications">Notifications On</option>
              <option value="upcoming">Upcoming Occasions</option>
            </select>
          </div>
        </div>

        {/* Suggested Users */}
        {showSuggestions && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Suggested for You</h2>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedUsers.map(user => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <p className="text-gray-400 text-sm">{user.username}</p>
                        <p className="text-gray-500 text-xs">{user.reason}</p>
                      </div>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                      Follow
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Following List */}
        <div className="space-y-4">
          {filteredFollowing.map(user => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-600"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
                    <p className="text-gray-400 mb-2">{user.username}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getRelationshipColor(user.relationship)}`}>
                        {user.relationship}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {user.mutualFriends} mutual friends
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleNotifications(user.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      user.notificationsEnabled 
                        ? 'bg-orange-500/20 text-orange-400' 
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {user.notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Upcoming Occasions */}
              {user.upcomingOccasions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Upcoming Occasions</h4>
                  <div className="space-y-2">
                    {user.upcomingOccasions.map((occasion, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${getOccasionUrgency(occasion.daysUntil)}`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{occasion.type}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {occasion.daysUntil} days
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.map((pref, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gift History */}
              {user.giftHistory.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Recent Gifts</h4>
                  <div className="space-y-2">
                    {user.giftHistory.map((gift, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                        <div>
                          <span className="text-white font-medium">{gift.gift}</span>
                          <span className="text-gray-400 text-sm ml-2">• {gift.occasion}</span>
                        </div>
                        <div className="flex items-center gap-1">
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
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredFollowing.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or follow some friends!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FollowingSystem
