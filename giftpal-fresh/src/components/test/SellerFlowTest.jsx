import React, { useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { useSeller } from '../../providers/SellerProvider'

const SellerFlowTest = () => {
  const { signIn, signUp, user, isAuthenticated, isLoading: authLoading } = useAuth()
  const { registerAsSeller, isLoading: sellerLoading, isSellerRegistered } = useSeller()
  
  const [email, setEmail] = useState('test@giftpal.com')
  const [password, setPassword] = useState('password123')
  const [firstName, setFirstName] = useState('Test')
  const [lastName, setLastName] = useState('User')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setMessage('')
    setError('')
    
    try {
      const result = await signUp({
        email,
        password,
        firstName,
        lastName
      })
      
      if (result.success) {
        setMessage('User registered successfully!')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Registration failed: ' + err.message)
    }
  }

  const handleLogin = async () => {
    setMessage('')
    setError('')
    
    try {
      const result = await signIn(email, password)
      
      if (result.success) {
        setMessage('Login successful!')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Login failed: ' + err.message)
    }
  }

  const handleSellerRegistration = async () => {
    setMessage('')
    setError('')
    
    try {
      const sellerData = {
        businessName: 'Test Business',
        businessDescription: 'This is a test business description that is longer than 50 characters to meet the validation requirements.',
        businessType: 'LLC (Limited Liability Company)',
        businessRegistrationNumber: 'TEST123456',
        taxId: 'TAX123456',
        websiteUrl: 'https://testbusiness.com',
        businessAddress: {
          street: '123 Test Street',
          city: 'Test City',
          state: 'Test State',
          zipCode: '12345',
          country: 'United States'
        },
        businessPhone: '+1-555-123-4567',
        specializations: ['Handmade Crafts', 'Jewelry & Accessories']
      }
      
      const result = await registerAsSeller(sellerData)
      
      if (result.success) {
        setMessage('Seller registration successful!')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Seller registration failed: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Seller Flow Test</h1>
        
        {/* Status Display */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Current Status</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">
              <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
            </p>
            {user && (
              <div className="text-gray-300">
                <strong>User:</strong> {user.firstName} {user.lastName} ({user.email})
              </div>
            )}
            <p className="text-gray-300">
              <strong>Seller Registered:</strong> {isSellerRegistered ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-900/50 border border-green-500 p-4 rounded-lg mb-4">
            <p className="text-green-300">{message}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg mb-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Authentication Form */}
        {!isAuthenticated && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Authentication</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleRegister}
                  disabled={authLoading}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? 'Registering...' : 'Register'}
                </button>
                <button
                  onClick={handleLogin}
                  disabled={authLoading}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {authLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Seller Registration */}
        {isAuthenticated && !isSellerRegistered && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Seller Registration</h2>
            <p className="text-gray-300 mb-4">
              Click the button below to register as a seller with test data.
            </p>
            <button
              onClick={handleSellerRegistration}
              disabled={sellerLoading}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sellerLoading ? 'Registering as Seller...' : 'Register as Seller'}
            </button>
          </div>
        )}

        {/* Success State */}
        {isAuthenticated && isSellerRegistered && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">🎉 Success!</h2>
            <p className="text-gray-300 mb-4">
              You are now registered as both a user and a seller. The complete flow is working!
            </p>
            <div className="flex gap-4">
              <a
                href="/seller-dashboard"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-center"
              >
                Go to Seller Dashboard
              </a>
              <a
                href="/seller-onboarding"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
              >
                Try Full Onboarding
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SellerFlowTest
