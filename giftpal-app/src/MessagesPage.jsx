import React from 'react'
import ChatSystem from './components/chat/ChatSystem'

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>
        <div className="bg-gray-800 rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <ChatSystem isOpen={true} onClose={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
