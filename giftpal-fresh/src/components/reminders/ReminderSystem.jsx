import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  Bell,
  Calendar,
  Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'

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
    },
    {
      id: 3,
      personName: "Sarah",
      occasion: "Graduation",
      timeText: "Next week",
      icon: "🎓",
      isPast: false
    }
  ]

  useEffect(() => {
    setReminders(sampleReminders)
  }, [])

  const upcomingReminders = reminders.filter(r => !r.isPast)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: '#1a1a1a',
        padding: '1.5rem 1rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Title Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#ff69b4',
              marginBottom: '0.5rem',
              margin: 0
            }}>
              Reminders
            </h1>
            <p style={{
              color: '#888',
              fontSize: '1rem',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Never miss a special moment. Set reminders for birthdays, anniversaries, and important occasions.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>{upcomingReminders.length}</span>
              <span style={{ color: '#888' }}>Active</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>12</span>
              <span style={{ color: '#888' }}>This Month</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} style={{ color: '#ff69b4' }} />
              <span style={{ fontWeight: '600' }}>2</span>
              <span style={{ color: '#888' }}>Urgent</span>
            </div>
          </div>

          {/* Back to Home */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#4a9eff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </div>
      {/* Add Reminder Button */}
      <div style={{
        background: '#1a1a1a',
        padding: '1rem',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => setShowAddReminder(true)}
            style={{
              background: '#ff69b4',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={20} />
            Add New Reminder
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '2rem 1rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Upcoming Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#fff'
          }}>
            Upcoming ({upcomingReminders.length})
          </h2>

          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {upcomingReminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: '#2a2a2a',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #333',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#ff69b4'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#3a3a3a',
                      borderRadius: '12px'
                    }}>
                      {reminder.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        margin: 0,
                        marginBottom: '0.25rem',
                        color: '#fff'
                      }}>
                        {reminder.personName}'s {reminder.occasion}
                      </h3>
                      <p style={{
                        color: '#888',
                        margin: 0,
                        fontSize: '0.9rem'
                      }}>
                        {reminder.timeText}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} style={{ color: '#888' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Reminder Card */}
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => setShowAddReminder(true)}
            style={{
              width: '100%',
              background: '#2a2a2a',
              border: '2px dashed #444',
              borderRadius: '16px',
              padding: '2rem',
              color: '#888',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ff69b4'
              e.target.style.color = '#ff69b4'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#444'
              e.target.style.color = '#888'
            }}
          >
            <Plus size={20} />
            Add New Reminder
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReminderSystem
