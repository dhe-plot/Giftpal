import React, { useState } from 'react'
import { authAPI, sellerAPI, placeholderAPI, apiUtils } from '../../services/api'

const BackendTest = () => {
  const [results, setResults] = useState({})
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState('')

  const addResult = (testName, result) => {
    setResults(prev => ({
      ...prev,
      [testName]: result
    }))
  }

  const runTest = async (testName, testFunction) => {
    setCurrentTest(testName)
    try {
      const result = await testFunction()
      addResult(testName, { success: true, data: result, error: null })
    } catch (error) {
      addResult(testName, { success: false, data: null, error: error.message })
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setResults({})
    
    // Test 1: Health Check
    await runTest('Health Check', async () => {
      return await apiUtils.healthCheck()
    })

    // Test 2: User Registration
    await runTest('User Registration', async () => {
      return await authAPI.register({
        email: `test${Date.now()}@giftpal.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      })
    })

    // Test 3: User Login
    await runTest('User Login', async () => {
      return await authAPI.login({
        email: 'test@giftpal.com',
        password: 'password123'
      })
    })

    // Test 4: Get User Profile (requires login)
    await runTest('Get User Profile', async () => {
      // First login to get token
      const loginResult = await authAPI.login({
        email: 'test@giftpal.com',
        password: 'password123'
      })
      
      if (loginResult.success) {
        // Store token temporarily
        localStorage.setItem('giftpal_token', loginResult.data.accessToken)
        
        // Get profile
        const profileResult = await authAPI.getProfile()
        
        return profileResult
      } else {
        throw new Error('Login failed before profile test')
      }
    })

    // Test 5: Seller Registration
    await runTest('Seller Registration', async () => {
      // Ensure we're logged in
      const loginResult = await authAPI.login({
        email: 'test@giftpal.com',
        password: 'password123'
      })
      
      if (loginResult.success) {
        localStorage.setItem('giftpal_token', loginResult.data.accessToken)
        
        return await sellerAPI.register({
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
        })
      } else {
        throw new Error('Login failed before seller registration')
      }
    })

    // Test 6: Get Placeholders
    await runTest('Get Placeholders', async () => {
      // Ensure we're logged in
      const loginResult = await authAPI.login({
        email: 'test@giftpal.com',
        password: 'password123'
      })
      
      if (loginResult.success) {
        localStorage.setItem('giftpal_token', loginResult.data.accessToken)
        
        return await placeholderAPI.getPlaceholders()
      } else {
        throw new Error('Login failed before placeholder test')
      }
    })

    // Test 7: Update Placeholders
    await runTest('Update Placeholders', async () => {
      // Ensure we're logged in
      const loginResult = await authAPI.login({
        email: 'test@giftpal.com',
        password: 'password123'
      })
      
      if (loginResult.success) {
        localStorage.setItem('giftpal_token', loginResult.data.accessToken)
        
        return await placeholderAPI.updatePlaceholders({
          businessName: 'Updated Test Business',
          businessDescription: 'Updated business description',
          contactEmail: 'updated@testbusiness.com',
          contactPhone: '+1-555-999-8888',
          businessAddress: '456 Updated Street, New City, State 67890'
        })
      } else {
        throw new Error('Login failed before placeholder update')
      }
    })

    // Test 8: Reset Placeholders
    await runTest('Reset Placeholders', async () => {
      // Ensure we're logged in
      const loginResult = await authAPI.login({
        email: 'test@giftpal.com',
        password: 'password123'
      })
      
      if (loginResult.success) {
        localStorage.setItem('giftpal_token', loginResult.data.accessToken)
        
        return await placeholderAPI.resetPlaceholders()
      } else {
        throw new Error('Login failed before placeholder reset')
      }
    })

    setCurrentTest('')
    setIsRunning(false)
  }

  const getTestStatus = (testName) => {
    const result = results[testName]
    if (!result) return 'pending'
    return result.success ? 'success' : 'error'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'pending': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'pending': return '⏳'
      default: return '⏳'
    }
  }

  const testNames = [
    'Health Check',
    'User Registration',
    'User Login',
    'Get User Profile',
    'Seller Registration',
    'Get Placeholders',
    'Update Placeholders',
    'Reset Placeholders'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Backend API Testing</h1>
        
        {/* Test Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Test Suite</h2>
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </button>
          </div>
          
          {isRunning && currentTest && (
            <div className="bg-blue-900/50 border border-blue-500 p-3 rounded-lg mb-4">
              <p className="text-blue-300">Currently running: {currentTest}</p>
            </div>
          )}
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testNames.map(testName => {
            const status = getTestStatus(testName)
            const result = results[testName]
            
            return (
              <div key={testName} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-white">{testName}</h3>
                  <span className={`text-2xl ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                  </span>
                </div>
                
                {result && (
                  <div className="space-y-2">
                    <div className={`text-sm font-medium ${getStatusColor(status)}`}>
                      {result.success ? 'Success' : 'Failed'}
                    </div>
                    
                    {result.error && (
                      <div className="bg-red-900/50 border border-red-500 p-2 rounded text-red-300 text-sm">
                        {result.error}
                      </div>
                    )}
                    
                    {result.data && (
                      <details className="bg-gray-900 p-2 rounded text-xs">
                        <summary className="text-gray-400 cursor-pointer">View Response</summary>
                        <pre className="text-green-400 mt-2 overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
                
                {!result && status === 'pending' && (
                  <div className="text-gray-400 text-sm">
                    Waiting to run...
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary */}
        {Object.keys(results).length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">Test Summary</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {Object.values(results).filter(r => r.success).length}
                </div>
                <div className="text-gray-400">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {Object.values(results).filter(r => !r.success).length}
                </div>
                <div className="text-gray-400">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">
                  {Object.keys(results).length}
                </div>
                <div className="text-gray-400">Total</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BackendTest
