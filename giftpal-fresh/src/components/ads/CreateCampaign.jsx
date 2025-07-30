import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Upload, 
  Target, 
  Calendar, 
  DollarSign as NairaSign,
  Eye,
  MousePointer,
  TrendingUp,
  Info,
  Check
} from 'lucide-react'
import { Link } from 'react-router-dom'

const CreateCampaign = ({ onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    name: '',
    objective: 'awareness',
    adType: 'product',
    budget: 40000,
    duration: 7,
    targetAudience: {
      ageRange: [25, 45],
      interests: [],
      location: 'all',
      gender: 'all'
    },
    products: [],
    adCreative: {
      headline: '',
      description: '',
      image: null,
      callToAction: 'Shop Now'
    },
    bidding: {
      strategy: 'automatic',
      maxCPC: 800.00
    }
  })

  const objectives = [
    { id: 'awareness', name: 'Brand Awareness', icon: Eye, desc: 'Increase visibility of your brand' },
    { id: 'traffic', name: 'Drive Traffic', icon: MousePointer, desc: 'Get more visitors to your products' },
    { id: 'conversions', name: 'Boost Sales', icon: TrendingUp, desc: 'Increase purchases and conversions' }
  ]

  const adTypes = [
    { id: 'product', name: 'Product Ads', desc: 'Promote specific products' },
    { id: 'brand', name: 'Brand Ads', desc: 'Promote your brand/store' },
    { id: 'collection', name: 'Collection Ads', desc: 'Showcase product collections' }
  ]

  const interests = [
    'Gift Giving', 'Holidays', 'Birthdays', 'Anniversaries', 'Home Decor',
    'Fashion', 'Electronics', 'Books', 'Beauty', 'Sports', 'Travel', 'Food'
  ]

  const callToActions = [
    'Shop Now', 'Learn More', 'Buy Now', 'Get Offer', 'Sign Up', 'Download'
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    onSave(campaignData)
    onClose()
  }

  const updateCampaignData = (field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateNestedData = (parent, field, value) => {
    setCampaignData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const toggleInterest = (interest) => {
    setCampaignData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        interests: prev.targetAudience.interests.includes(interest)
          ? prev.targetAudience.interests.filter(i => i !== interest)
          : [...prev.targetAudience.interests, interest]
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white">Create Campaign</h1>
        </div>
        <div className="text-sm text-gray-400">
          Step {currentStep} of 4
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Campaign Basics</h2>
              <p className="text-gray-400">Set up your campaign name and objective</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignData.name}
                onChange={(e) => updateCampaignData('name', e.target.value)}
                placeholder="e.g., Holiday Gift Collection"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Campaign Objective
              </label>
              <div className="space-y-3">
                {objectives.map(objective => {
                  const IconComponent = objective.icon
                  return (
                    <button
                      key={objective.id}
                      onClick={() => updateCampaignData('objective', objective.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                        campaignData.objective === objective.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="font-semibold text-white">{objective.name}</h3>
                          <p className="text-sm text-gray-400">{objective.desc}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Ad Type
              </label>
              <div className="space-y-3">
                {adTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => updateCampaignData('adType', type.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                      campaignData.adType === type.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-semibold text-white">{type.name}</h3>
                    <p className="text-sm text-gray-400">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Budget & Schedule</h2>
              <p className="text-gray-400">Set your budget and campaign duration</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Daily Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">₦</span>
                <input
                  type="number"
                  value={campaignData.budget}
                  onChange={(e) => updateCampaignData('budget', parseInt(e.target.value))}
                  min="4000"
                  max="400000"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">Minimum ₦4,000/day</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Duration (days)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={campaignData.duration}
                  onChange={(e) => updateCampaignData('duration', parseInt(e.target.value))}
                  min="1"
                  max="90"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="font-semibold text-white mb-2">Campaign Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Budget:</span>
                  <span className="text-white">₦{campaignData.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{campaignData.duration} days</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-400">Total Budget:</span>
                  <span className="text-purple-400">₦{(campaignData.budget * campaignData.duration).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Target Audience</h2>
              <p className="text-gray-400">Define who should see your ads</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Age Range
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={campaignData.targetAudience.ageRange[0]}
                  onChange={(e) => updateNestedData('targetAudience', 'ageRange', [parseInt(e.target.value), campaignData.targetAudience.ageRange[1]])}
                  min="18"
                  max="65"
                  className="w-20 p-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  value={campaignData.targetAudience.ageRange[1]}
                  onChange={(e) => updateNestedData('targetAudience', 'ageRange', [campaignData.targetAudience.ageRange[0], parseInt(e.target.value)])}
                  min="18"
                  max="65"
                  className="w-20 p-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center"
                />
                <span className="text-gray-400">years old</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Interests
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg text-sm transition-colors ${
                      campaignData.targetAudience.interests.includes(interest)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={campaignData.targetAudience.gender}
                onChange={(e) => updateNestedData('targetAudience', 'gender', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ad Creative</h2>
              <p className="text-gray-400">Create your ad content</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Headline
              </label>
              <input
                type="text"
                value={campaignData.adCreative.headline}
                onChange={(e) => updateNestedData('adCreative', 'headline', e.target.value)}
                placeholder="e.g., Perfect Gifts for Every Occasion"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={campaignData.adCreative.description}
                onChange={(e) => updateNestedData('adCreative', 'description', e.target.value)}
                placeholder="Describe your products or offer..."
                rows={3}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Call to Action
              </label>
              <select
                value={campaignData.adCreative.callToAction}
                onChange={(e) => updateNestedData('adCreative', 'callToAction', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              >
                {callToActions.map(cta => (
                  <option key={cta} value={cta}>{cta}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ad Image
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Upload an image for your ad</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Choose File
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          {currentStep === 4 ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Campaign
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign
