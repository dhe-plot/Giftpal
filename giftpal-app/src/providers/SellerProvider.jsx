import React, { createContext, useContext, useState, useEffect } from 'react'
import { sellerAPI, placeholderAPI, apiUtils } from '../services/api'
import { useAuth } from './AuthProvider'

const SellerContext = createContext()

export const useSeller = () => {
  const context = useContext(SellerContext)
  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider')
  }
  return context
}

export const SellerProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth()
  const [sellerProfile, setSellerProfile] = useState(null)
  const [isSellerRegistered, setIsSellerRegistered] = useState(false)
  const [sellerDashboard, setSellerDashboard] = useState(null)
  const [placeholders, setPlaceholders] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Check if user has seller profile
  useEffect(() => {
    if (isAuthenticated && user) {
      checkSellerStatus()
    }
  }, [isAuthenticated, user])

  const checkSellerStatus = async () => {
    try {
      setIsLoading(true)
      const response = await sellerAPI.getProfile(user.id)
      
      if (response.success && response.data.seller) {
        setSellerProfile(response.data.seller)
        setIsSellerRegistered(true)
        
        // Load seller dashboard data
        loadDashboardData()
        
        // Load placeholders
        loadPlaceholders()
      } else {
        setIsSellerRegistered(false)
        setSellerProfile(null)
      }
    } catch (error) {
      // User is not a seller or error occurred
      setIsSellerRegistered(false)
      setSellerProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  const loadDashboardData = async () => {
    try {
      const response = await sellerAPI.getDashboard()
      if (response.success) {
        setSellerDashboard(response.data)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const loadPlaceholders = async () => {
    try {
      const response = await placeholderAPI.getPlaceholders()
      if (response.success) {
        setPlaceholders(response.data.placeholders || {})
      }
    } catch (error) {
      console.error('Failed to load placeholders:', error)
    }
  }

  const registerAsSeller = async (sellerData) => {
    try {
      setIsLoading(true)
      
      // Register seller with backend
      const response = await sellerAPI.register(sellerData)
      
      if (response.success) {
        setSellerProfile(response.data.seller)
        setIsSellerRegistered(true)
        
        // Initialize placeholders with seller data
        await updatePlaceholders({
          businessName: sellerData.businessName,
          businessDescription: sellerData.businessDescription,
          contactEmail: user.email,
          contactPhone: sellerData.businessPhone,
          businessAddress: `${sellerData.businessAddress.street}, ${sellerData.businessAddress.city}, ${sellerData.businessAddress.state} ${sellerData.businessAddress.zipCode}`
        })
        
        // Load dashboard data
        await loadDashboardData()
        
        return { success: true, seller: response.data.seller }
      } else {
        return { success: false, error: response.message || 'Registration failed' }
      }
    } catch (error) {
      console.error('Seller registration failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    } finally {
      setIsLoading(false)
    }
  }

  const updateSellerProfile = async (profileData) => {
    try {
      setIsLoading(true)
      
      const response = await sellerAPI.updateProfile(sellerProfile.id, profileData)
      
      if (response.success) {
        setSellerProfile(response.data.seller)
        
        // Update placeholders if business info changed
        if (profileData.businessName || profileData.businessDescription || profileData.businessPhone) {
          await updatePlaceholders({
            businessName: profileData.businessName || sellerProfile.businessName,
            businessDescription: profileData.businessDescription || sellerProfile.businessDescription,
            contactPhone: profileData.businessPhone || sellerProfile.businessPhone
          })
        }
        
        return { success: true, seller: response.data.seller }
      } else {
        return { success: false, error: response.message || 'Update failed' }
      }
    } catch (error) {
      console.error('Seller profile update failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    } finally {
      setIsLoading(false)
    }
  }

  const updatePlaceholders = async (placeholderData) => {
    try {
      const response = await placeholderAPI.updatePlaceholders(placeholderData)
      
      if (response.success) {
        setPlaceholders(prev => ({ ...prev, ...placeholderData }))
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Placeholder update failed' }
      }
    } catch (error) {
      console.error('Placeholder update failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    }
  }

  const resetPlaceholders = async () => {
    try {
      const response = await placeholderAPI.resetPlaceholders()
      
      if (response.success) {
        setPlaceholders(response.data.placeholders || {})
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Reset failed' }
      }
    } catch (error) {
      console.error('Placeholder reset failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    }
  }

  const getSellerAnalytics = async (timeframe = '30d') => {
    try {
      const response = await sellerAPI.getAnalytics(timeframe)
      
      if (response.success) {
        return { success: true, analytics: response.data }
      } else {
        return { success: false, error: response.message || 'Analytics fetch failed' }
      }
    } catch (error) {
      console.error('Analytics fetch failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    }
  }

  const uploadSellerDocuments = async (files) => {
    try {
      setIsLoading(true)
      
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`document_${index}`, file)
      })
      
      const response = await sellerAPI.uploadDocuments(formData)
      
      if (response.success) {
        // Update seller profile with document info
        setSellerProfile(prev => ({
          ...prev,
          documents: response.data.documents
        }))
        
        return { success: true, documents: response.data.documents }
      } else {
        return { success: false, error: response.message || 'Document upload failed' }
      }
    } catch (error) {
      console.error('Document upload failed:', error)
      const errorInfo = apiUtils.handleError(error)
      return { success: false, error: errorInfo.message }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshDashboard = async () => {
    await loadDashboardData()
  }

  const value = {
    // State
    sellerProfile,
    isSellerRegistered,
    sellerDashboard,
    placeholders,
    isLoading,
    
    // Actions
    registerAsSeller,
    updateSellerProfile,
    updatePlaceholders,
    resetPlaceholders,
    getSellerAnalytics,
    uploadSellerDocuments,
    refreshDashboard,
    checkSellerStatus,
    
    // Computed values
    isApproved: sellerProfile?.status === 'approved',
    isPending: sellerProfile?.status === 'pending',
    isRejected: sellerProfile?.status === 'rejected',
  }

  return (
    <SellerContext.Provider value={value}>
      {children}
    </SellerContext.Provider>
  )
}

export default SellerProvider
