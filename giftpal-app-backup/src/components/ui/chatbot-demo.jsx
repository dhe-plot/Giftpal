import React from 'react'
import { ImageGeneration } from './ai-chat-image-generation'

const ChatbotDemo = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            🤖 MR.GIFT AI Chatbot Demo
          </h1>
          <p className="text-xl text-gray-300">
            Experience our AI-powered gift assistant with advanced features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="text-lg font-semibold text-white mb-2">Gift Recommendations</h3>
            <p className="text-gray-400 text-sm">
              Get personalized gift suggestions based on occasion, recipient, and preferences
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Image Generation</h3>
            <p className="text-gray-400 text-sm">
              Generate beautiful gift images using AI with realistic loading animations
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="text-lg font-semibold text-white mb-2">Image Analysis</h3>
            <p className="text-gray-400 text-sm">
              Upload images to get detailed analysis and find similar products
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="text-3xl mb-3">🏪</div>
            <h3 className="text-lg font-semibold text-white mb-2">Seller Matching</h3>
            <p className="text-gray-400 text-sm">
              Find the best sellers and shops based on your specific needs
            </p>
          </div>
        </div>

        {/* Image Generation Demo */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            ✨ AI Image Generation Demo
          </h2>
          <div className="flex justify-center">
            <ImageGeneration>
              <img
                className="aspect-video max-w-md object-cover"
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80"
                alt="AI Generated Gift"
              />
            </ImageGeneration>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-teal-400/10 to-orange-500/10 p-6 rounded-xl border border-teal-400/30">
          <h3 className="text-xl font-semibold text-white mb-4">
            🚀 How to Use the Chatbot
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-teal-400 mb-2">Getting Started:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Click the floating AI button in the bottom-right corner</li>
                <li>• Choose from the quick action buttons</li>
                <li>• Or type your questions naturally</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-400 mb-2">Try These Commands:</h4>
              <ul className="space-y-1 text-sm">
                <li>• "Help me find a gift for my mom"</li>
                <li>• "Generate a gift image"</li>
                <li>• "Analyze this image" (upload a photo)</li>
                <li>• "Find sellers near me"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Features */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            ⚡ Technical Features
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🎭</div>
              <h4 className="font-semibold text-white mb-1">Framer Motion</h4>
              <p className="text-gray-400 text-sm">Smooth animations and transitions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💬</div>
              <h4 className="font-semibold text-white mb-1">Real-time Chat</h4>
              <p className="text-gray-400 text-sm">Instant responses with typing indicators</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-white mb-1">Responsive Design</h4>
              <p className="text-gray-400 text-sm">Works perfectly on all devices</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            The chatbot is now active on all pages! Look for the AI button in the bottom-right corner.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-gradient-to-r from-teal-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <span>🤖</span>
              <span>AI Assistant Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatbotDemo
