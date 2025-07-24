import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import giftpalLogo from './assets/giftpal_logo.png'
import { useLoading } from './providers/LoadingProvider'
import { useAuth } from './providers/AuthProvider'
import { Menu, X, Plus, Home, Search, Building2, User, Filter, Heart, ShoppingCart, Gift, Star, TrendingUp } from 'lucide-react'
import { InstagramStoryModal } from './components/stories/InstagramStoryModal'


// Sample data for stories
const sampleStories = [
  {
    id: 1,
    user: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      verified: true,
      level: 'L5',
      title: 'Gift Guru',
      followers: 654,
      giftsGiven: 32
    },
    story: {
      title: 'Dad\'s Retirement Gift',
      content: 'After 30 years of hard work, my dad deserved something special for his retirement. This premium whiskey collection brought tears to his eyes. Mission accomplished! 🥃',
      timestamp: '2 days ago',
      occasion: 'Retirement',
      recipient: 'Father'
    },
    gift: {
      name: 'Premium Whiskey Collection',
      price: '$349',
      image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80',
      tags: ['Premium', 'Spirits', 'Collector']
    },
    likes: 89,
    comments: 23
  },
  {
    id: 2,
    user: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: true,
      level: 'L3',
      title: 'Gift Master',
      followers: 1250,
      giftsGiven: 89
    },
    story: {
      title: 'Perfect Anniversary Surprise',
      content: 'Found the most amazing personalized jewelry for my husband\'s 5th anniversary. The craftsmanship was incredible and his reaction was priceless! 💍✨',
      timestamp: '2 hours ago',
      occasion: 'Anniversary',
      recipient: 'Husband'
    },
    gift: {
      name: 'Custom Engraved Watch',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80',
      tags: ['Personalized', 'Luxury', 'Jewelry']
    },
    likes: 42,
    comments: 8
  },
  {
    id: 3,
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: false,
      level: 'L2',
      title: 'Thoughtful Giver',
      followers: 890,
      giftsGiven: 34
    },
    story: {
      title: 'Mom\'s Birthday Success',
      content: 'After weeks of searching, I found this beautiful spa set that made my mom cry happy tears. Sometimes the perfect gift just speaks to you! 🌸',
      timestamp: '5 hours ago',
      occasion: 'Birthday',
      recipient: 'Mother'
    },
    gift: {
      name: 'Luxury Spa Collection',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80',
      tags: ['Spa', 'Relaxation', 'Self-care']
    },
    likes: 28,
    comments: 5
  },
  {
    id: 4,
    user: {
      name: 'Emily Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      verified: true,
      level: 'L4',
      title: 'Gift Guru',
      followers: 2100,
      giftsGiven: 156
    },
    story: {
      title: 'Colleague Appreciation',
      content: 'Wanted to thank my amazing colleague for all her help this year. This artisan coffee set was perfect - she\'s been raving about it all week! ☕',
      timestamp: '1 day ago',
      occasion: 'Thank You',
      recipient: 'Colleague'
    },
    gift: {
      name: 'Artisan Coffee Sampler',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
      tags: ['Coffee', 'Gourmet', 'Artisan']
    },
    likes: 67,
    comments: 12
  },
  {
    id: 5,
    user: {
      name: 'Jessica Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      verified: true,
      level: 'L3',
      title: 'Gift Master',
      followers: 1890,
      giftsGiven: 78
    },
    story: {
      title: 'Wedding Anniversary Magic',
      content: 'Our 10th anniversary called for something extraordinary. This handcrafted jewelry piece captured our journey perfectly. She hasn\'t stopped smiling! 💎',
      timestamp: '3 days ago',
      occasion: 'Anniversary',
      recipient: 'Wife'
    },
    gift: {
      name: 'Handcrafted Diamond Necklace',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80',
      tags: ['Handcrafted', 'Diamond', 'Luxury']
    },
    likes: 156,
    comments: 34
  },
  {
    id: 6,
    user: {
      name: 'Alex Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      verified: false,
      level: 'L2',
      title: 'Rising Gifter',
      followers: 445,
      giftsGiven: 19
    },
    story: {
      title: 'Graduation Celebration',
      content: 'My sister just graduated med school! This professional leather bag will be perfect for her new career. So proud of her achievements! 🎓',
      timestamp: '4 days ago',
      occasion: 'Graduation',
      recipient: 'Sister'
    },
    gift: {
      name: 'Professional Leather Briefcase',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80',
      tags: ['Professional', 'Leather', 'Career']
    },
    likes: 73,
    comments: 15
  },
  {
    id: 7,
    user: {
      name: 'Rachel Green',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      verified: true,
      level: 'L4',
      title: 'Gift Guru',
      followers: 3200,
      giftsGiven: 145
    },
    story: {
      title: 'Baby Shower Surprise',
      content: 'Found the most adorable baby gift set for my best friend\'s shower. The organic cotton onesies and wooden toys were a huge hit with all the moms! 👶',
      timestamp: '6 hours ago',
      occasion: 'Baby Shower',
      recipient: 'Friend'
    },
    gift: {
      name: 'Organic Baby Gift Set',
      price: '$125',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80',
      tags: ['Organic', 'Baby', 'Eco-friendly']
    },
    likes: 94,
    comments: 18
  },
  {
    id: 8,
    user: {
      name: 'Marcus Williams',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      verified: false,
      level: 'L3',
      title: 'Thoughtful Giver',
      followers: 876,
      giftsGiven: 52
    },
    story: {
      title: 'Housewarming Success',
      content: 'My neighbors just moved in and I wanted to welcome them properly. This artisan candle collection made their new house feel like home instantly! 🕯️',
      timestamp: '8 hours ago',
      occasion: 'Housewarming',
      recipient: 'Neighbors'
    },
    gift: {
      name: 'Artisan Candle Collection',
      price: '$67',
      image: 'https://images.unsplash.com/photo-1602874801006-e26c4c5b5e8a?auto=format&fit=crop&w=300&q=80',
      tags: ['Artisan', 'Candles', 'Home']
    },
    likes: 45,
    comments: 9
  },
  {
    id: 9,
    user: {
      name: 'Lisa Park',
      avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
      verified: true,
      level: 'L5',
      title: 'Gift Legend',
      followers: 4500,
      giftsGiven: 234
    },
    story: {
      title: 'Teacher Appreciation',
      content: 'End of school year means showing appreciation for amazing teachers! This personalized desk organizer with her name engraved was perfect. She loved it! 📚',
      timestamp: '12 hours ago',
      occasion: 'Teacher Appreciation',
      recipient: 'Teacher'
    },
    gift: {
      name: 'Personalized Desk Organizer',
      price: '$78',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=300&q=80',
      tags: ['Personalized', 'Office', 'Wood']
    },
    likes: 112,
    comments: 27
  },
  {
    id: 10,
    user: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      verified: false,
      level: 'L2',
      title: 'Rising Gifter',
      followers: 234,
      giftsGiven: 12
    },
    story: {
      title: 'Valentine\'s Day Win',
      content: 'First Valentine\'s Day with my girlfriend and I was nervous! This handmade chocolate box with her favorite flavors was the perfect choice. She said yes to moving in together! 💕',
      timestamp: '1 day ago',
      occasion: 'Valentine\'s Day',
      recipient: 'Girlfriend'
    },
    gift: {
      name: 'Handmade Chocolate Collection',
      price: '$95',
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=300&q=80',
      tags: ['Handmade', 'Chocolate', 'Romantic']
    },
    likes: 189,
    comments: 42
  }
];

// Featured gifts data
const featuredGifts = [
  {
    id: 1,
    name: 'Luxury Spa Set',
    description: 'Premium spa collection for ultimate relaxation',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Artisan Coffee Collection',
    description: 'Handpicked coffee beans from around the world',
    price: '$45.99',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Personalized Jewelry',
    description: 'Custom-made jewelry with personal touch',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  }
];

// Top gifters data
const topGifters = [
  { id: 1, name: 'Alex Chen', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rank: 1, stars: 5.0 },
  { id: 2, name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rank: 2, stars: 4.9 },
  { id: 3, name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', rank: 3, stars: 4.8 },
  { id: 4, name: 'Sophie Wilson', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', rank: 4, stars: 4.7 },
  { id: 5, name: 'James Brown', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', rank: 5, stars: 4.6 }
];

// Sample gift data for buyers
const sampleGifts = [
  {
    id: 1,
    name: 'Artisan Coffee Set',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80',
    category: 'food',
    rating: 4.8,
    reviews: 124,
    seller: 'Coffee Masters',
    tags: ['Premium', 'Artisan', 'Gift Set'],
    occasion: ['Birthday', 'Anniversary'],
    recipient: ['Coffee Lover', 'Friend', 'Colleague'],
    trending: true,
    fastShipping: true
  },
  {
    id: 2,
    name: 'Personalized Jewelry Box',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80',
    category: 'jewelry',
    rating: 4.9,
    reviews: 89,
    seller: 'Elegant Crafts',
    tags: ['Personalized', 'Luxury', 'Handmade'],
    occasion: ['Wedding', 'Anniversary', 'Birthday'],
    recipient: ['Wife', 'Girlfriend', 'Mother'],
    trending: false,
    fastShipping: true
  },
  {
    id: 3,
    name: 'Smart Home Starter Kit',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=80',
    category: 'tech',
    rating: 4.7,
    reviews: 256,
    seller: 'Tech Innovations',
    tags: ['Smart Home', 'Technology', 'Modern'],
    occasion: ['Housewarming', 'Birthday', 'Holiday'],
    recipient: ['Tech Enthusiast', 'Family', 'Friend'],
    trending: true,
    fastShipping: false
  },
  {
    id: 4,
    name: 'Luxury Spa Collection',
    price: 79,
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80',
    category: 'wellness',
    rating: 4.6,
    reviews: 178,
    seller: 'Wellness Studio',
    tags: ['Spa', 'Relaxation', 'Self-care'],
    occasion: ['Birthday', 'Thank You', 'Just Because'],
    recipient: ['Mother', 'Sister', 'Friend'],
    trending: false,
    fastShipping: true
  },
  {
    id: 5,
    name: 'Vintage Wine Collection',
    price: 249,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80',
    category: 'food',
    rating: 4.9,
    reviews: 67,
    seller: 'Wine Connoisseurs',
    tags: ['Vintage', 'Premium', 'Collector'],
    occasion: ['Anniversary', 'Retirement', 'Celebration'],
    recipient: ['Wine Lover', 'Father', 'Boss'],
    trending: true,
    fastShipping: false
  },
  {
    id: 6,
    name: 'Custom Photo Album',
    price: 59,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80',
    category: 'personalized',
    rating: 4.8,
    reviews: 203,
    seller: 'Memory Makers',
    tags: ['Custom', 'Memories', 'Personalized'],
    occasion: ['Anniversary', 'Wedding', 'Birthday'],
    recipient: ['Family', 'Couple', 'Grandparents'],
    trending: false,
    fastShipping: true
  }
];

const giftCategories = [
  { id: 'all', name: 'All Gifts', icon: '🎁', count: sampleGifts.length },
  { id: 'trending', name: 'Trending', icon: '🔥', count: sampleGifts.filter(g => g.trending).length },
  { id: 'tech', name: 'Tech & Gadgets', icon: '📱', count: sampleGifts.filter(g => g.category === 'tech').length },
  { id: 'jewelry', name: 'Jewelry', icon: '💎', count: sampleGifts.filter(g => g.category === 'jewelry').length },
  { id: 'food', name: 'Food & Drink', icon: '🍷', count: sampleGifts.filter(g => g.category === 'food').length },
  { id: 'wellness', name: 'Wellness', icon: '🧘', count: sampleGifts.filter(g => g.category === 'wellness').length },
  { id: 'personalized', name: 'Personalized', icon: '✨', count: sampleGifts.filter(g => g.category === 'personalized').length }
];

export default function HomePage() {
  const [stories, setStories] = useState(sampleStories)
  const [likedStories, setLikedStories] = useState(new Set())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false)

  // Buyer-focused state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [wishlist, setWishlist] = useState(new Set())
  const [cart, setCart] = useState([])
  const [showQuickSearch, setShowQuickSearch] = useState(false)

  const { showLoading, hideLoading, withLoading } = useLoading()
  const { isAuthenticated, user, signOut } = useAuth()

  // Buyer helper functions
  const addToWishlist = (giftId) => {
    setWishlist(prev => new Set([...prev, giftId]))
  }

  const removeFromWishlist = (giftId) => {
    setWishlist(prev => {
      const newSet = new Set(prev)
      newSet.delete(giftId)
      return newSet
    })
  }

  const addToCart = (gift) => {
    setCart(prev => [...prev, { ...gift, quantity: 1, addedAt: Date.now() }])
  }

  const getFilteredGifts = () => {
    let filtered = sampleGifts

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'trending') {
        filtered = filtered.filter(gift => gift.trending)
      } else {
        filtered = filtered.filter(gift => gift.category === selectedCategory)
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(gift =>
        gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        gift.seller.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = {
    background: isDarkMode ? '#181312' : '#ffffff',
    cardBackground: isDarkMode ? '#1a1a1a' : '#f8f9fa',
    headerBackground: isDarkMode ? '#181111' : '#ffffff',
    textPrimary: isDarkMode ? '#ffffff' : '#000000',
    textSecondary: isDarkMode ? '#b0b8c1' : '#6c757d',
    textMuted: isDarkMode ? '#888888' : '#adb5bd',
    border: isDarkMode ? '#333333' : '#dee2e6',
    accent: '#4ecdc4',
    accentHover: '#45b7aa'
  }

  const handleLike = (storyId) => {
    const newLiked = new Set(likedStories)
    if (newLiked.has(storyId)) {
      newLiked.delete(storyId)
    } else {
      newLiked.add(storyId)
    }
    setLikedStories(newLiked)

    setStories(prev => prev.map(story =>
      story.id === storyId
        ? { ...story, likes: newLiked.has(storyId) ? story.likes + 1 : story.likes - 1 }
        : story
    ))
  }

  // Demo function to show loading functionality
  const handleRefreshStories = async () => {
    await withLoading(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        // In a real app, you would fetch new stories here
        console.log('Stories refreshed!')
      },
      'Refreshing gift stories...'
    )
  }

  const handleStorySubmit = (newStory) => {
    setStories(prev => [newStory, ...prev])
    console.log('New story added:', newStory)
  }

  return (
    <>
      {/* Mobile Responsive Styles */}
      <style>{`
        /* Add bottom padding for fixed navigation */
        body {
          padding-bottom: 80px !important;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-signin { display: flex !important; }
          .main-content {
            flex-direction: column !important;
            padding: 1rem !important;
            gap: 1rem !important;
            padding-bottom: 100px !important;
          }
          .sidebar {
            width: 100% !important;
            order: 2 !important;
            padding: 1rem !important;
          }
          .center-content {
            max-width: 100% !important;
            order: 1 !important;
          }
          .right-sidebar {
            width: 100% !important;
            order: 3 !important;
          }
          .header {
            padding: 1rem !important;
          }
          .story-card {
            padding: 1rem !important;
          }
          .story-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
          .story-actions {
            justify-content: space-around !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-signin { display: block !important; }
        }
      `}</style>

      <div style={{ background: theme.background, minHeight: '100vh', color: theme.textPrimary, transition: 'all 0.3s ease' }}>
      {/* Header */}
      <header className="header" style={{
        background: theme.headerBackground,
        padding: '1rem 2rem',
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: isDarkMode ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        <button
          onClick={() => setIsRightMenuOpen(!isRightMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(78, 205, 196, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          <img src={giftpalLogo} alt="GIFTPAL Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: theme.textPrimary }}>GIFTPAL</div>
            <div style={{ fontSize: '0.7rem', color: theme.textSecondary }}>BY DHE-PLOT</div>
          </div>
        </button>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Cart Button */}
          <button
            style={{
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.textPrimary,
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textPrimary;
            }}
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            style={{
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.textPrimary,
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ff4757';
              e.target.style.color = '#ff4757';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textPrimary;
            }}
          >
            <Heart size={20} fill={wishlist.size > 0 ? '#ff4757' : 'none'} />
            {wishlist.size > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#ff4757',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlist.size}
              </span>
            )}
          </button>

          {/* Theme Toggle Button - Sun Icon Only */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              transition: 'all 0.2s ease',
              padding: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            ☀️
          </button>

          {/* Sign In Button */}
          <Link to="/sign-in" className="desktop-signin">
            <button style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              Sign In
            </button>
          </Link>


        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: theme.headerBackground,
          borderBottom: `1px solid ${theme.border}`,
          zIndex: 1000,
          padding: '1rem 2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/"
              style={{ color: theme.accent, textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/gifts"
              style={{ color: theme.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gifts
            </Link>
            <Link
              to="/brands"
              style={{ color: theme.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              to="/about"
              style={{ color: theme.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/seller-dashboard"
              style={{ color: theme.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '0.5rem 0' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              to="/sign-in"
              style={{
                background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentHover} 100%)`,
                color: isDarkMode ? 'white' : '#000',
                textDecoration: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontWeight: 600,
                textAlign: 'center',
                marginTop: '0.5rem'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content" style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem 0.5rem'
      }}>
        {/* Buyer-Focused Search & Discovery Section */}
        <section style={{ marginBottom: '3rem' }}>
          {/* Quick Search Bar */}
          <div style={{
            background: theme.cardBackground,
            borderRadius: '16px',
            padding: '1.5rem',
            border: `1px solid ${theme.border}`,
            marginBottom: '2rem',
            boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Search size={20} style={{ color: theme.accent }} />
              <input
                type="text"
                placeholder="Search for the perfect gift..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: theme.textPrimary,
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
              <button
                onClick={() => setShowQuickSearch(!showQuickSearch)}
                style={{
                  background: theme.accent,
                  color: isDarkMode ? '#000' : '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Filter size={16} />
                Filter
              </button>
            </div>

            {/* Quick Categories */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {giftCategories.slice(0, 4).map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id ? theme.accent : 'transparent',
                    color: selectedCategory === category.id ? (isDarkMode ? '#000' : '#fff') : theme.textSecondary,
                    border: `1px solid ${selectedCategory === category.id ? theme.accent : theme.border}`,
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Gifts Preview */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: theme.accent, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} />
                Trending Gifts
              </h3>
              <Link to="/gifts" style={{ color: theme.accent, textDecoration: 'none', fontSize: '0.9rem' }}>
                View All →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {getFilteredGifts().slice(0, 4).map(gift => (
                <div key={gift.id} style={{
                  background: theme.cardBackground,
                  borderRadius: '12px',
                  padding: '1rem',
                  border: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  {gift.trending && (
                    <div style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      background: '#ff4757',
                      color: 'white',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}>
                      🔥 Hot
                    </div>
                  )}

                  <img
                    src={gift.image}
                    alt={gift.name}
                    style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }}
                  />

                  <h4 style={{ color: theme.textPrimary, fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                    {gift.name}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: theme.accent, fontSize: '0.9rem', fontWeight: 600 }}>
                      ${gift.price}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={12} style={{ color: '#ffd700', fill: '#ffd700' }} />
                      <span style={{ color: theme.textSecondary, fontSize: '0.7rem' }}>
                        {gift.rating}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        wishlist.has(gift.id) ? removeFromWishlist(gift.id) : addToWishlist(gift.id)
                      }}
                      style={{
                        background: 'transparent',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '6px',
                        padding: '0.3rem',
                        cursor: 'pointer',
                        color: wishlist.has(gift.id) ? '#ff4757' : theme.textSecondary
                      }}
                    >
                      <Heart size={14} fill={wishlist.has(gift.id) ? '#ff4757' : 'none'} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(gift)
                      }}
                      style={{
                        flex: 1,
                        background: theme.accent,
                        color: isDarkMode ? '#000' : '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.4rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <ShoppingCart size={12} />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized Recommendations */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: theme.accent, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} style={{ color: '#ffd700', fill: '#ffd700' }} />
              Recommended for You
            </h3>
            <button
              onClick={() => {
                // Refresh recommendations
                const shuffled = [...sampleGifts].sort(() => 0.5 - Math.random())
                // Could update recommendations state here
              }}
              style={{
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                color: theme.textSecondary,
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = theme.accent
                e.target.style.color = theme.accent
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = theme.border
                e.target.style.color = theme.textSecondary
              }}
            >
              🔄 Refresh
            </button>
          </div>

          {/* AI-powered recommendation cards */}
          <div style={{
            background: `linear-gradient(135deg, ${theme.accent}10 0%, ${theme.accent}05 100%)`,
            borderRadius: '16px',
            padding: '1.5rem',
            border: `1px solid ${theme.accent}20`,
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                background: theme.accent,
                color: isDarkMode ? '#000' : '#fff',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                AI
              </div>
              <span style={{ color: theme.textPrimary, fontWeight: 600 }}>
                Based on your browsing, we think you'll love these:
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              {sampleGifts.slice(0, 3).map(gift => (
                <div key={`rec-${gift.id}`} style={{
                  background: theme.cardBackground,
                  borderRadius: '12px',
                  padding: '1rem',
                  border: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: theme.accent,
                    color: isDarkMode ? '#000' : '#fff',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.6rem',
                    fontWeight: 600
                  }}>
                    {Math.floor(Math.random() * 20) + 80}% match
                  </div>

                  <img
                    src={gift.image}
                    alt={gift.name}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.8rem' }}
                  />

                  <h4 style={{ color: theme.textPrimary, fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                    {gift.name}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ color: theme.accent, fontSize: '1rem', fontWeight: 600 }}>
                      ${gift.price}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={12} style={{ color: '#ffd700', fill: '#ffd700' }} />
                      <span style={{ color: theme.textSecondary, fontSize: '0.8rem' }}>
                        {gift.rating}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginBottom: '0.8rem' }}>
                    Perfect for: {gift.recipient.slice(0, 2).join(', ')}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(gift)
                    }}
                    style={{
                      width: '100%',
                      background: theme.accent,
                      color: isDarkMode ? '#000' : '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.6rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Center Content - Featured Stories */}
        <section className="center-content" style={{
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: theme.accent, fontSize: '1.5rem' }}>Featured Stories</h2>
            <button
              onClick={() => setIsStoryModalOpen(true)}
              style={{
                background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentHover} 100%)`,
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(78, 205, 196, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.3)'
              }}
            >
              <Plus size={18} />
              Share Your Story
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {stories.map(story => (
              <article key={story.id} style={{
                background: theme.cardBackground,
                borderRadius: '12px',
                padding: '1.5rem',
                border: `1px solid ${theme.border}`,
                boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease'
              }}>
                {/* User Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, color: theme.textPrimary }}>{story.user.name}</span>
                      {story.user.verified && <span style={{ color: theme.accent }}>✓</span>}
                      <span style={{
                        background: '#ff6347',
                        color: 'white',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}>
                        {story.user.level} {story.user.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: theme.textMuted }}>
                      {story.user.followers} followers • {story.user.giftsGiven} gifts given
                    </div>
                  </div>
                  <button style={{
                    background: theme.accent,
                    color: isDarkMode ? '#000' : '#fff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = theme.accentHover;
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = theme.accent;
                    e.target.style.transform = 'translateY(0)';
                  }}>
                    Follow
                  </button>
                </div>

                {/* Story Content */}
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ color: theme.accent, marginBottom: '0.5rem' }}>{story.story.title}</h3>
                  <p style={{ lineHeight: 1.6, marginBottom: '1rem', color: theme.textPrimary }}>{story.story.content}</p>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{
                      background: '#ff6347',
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {story.story.occasion}
                    </span>
                    <span style={{
                      background: '#ffd700',
                      color: '#000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {story.story.recipient}
                    </span>
                  </div>
                </div>

                {/* Gift Showcase */}
                <div style={{
                  background: isDarkMode ? '#0f0f0f' : '#f1f3f4',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: `1px solid ${theme.border}`
                }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <img
                      src={story.gift.image}
                      alt={story.gift.name}
                      style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: theme.accent, marginBottom: '0.5rem' }}>{story.gift.name}</h4>
                      <div style={{ color: theme.accent, fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {story.gift.price}
                      </div>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        {story.gift.tags.map((tag, index) => (
                          <span key={index} style={{
                            background: isDarkMode ? '#333' : '#e9ecef',
                            color: isDarkMode ? '#b8a89c' : '#6c757d',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '10px',
                            fontSize: '0.7rem'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to="/gifts"
                      style={{
                        background: theme.accent,
                        color: isDarkMode ? '#000' : '#fff',
                        border: 'none',
                        padding: '0.8rem 1.2rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        alignSelf: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = theme.accentHover;
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = theme.accent;
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>

                {/* Story Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={() => handleLike(story.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: likedStories.has(story.id) ? '#ff6347' : theme.textMuted,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {likedStories.has(story.id) ? '❤️' : '🤍'} {story.likes}
                    </button>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: theme.textMuted,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = theme.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = theme.textMuted;
                    }}>
                      💬 {story.comments}
                    </button>
                  </div>
                  <span style={{ color: theme.textMuted, fontSize: '0.8rem' }}>{story.story.timestamp}</span>
                </div>
              </article>
            ))}
          </div>
        </section>


      </main>

      {/* Load More Stories Section */}
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        marginTop: '2rem'
      }}>
        <button
          onClick={handleRefreshStories}
          style={{
            background: 'transparent',
            border: `2px solid ${theme.accent}`,
            color: theme.accent,
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = theme.accent;
            e.target.style.color = isDarkMode ? '#000' : '#fff';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = `0 8px 25px rgba(78, 205, 196, 0.3)`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = theme.accent;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Load More Stories
        </button>
      </div>

      {/* Instagram-style Story Modal */}
      <InstagramStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        onSubmit={handleStorySubmit}
      />



      {/* Bottom Navigation Bar */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: theme.headerBackground,
        borderTop: `1px solid ${theme.border}`,
        padding: '0.75rem 0',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          {/* Home */}
          <Link to="/" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.textPrimary,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            <Home size={24} fill="currentColor" />
          </Link>

          {/* Search */}
          <Link to="/gifts" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.textSecondary,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            <Search size={24} />
          </Link>

          {/* Create/Plus */}
          <button
            onClick={() => setIsStoryModalOpen(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'transparent',
              border: `2px solid ${theme.textSecondary}`,
              borderRadius: '8px',
              padding: '0.5rem',
              color: theme.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = theme.textSecondary;
              e.target.style.color = theme.textSecondary;
            }}
          >
            <Plus size={20} />
          </button>

          {/* Trusted Brands */}
          <Link to="/brands" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.textSecondary,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            <Building2 size={24} />
          </Link>

          {/* Profile */}
          <Link to={isAuthenticated ? "/profile" : "/sign-in"} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.textSecondary,
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: isAuthenticated && user?.avatar
                ? `url(${user.avatar})`
                : `linear-gradient(135deg, ${theme.accent}, #ff6347)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${theme.background}`
            }}>
              {!isAuthenticated || !user?.avatar ? <User size={14} color="white" /> : null}
            </div>
            {/* Active indicator dot - show when authenticated */}
            {isAuthenticated && (
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                right: '2px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ecdc4',
                border: `1px solid ${theme.background}`
              }} />
            )}
          </Link>
        </div>
      </nav>

      {/* Right Slide-out Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isRightMenuOpen ? 0 : '-100%',
        width: '350px',
        height: '100vh',
        background: theme.cardBackground,
        borderLeft: `1px solid ${theme.border}`,
        zIndex: 1001,
        transition: 'right 0.3s ease',
        overflowY: 'auto',
        padding: '1.5rem'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setIsRightMenuOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: theme.textSecondary,
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = theme.accent;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = theme.textSecondary;
          }}
        >
          <X size={24} />
        </button>

        {/* Buyer Quick Actions */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.accent, fontSize: '1.2rem' }}>🛍️ Shop Gifts</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/gifts" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s',
              background: 'rgba(78, 205, 196, 0.05)',
              border: `1px solid ${theme.accent}20`
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.15)' : 'rgba(78, 205, 196, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(78, 205, 196, 0.05)';
            }}>
              <span>🎁</span> Browse All Gifts
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: theme.accent }}>→</span>
            </Link>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem'
            }}>
              {giftCategories.slice(1, 5).map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setIsRightMenuOpen(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: theme.textSecondary,
                    background: 'transparent',
                    border: `1px solid ${theme.border}`,
                    padding: '0.6rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
                    e.target.style.borderColor = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = theme.border;
                  }}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.7 }}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Buyer Account Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.accent, fontSize: '1.2rem' }}>👤 My Account</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => {
                // Show cart/wishlist summary
                setIsRightMenuOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: theme.textSecondary,
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: '0.8rem',
                borderRadius: '8px',
                transition: 'background 0.2s',
                cursor: 'pointer',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <span>🛒</span>
              <div style={{ flex: 1 }}>
                <div>My Cart</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  {cart.length} items
                </div>
              </div>
              {cart.length > 0 && (
                <span style={{
                  background: '#ff4757',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                // Show wishlist
                setIsRightMenuOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: theme.textSecondary,
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: '0.8rem',
                borderRadius: '8px',
                transition: 'background 0.2s',
                cursor: 'pointer',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <span>❤️</span>
              <div style={{ flex: 1 }}>
                <div>My Wishlist</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                  {wishlist.size} saved items
                </div>
              </div>
              {wishlist.size > 0 && (
                <span style={{
                  background: '#ff4757',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.size}
                </span>
              )}
            </button>

            <Link to="/buyer-dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s',
              background: 'rgba(78, 205, 196, 0.05)',
              border: `1px solid ${theme.accent}20`
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.15)' : 'rgba(78, 205, 196, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(78, 205, 196, 0.05)';
            }}>
              <span>📊</span> My Dashboard
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: theme.accent }}>→</span>
            </Link>
          </nav>
        </div>

        {/* Explore Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.accent, fontSize: '1.2rem' }}>🔍 Discover</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#occasions" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>🎉</span> Occasions
            </a>
            <a href="#recipients" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>👥</span> Recipients
            </a>
            <Link to="/testimonials" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>⭐</span> Success Stories
            </Link>
            <Link to="/brands" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>🏪</span> Brands
            </Link>
          </nav>
        </div>

        {/* Featured Gifts Section */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: theme.accent, fontSize: '1.2rem' }}>Featured Gifts</h3>
            <Link to="/gifts" style={{ color: theme.accent, textDecoration: 'none', fontSize: '0.9rem' }}>
              View All →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {featuredGifts.slice(0, 3).map(gift => (
              <div key={gift.id} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}>
                <img src={gift.image} alt={gift.name} style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: theme.textPrimary }}>{gift.name}</h4>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.8rem', color: theme.textMuted, lineHeight: 1.4 }}>
                    {gift.description}
                  </p>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: theme.accent }}>{gift.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Gifters Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.accent, fontSize: '1.2rem' }}>Top Gifters</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topGifters.slice(0, 5).map(gifter => (
              <div key={gifter.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.8rem',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: gifter.rank <= 3 ? '#ffd700' : theme.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#000'
                }}>
                  {gifter.rank}
                </div>
                <img src={gifter.avatar} alt={gifter.name} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: theme.textPrimary }}>{gifter.name}</div>
                  <div style={{ fontSize: '0.8rem', color: theme.textMuted }}>⭐ {gifter.stars}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: theme.accent, fontSize: '1.2rem' }}>About</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/about" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>ℹ️</span> About Us
            </Link>
            <a href="mailto:hello@giftpal.com" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>📧</span> Contact
            </a>
            <a href="#blog" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>📝</span> Blog
            </a>
            <Link to="/seller-dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.8rem',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}>
              <span>💼</span> Become a Seller
            </Link>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: theme.accent, fontSize: '1.2rem' }}>Follow Us</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a href="#instagram" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textSecondary;
            }}>
              <span>📷</span> Instagram
            </a>
            <a href="#tiktok" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textSecondary;
            }}>
              <span>🎵</span> TikTok
            </a>
            <a href="#discord" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textSecondary;
            }}>
              <span>💬</span> Discord
            </a>
            <a href="#twitter" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textSecondary;
            }}>
              <span>🐦</span> X
            </a>
            <a href="#facebook" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: theme.textSecondary,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${theme.border}`,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = theme.accent;
              e.target.style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = theme.border;
              e.target.style.color = theme.textSecondary;
            }}>
              <span>👥</span> Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isRightMenuOpen && (
        <div
          onClick={() => setIsRightMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </div>
    </>
  )
}
