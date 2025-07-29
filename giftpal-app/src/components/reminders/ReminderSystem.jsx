import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Bell,
  Gift,
  Heart,
  User,
  Clock,
  Star,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Target
} from 'lucide-react'
import SectionWithMockup from '../ui/SectionWithMockup'

const ReminderSystem = () => {
  const [reminders, setReminders] = useState([])
  const [upcomingOccasions, setUpcomingOccasions] = useState([])
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState(null)

  // Sample data - in real app this would come from backend
  const sampleReminders = [
    {
      id: 1,
      personName: "Sarah Johnson",
      personAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      occasion: "Birthday",
      date: "2024-02-15",
      daysUntil: 12,
      preferences: ["Books", "Coffee", "Yoga"],
      relationship: "Friend",
      giftHistory: [
        { year: 2023, gift: "Yoga Mat", amount: 45 },
        { year: 2022, gift: "Coffee Subscription", amount: 60 }
      ],
      suggestedGifts: [
        { name: "Premium Tea Set", price: 35, match: 95 },
        { name: "Meditation Cushion", price: 28, match: 88 },
        { name: "Book: Mindful Living", price: 22, match: 82 }
      ]
    },
    {
      id: 2,
      personName: "Mike Chen",
      personAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      occasion: "Anniversary",
      date: "2024-02-20",
      daysUntil: 17,
      preferences: ["Tech", "Gaming", "Photography"],
      relationship: "Brother",
      giftHistory: [
        { year: 2023, gift: "Wireless Headphones", amount: 120 }
      ],
      suggestedGifts: [
        { name: "Camera Lens Kit", price: 89, match: 92 },
        { name: "Gaming Mouse", price: 65, match: 85 },
        { name: "Tech Organizer", price: 34, match: 78 }
      ]
    },
    {
      id: 3,
      personName: "Emma Wilson",
      personAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      occasion: "Graduation",
      date: "2024-03-05",
      daysUntil: 30,
      preferences: ["Fashion", "Travel", "Art"],
      relationship: "Colleague",
      giftHistory: [],
      suggestedGifts: [
        { name: "Travel Journal", price: 25, match: 90 },
        { name: "Art Supply Set", price: 55, match: 87 },
        { name: "Silk Scarf", price: 42, match: 83 }
      ]
    }
  ]

  useEffect(() => {
    setReminders(sampleReminders)
    
    // Set up notifications for upcoming occasions
    const upcoming = sampleReminders.filter(r => r.daysUntil <= 30)
    setUpcomingOccasions(upcoming)
  }, [])

  const getPriorityColor = (daysUntil) => {
    if (daysUntil <= 7) return 'text-red-500'
    if (daysUntil <= 14) return 'text-orange-500'
    return 'text-green-500'
  }

  const getPriorityBg = (daysUntil) => {
    if (daysUntil <= 7) return 'bg-red-500/10 border-red-500/20'
    if (daysUntil <= 14) return 'bg-orange-500/10 border-orange-500/20'
    return 'bg-green-500/10 border-green-500/20'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getOccasionIcon = (occasion) => {
    switch (occasion.toLowerCase()) {
      case 'birthday': return '🎂'
      case 'anniversary': return '💕'
      case 'graduation': return '🎓'
      case 'wedding': return '💒'
      default: return '🎉'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <SectionWithMockup
        title={
          <>
            Never Miss a
            <br />
            Special Moment
          </>
        }
        description={
          <>
            AI-powered reminders for birthdays, anniversaries, and special occasions.
            <br />
            Get personalized gift suggestions and keep track of your gift-giving history.
            <br />
            Build stronger relationships with thoughtful, timely gifts.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
        secondaryImageSrc="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop"
      />

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gift Reminders</h1>
            <p className="text-gray-400">Never miss an important occasion again</p>
          </div>
          <button
            onClick={() => setShowAddReminder(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Reminder
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold">This Week</h3>
            </div>
            <p className="text-2xl font-bold text-red-500">
              {upcomingOccasions.filter(o => o.daysUntil <= 7).length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-500" />
              <h3 className="font-semibold">This Month</h3>
            </div>
            <p className="text-2xl font-bold text-orange-500">
              {upcomingOccasions.filter(o => o.daysUntil <= 30).length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold">Total Reminders</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">
              {reminders.length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-pink-500" />
              <h3 className="font-semibold">Success Rate</h3>
            </div>
            <p className="text-2xl font-bold text-pink-500">94%</p>
          </div>
        </div>

        {/* Feature Showcase */}
        <SectionWithMockup
          title={
            <>
              Smart AI Suggestions
              <br />
              <span className="text-orange-500">Tailored for You</span>
            </>
          }
          description={
            <>
              Our advanced AI analyzes your friends' interests, past gift history,
              <br />
              and current trends to suggest the perfect gifts for every occasion.
              <br />
              Never give a generic gift again.
            </>
          }
          primaryImageSrc="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600"
          secondaryImageSrc="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600"
        />

        {/* Urgent Reminders */}
        {upcomingOccasions.filter(r => r.daysUntil <= 7).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Urgent Reminders
            </h2>
            <div className="grid gap-4">
              {upcomingOccasions
                .filter(r => r.daysUntil <= 7)
                .map(reminder => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={reminder.personAvatar}
                          alt={reminder.personName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-white">
                            {reminder.personName}'s {reminder.occasion}
                          </h3>
                          <p className="text-red-400 text-sm">
                            {reminder.daysUntil} days left • {formatDate(reminder.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl">{getOccasionIcon(reminder.occasion)}</div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Reminders */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Reminders</h2>
          <div className="grid gap-6">
            {reminders.map(reminder => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gray-800 rounded-xl p-6 border ${getPriorityBg(reminder.daysUntil)} hover:bg-gray-750 transition-colors cursor-pointer`}
                onClick={() => setSelectedReminder(reminder)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={reminder.personAvatar}
                      alt={reminder.personName}
                      className="w-16 h-16 rounded-full border-2 border-gray-600"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {reminder.personName}
                      </h3>
                      <p className="text-gray-400 mb-2">
                        {reminder.occasion} • {reminder.relationship}
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-400 text-sm">
                          {formatDate(reminder.date)}
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(reminder.daysUntil)}`}>
                          ({reminder.daysUntil} days)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl">{getOccasionIcon(reminder.occasion)}</div>
                </div>

                {/* Preferences */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {reminder.preferences.map((pref, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested Gifts */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">AI Suggested Gifts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {reminder.suggestedGifts.slice(0, 3).map((gift, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/50 rounded-lg p-3 border border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-white text-sm">{gift.name}</h5>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-yellow-500">{gift.match}%</span>
                          </div>
                        </div>
                        <p className="text-green-400 font-semibold">${gift.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReminderSystem
