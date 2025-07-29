import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Gift, 
  Bell,
  Filter,
  List,
  Grid,
  AlertCircle,
  Clock,
  User
} from 'lucide-react'
import SectionWithMockup from '../ui/section-with-mockup'

const OccasionCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // month, week, list
  const [occasions, setOccasions] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Sample occasions data
  const sampleOccasions = [
    {
      id: 1,
      title: "Sarah's Birthday",
      date: "2024-02-15",
      type: "birthday",
      person: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        relationship: "Friend"
      },
      reminderSet: true,
      giftIdeas: ["Yoga Mat", "Tea Set", "Books"],
      priority: "high",
      notes: "Loves yoga and mindfulness"
    },
    {
      id: 2,
      title: "Mike & Lisa Anniversary",
      date: "2024-02-20",
      type: "anniversary",
      person: {
        name: "Mike Chen",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        relationship: "Brother"
      },
      reminderSet: true,
      giftIdeas: ["Wine Set", "Photo Album", "Dinner Voucher"],
      priority: "medium",
      notes: "5th anniversary"
    },
    {
      id: 3,
      title: "Emma's Graduation",
      date: "2024-03-05",
      type: "graduation",
      person: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        relationship: "Colleague"
      },
      reminderSet: false,
      giftIdeas: ["Professional Bag", "Watch", "Books"],
      priority: "medium",
      notes: "MBA graduation"
    },
    {
      id: 4,
      title: "Mom's Birthday",
      date: "2024-03-12",
      type: "birthday",
      person: {
        name: "Mom",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        relationship: "Family"
      },
      reminderSet: true,
      giftIdeas: ["Jewelry", "Spa Day", "Flowers"],
      priority: "high",
      notes: "Special milestone birthday"
    },
    {
      id: 5,
      title: "Valentine's Day",
      date: "2024-02-14",
      type: "holiday",
      person: {
        name: "Partner",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        relationship: "Partner"
      },
      reminderSet: true,
      giftIdeas: ["Chocolates", "Flowers", "Jewelry"],
      priority: "high",
      notes: "Romantic dinner planned"
    }
  ]

  useEffect(() => {
    setOccasions(sampleOccasions)
  }, [])

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getOccasionsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return occasions.filter(occasion => occasion.date === dateStr)
  }

  const getOccasionIcon = (type) => {
    const icons = {
      birthday: '🎂',
      anniversary: '💕',
      graduation: '🎓',
      wedding: '💒',
      holiday: '🎉'
    }
    return icons[type] || '🎉'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500/20 border-red-500/50 text-red-300',
      medium: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
      low: 'bg-green-500/20 border-green-500/50 text-green-300'
    }
    return colors[priority] || colors.medium
  }

  const getDaysUntil = (dateStr) => {
    const today = new Date()
    const eventDate = new Date(dateStr)
    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayOccasions = getOccasionsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.02 }}
          className={`h-24 p-2 border border-gray-700 cursor-pointer transition-colors ${
            isToday ? 'bg-orange-500/20 border-orange-500' : 'hover:bg-gray-800'
          } ${isSelected ? 'bg-blue-500/20 border-blue-500' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-start mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-orange-300' : 'text-white'}`}>
              {day}
            </span>
            {dayOccasions.length > 0 && (
              <span className="text-xs bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {dayOccasions.length}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {dayOccasions.slice(0, 2).map(occasion => (
              <div
                key={occasion.id}
                className="text-xs bg-gray-700 text-gray-300 rounded px-1 py-0.5 truncate"
              >
                {getOccasionIcon(occasion.type)} {occasion.person.name}
              </div>
            ))}
            {dayOccasions.length > 2 && (
              <div className="text-xs text-gray-500">+{dayOccasions.length - 2} more</div>
            )}
          </div>
        </motion.div>
      )
    }

    return days
  }

  const renderUpcomingList = () => {
    const upcoming = occasions
      .filter(occasion => getDaysUntil(occasion.date) >= 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 10)

    return (
      <div className="space-y-4">
        {upcoming.map(occasion => {
          const daysUntil = getDaysUntil(occasion.date)
          return (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${getPriorityColor(occasion.priority)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={occasion.person.avatar}
                    alt={occasion.person.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{occasion.title}</h3>
                    <p className="text-gray-400 text-sm">{occasion.person.relationship}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">{getOccasionIcon(occasion.type)}</div>
                  <span className="text-sm font-medium">
                    {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {new Date(occasion.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {occasion.reminderSet ? (
                    <Bell className="w-4 h-4 text-green-500" />
                  ) : (
                    <BellOff className="w-4 h-4 text-gray-500" />
                  )}
                  <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                    View Gifts
                  </button>
                </div>
              </div>

              {occasion.notes && (
                <div className="mt-3 p-2 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-300 text-sm">{occasion.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <SectionWithMockup
        title={
          <>
            Occasion Calendar
            <br />
            & Planning
          </>
        }
        description={
          <>
            Visual calendar view of all upcoming birthdays and special events.
            <br />
            Plan ahead and never miss an important celebration again.
            <br />
            Organize your gift-giving schedule with smart reminders.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        secondaryImageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
      />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Occasion Calendar</h1>
            <p className="text-gray-400">Never miss an important celebration</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'month' ? 'bg-orange-500 text-white' : 'text-gray-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Occasion
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold">This Week</h3>
            </div>
            <p className="text-2xl font-bold text-red-500">
              {occasions.filter(o => getDaysUntil(o.date) <= 7 && getDaysUntil(o.date) >= 0).length}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-500" />
              <h3 className="font-semibold">This Month</h3>
            </div>
            <p className="text-2xl font-bold text-orange-500">
              {occasions.filter(o => getDaysUntil(o.date) <= 30 && getDaysUntil(o.date) >= 0).length}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold">Reminders Set</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">
              {occasions.filter(o => o.reminderSet).length}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold">People</h3>
            </div>
            <p className="text-2xl font-bold text-blue-500">
              {new Set(occasions.map(o => o.person.name)).size}
            </p>
          </div>
        </div>

        {/* Calendar/List View */}
        {viewMode === 'month' ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 border-b border-gray-700">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-4 text-center font-medium text-gray-400 border-r border-gray-700 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {renderCalendarGrid()}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-6">Upcoming Occasions</h2>
            {renderUpcomingList()}
          </div>
        )}
      </div>
    </div>
  )
}

export default OccasionCalendar
