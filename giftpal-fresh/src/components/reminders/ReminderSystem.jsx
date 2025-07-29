import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  Cake,
  Heart
} from 'lucide-react'

const ReminderSystem = () => {
  const [reminders, setReminders] = useState([])
  const [showAddReminder, setShowAddReminder] = useState(false)

  // Sample data matching the mobile design
  const sampleReminders = [
    {
      id: 1,
      personName: "Jane",
      occasion: "Birthday",
      timeText: "In 2 days",
      icon: "🎂",
      isPast: false
    },
    {
      id: 2,
      personName: "John",
      occasion: "Anniversary",
      timeText: "August 15, 2024",
      icon: "💜",
      isPast: false
    }
  ]

  useEffect(() => {
    setReminders(sampleReminders)
  }, [])

  const upcomingReminders = reminders.filter(r => !r.isPast)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white">Reminders</h1>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Upcoming Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upcoming</h2>
            <span className="text-sm text-gray-400">{upcomingReminders.length} upcoming</span>
          </div>

          <div className="space-y-3">
            {upcomingReminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {reminder.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {reminder.personName}'s {reminder.occasion}
                    </h3>
                    <p className="text-gray-400 text-sm">{reminder.timeText}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center p-3 text-purple-500">
            <div className="w-6 h-6 mb-1">🔔</div>
            <span className="text-xs">Reminders</span>
          </button>
          <button className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🎁</div>
            <span className="text-xs">Gifts</span>
          </button>
          <button className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReminderSystem
