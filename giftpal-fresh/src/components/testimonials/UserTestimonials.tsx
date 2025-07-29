import React from 'react';
import { PremiumTestimonials } from '../ui/premium-testimonials';

const userTestimonials = [
  {
    name: "Jennifer Walsh",
    role: "Marketing Manager",
    company: "Tech Innovations Inc.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "GIFTPAL helped me find the perfect anniversary gift for my husband. The personalized recommendations were spot-on, and the gift arrived beautifully packaged. He was absolutely thrilled!",
    results: ["Perfect match", "Beautiful packaging", "Memorable moment"]
  },
  {
    name: "Robert Chen",
    role: "Software Engineer",
    company: "Digital Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "I'm terrible at gift-giving, but GIFTPAL's AI recommendations changed everything. My sister loved her birthday gift so much she cried happy tears. I finally feel confident about giving gifts!",
    results: ["AI-powered matching", "Emotional impact", "Confidence boost"]
  },
  {
    name: "Maria Santos",
    role: "Teacher",
    company: "Riverside Elementary",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Finding unique gifts for my students' achievements was always stressful. GIFTPAL's educational gift section is amazing - thoughtful, age-appropriate, and budget-friendly options everywhere!",
    results: ["Educational focus", "Budget-friendly", "Student engagement"]
  },
  {
    name: "James Wilson",
    role: "Business Owner",
    company: "Wilson Consulting",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Corporate gifting for clients used to be a nightmare. GIFTPAL's business solutions make it effortless - professional, elegant, and always appropriate. My client relationships have never been stronger.",
    results: ["Professional solutions", "Client satisfaction", "Stronger relationships"]
  },
  {
    name: "Amanda Foster",
    role: "Event Planner",
    company: "Elegant Events",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Planning wedding favors and thank-you gifts for 200+ guests seemed impossible until I found GIFTPAL. The bulk ordering system and customization options saved me weeks of work!",
    results: ["Bulk ordering", "Custom options", "Time savings"]
  }
];

const userStats = [
  { number: "50K+", label: "Happy Recipients" },
  { number: "98%", label: "Gift Satisfaction" },
  { number: "4.8★", label: "Average Rating" },
  { number: "24/7", label: "Support Available" }
];

export function UserTestimonials() {
  return (
    <div className="relative">
      <PremiumTestimonials
        testimonials={userTestimonials}
        title="Loved by Gift Givers"
        subtitle="Join thousands of thoughtful gift givers who create unforgettable moments with GIFTPAL."
        badgeText="💝 Customer Stories"
        theme="user"
      />
      
      {/* User-specific stats section */}
      <div className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-rose-900/20 to-purple-900/20 backdrop-blur-xl rounded-3xl border border-rose-500/20 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Why People Love GIFTPAL</h3>
              <p className="text-rose-200/80">Creating meaningful connections through thoughtful gifting</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {userStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-300 to-purple-300 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-rose-200/60 text-sm font-medium group-hover:text-rose-200/80 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-rose-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-purple-600 transition-all transform hover:scale-105">
                Find Your Perfect Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
