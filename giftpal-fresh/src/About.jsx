import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Recommendations',
      description: 'Our advanced AI analyzes preferences, occasions, and relationships to suggest the perfect gifts.'
    },
    {
      icon: '💳',
      title: 'Seamless Payment Integration',
      description: 'Secure payments with Stripe integration, supporting multiple payment methods and currencies.'
    },
    {
      icon: '📦',
      title: 'Real-Time Order Tracking',
      description: 'Track your orders from purchase to delivery with real-time updates and notifications.'
    },
    {
      icon: '🌟',
      title: 'Community Stories',
      description: 'Share and discover gifting stories from our community of thoughtful gift-givers.'
    },
    {
      icon: '🏪',
      title: 'Seller Marketplace',
      description: 'Join our marketplace as a seller and reach customers looking for unique, thoughtful gifts.'
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Enjoy a seamless experience across all devices with our responsive design.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Former tech executive with a passion for meaningful connections through thoughtful gifting.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'AI specialist with 10+ years experience building recommendation systems.'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Design',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'UX designer focused on creating delightful and intuitive user experiences.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '100K+', label: 'Gifts Delivered' },
    { number: '500+', label: 'Trusted Sellers' },
    { number: '4.9/5', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">About</h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center p-4 border-b border-gray-700">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'features'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'team'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'mission'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mission
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About GIFTPAL
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            We're revolutionizing the way people give and receive gifts by combining AI technology
            with human emotion to create meaningful connections through thoughtful gifting.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'features' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-white">Platform Features</h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-xl hover:bg-gray-750 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-white">Meet Our Team</h3>
            <div className="space-y-3">
              {team.map((member, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-xl hover:bg-gray-750 transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full border-2 border-purple-500"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        {member.name}
                      </h4>
                      <p className="text-purple-400 text-sm font-medium mb-1">
                        {member.role}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {member.bio}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mission' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center text-white">Our Mission & Vision</h3>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  🎯 Our Mission
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To make thoughtful gifting accessible to everyone by leveraging technology to understand
                  personal preferences, relationships, and occasions, while supporting local businesses
                  and artisans in reaching customers who value meaningful gifts.
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-pink-400 mb-2 flex items-center gap-2">
                  🌟 Our Vision
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To create a world where every gift tells a story, strengthens relationships, and
                  brings joy to both the giver and receiver. We envision a global community where
                  thoughtful gifting is the norm, not the exception.
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  💝 Our Values
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Thoughtfulness:</span> Every recommendation is carefully crafted
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Community:</span> Supporting sellers and building connections
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Innovation:</span> Using technology to enhance human relationships
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Trust:</span> Secure, reliable, and transparent platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/reminders" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🔔</div>
            <span className="text-xs">Reminders</span>
          </Link>
          <Link to="/gifts" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🎁</div>
            <span className="text-xs">Gifts</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-3 text-purple-500">
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}