import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSeller } from '../../providers/SellerProvider'
import { useAuth } from '../../providers/AuthProvider'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const SellerOnboarding = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { registerAsSeller, isLoading } = useSeller()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    businessType: '',
    businessRegistrationNumber: '',
    taxId: '',
    websiteUrl: '',
    businessAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    businessPhone: '',
    specializations: []
  })
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null)
  const [emailVerificationCode, setEmailVerificationCode] = useState('')
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)

  const businessTypes = [
    'Individual/Sole Proprietorship',
    'LLC (Limited Liability Company)',
    'Corporation',
    'Partnership',
    'Non-Profit Organization',
    'Other'
  ]

  const specializationOptions = [
    'Handmade Crafts',
    'Jewelry & Accessories',
    'Home Decor',
    'Art & Collectibles',
    'Clothing & Fashion',
    'Beauty & Personal Care',
    'Food & Beverages',
    'Electronics & Gadgets',
    'Books & Media',
    'Toys & Games',
    'Sports & Outdoors',
    'Automotive',
    'Other'
  ]

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleSpecializationToggle = (specialization) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.businessName.trim()) {
          newErrors.businessName = 'Business name is required'
        }
        if (!formData.businessDescription.trim() || formData.businessDescription.length < 50) {
          newErrors.businessDescription = 'Business description must be at least 50 characters'
        }
        if (!formData.businessType) {
          newErrors.businessType = 'Business type is required'
        }
        break

      case 2:
        if (!isEmailVerified) {
          newErrors.emailVerification = 'Please verify your email address'
        }
        break

      case 3:
        if (!formData.businessAddress.street.trim()) {
          newErrors['businessAddress.street'] = 'Street address is required'
        }
        if (!formData.businessAddress.city.trim()) {
          newErrors['businessAddress.city'] = 'City is required'
        }
        if (!formData.businessAddress.state.trim()) {
          newErrors['businessAddress.state'] = 'State is required'
        }
        if (!formData.businessAddress.zipCode.trim()) {
          newErrors['businessAddress.zipCode'] = 'ZIP code is required'
        }
        if (!formData.businessPhone.trim()) {
          newErrors.businessPhone = 'Business phone is required'
        }
        break

      case 4:
        if (formData.specializations.length === 0) {
          newErrors.specializations = 'Please select at least one specialization'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendEmailVerification = async () => {
    try {
      // Mock email verification - in real app, call backend API
      setVerificationSent(true)
      // Simulate sending verification code
      console.log('Verification code sent to:', user?.email)
      // For demo, we'll use a mock code
      setTimeout(() => {
        alert('Demo verification code: 123456')
      }, 1000)
    } catch (error) {
      setErrors({ emailVerification: 'Failed to send verification code' })
    }
  }

  const verifyEmailCode = async () => {
    try {
      // Mock verification - in real app, call backend API
      if (emailVerificationCode === '123456') {
        setIsEmailVerified(true)
        setErrors(prev => ({ ...prev, emailVerification: null }))
      } else {
        setErrors({ emailVerification: 'Invalid verification code' })
      }
    } catch (error) {
      setErrors({ emailVerification: 'Verification failed' })
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return
    
    try {
      setSubmitStatus('submitting')
      
      const result = await registerAsSeller(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          navigate('/seller-dashboard')
        }, 2000)
      } else {
        setSubmitStatus('error')
        setErrors({ submit: result.error })
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrors({ submit: 'An unexpected error occurred. Please try again.' })
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Business Information</h3>
        <p className="text-gray-400 mb-6">Tell us about your business</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Business Name *
        </label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Enter your business name"
        />
        {errors.businessName && (
          <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Business Description * (minimum 50 characters)
        </label>
        <textarea
          value={formData.businessDescription}
          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Describe your business, what you sell, and what makes you unique..."
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.businessDescription.length}/50 characters minimum
        </p>
        {errors.businessDescription && (
          <p className="text-red-400 text-sm mt-1">{errors.businessDescription}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Business Type *
        </label>
        <select
          value={formData.businessType}
          onChange={(e) => handleInputChange('businessType', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="">Select business type</option>
          {businessTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.businessType && (
          <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Business Registration Number (Optional)
          </label>
          <input
            type="text"
            value={formData.businessRegistrationNumber}
            onChange={(e) => handleInputChange('businessRegistrationNumber', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Registration number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tax ID (Optional)
          </label>
          <input
            type="text"
            value={formData.taxId}
            onChange={(e) => handleInputChange('taxId', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Tax ID"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Website URL (Optional)
        </label>
        <input
          type="url"
          value={formData.websiteUrl}
          onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="https://your-website.com"
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Email Verification</h3>
        <p className="text-gray-400 mb-6">We need to verify your email address to continue</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-orange-500" />
          <span className="text-white font-medium">{user?.email}</span>
        </div>

        {!verificationSent ? (
          <div>
            <p className="text-gray-300 mb-4">
              Click the button below to send a verification code to your email address.
            </p>
            <button
              onClick={sendEmailVerification}
              className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Send Verification Code
            </button>
          </div>
        ) : (
          <div>
            {!isEmailVerified ? (
              <div>
                <p className="text-gray-300 mb-4">
                  We've sent a verification code to your email. Please enter it below:
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={emailVerificationCode}
                    onChange={(e) => setEmailVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <button
                    onClick={verifyEmailCode}
                    disabled={!emailVerificationCode}
                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify Code
                  </button>
                  <button
                    onClick={sendEmailVerification}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Email Verified!</h4>
                <p className="text-gray-300">Your email address has been successfully verified.</p>
              </div>
            )}
          </div>
        )}

        {errors.emailVerification && (
          <p className="text-red-400 text-sm mt-2">{errors.emailVerification}</p>
        )}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
        <p className="text-gray-400 mb-6">How can customers reach you?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={formData.businessAddress.street}
            onChange={(e) => handleInputChange('businessAddress.street', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="123 Business Street"
          />
          {errors['businessAddress.street'] && (
            <p className="text-red-400 text-sm mt-1">{errors['businessAddress.street']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.businessAddress.city}
            onChange={(e) => handleInputChange('businessAddress.city', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="City"
          />
          {errors['businessAddress.city'] && (
            <p className="text-red-400 text-sm mt-1">{errors['businessAddress.city']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State *
          </label>
          <input
            type="text"
            value={formData.businessAddress.state}
            onChange={(e) => handleInputChange('businessAddress.state', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="State"
          />
          {errors['businessAddress.state'] && (
            <p className="text-red-400 text-sm mt-1">{errors['businessAddress.state']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.businessAddress.zipCode}
            onChange={(e) => handleInputChange('businessAddress.zipCode', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="12345"
          />
          {errors['businessAddress.zipCode'] && (
            <p className="text-red-400 text-sm mt-1">{errors['businessAddress.zipCode']}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.businessAddress.country}
            onChange={(e) => handleInputChange('businessAddress.country', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="United States"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Business Phone *
        </label>
        <input
          type="tel"
          value={formData.businessPhone}
          onChange={(e) => handleInputChange('businessPhone', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="+1 (555) 123-4567"
        />
        {errors.businessPhone && (
          <p className="text-red-400 text-sm mt-1">{errors.businessPhone}</p>
        )}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Specializations</h3>
        <p className="text-gray-400 mb-6">What types of products do you sell?</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {specializationOptions.map(specialization => (
          <button
            key={specialization}
            type="button"
            onClick={() => handleSpecializationToggle(specialization)}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              formData.specializations.includes(specialization)
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500'
            }`}
          >
            {specialization}
          </button>
        ))}
      </div>
      
      {errors.specializations && (
        <p className="text-red-400 text-sm">{errors.specializations}</p>
      )}
      
      {formData.specializations.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-2">Selected Specializations:</h4>
          <div className="flex flex-wrap gap-2">
            {formData.specializations.map(spec => (
              <span
                key={spec}
                className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderSubmitStatus = () => {
    if (submitStatus === 'submitting') {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white">Submitting your application...</p>
        </div>
      )
    }
    
    if (submitStatus === 'success') {
      return (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Application Submitted!</h3>
          <p className="text-gray-400">
            Your seller application has been submitted successfully. 
            We'll review it and get back to you within 2-3 business days.
          </p>
        </div>
      )
    }
    
    if (submitStatus === 'error') {
      return (
        <div className="text-center py-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Submission Failed</h3>
          <p className="text-red-400 mb-4">{errors.submit}</p>
          <button
            onClick={() => setSubmitStatus(null)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }
    
    return null
  }

  if (submitStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            {renderSubmitStatus()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Become a GIFTPAL Seller</h1>
            <p className="text-gray-400">Join our marketplace and start selling your amazing products</p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step === 2 && isEmailVerified ? '✓' : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-orange-500' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between mb-8 text-xs text-gray-400">
            <span className={currentStep === 1 ? 'text-orange-500' : ''}>Business Info</span>
            <span className={currentStep === 2 ? 'text-orange-500' : ''}>Email Verify</span>
            <span className={currentStep === 3 ? 'text-orange-500' : ''}>Contact Info</span>
            <span className={currentStep === 4 ? 'text-orange-500' : ''}>Specializations</span>
          </div>
          
          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </motion.div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={currentStep === 2 && !isEmailVerified}
                className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Submit Application'}
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerOnboarding
