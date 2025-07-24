import './App.css'
import { Routes, Route } from 'react-router-dom'

// Import pages
import About from './About'
import Brands from './Brands'
import GiftsShop from './GiftsShop'
import PaymentSuccess from './PaymentSuccess'
import SellerDashboard from './SellerDashboard'
import SellerProfile from './SellerProfile'

// Import the enhanced HomePage
import HomePage from './HomePage'

// Import the floating chatbot
import SimpleChatbot from './components/ui/simple-chatbot'
import ChatbotDemo from './components/ui/chatbot-demo'

// Import GlowCard demo
import { Default as GlowCardDemo } from './components/ui/demo'
import GiftLoaderDemo from './components/ui/gift-loader-demo'

// Import Auth components
import SignInPage from './components/auth/SignInPage'
import OnboardingFlow from './components/auth/OnboardingFlow'

// Import Profile components
import { UserProfile } from './components/profile/UserProfile'
import ProfilePage from './components/profile/ProfilePage'

// Import Testimonials components
import { TestimonialsDemo, SellerTestimonialsDemo, UserTestimonialsDemo } from './components/demos/TestimonialsDemo'

// Import Buyer Dashboard
import BuyerDashboard from './BuyerDashboard'

// Main App component with routing
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/gifts" element={<GiftsShop />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/chatbot-demo" element={<ChatbotDemo />} />
        <Route path="/glowcard-demo" element={<GlowCardDemo />} />
        <Route path="/gift-loader-demo" element={<GiftLoaderDemo />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/testimonials" element={<TestimonialsDemo />} />
        <Route path="/seller-testimonials" element={<SellerTestimonialsDemo />} />
        <Route path="/user-testimonials" element={<UserTestimonialsDemo />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      </Routes>

      {/* Global Floating Chatbot - Available on all pages */}
      <SimpleChatbot />
    </>
  )
}

export default App