import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Search, 
  TrendingUp, 
  Target, 
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  BarChart3,
  Globe,
  Tag,
  FileText,
  Image,
  Link as LinkIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'

const SEOOptimization = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [seoData, setSeoData] = useState({
    keywords: ['handmade gifts', 'unique presents', 'custom jewelry'],
    metaTitle: 'Artisan Gifts & Custom Jewelry | Your Store Name',
    metaDescription: 'Discover unique handmade gifts and custom jewelry. Perfect for special occasions.',
    productTitles: {
      optimized: 12,
      needsWork: 8,
      total: 20
    },
    images: {
      withAltText: 15,
      withoutAltText: 5,
      total: 20
    },
    seoScore: 78
  })

  const seoChecklist = [
    {
      id: 1,
      title: 'Store Meta Title',
      status: 'good',
      description: 'Your store has an optimized meta title',
      action: 'Review and update if needed'
    },
    {
      id: 2,
      title: 'Product Descriptions',
      status: 'warning',
      description: '8 products need better descriptions',
      action: 'Add detailed, keyword-rich descriptions'
    },
    {
      id: 3,
      title: 'Image Alt Text',
      status: 'warning',
      description: '5 images missing alt text',
      action: 'Add descriptive alt text to all images'
    },
    {
      id: 4,
      title: 'URL Structure',
      status: 'good',
      description: 'Clean, SEO-friendly URLs',
      action: 'Keep using descriptive URLs'
    },
    {
      id: 5,
      title: 'Loading Speed',
      status: 'error',
      description: 'Page loads slowly (3.2s)',
      action: 'Optimize images and reduce file sizes'
    }
  ]

  const keywordSuggestions = [
    { keyword: 'personalized gifts', volume: 12000, difficulty: 'Medium', trend: 'up' },
    { keyword: 'custom birthday gifts', volume: 8500, difficulty: 'Low', trend: 'up' },
    { keyword: 'handcrafted jewelry', volume: 15000, difficulty: 'High', trend: 'stable' },
    { keyword: 'unique wedding gifts', volume: 6800, difficulty: 'Medium', trend: 'up' },
    { keyword: 'artisan home decor', volume: 4200, difficulty: 'Low', trend: 'down' }
  ]

  const seoTips = [
    {
      title: 'Optimize Product Titles',
      description: 'Include primary keywords in your product titles naturally',
      impact: 'High'
    },
    {
      title: 'Write Detailed Descriptions',
      description: 'Use 150-300 words with relevant keywords and benefits',
      impact: 'High'
    },
    {
      title: 'Add Alt Text to Images',
      description: 'Describe images for better accessibility and SEO',
      impact: 'Medium'
    },
    {
      title: 'Use Category Tags',
      description: 'Organize products with relevant category and feature tags',
      impact: 'Medium'
    },
    {
      title: 'Encourage Reviews',
      description: 'Customer reviews add fresh content and keywords',
      impact: 'High'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'border-green-500 bg-green-500/10'
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'error':
        return 'border-red-500 bg-red-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Link to="/seller-dashboard" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">SEO Optimization</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">SEO Score:</div>
          <div className={`text-lg font-bold ${seoData.seoScore >= 80 ? 'text-green-400' : seoData.seoScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {seoData.seoScore}/100
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center p-4 border-b border-gray-700">
        <div className="flex bg-gray-800 rounded-lg p-1">
          {['overview', 'keywords', 'checklist', 'tips'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* SEO Score Circle */}
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(seoData.seoScore / 100) * 314} 314`}
                    className={seoData.seoScore >= 80 ? 'text-green-400' : seoData.seoScore >= 60 ? 'text-yellow-400' : 'text-red-400'}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{seoData.seoScore}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">SEO Health Score</h3>
              <p className="text-gray-400">
                {seoData.seoScore >= 80 ? 'Excellent! Your store is well optimized.' :
                 seoData.seoScore >= 60 ? 'Good, but there\'s room for improvement.' :
                 'Needs work. Focus on the recommendations below.'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">Product Titles</span>
                </div>
                <div className="text-2xl font-bold text-white">{seoData.productTitles.optimized}/{seoData.productTitles.total}</div>
                <div className="text-sm text-gray-400">Optimized</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Image Alt Text</span>
                </div>
                <div className="text-2xl font-bold text-white">{seoData.images.withAltText}/{seoData.images.total}</div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
            </div>

            {/* Top Issues */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Top Priority Issues</h3>
              <div className="space-y-3">
                {seoChecklist.filter(item => item.status !== 'good').slice(0, 3).map(item => (
                  <div key={item.id} className={`p-3 rounded-lg border ${getStatusColor(item.status)}`}>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Keyword Research</h2>
              <p className="text-gray-400">Discover high-impact keywords for your products</p>
            </div>

            {/* Current Keywords */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">Your Current Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {seoData.keywords.map((keyword, index) => (
                  <span key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Keyword Suggestions */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Suggested Keywords</h3>
              <div className="space-y-3">
                {keywordSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{suggestion.keyword}</span>
                        <TrendingUp className={`w-4 h-4 ${
                          suggestion.trend === 'up' ? 'text-green-400' : 
                          suggestion.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-sm text-gray-400">
                        {suggestion.volume.toLocaleString()} searches/month • {suggestion.difficulty} difficulty
                      </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Research Tool */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">Research New Keywords</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a keyword or phrase..."
                  className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">SEO Checklist</h2>
              <p className="text-gray-400">Complete these tasks to improve your SEO score</p>
            </div>

            {seoChecklist.map(item => (
              <div key={item.id} className={`p-4 rounded-xl border ${getStatusColor(item.status)}`}>
                <div className="flex items-start gap-3">
                  {getStatusIcon(item.status)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                    <p className="text-purple-400 text-sm font-medium">{item.action}</p>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Fix
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">SEO Tips & Best Practices</h2>
              <p className="text-gray-400">Learn how to improve your store's search visibility</p>
            </div>

            {seoTips.map((tip, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{tip.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        tip.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                        tip.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {tip.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-400">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* SEO Resources */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Additional Resources</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">SEO Guide for E-commerce</div>
                    <div className="text-sm text-gray-400">Complete guide to optimizing your online store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">Keyword Research Tools</div>
                    <div className="text-sm text-gray-400">Free tools to find profitable keywords</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/reminders" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🔔</div>
            <span className="text-xs">Reminders</span>
          </Link>
          <Link to="/gifts" className="flex flex-col items-center p-3 text-gray-400 hover:text-white transition-colors">
            <div className="w-6 h-6 mb-1">🎁</div>
            <span className="text-xs">Gifts</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-3 text-purple-500">
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SEOOptimization
