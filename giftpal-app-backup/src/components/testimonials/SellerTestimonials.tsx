import React from 'react';
import { PremiumTestimonials } from '../ui/premium-testimonials';

const sellerTestimonials = [
  {
    name: "Sarah Chen",
    role: "Gift Shop Owner",
    company: "Artisan Gifts Co.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "GIFTPAL transformed my small gift shop into a thriving online business. I've connected with customers I never would have reached before, and my sales have increased by 250% in just 6 months.",
    results: ["250% sales increase", "Global reach", "Premium customers"]
  },
  {
    name: "Marcus Johnson",
    role: "Handmade Jewelry Creator",
    company: "Johnson Artisan Jewelry",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The platform's focus on meaningful gifting perfectly matches my handcrafted jewelry. Customers love the personal touch, and I've built lasting relationships that go beyond single purchases.",
    results: ["Repeat customers", "Personal connections", "Premium pricing"]
  },
  {
    name: "Elena Rodriguez",
    role: "Corporate Gift Specialist",
    company: "Executive Gifts Pro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "GIFTPAL's corporate gifting features are incredible. I can manage bulk orders, customize packaging, and track delivery - all while maintaining that personal touch that makes gifts special.",
    results: ["Bulk order management", "Custom packaging", "Enterprise clients"]
  },
  {
    name: "David Kim",
    role: "Vintage Collectibles Dealer",
    company: "Timeless Treasures",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Finding the right buyers for vintage items was always challenging. GIFTPAL's smart matching system connects me with collectors who truly appreciate unique pieces. My conversion rate is now 85%.",
    results: ["85% conversion rate", "Targeted collectors", "Premium valuations"]
  },
  {
    name: "Lisa Thompson",
    role: "Luxury Gift Curator",
    company: "Opulent Occasions",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "The platform's premium positioning attracts high-value customers who appreciate quality. My average order value has tripled, and customers trust my curation expertise completely.",
    results: ["3x order value", "Trust & credibility", "Luxury market access"]
  }
];

const sellerStats = [
  { number: "2,500+", label: "Active Sellers" },
  { number: "95%", label: "Seller Satisfaction" },
  { number: "$5M+", label: "Seller Revenue" },
  { number: "4.9★", label: "Average Rating" }
];

export function SellerTestimonials() {
  return (
    <div className="relative">
      <PremiumTestimonials
        testimonials={sellerTestimonials}
        title="Trusted by Gift Sellers"
        subtitle="Join thousands of sellers already growing their gift businesses with GIFTPAL's premium marketplace."
        badgeText="🎁 Seller Success Stories"
        theme="seller"
      />
      
      {/* Seller-specific stats section */}
      <div className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Why Sellers Choose GIFTPAL</h3>
              <p className="text-emerald-200/80">Join our thriving marketplace of gift creators and sellers</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {sellerStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-emerald-200/60 text-sm font-medium group-hover:text-emerald-200/80 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105">
                Start Selling Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
