import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../providers/AuthProvider'
import { useSeller } from '../../providers/SellerProvider'
import { 
  Camera, 
  Edit3, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Building2,
  Globe,
  Calendar,
  Star
} from 'lucide-react'

const EditableProfile = () => {
  const { user, updateUser } = useAuth()
  const { sellerProfile, isSellerRegistered, updateSellerProfile } = useSeller()
  
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    avatar: user?.avatarUrl || ''
  })
  
  const [sellerData, setSellerData] = useState({
    businessName: sellerProfile?.businessName || '',
    businessDescription: sellerProfile?.businessDescription || '',
    businessPhone: sellerProfile?.businessPhone || '',
    websiteUrl: sellerProfile?.websiteUrl || ''
  })
  
  const fileInputRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
        setProfileData(prev => ({ ...prev, avatar: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // For web, we'll use the file input with camera capture
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment')
      fileInputRef.current.click()
    }
  }

  const handleGallerySelect = () => {
    // For web, we'll use the file input without camera capture
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Update user profile
      const userResult = await updateUser(profileData)
      
      // Update seller profile if user is a seller
      if (isSellerRegistered) {
        await updateSellerProfile(sellerData)
      }
      
      if (userResult?.success) {
        setIsEditing(false)
        // Show success message
        alert('Profile updated successfully!')
      } else {
        alert('Failed to update profile: ' + (userResult?.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Failed to update profile: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      avatar: user?.avatarUrl || ''
    })
    setSellerData({
      businessName: sellerProfile?.businessName || '',
      businessDescription: sellerProfile?.businessDescription || '',
      businessPhone: sellerProfile?.businessPhone || '',
      websiteUrl: sellerProfile?.websiteUrl || ''
    })
    setPreviewImage(null)
    setIsEditing(false)
  }

  const currentAvatar = previewImage || profileData.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Picture Section */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={currentAvatar}
                    alt="Profile"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-gray-600"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0 flex gap-1">
                      <button
                        onClick={handleCameraCapture}
                        className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                        title="Take Photo"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleGallerySelect}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                        title="Choose from Gallery"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {isEditing && (
                  <p className="text-gray-400 text-sm mt-2">
                    Use camera to take a photo or gallery to choose an existing image
                  </p>
                )}
              </div>

              {/* User Stats */}
              <div className="mt-8 space-y-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="text-white font-medium">Member Since</span>
                  </div>
                  <p className="text-gray-300">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
                
                {isSellerRegistered && (
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-5 h-5 text-orange-500" />
                      <span className="text-white font-medium">Seller Rating</span>
                    </div>
                    <p className="text-gray-300">
                      {sellerProfile?.averageRating || 'No ratings yet'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{profileData.firstName || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{profileData.lastName || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{profileData.email}</span>
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Verified</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{profileData.phone || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="City, State, Country"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{profileData.location || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <span className="text-white">{profileData.bio || 'No bio added yet'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              {isSellerRegistered && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Business Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={sellerData.businessName}
                          onChange={(e) => setSellerData(prev => ({ ...prev, businessName: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{sellerData.businessName}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business Phone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={sellerData.businessPhone}
                          onChange={(e) => setSellerData(prev => ({ ...prev, businessPhone: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{sellerData.businessPhone}</span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={sellerData.websiteUrl}
                          onChange={(e) => setSellerData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="https://your-website.com"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{sellerData.websiteUrl || 'Not set'}</span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={sellerData.businessDescription}
                          onChange={(e) => setSellerData(prev => ({ ...prev, businessDescription: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-white">{sellerData.businessDescription}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EditableProfile
