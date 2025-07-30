import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Plus, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Star,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const SponsoredAdsManager = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Holiday Gift Collection',
      status: 'active',
      budget: 200000,
      spent: 137000,
      impressions: 12450,
      clicks: 234,
      conversions: 18,
      ctr: 1.88,
      cpc: 584,
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      targetAudience: 'Gift Buyers 25-45',
      adType: 'product',
      products: ['Luxury Spa Set', 'Gourmet Chocolate Box']
    },
    {
      id: 2,
      name: 'Brand Awareness Campaign',
      status: 'paused',
      budget: 120000,
      spent: 62700,
      impressions: 8920,
      clicks: 145,
      conversions: 8,
      ctr: 1.63,
      cpc: 432,
      startDate: '2024-11-15',
      endDate: '2024-12-15',
      targetAudience: 'All Users',
      adType: 'brand',
      products: []
    }
  ])

  const [showCreateCampaign, setShowCreateCampaign] = useState(false)

  const totalStats = {
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avgCTR: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length : 0,
    avgCPC: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.cpc, 0) / campaigns.length : 0
  }

  const handleCampaignAction = (campaignId, action) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        switch (action) {
          case 'pause':
            return { ...campaign, status: 'paused' }
          case 'resume':
            return { ...campaign, status: 'active' }
          case 'delete':
            return null
          default:
            return campaign
        }
      }
      return campaign
    }).filter(Boolean))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Link to="/seller-dashboard" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">Sponsored Ads</h1>
        </div>
        <button 
          onClick={() => setShowCreateCampaign(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center p-4 border-b border-gray-700">
        <div className="flex bg-gray-800 rounded-lg p-1">
          {['overview', 'campaigns', 'analytics', 'settings'].map(tab => (
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
            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Total Spent</span>
                </div>
                <div className="text-2xl font-bold text-white">₦{totalStats.totalSpent.toLocaleString()}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">Impressions</span>
                </div>
                <div className="text-2xl font-bold text-white">{totalStats.totalImpressions.toLocaleString()}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-400 text-sm">Clicks</span>
                </div>
                <div className="text-2xl font-bold text-white">{totalStats.totalClicks}</div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-400 text-sm">Conversions</span>
                </div>
                <div className="text-2xl font-bold text-white">{totalStats.totalConversions}</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-sm">Average CTR</div>
                  <div className="text-xl font-bold text-purple-400">{totalStats.avgCTR.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Average CPC</div>
                  <div className="text-xl font-bold text-green-400">₦{totalStats.avgCPC.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Campaigns</h3>
              <div className="space-y-3">
                {campaigns.slice(0, 3).map(campaign => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">{campaign.name}</h4>
                      <p className="text-sm text-gray-400">
                        {campaign.status === 'active' ? '🟢' : '⏸️'} {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">₦{campaign.spent.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">{campaign.clicks} clicks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{campaign.name}</h3>
                    <p className="text-sm text-gray-400">{campaign.targetAudience}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {campaign.status}
                    </span>
                    <button
                      onClick={() => handleCampaignAction(campaign.id, campaign.status === 'active' ? 'pause' : 'resume')}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-gray-400 text-sm">Budget</div>
                    <div className="text-white font-medium">₦{campaign.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Spent</div>
                    <div className="text-white font-medium">₦{campaign.spent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">CTR</div>
                    <div className="text-white font-medium">{campaign.ctr}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Conversions</div>
                    <div className="text-white font-medium">{campaign.conversions}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {campaign.startDate} - {campaign.endDate}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Detailed analytics coming soon</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Ad Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white">Auto-optimize campaigns</span>
                  <button className="bg-purple-600 w-12 h-6 rounded-full relative">
                    <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 right-0.5"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Email notifications</span>
                  <button className="bg-gray-600 w-12 h-6 rounded-full relative">
                    <div className="bg-white w-5 h-5 rounded-full absolute top-0.5 left-0.5"></div>
                  </button>
                </div>
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

export default SponsoredAdsManager
