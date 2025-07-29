import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ExternalLink,
  X,
  Info
} from 'lucide-react'

const SponsoredAdDisplay = ({ 
  placement = 'feed', // 'feed', 'sidebar', 'banner', 'product'
  category = 'all',
  maxAds = 1,
  className = ''
}) => {
  const [ads, setAds] = useState([])
  const [dismissedAds, setDismissedAds] = useState(new Set())

  // Sample sponsored ads data
  const sponsoredAds = [
    {
      id: 1,
      type: 'product',
      title: 'Luxury Spa Gift Set - Perfect for Relaxation',
      description: 'Premium spa collection with organic ingredients. Perfect for birthdays, anniversaries, or self-care.',
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviews: 234,
      seller: 'Zen Wellness Co.',
      verified: true,
      badge: 'Sponsored',
      cta: 'Shop Now',
      targetUrl: '/product/luxury-spa-set',
      placement: ['feed', 'sidebar'],
      category: ['gifts', 'wellness', 'beauty'],
      impressions: 0,
      clicks: 0
    },
    {
      id: 2,
      type: 'brand',
      title: 'Artisan Jewelry Collection',
      description: 'Handcrafted jewelry made with love. Unique pieces for special moments.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      seller: 'Golden Touch Jewelry',
      verified: true,
      badge: 'Sponsored',
      cta: 'Explore Collection',
      targetUrl: '/brand/golden-touch-jewelry',
      placement: ['banner', 'feed'],
      category: ['jewelry', 'accessories', 'gifts'],
      impressions: 0,
      clicks: 0
    },
    {
      id: 3,
      type: 'product',
      title: 'Custom Photo Album - Preserve Your Memories',
      description: 'Create a personalized photo album with your favorite memories. Perfect gift for any occasion.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.9,
      reviews: 156,
      seller: 'Memory Lane Crafts',
      verified: true,
      badge: 'Sponsored',
      cta: 'Customize Now',
      targetUrl: '/product/custom-photo-album',
      placement: ['product', 'sidebar'],
      category: ['personalized', 'gifts', 'memories'],
      impressions: 0,
      clicks: 0
    }
  ]

  useEffect(() => {
    // Filter ads based on placement and category
    const filteredAds = sponsoredAds.filter(ad => {
      const matchesPlacement = ad.placement.includes(placement)
      const matchesCategory = category === 'all' || ad.category.includes(category)
      const notDismissed = !dismissedAds.has(ad.id)
      return matchesPlacement && matchesCategory && notDismissed
    })

    // Simulate ad targeting algorithm (in real app, this would be server-side)
    const selectedAds = filteredAds
      .sort(() => Math.random() - 0.5) // Random shuffle
      .slice(0, maxAds)

    setAds(selectedAds)

    // Track impressions
    selectedAds.forEach(ad => {
      trackAdEvent(ad.id, 'impression')
    })
  }, [placement, category, maxAds, dismissedAds])

  const trackAdEvent = (adId, eventType) => {
    // In a real app, this would send data to analytics service
    console.log(`Ad ${adId}: ${eventType}`)
    
    // Update local state for demo
    setAds(prev => prev.map(ad => 
      ad.id === adId 
        ? { ...ad, [eventType + 's']: ad[eventType + 's'] + 1 }
        : ad
    ))
  }

  const handleAdClick = (ad) => {
    trackAdEvent(ad.id, 'click')
    // In a real app, this would navigate to the target URL
    window.open(ad.targetUrl, '_blank')
  }

  const handleDismissAd = (adId) => {
    setDismissedAds(prev => new Set([...prev, adId]))
  }

  const renderProductAd = (ad) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-800 rounded-xl overflow-hidden border border-gray-700 ${className}`}
    >
      {/* Ad Badge */}
      <div className="relative">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          {ad.badge}
        </div>
        {placement !== 'banner' && (
          <button
            onClick={() => handleDismissAd(ad.id)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {ad.originalPrice && ad.price < ad.originalPrice && (
          <div className="absolute top-2 right-8 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{Math.round(((ad.originalPrice - ad.price) / ad.originalPrice) * 100)}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-400">{ad.seller}</span>
          {ad.verified && (
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">✓</span>
            </div>
          )}
        </div>

        <h3 className="font-semibold text-white mb-2 line-clamp-2">{ad.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{ad.description}</p>

        {ad.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">{ad.rating}</span>
            </div>
            <span className="text-sm text-gray-400">({ad.reviews} reviews)</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {ad.price && (
              <>
                <span className="text-lg font-bold text-purple-400">${ad.price}</span>
                {ad.originalPrice && ad.originalPrice > ad.price && (
                  <span className="text-sm text-gray-400 line-through">${ad.originalPrice}</span>
                )}
              </>
            )}
          </div>
          <button
            onClick={() => handleAdClick(ad)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {ad.cta}
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderBrandAd = (ad) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl overflow-hidden ${className}`}
    >
      <div className="relative">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-32 object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-2 left-2 bg-white text-purple-600 text-xs px-2 py-1 rounded font-medium">
          {ad.badge}
        </div>
        {placement !== 'banner' && (
          <button
            onClick={() => handleDismissAd(ad.id)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-medium">{ad.seller}</span>
            {ad.verified && (
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
            )}
          </div>
          <h3 className="text-white font-bold text-lg mb-1">{ad.title}</h3>
          <p className="text-white text-sm opacity-90 mb-3">{ad.description}</p>
          <button
            onClick={() => handleAdClick(ad)}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {ad.cta}
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderBannerAd = (ad) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gray-800 rounded-xl overflow-hidden border border-gray-700 ${className}`}
    >
      <div className="flex items-center p-4">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 ml-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">{ad.badge}</span>
            <span className="text-sm text-gray-400">{ad.seller}</span>
            {ad.verified && (
              <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold text-white text-sm mb-1">{ad.title}</h3>
          <p className="text-gray-400 text-xs line-clamp-1">{ad.description}</p>
        </div>
        <button
          onClick={() => handleAdClick(ad)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors ml-4"
        >
          {ad.cta}
        </button>
        <button
          onClick={() => handleDismissAd(ad.id)}
          className="text-gray-400 hover:text-white p-1 ml-2 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )

  if (ads.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {ads.map(ad => {
        if (placement === 'banner') {
          return <div key={ad.id}>{renderBannerAd(ad)}</div>
        } else if (ad.type === 'brand') {
          return <div key={ad.id}>{renderBrandAd(ad)}</div>
        } else {
          return <div key={ad.id}>{renderProductAd(ad)}</div>
        }
      })}
    </div>
  )
}

export default SponsoredAdDisplay
