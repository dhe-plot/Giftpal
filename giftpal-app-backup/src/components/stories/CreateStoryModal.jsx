import { useState, useRef } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { X, Upload, Gift, Calendar, Users, Camera, Video, Image, UserPlus, Tag, MapPin, Smile } from 'lucide-react'

export function CreateStoryModal({ isOpen, onClose, onSubmit }) {
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
    mediaType: '', // 'image', 'video'
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
    { id: 'story', name: 'Story', icon: Image, description: 'Share a moment that disappears in 24 hours' },
    { id: 'reel', name: 'Reel', icon: Video, description: 'Create a short video to showcase your gift' },
    { id: 'post', name: 'Post', icon: Gift, description: 'Share a permanent post about your gift experience' }
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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!storyData.media.length || !storyData.story || !storyData.occasion || !storyData.recipient) {
      alert('Please fill in all required fields')
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
        occasion: storyData.occasion,
        recipient: storyData.recipient,
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 'type':
        return (
          <div className="story-type-selection">
            <h3 style={{ marginBottom: '2rem', textAlign: 'center', color: '#4ecdc4' }}>
              What would you like to share?
            </h3>
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
                    border: `2px solid ${storyType === type.id ? '#4ecdc4' : '#333'}`,
                    borderRadius: '12px',
                    background: storyType === type.id ? 'rgba(78, 205, 196, 0.1)' : 'transparent',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <type.icon size={24} color={storyType === type.id ? '#4ecdc4' : '#888'} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{type.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#888' }}>{type.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 'media':
        return (
          <div className="media-upload-section">
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#4ecdc4' }}>
              Add Photos or Videos
            </h3>

            {/* Media Upload Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.5rem',
                  border: '2px dashed #4ecdc4',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#4ecdc4',
                  cursor: 'pointer'
                }}
              >
                <Image size={24} />
                <span>Gallery</span>
              </button>

              <button
                onClick={handleCameraCapture}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.5rem',
                  border: '2px dashed #4ecdc4',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#4ecdc4',
                  cursor: 'pointer'
                }}
              >
                <Camera size={24} />
                <span>Camera</span>
              </button>

              <button
                onClick={() => videoInputRef.current?.click()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.5rem',
                  border: '2px dashed #4ecdc4',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#4ecdc4',
                  cursor: 'pointer'
                }}
              >
                <Video size={24} />
                <span>Video</span>
              </button>
            </div>

            {/* Media Preview */}
            {storyData.media.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'white' }}>Selected Media</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
                  {storyData.media.map((item, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      {item.type === 'video' ? (
                        <video
                          src={item.preview}
                          style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                          controls
                        />
                      ) : (
                        <img
                          src={item.preview}
                          alt={`Media ${index + 1}`}
                          style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      )}
                      <button
                        onClick={() => removeMedia(index)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(0,0,0,0.7)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'white'
                        }}
                      >
                        <X size={12} />
                      </button>
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
        )

        <form onSubmit={handleSubmit} className="create-story-form">
          <div className="form-section">
            <label className="form-label">
              <Gift size={16} />
              Gift Name *
            </label>
            <input
              type="text"
              value={storyData.giftName}
              onChange={(e) => setStoryData(prev => ({ ...prev, giftName: e.target.value }))}
              placeholder="What gift did you give or receive?"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">
                <Calendar size={16} />
                Occasion *
              </label>
              <select
                value={storyData.occasion}
                onChange={(e) => setStoryData(prev => ({ ...prev, occasion: e.target.value }))}
                className="form-select"
                required
              >
                <option value="">Select occasion</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            <div className="form-section">
              <label className="form-label">
                <Users size={16} />
                Recipient *
              </label>
              <select
                value={storyData.recipient}
                onChange={(e) => setStoryData(prev => ({ ...prev, recipient: e.target.value }))}
                className="form-select"
                required
              >
                <option value="">Select recipient</option>
                {recipients.map(recipient => (
                  <option key={recipient} value={recipient}>{recipient}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Gift Price (optional)</label>
            <input
              type="number"
              step="0.01"
              value={storyData.giftPrice}
              onChange={(e) => setStoryData(prev => ({ ...prev, giftPrice: e.target.value }))}
              placeholder="0.00"
              className="form-input"
            />
          </div>

          <div className="form-section">
            <label className="form-label">
              <Camera size={16} />
              Gift Photo
            </label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
                id="gift-image"
              />
              <label htmlFor="gift-image" className="image-upload-label">
                {storyData.giftImagePreview ? (
                  <img src={storyData.giftImagePreview} alt="Gift preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <Upload size={24} />
                    <span>Click to upload photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Your Story *</label>
            <textarea
              value={storyData.story}
              onChange={(e) => setStoryData(prev => ({ ...prev, story: e.target.value }))}
              placeholder="Tell us about this gift! Why did you choose it? How did the recipient react?"
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Share Story
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
