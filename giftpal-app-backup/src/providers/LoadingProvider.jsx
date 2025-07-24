import React, { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  const showLoading = (message = 'Loading...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
    setLoadingMessage('')
  }

  const withLoading = async (asyncFunction, message = 'Loading...') => {
    try {
      showLoading(message)
      const result = await asyncFunction()
      return result
    } finally {
      hideLoading()
    }
  }

  const value = {
    isLoading,
    loadingMessage,
    showLoading,
    hideLoading,
    withLoading
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: 'white'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #4ecdc4',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }}></div>
          <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>
            {loadingMessage}
          </div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      )}
    </LoadingContext.Provider>
  )
}
