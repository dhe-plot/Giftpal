import React, { useState, useEffect } from 'react'
import { apiUtils } from '../../services/api'

const APITest = () => {
  const [apiStatus, setApiStatus] = useState('checking')
  const [apiData, setApiData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    testAPIConnection()
  }, [])

  const testAPIConnection = async () => {
    try {
      setApiStatus('checking')
      setError(null)
      
      const healthData = await apiUtils.healthCheck()
      setApiData(healthData)
      setApiStatus('connected')
    } catch (err) {
      setError(err.message)
      setApiStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">API Connection Test</h1>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Backend API Status</h2>
            <button
              onClick={testAPIConnection}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Test Again
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                apiStatus === 'checking' ? 'bg-yellow-500 animate-pulse' :
                apiStatus === 'connected' ? 'bg-green-500' :
                'bg-red-500'
              }`} />
              <span className="text-white font-medium">
                {apiStatus === 'checking' ? 'Checking connection...' :
                 apiStatus === 'connected' ? 'Connected to backend' :
                 'Connection failed'}
              </span>
            </div>
            
            {apiData && (
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">API Response:</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {JSON.stringify(apiData, null, 2)}
                </pre>
              </div>
            )}
            
            {error && (
              <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg">
                <h3 className="text-red-400 font-medium mb-2">Error:</h3>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">Configuration:</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL}</p>
                <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
                <p><strong>Debug Mode:</strong> {import.meta.env.VITE_DEBUG_MODE}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APITest
