import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Gift, ArrowLeft } from 'lucide-react'
import { GlowCard } from './components/ui/spotlight-card'

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState('loading')
  
  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent')
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')
    
    if (paymentIntent && paymentIntentClientSecret) {
      // Payment was successful
      setPaymentStatus('success')
    } else {
      // No payment intent found
      setPaymentStatus('error')
    }
  }, [searchParams])

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#181312] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#181312] flex items-center justify-center p-4">
        <GlowCard glowColor="red" size="lg" className="max-w-md w-full text-center">
          <div className="p-8">
            <div className="text-red-500 mb-4">
              <Gift size={64} className="mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Payment Error</h1>
            <p className="text-gray-300 mb-6">
              There was an issue processing your payment. Please try again.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-[#ff6347] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff4500] transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </GlowCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#181312] flex items-center justify-center p-4">
      <GlowCard glowColor="green" size="lg" className="max-w-md w-full text-center">
        <div className="p-8">
          <div className="text-green-500 mb-4">
            <CheckCircle size={64} className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for your purchase! Your order has been confirmed and you'll receive an email confirmation shortly.
          </p>
          <div className="space-y-3">
            <Link 
              to="/" 
              className="block bg-[#ff6347] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff4500] transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/orders" 
              className="block bg-transparent border border-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}
