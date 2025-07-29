import React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  X,
  Search
} from 'lucide-react'

const ChatSystem = ({ isOpen, onClose }) => {
  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastMessage: 'Thanks for the gift recommendation!',
      time: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      lastMessage: 'Perfect! That\'s exactly what I was looking for',
      time: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      lastMessage: 'Can you help me find something for my mom?',
      time: '3 hours ago',
      unread: 1,
      online: true
    }
  ]

  if (!isOpen) return null

  const chatMessages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      message: 'Hey! I saw your gift recommendation for vintage jewelry. Do you think this would work for my sister?',
      time: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Absolutely! Vintage jewelry is perfect for someone who appreciates unique pieces. What\'s her style like?',
      time: '10:32 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      message: 'She loves minimalist designs but with a touch of elegance. Something that can work for both casual and formal occasions.',
      time: '10:35 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'You',
      message: 'Perfect! I\'d recommend looking at delicate gold chains with small pendants or simple pearl earrings. They\'re timeless and versatile.',
      time: '10:37 AM',
      isMe: true
    },
    {
      id: 5,
      sender: 'Sarah Johnson',
      message: 'Thanks for the gift recommendation!',
      time: '10:40 AM',
      isMe: false
    }
  ]

  useEffect(() => {
    if (activeChat) {
      setMessages(chatMessages)
    }
  }, [activeChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 100 }}
      className="fixed top-4 right-4 w-[350px] h-[500px] bg-gray-900 rounded-2xl shadow-2xl z-[9999] flex overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-orange-500" />
            <h3 className="font-semibold text-white">Messages</h3>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">3</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversations List */}
          <div className="w-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveChat(conv)}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors ${
                    activeChat?.id === conv.id ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {conv.name.charAt(0)}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white truncate">{conv.name}</h4>
                        <span className="text-xs text-gray-400">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area - Only show when expanded */}
          {isExpanded && activeChat && (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                    {activeChat.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{activeChat.name}</h4>
                    <p className="text-sm text-green-400">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Video className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.isMe
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.isMe ? 'text-orange-100' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  {message.trim() ? (
                    <button
                      onClick={handleSendMessage}
                      className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Empty State for expanded view */}
          {isExpanded && !activeChat && (
            <div className="flex-1 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

export default ChatSystem
