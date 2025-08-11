import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Import pages
import About from './About'
import Brands from './Brands'
import GiftsShop from './GiftsShop'
import PaymentSuccess from './PaymentSuccess'
import SellerDashboard from './SellerDashboard'
import SellerProfile from './SellerProfile'

// Import the enhanced HomePage
import HomePage from './HomePage'
import LandingPage from './LandingPage'

// Import the floating chatbot
// SimpleChatbot removed - using ChatSystem in HomePage for top-right messages
import ChatbotDemo from './components/ui/chatbot-demo'

// Import Chat System


// Import Splash Screen
import SplashScreen from './components/ui/SplashScreen'

// Import GlowCard demo
import { Default as GlowCardDemo } from './components/ui/demo'
import GiftLoaderDemo from './components/ui/gift-loader-demo'

// Import Login demo
import SimpleLoginTest from './components/ui/simple-login-test.jsx'

// Import Auth components
import SignInPage from './components/auth/SignInPage'
import OnboardingFlow from './components/auth/OnboardingFlow'

// Import Profile components
import { UserProfile } from './components/profile/UserProfile'
import ProfilePage from './components/profile/ProfilePage'

// Import Testimonials components
import { TestimonialsDemo, SellerTestimonialsDemo, UserTestimonialsDemo } from './components/demos/TestimonialsDemo'

// Import SectionMockup Showcase
import SectionMockupShowcase from './SectionMockupShowcase'

// Import Buyer Dashboard
import BuyerDashboard from './BuyerDashboard'

// Import Seller Onboarding
import SellerOnboarding from './components/seller/SellerOnboarding'

// Import Messages Page
import MessagesPage from './MessagesPage'

// Import Occasions and Recipients Pages
import OccasionsPage from './OccasionsPage'
import RecipientsPage from './RecipientsPage'

// Import New Feature Components
import ReminderSystem from './components/reminders/ReminderSystem'
import GiftHistory from './components/history/GiftHistory'
import GiftSuggestionEngine from './components/ai/GiftSuggestionEngine'
import FollowingSystem from './components/social/FollowingSystem'
import OccasionCalendar from './components/calendar/OccasionCalendar'
import PWAInstallPrompt from './components/pwa/PWAInstallPrompt'

// Import Marketing Components
import SponsoredAdsManager from './components/ads/SponsoredAdsManager'
import SEOOptimization from './components/ads/SEOOptimization'

// Import API Test
import APITest from './components/test/APITest'
import SellerFlowTest from './components/test/SellerFlowTest'
import BackendTest from './components/test/BackendTest'
import EditableProfile from './components/profile/EditableProfile'

// Import Mobile Navigation
import MobileBottomNav from './components/navigation/MobileBottomNav'

// Main App component with routing
function App() {
  const isDev = import.meta.env.MODE === 'development'
  const navigate = useNavigate()
  const location = useLocation()
  const [showSplash, setShowSplash] = useState(true)

  // Check if user has seen splash screen recently (within 5 minutes for development)
  useEffect(() => {
    // In development, always show the splash intro for demos
    if (isDev) return
    const lastSplashTime = localStorage.getItem('giftpal_last_splash')
    const now = Date.now()
    const cooldownMs = 30 * 60 * 1000 // 30 minutes in production

    if (lastSplashTime && (now - parseInt(lastSplashTime)) < cooldownMs) {
      setShowSplash(false)
    }
  }, [isDev])

  const handleSplashComplete = () => {
    localStorage.setItem('giftpal_last_splash', Date.now().toString())
    setShowSplash(false)
    const landingSeen = localStorage.getItem('giftpal_landing_seen')
    if (!landingSeen && location.pathname !== '/landing') {
      localStorage.setItem('giftpal_landing_seen', Date.now().toString())
      navigate('/landing')
    }
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/gifts" element={<GiftsShop />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/chatbot-demo" element={<ChatbotDemo />} />
        <Route path="/glowcard-demo" element={<GlowCardDemo />} />
        <Route path="/gift-loader-demo" element={<GiftLoaderDemo />} />
        <Route path="/login-demo" element={<SimpleLoginTest />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/testimonials" element={<TestimonialsDemo />} />
        <Route path="/seller-testimonials" element={<SellerTestimonialsDemo />} />
        <Route path="/user-testimonials" element={<UserTestimonialsDemo />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/seller-onboarding" element={<SellerOnboarding />} />
        <Route path="/api-test" element={<APITest />} />
        <Route path="/seller-flow-test" element={<SellerFlowTest />} />
        <Route path="/backend-test" element={<BackendTest />} />
        <Route path="/edit-profile" element={<EditableProfile />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/occasions" element={<OccasionsPage />} />
        <Route path="/recipients" element={<RecipientsPage />} />
        <Route path="/reminders" element={<ReminderSystem />} />
        <Route path="/gift-history" element={<GiftHistory />} />
        <Route path="/ai-suggestions" element={<GiftSuggestionEngine />} />
        <Route path="/following" element={<FollowingSystem />} />
        <Route path="/calendar" element={<OccasionCalendar />} />
        <Route path="/section-mockup-demo" element={<SectionMockupShowcase />} />
        <Route path="/sponsored-ads" element={<SponsoredAdsManager />} />
        <Route path="/seo-optimization" element={<SEOOptimization />} />
      </Routes>

      {/* Note: ChatSystem (Messages) is handled in HomePage.jsx for top-right positioning */}

      {/* Mobile Bottom Navigation - Instagram Style */}
      <MobileBottomNav />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
  )
}

export default App