import React, { createContext, useContext, useState, useEffect } from 'react'

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
    // Simulate checking for existing authentication
    const checkAuth = async () => {
      try {
        // In a real app, you would check for stored tokens, validate with server, etc.
        const storedAuth = localStorage.getItem('giftpal_auth')
        if (storedAuth) {
          const authData = JSON.parse(storedAuth)
          setIsAuthenticated(true)
          setUser(authData.user)
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful sign in
      const authData = {
        user: mockUser,
        token: 'mock-jwt-token'
      }

      localStorage.setItem('giftpal_auth', JSON.stringify(authData))
      setIsAuthenticated(true)
      setUser(mockUser)

      return { success: true, isNewUser: false, user: mockUser }
    } catch (error) {
      console.error('Sign in failed:', error)
      return { success: false, error: error.message }
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful sign up
      const newUser = {
        ...mockUser,
        name: userData.name || 'New User',
        email: userData.email,
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
    } catch (error) {
      console.error('Sign up failed:', error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem('giftpal_auth')
      setIsAuthenticated(false)
      setUser(null)
      return { success: true }
    } catch (error) {
      console.error('Sign out failed:', error)
      return { success: false, error: error.message }
    }
  }

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    
    // Update stored auth data
    const storedAuth = localStorage.getItem('giftpal_auth')
    if (storedAuth) {
      const authData = JSON.parse(storedAuth)
      authData.user = updatedUser
      localStorage.setItem('giftpal_auth', JSON.stringify(authData))
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
