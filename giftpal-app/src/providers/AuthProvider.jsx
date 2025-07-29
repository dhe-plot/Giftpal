import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, apiUtils } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock user data for demo purposes
  const mockUser = {
    id: '1',
    name: 'Demo User',
    email: 'demo@giftpal.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    verified: true,
    level: 'L2',
    title: 'Gift Explorer',
    followers: 125,
    giftsGiven: 23
  }

  useEffect(() => {
    // Check for existing authentication and validate with backend
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('giftpal_token')
        const storedUser = localStorage.getItem('giftpal_user')

        if (token && storedUser) {
          // Validate token with backend
          try {
            const response = await authAPI.getProfile()
            if (response.success) {
              setIsAuthenticated(true)
              setUser(response.data.user)
            } else {
              // Token invalid, clear storage
              localStorage.removeItem('giftpal_token')
              localStorage.removeItem('giftpal_user')
            }
          } catch (error) {
            // Token validation failed, clear storage
            localStorage.removeItem('giftpal_token')
            localStorage.removeItem('giftpal_user')
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email, password) => {
    try {
      setIsLoading(true)

      // Call backend login API
      const response = await authAPI.login({ email, password })

      if (response.success) {
        // Store token and user data
        localStorage.setItem('giftpal_token', response.data.accessToken)
        localStorage.setItem('giftpal_user', JSON.stringify(response.data.user))

        setIsAuthenticated(true)
        setUser(response.data.user)

        return { success: true, isNewUser: false, user: response.data.user }
      } else {
        return { success: false, error: response.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Sign in failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Intelligent sign-in that handles both new and existing users
  const intelligentSignIn = async (email, password, name = null) => {
    try {
      setIsLoading(true)
      // Simulate API call to check if user exists
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock logic: if email contains "new" or name is provided, treat as new user
      const isNewUser = email.includes('new') || name !== null

      if (isNewUser) {
        // Create new user account
        const newUser = {
          ...mockUser,
          name: name || 'New User',
          email: email,
          onboardingComplete: false
        }

        const authData = {
          user: newUser,
          token: 'mock-jwt-token'
        }

        localStorage.setItem('giftpal_auth', JSON.stringify(authData))
        setIsAuthenticated(true)
        setUser(newUser)

        return { success: true, isNewUser: true, user: newUser }
      } else {
        // Sign in existing user
        const existingUser = {
          ...mockUser,
          email: email,
          onboardingComplete: true
        }

        const authData = {
          user: existingUser,
          token: 'mock-jwt-token'
        }

        localStorage.setItem('giftpal_auth', JSON.stringify(authData))
        setIsAuthenticated(true)
        setUser(existingUser)

        return { success: true, isNewUser: false, user: existingUser }
      }
    } catch (error) {
      console.error('Intelligent sign in failed:', error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData) => {
    try {
      setIsLoading(true)

      // Call backend register API
      const response = await authAPI.register(userData)

      if (response.success) {
        // Store token and user data
        localStorage.setItem('giftpal_token', response.data.accessToken)
        localStorage.setItem('giftpal_user', JSON.stringify(response.data.user))

        setIsAuthenticated(true)
        setUser(response.data.user)

        return { success: true, isNewUser: true, user: response.data.user }
      } else {
        return { success: false, error: response.message || 'Registration failed' }
      }
    } catch (error) {
      console.error('Sign up failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      // Call backend logout API
      try {
        await authAPI.logout()
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error)
      }

      // Clear local storage
      localStorage.removeItem('giftpal_token')
      localStorage.removeItem('giftpal_user')
      localStorage.removeItem('giftpal_refresh_token')

      setIsAuthenticated(false)
      setUser(null)
      return { success: true }
    } catch (error) {
      console.error('Sign out failed:', error)
      return { success: false, error: error.message }
    }
  }

  const updateUser = async (userData) => {
    try {
      // Update user profile on backend
      const response = await authAPI.updateProfile(userData)

      if (response.success) {
        const updatedUser = response.data.user
        setUser(updatedUser)

        // Update stored user data
        localStorage.setItem('giftpal_user', JSON.stringify(updatedUser))

        return { success: true, user: updatedUser }
      } else {
        return { success: false, error: response.message || 'Update failed' }
      }
    } catch (error) {
      console.error('Update user failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    }
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
    intelligentSignIn
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
