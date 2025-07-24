import { useState, useRef } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import {
  X, Upload, Gift, Calendar, Users, Camera, Video, Image,
  UserPlus, Tag, MapPin, Smile, ArrowLeft, ArrowRight,
  Settings, Globe, MessageCircle, Share2
} from 'lucide-react'
import './StoryAnimations.css'

export function InstagramStoryModal({ isOpen, onClose, onSubmit }) {
  const { user } = useAuth()
  const fileInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  
  const [currentStep, setCurrentStep] = useState('type') // 'type', 'media', 'details', 'tags'
  const [storyType, setStoryType] = useState('') // 'story', 'reel', 'post'
  const [storyData, setStoryData] = useState({
    type: '',
    giftName: '',
    giftPrice: '',
    giftSeller: '',
    giftSellerHandle: '',
    media: [],
    mediaType: '',
    story: '',
    occasion: '',
    recipient: '',
    recipientHandle: '',
    location: '',
    tags: [],
    isPublic: true,
    allowComments: true,
    allowSharing: true
  })

  const occasions = [
    'Birthday', 'Wedding', 'Anniversary', 'Valentine\'s Day', 'Baby Shower',
    'Graduation', 'Housewarming', 'Retirement', 'Christmas', 'Mother\'s Day',
    'Father\'s Day', 'New Year', 'Easter', 'Thanksgiving', 'Just Because'
  ]

  const recipients = [
    'Mother', 'Father', 'Sister', 'Brother', 'Partner', 'Friend',
    'Colleague', 'Grandmother', 'Grandfather', 'Child', 'Cousin',
    'Aunt', 'Uncle', 'Neighbor', 'Teacher', 'Boss'
  ]

  const storyTypes = [
    { 
      id: 'story', 
      name: 'Story', 
      icon: Image, 
      description: 'Share a moment that disappears in 24 hours',
      color: '#ff6347'
    },
    { 
      id: 'reel', 
      name: 'Reel', 
      icon: Video, 
      description: 'Create a short video to showcase your gift',
      color: '#ff1493'
    },
    { 
      id: 'post', 
      name: 'Post', 
      icon: Gift, 
      description: 'Share a permanent post about your gift experience',
      color: '#4ecdc4'
    }
  ]

  const handleMediaChange = (e, type = 'image') => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newMedia = []
      
      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newMedia.push({
            file,
            preview: reader.result,
            type: file.type.startsWith('video/') ? 'video' : 'image'
          })
          
          if (newMedia.length === files.length) {
            setStoryData(prev => ({
              ...prev,
              media: [...prev.media, ...newMedia],
              mediaType: type
            }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click()
    }
  }

  const removeMedia = (index) => {
    setStoryData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }))
  }

  const addTag = (tag) => {
    if (tag && !storyData.tags.includes(tag)) {
      setStoryData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tagToRemove) => {
    setStoryData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleNext = () => {
    if (currentStep === 'type' && storyType) {
      setStoryData(prev => ({ ...prev, type: storyType }))
      setCurrentStep('media')
    } else if (currentStep === 'media' && storyData.media.length > 0) {
      setCurrentStep('details')
    } else if (currentStep === 'details') {
      setCurrentStep('tags')
    }
  }

  const handleBack = () => {
    if (currentStep === 'media') setCurrentStep('type')
    else if (currentStep === 'details') setCurrentStep('media')
    else if (currentStep === 'tags') setCurrentStep('details')
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'type': return storyType !== ''
      case 'media': return storyData.media.length > 0
      case 'details': {
        const hasGiftName = storyData.giftName && storyData.giftName.trim() !== ''
        const hasStory = storyData.story && storyData.story.trim() !== ''
        // Make occasion and recipient optional for easier completion
        console.log('Validation check:', { hasGiftName, hasStory, storyData })
        return hasGiftName && hasStory
      }
      case 'tags': return true
      default: return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!storyData.media.length || !storyData.giftName || !storyData.story) {
      alert('Please add media, gift name, and story content')
      return
    }

    const newStory = {
      id: Date.now(),
      type: storyData.type,
      user: {
        id: user?.id || 'demo-user',
        name: user?.name || 'Demo User',
        username: `@${user?.username || 'demouser'}`,
        avatar: user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
        isVerified: false,
        giftingStar: {
          level: 1,
          title: "Gift Seeker",
          totalOrders: 1,
          totalSpent: parseFloat(storyData.giftPrice) || 0,
          badges: ["New Member"]
        },
        stats: {
          followers: 0,
          following: 0,
          storiesPosted: 1,
          giftsGiven: 1,
          wishlistItems: 0
        }
      },
      gift: {
        name: storyData.giftName,
        image: storyData.media[0]?.preview || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
        price: storyData.giftPrice ? `$${storyData.giftPrice}` : '$0',
        seller: storyData.giftSeller,
        sellerHandle: storyData.giftSellerHandle,
        tags: storyData.tags.length > 0 ? storyData.tags : ['New']
      },
      story: {
        title: storyData.giftName,
        content: storyData.story,
        timestamp: 'Just now',
        occasion: storyData.occasion || 'Just Because',
        recipient: storyData.recipient || 'Someone Special',
        recipientHandle: storyData.recipientHandle,
        location: storyData.location
      },
      media: storyData.media,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isSaved: false,
      settings: {
        isPublic: storyData.isPublic,
        allowComments: storyData.allowComments,
        allowSharing: storyData.allowSharing
      }
    }

    onSubmit(newStory)
    
    // Reset form
    setStoryData({
      type: '',
      giftName: '',
      giftPrice: '',
      giftSeller: '',
      giftSellerHandle: '',
      media: [],
      mediaType: '',
      story: '',
      occasion: '',
      recipient: '',
      recipientHandle: '',
      location: '',
      tags: [],
      isPublic: true,
      allowComments: true,
      allowSharing: true
    })
    setCurrentStep('type')
    setStoryType('')
    onClose()
  }

  if (!isOpen) return null

  const getStepTitle = () => {
    switch (currentStep) {
      case 'type': return 'What would you like to share?'
      case 'media': return 'Add Photos or Videos'
      case 'details': return 'Tell Your Story'
      case 'tags': return 'Tag People & Add Details'
      default: return 'Share Your Story'
    }
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case 'type': return 1
      case 'media': return 2
      case 'details': return 3
      case 'tags': return 4
      default: return 1
    }
  }

  return (
    <div
      className="modal-backdrop fade-in"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div
        className="instagram-story-modal story-modal-enter"
        onClick={e => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          background: '#181312',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #333'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #333',
          background: '#1a1a1a'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {currentStep !== 'type' && (
              <button
                onClick={handleBack}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#4ecdc4',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h2 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>
                {getStepTitle()}
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.25rem' }}>
                Step {getStepNumber()} of 4
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: '3px',
          background: '#333',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4ecdc4, #45b7aa)',
            width: `${(getStepNumber() / 4) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Content */}
        <div style={{
          padding: '2rem',
          maxHeight: 'calc(90vh - 120px)',
          overflowY: 'auto'
        }}>
          {currentStep === 'type' && (
            <div className="story-type-selection">
              <div style={{ display: 'grid', gap: '1rem' }}>
                {storyTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setStoryType(type.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.5rem',
                      border: `2px solid ${storyType === type.id ? type.color : '#333'}`,
                      borderRadius: '12px',
                      background: storyType === type.id ? `${type.color}15` : 'transparent',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      background: storyType === type.id ? type.color : '#333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <type.icon size={24} color="white" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                        {type.name}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#888' }}>
                        {type.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'media' && (
            <div className="media-upload-section">
              {/* Media Upload Options */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '2rem 1rem',
                    border: '2px dashed #4ecdc4',
                    borderRadius: '12px',
                    background: 'transparent',
                    color: '#4ecdc4',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(78, 205, 196, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                  }}
                >
                  <Image size={32} />
                  <span style={{ fontWeight: 500 }}>Gallery</span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Choose photos</span>
                </button>

                <button
                  onClick={handleCameraCapture}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '2rem 1rem',
                    border: '2px dashed #ff6347',
                    borderRadius: '12px',
                    background: 'transparent',
                    color: '#ff6347',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 99, 71, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                  }}
                >
                  <Camera size={32} />
                  <span style={{ fontWeight: 500 }}>Camera</span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Take photo</span>
                </button>

                <button
                  onClick={() => videoInputRef.current?.click()}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '2rem 1rem',
                    border: '2px dashed #ff1493',
                    borderRadius: '12px',
                    background: 'transparent',
                    color: '#ff1493',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 20, 147, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                  }}
                >
                  <Video size={32} />
                  <span style={{ fontWeight: 500 }}>Video</span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Record video</span>
                </button>
              </div>

              {/* Media Preview */}
              {storyData.media.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: 'white', fontSize: '1.1rem' }}>
                    Selected Media ({storyData.media.length})
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {storyData.media.map((item, index) => (
                      <div key={index} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                        {item.type === 'video' ? (
                          <video
                            src={item.preview}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              background: '#333'
                            }}
                            controls
                          />
                        ) : (
                          <img
                            src={item.preview}
                            alt={`Media ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              background: '#333'
                            }}
                          />
                        )}
                        <button
                          onClick={() => removeMedia(index)}
                          style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            background: 'rgba(0,0,0,0.8)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'background 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 0, 0, 0.8)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(0,0,0,0.8)'
                          }}
                        >
                          <X size={14} />
                        </button>
                        {item.type === 'video' && (
                          <div style={{
                            position: 'absolute',
                            bottom: '6px',
                            left: '6px',
                            background: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <Video size={10} />
                            Video
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMediaChange(e, 'image')}
                style={{ display: 'none' }}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleMediaChange(e, 'image')}
                style={{ display: 'none' }}
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleMediaChange(e, 'video')}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {currentStep === 'details' && (
            <div className="story-details-section">
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    color: 'white',
                    fontWeight: 500
                  }}>
                    <Gift size={16} />
                    Gift Name *
                  </label>
                  <input
                    type="text"
                    value={storyData.giftName}
                    onChange={(e) => setStoryData(prev => ({ ...prev, giftName: e.target.value }))}
                    placeholder="What gift did you give or receive?"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      color: 'white',
                      fontWeight: 500
                    }}>
                      Gift Price
                    </label>
                    <input
                      type="number"
                      value={storyData.giftPrice}
                      onChange={(e) => setStoryData(prev => ({ ...prev, giftPrice: e.target.value }))}
                      placeholder="$0.00"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        background: '#1a1a1a',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: 'white',
                      fontWeight: 500
                    }}>
                      <MapPin size={16} />
                      Location
                    </label>
                    <input
                      type="text"
                      value={storyData.location}
                      onChange={(e) => setStoryData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Where was this?"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        background: '#1a1a1a',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: 'white',
                      fontWeight: 500
                    }}>
                      <Calendar size={16} />
                      Occasion *
                    </label>
                    <select
                      value={storyData.occasion}
                      onChange={(e) => setStoryData(prev => ({ ...prev, occasion: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        background: '#1a1a1a',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                      required
                    >
                      <option value="">Select occasion</option>
                      {occasions.map(occasion => (
                        <option key={occasion} value={occasion}>{occasion}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: 'white',
                      fontWeight: 500
                    }}>
                      <Users size={16} />
                      Recipient *
                    </label>
                    <select
                      value={storyData.recipient}
                      onChange={(e) => setStoryData(prev => ({ ...prev, recipient: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        background: '#1a1a1a',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                      required
                    >
                      <option value="">Who received it?</option>
                      {recipients.map(recipient => (
                        <option key={recipient} value={recipient}>{recipient}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'white',
                    fontWeight: 500
                  }}>
                    Your Story *
                  </label>
                  <textarea
                    value={storyData.story}
                    onChange={(e) => setStoryData(prev => ({ ...prev, story: e.target.value }))}
                    placeholder="Tell us about this gift! Why did you choose it? How did the recipient react? Share the emotions and memories..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      color: 'white',
                      minHeight: '120px',
                      resize: 'vertical',
                      fontSize: '1rem',
                      lineHeight: '1.5'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Quick Share Option */}
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(78, 205, 196, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(78, 205, 196, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 500, marginBottom: '0.25rem' }}>
                      Ready to share?
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                      You can add tags later or share now
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: 'linear-gradient(135deg, #4ecdc4, #45b7aa)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Gift size={14} />
                    Share Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'tags' && (
            <div className="story-tags-section">
              <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Tag People Section */}
                <div>
                  <h4 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}>
                    <UserPlus size={18} />
                    Tag People
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#888',
                        fontSize: '0.9rem'
                      }}>
                        Gift Seller
                      </label>
                      <input
                        type="text"
                        value={storyData.giftSeller}
                        onChange={(e) => setStoryData(prev => ({ ...prev, giftSeller: e.target.value }))}
                        placeholder="Seller name"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #333',
                          borderRadius: '8px',
                          background: '#1a1a1a',
                          color: 'white',
                          fontSize: '1rem'
                        }}
                      />
                      <input
                        type="text"
                        value={storyData.giftSellerHandle}
                        onChange={(e) => setStoryData(prev => ({ ...prev, giftSellerHandle: e.target.value }))}
                        placeholder="@seller_handle"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #333',
                          borderRadius: '8px',
                          background: '#1a1a1a',
                          color: 'white',
                          fontSize: '1rem',
                          marginTop: '0.5rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#888',
                        fontSize: '0.9rem'
                      }}>
                        Gift Recipient
                      </label>
                      <input
                        type="text"
                        value={storyData.recipientHandle}
                        onChange={(e) => setStoryData(prev => ({ ...prev, recipientHandle: e.target.value }))}
                        placeholder="@recipient_handle"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #333',
                          borderRadius: '8px',
                          background: '#1a1a1a',
                          color: 'white',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                <div>
                  <h4 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}>
                    <Tag size={18} />
                    Add Tags
                  </h4>

                  <div style={{ marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Add a tag and press Enter"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #333',
                        borderRadius: '8px',
                        background: '#1a1a1a',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTag(e.target.value.trim())
                          e.target.value = ''
                        }
                      }}
                    />
                  </div>

                  {storyData.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      {storyData.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: '#4ecdc4',
                            color: 'white',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: 500
                          }}
                        >
                          #{tag}
                          <button
                            onClick={() => removeTag(tag)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'white',
                              cursor: 'pointer',
                              padding: '0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['Luxury', 'Handmade', 'Personalized', 'Vintage', 'Tech', 'Fashion', 'Home', 'Beauty'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        style={{
                          background: storyData.tags.includes(tag) ? '#4ecdc4' : 'transparent',
                          border: `1px solid ${storyData.tags.includes(tag) ? '#4ecdc4' : '#333'}`,
                          color: storyData.tags.includes(tag) ? 'white' : '#888',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div>
                  <h4 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}>
                    <Settings size={18} />
                    Privacy & Settings
                  </h4>

                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={storyData.isPublic}
                        onChange={(e) => setStoryData(prev => ({ ...prev, isPublic: e.target.checked }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <Globe size={16} color="#4ecdc4" />
                      <span style={{ color: 'white' }}>Make this story public</span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={storyData.allowComments}
                        onChange={(e) => setStoryData(prev => ({ ...prev, allowComments: e.target.checked }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <MessageCircle size={16} color="#4ecdc4" />
                      <span style={{ color: 'white' }}>Allow comments</span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={storyData.allowSharing}
                        onChange={(e) => setStoryData(prev => ({ ...prev, allowSharing: e.target.checked }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <Share2 size={16} color="#4ecdc4" />
                      <span style={{ color: 'white' }}>Allow sharing</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid #333',
          background: '#1a1a1a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>
            {currentStep === 'type' && 'Choose how you want to share'}
            {currentStep === 'media' && `${storyData.media.length} media selected`}
            {currentStep === 'details' && 'Fill in the story details'}
            {currentStep === 'tags' && 'Tag people and customize settings'}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {currentStep === 'tags' ? (
              <>
                <button
                  onClick={handleSubmit}
                  style={{
                    background: 'transparent',
                    color: '#888',
                    border: '1px solid #333',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white'
                    e.target.style.borderColor = '#4ecdc4'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#888'
                    e.target.style.borderColor = '#333'
                  }}
                >
                  Skip Tags
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    background: 'linear-gradient(135deg, #4ecdc4, #45b7aa)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Gift size={16} />
                  Share Story
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                style={{
                  background: canProceed() ? 'linear-gradient(135deg, #4ecdc4, #45b7aa)' : '#333',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: canProceed() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Next
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
