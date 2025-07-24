import React, { useState } from 'react';
import { SellerTestimonials } from '../testimonials/SellerTestimonials';
import { UserTestimonials } from '../testimonials/UserTestimonials';
import { motion } from 'framer-motion';
import { Users, Store, Gift } from 'lucide-react';

export function TestimonialsDemo() {
  const [activeTab, setActiveTab] = useState<'seller' | 'user'>('user');

  const tabs = [
    {
      id: 'user' as const,
      label: 'Gift Givers',
      icon: Gift,
      description: 'Stories from people who found perfect gifts'
    },
    {
      id: 'seller' as const,
      label: 'Gift Sellers',
      icon: Store,
      description: 'Success stories from our marketplace sellers'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Tab Navigation */}
      <div className="relative z-30 pt-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300 bg-clip-text text-transparent">
                GIFTPAL
              </span>{' '}
              <span className="text-white">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300">
              Discover how GIFTPAL transforms gift-giving experiences
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white/[0.08] backdrop-blur-sm rounded-2xl p-2 border border-white/[0.15]">
              <div className="flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-4 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/[0.15]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <div className="relative flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-semibold">{tab.label}</div>
                          <div className="text-xs opacity-70">{tab.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'user' && <UserTestimonials />}
        {activeTab === 'seller' && <SellerTestimonials />}
      </motion.div>

      {/* Call to Action */}
      <div className="relative z-20 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.15] p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied users and sellers on GIFTPAL
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Gift Giving
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Selling
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual demo components for specific use cases
export function SellerTestimonialsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <SellerTestimonials />
    </div>
  );
}

export function UserTestimonialsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <UserTestimonials />
    </div>
  );
}
