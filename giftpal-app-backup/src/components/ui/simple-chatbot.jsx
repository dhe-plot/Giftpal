import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Camera } from 'lucide-react'
import './chatbot-animations.css'

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your MR.GIFT AI assistant! 🎁 I can help you with:",
      timestamp: new Date(),
      options: [
        { icon: '🎁', text: 'Find perfect gifts', action: 'find_gifts' },
        { icon: '🖼️', text: 'Generate gift images', action: 'generate_image' },
        { icon: '📸', text: 'Analyze uploaded images', action: 'analyze_image' },
        { icon: '🏪', text: 'Find sellers', action: 'find_sellers' },
        { icon: '🛡️', text: 'Customer Support', action: 'customer_support' },
        { icon: '💳', text: 'Payment Issues', action: 'payment_help' }
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (type, content, options = null, imageUrl = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date(),
      options,
      imageUrl
    }
    setMessages(prev => [...prev, newMessage])

    // Increment message count for proactive support
    if (type === 'user') {
      setMessageCount(prev => prev + 1)

      // Offer proactive help after several messages
      if (messageCount === 4) {
        setTimeout(() => {
          addMessage('bot', "I notice you've been chatting for a while! 😊 Is everything going smoothly, or would you like me to connect you with additional support options?", [
            { icon: '✅', text: 'Everything is great!', action: 'all_good' },
            { icon: '👨‍💼', text: 'Speak to human agent', action: 'human_agent' },
            { icon: '📞', text: 'Schedule a call', action: 'schedule_call' },
            { icon: '🛡️', text: 'More support options', action: 'customer_support' }
          ])
        }, 3000)
      }
    }
  }

  const simulateTyping = (callback, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addMessage('user', inputValue)
    const userMessage = inputValue.toLowerCase()
    setInputValue('')

    simulateTyping(() => {
      if (userMessage.includes('gift') || userMessage.includes('present')) {
        handleGiftRecommendation()
      } else if (userMessage.includes('image') || userMessage.includes('generate')) {
        handleImageGeneration()
      } else if (userMessage.includes('analyze')) {
        handleImageAnalysis()
      } else if (userMessage.includes('seller') || userMessage.includes('shop')) {
        handleSellerRecommendation()
      } else {
        handleIntelligentResponse(userMessage)
      }
    })
  }

  const handleGiftRecommendation = () => {
    const gifts = [
      { name: 'Luxury Spa Set', price: '$89.99', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80' },
      { name: 'Artisan Coffee Collection', price: '$45.99', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80' },
      { name: 'Personalized Jewelry', price: '$129.99', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80' }
    ]

    addMessage('bot', "Here are some perfect gift recommendations:", null)
    
    gifts.forEach((gift, index) => {
      setTimeout(() => {
        addMessage('bot', `🎁 **${gift.name}** - ${gift.price}`, [
          { icon: '🛒', text: 'Add to Cart', action: 'add_to_cart' },
          { icon: '❤️', text: 'Add to Wishlist', action: 'add_to_wishlist' },
          { icon: '👀', text: 'View Details', action: 'view_details' }
        ], gift.image)
      }, index * 800)
    })
  }

  const handleImageGeneration = () => {
    addMessage('bot', "I'll generate a beautiful gift image for you! ✨")
    
    setTimeout(() => {
      addMessage('bot', "Here's your generated gift image:", [
        { icon: '💾', text: 'Save Image', action: 'save_image' },
        { icon: '🔄', text: 'Generate Another', action: 'generate_another' },
        { icon: '🛒', text: 'Find Similar Gifts', action: 'find_similar' }
      ], 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80')
    }, 3000)
  }

  const handleImageAnalysis = () => {
    addMessage('bot', "Please upload an image and I'll analyze it for you! 📸", [
      { icon: '📁', text: 'Upload Image', action: 'upload_image' }
    ])
  }

  const handleSellerRecommendation = () => {
    const sellers = [
      { name: 'Giftify Premium', rating: 4.8, location: 'New York', specialty: 'Luxury Gifts' },
      { name: 'ChocoDelight', rating: 4.6, location: 'Belgium', specialty: 'Gourmet Treats' },
      { name: 'TechGenius', rating: 4.9, location: 'Silicon Valley', specialty: 'Tech Gadgets' }
    ]

    addMessage('bot', "Here are the top-rated sellers for your needs:", null)
    
    sellers.forEach((seller, index) => {
      setTimeout(() => {
        addMessage('bot', `🏪 **${seller.name}**\n⭐ ${seller.rating} rating • 📍 ${seller.location}\n🎯 Specialty: ${seller.specialty}`, [
          { icon: '👀', text: 'View Profile', action: 'view_profile' },
          { icon: '💬', text: 'Contact Seller', action: 'contact_seller' },
          { icon: '🛒', text: 'Browse Products', action: 'browse_products' }
        ])
      }, index * 600)
    })
  }

  const handleGeneralResponse = () => {
    const responses = [
      "I'm here to help you find the perfect gifts! What are you looking for?",
      "Let me assist you with your gifting needs. Would you like recommendations?",
      "I can help you discover amazing gifts, generate images, or find great sellers!"
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    addMessage('bot', randomResponse, [
      { icon: '🎁', text: 'Browse Gifts', action: 'find_gifts' },
      { icon: '🖼️', text: 'Generate Image', action: 'generate_image' },
      { icon: '🏪', text: 'Find Sellers', action: 'find_sellers' }
    ])
  }

  // Customer Support Functions
  const handleCustomerSupport = () => {
    addMessage('bot', "I'm here to help with any issues you're experiencing! What can I assist you with today?", [
      { icon: '⚖️', text: 'Dispute Resolution', action: 'dispute_help' },
      { icon: '💳', text: 'Payment Issues', action: 'payment_help' },
      { icon: '🎨', text: 'Customization Help', action: 'customization_help' },
      { icon: '📦', text: 'Order Issues', action: 'order_help' },
      { icon: '🔄', text: 'Returns & Refunds', action: 'return_help' },
      { icon: '🚚', text: 'Shipping Problems', action: 'shipping_help' },
      { icon: '👤', text: 'Account Issues', action: 'account_help' },
      { icon: '🔒', text: 'Security Concerns', action: 'security_help' }
    ])
  }

  const handleDisputeResolution = () => {
    addMessage('bot', "I understand you're having a dispute. Let me help you resolve this quickly and fairly. What type of dispute are you experiencing?", [
      { icon: '📦', text: 'Item Not Received', action: 'dispute_not_received' },
      { icon: '❌', text: 'Item Not as Described', action: 'dispute_not_described' },
      { icon: '💔', text: 'Damaged Item', action: 'dispute_damaged' },
      { icon: '🏪', text: 'Seller Communication', action: 'dispute_seller_comm' },
      { icon: '💰', text: 'Refund Issues', action: 'dispute_refund' },
      { icon: '🎨', text: 'Customization Problems', action: 'dispute_customization' }
    ])
  }

  const handlePaymentHelp = () => {
    addMessage('bot', "I can help you with payment-related issues. What specific problem are you experiencing?", [
      { icon: '💳', text: 'Payment Failed', action: 'payment_failed' },
      { icon: '🔄', text: 'Refund Status', action: 'refund_status' },
      { icon: '💰', text: 'Overcharged', action: 'payment_overcharged' },
      { icon: '🔒', text: 'Payment Security', action: 'payment_security' },
      { icon: '📱', text: 'Payment Methods', action: 'payment_methods' },
      { icon: '🧾', text: 'Invoice Issues', action: 'invoice_help' }
    ])
  }

  const handleCustomizationHelp = () => {
    addMessage('bot', "I can assist with customization requests and issues. What do you need help with?", [
      { icon: '✏️', text: 'Edit Customization', action: 'edit_customization' },
      { icon: '👀', text: 'Preview Custom Item', action: 'preview_custom' },
      { icon: '⏱️', text: 'Customization Timeline', action: 'custom_timeline' },
      { icon: '💰', text: 'Custom Pricing', action: 'custom_pricing' },
      { icon: '📋', text: 'Design Requirements', action: 'design_requirements' },
      { icon: '🎨', text: 'Design Approval', action: 'design_approval' }
    ])
  }

  const handleOrderHelp = () => {
    addMessage('bot', "Let me help you with your order. What issue are you experiencing?", [
      { icon: '📋', text: 'Track My Order', action: 'track_order' },
      { icon: '✏️', text: 'Modify Order', action: 'modify_order' },
      { icon: '❌', text: 'Cancel Order', action: 'cancel_order' },
      { icon: '📅', text: 'Delivery Date', action: 'delivery_date' },
      { icon: '📍', text: 'Change Address', action: 'change_address' },
      { icon: '🔄', text: 'Reorder Item', action: 'reorder_item' }
    ])
  }

  const handleReturnHelp = () => {
    addMessage('bot', "I can help you with returns and refunds. What would you like to do?", [
      { icon: '📦', text: 'Start Return Process', action: 'start_return' },
      { icon: '🔄', text: 'Check Refund Status', action: 'check_refund' },
      { icon: '📋', text: 'Return Policy', action: 'return_policy' },
      { icon: '🏷️', text: 'Print Return Label', action: 'return_label' },
      { icon: '💰', text: 'Partial Refund', action: 'partial_refund' },
      { icon: '🔄', text: 'Exchange Item', action: 'exchange_item' }
    ])
  }

  const handleShippingHelp = () => {
    addMessage('bot', "I can assist with shipping-related issues. What's the problem?", [
      { icon: '📦', text: 'Package Not Delivered', action: 'package_not_delivered' },
      { icon: '📍', text: 'Wrong Address', action: 'wrong_address' },
      { icon: '💔', text: 'Damaged Package', action: 'damaged_package' },
      { icon: '⏰', text: 'Delayed Delivery', action: 'delayed_delivery' },
      { icon: '🚚', text: 'Shipping Options', action: 'shipping_options' },
      { icon: '🌍', text: 'International Shipping', action: 'international_shipping' }
    ])
  }

  // Specific Issue Handlers
  const handleSpecificIssue = (issueType) => {
    switch (issueType) {
      case 'dispute_not_received':
        addMessage('bot', "I understand your order hasn't arrived. Let me help you track it down and resolve this quickly.", null)
        setTimeout(() => {
          addMessage('bot', "**Steps I'm taking:**\n\n1. 🔍 Checking tracking information\n2. 📞 Contacting the carrier\n3. 🏪 Reaching out to the seller\n4. 💰 Preparing refund if needed\n\n**What I found:**\nYour package was marked as delivered but you didn't receive it. This could be a carrier error.", [
            { icon: '📞', text: 'Contact Carrier', action: 'contact_carrier' },
            { icon: '🏠', text: 'Check with Neighbors', action: 'check_neighbors' },
            { icon: '💰', text: 'Request Refund', action: 'request_refund' },
            { icon: '🔄', text: 'Reorder Item', action: 'reorder_item' }
          ])
        }, 2000)
        break

      case 'dispute_not_described':
        addMessage('bot', "I'm sorry the item wasn't as described. Let me help you get this resolved with a fair solution.", null)
        setTimeout(() => {
          addMessage('bot', "**To help you better, I need to know:**\n\n• What specifically was different?\n• Do you have photos of the item?\n• Would you prefer a refund or exchange?\n\n**Your options:**", [
            { icon: '📸', text: 'Upload Photos', action: 'upload_dispute_photos' },
            { icon: '💰', text: 'Request Refund', action: 'request_refund' },
            { icon: '🔄', text: 'Request Exchange', action: 'request_exchange' },
            { icon: '💬', text: 'Contact Seller', action: 'contact_seller_dispute' }
          ])
        }, 1500)
        break

      case 'payment_failed':
        addMessage('bot', "Payment failures can be frustrating. Let me help you complete your purchase successfully.", null)
        setTimeout(() => {
          addMessage('bot', "**Common causes & solutions:**\n\n💳 **Card Issues:**\n• Insufficient funds\n• Expired card\n• Incorrect details\n\n🔒 **Security:**\n• Bank blocking transaction\n• 3D Secure required\n\n🌐 **Technical:**\n• Network timeout\n• Browser issues", [
            { icon: '💳', text: 'Try Different Card', action: 'try_different_card' },
            { icon: '🏦', text: 'Contact Your Bank', action: 'contact_bank' },
            { icon: '🔄', text: 'Retry Payment', action: 'retry_payment' },
            { icon: '💰', text: 'Alternative Payment', action: 'alternative_payment' }
          ])
        }, 2000)
        break

      case 'edit_customization':
        addMessage('bot', "I can help you modify your customization. What changes would you like to make?", null)
        setTimeout(() => {
          addMessage('bot', "**Customization Options:**\n\n✏️ **Text Changes:** Names, messages, dates\n🎨 **Design Changes:** Colors, fonts, layouts\n📏 **Size Changes:** Dimensions, proportions\n🖼️ **Image Changes:** Photos, graphics, logos\n\n**Current Status:** Your order is still in design phase, so changes are possible!", [
            { icon: '✏️', text: 'Change Text', action: 'change_text' },
            { icon: '🎨', text: 'Change Design', action: 'change_design' },
            { icon: '📏', text: 'Change Size', action: 'change_size' },
            { icon: '🖼️', text: 'Change Images', action: 'change_images' }
          ])
        }, 1500)
        break

      case 'track_order':
        addMessage('bot', "Let me check your order status for you!", null)
        setTimeout(() => {
          addMessage('bot', "**📦 Order #MG-2024-001234**\n\n🎁 **Item:** Custom Engraved Watch\n💰 **Total:** $299.99\n📅 **Ordered:** Dec 15, 2024\n\n**📍 Current Status:**\n✅ Order Confirmed\n✅ Payment Processed\n✅ In Production\n🔄 Quality Check (Current)\n⏳ Shipping Soon\n\n**📅 Estimated Delivery:** Dec 22, 2024", [
            { icon: '📱', text: 'Get SMS Updates', action: 'sms_updates' },
            { icon: '📧', text: 'Email Updates', action: 'email_updates' },
            { icon: '📞', text: 'Call for Update', action: 'call_update' },
            { icon: '🏪', text: 'Contact Seller', action: 'contact_seller' }
          ])
        }, 2000)
        break

      default:
        addMessage('bot', "I'm working on resolving this issue for you. Let me connect you with the right solution!", [
          { icon: '👨‍💼', text: 'Speak to Human Agent', action: 'human_agent' },
          { icon: '📞', text: 'Schedule Call', action: 'schedule_call' },
          { icon: '📧', text: 'Email Support', action: 'email_support' }
        ])
    }
  }

  // Enhanced conversation understanding
  const handleIntelligentResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    // Dispute-related keywords
    if (lowerMessage.includes('dispute') || lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('wrong') || lowerMessage.includes('broken') || lowerMessage.includes('damaged')) {
      handleDisputeResolution()
      return
    }

    // Payment-related keywords
    if (lowerMessage.includes('payment') || lowerMessage.includes('refund') || lowerMessage.includes('money') || lowerMessage.includes('charge') || lowerMessage.includes('card') || lowerMessage.includes('billing')) {
      handlePaymentHelp()
      return
    }

    // Customization keywords
    if (lowerMessage.includes('custom') || lowerMessage.includes('personalize') || lowerMessage.includes('engrave') || lowerMessage.includes('design') || lowerMessage.includes('modify')) {
      handleCustomizationHelp()
      return
    }

    // Order-related keywords
    if (lowerMessage.includes('order') || lowerMessage.includes('track') || lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
      handleOrderHelp()
      return
    }

    // Return/refund keywords
    if (lowerMessage.includes('return') || lowerMessage.includes('exchange') || lowerMessage.includes('send back')) {
      handleReturnHelp()
      return
    }

    // Account/security keywords
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('password') || lowerMessage.includes('security') || lowerMessage.includes('hack') || lowerMessage.includes('suspicious')) {
      if (lowerMessage.includes('hack') || lowerMessage.includes('suspicious') || lowerMessage.includes('unauthorized')) {
        handleSecurityHelp()
      } else {
        handleAccountHelp()
      }
      return
    }

    // Help/support keywords
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assistance') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      handleCustomerSupport()
      return
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
      addMessage('bot', "Hello! 👋 Welcome to MR.GIFT! I'm your AI assistant and I'm here to help you with anything you need. How can I assist you today?", [
        { icon: '🎁', text: 'Find Gifts', action: 'find_gifts' },
        { icon: '🛡️', text: 'Customer Support', action: 'customer_support' },
        { icon: '🖼️', text: 'Generate Images', action: 'generate_image' },
        { icon: '🏪', text: 'Find Sellers', action: 'find_sellers' }
      ])
      return
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      addMessage('bot', "You're very welcome! 😊 I'm always here to help. Is there anything else I can assist you with today?", [
        { icon: '🎁', text: 'More Gift Ideas', action: 'find_gifts' },
        { icon: '🛡️', text: 'Other Support', action: 'customer_support' },
        { icon: '💬', text: 'Chat More', action: 'continue_chat' }
      ])
      return
    }

    // Default to general response
    handleGeneralResponse()
  }

  const handleAccountHelp = () => {
    addMessage('bot', "I can help you with account-related issues. What do you need assistance with?", [
      { icon: '🔑', text: 'Password Reset', action: 'password_reset' },
      { icon: '📧', text: 'Change Email', action: 'change_email' },
      { icon: '👤', text: 'Update Profile', action: 'update_profile' },
      { icon: '🔒', text: 'Account Security', action: 'account_security' },
      { icon: '❌', text: 'Delete Account', action: 'delete_account' },
      { icon: '📱', text: 'Two-Factor Auth', action: 'two_factor_auth' }
    ])
  }

  const handleSecurityHelp = () => {
    addMessage('bot', "Security is our top priority. How can I help secure your account?", [
      { icon: '🚨', text: 'Suspicious Activity', action: 'suspicious_activity' },
      { icon: '🔒', text: 'Account Locked', action: 'account_locked' },
      { icon: '💳', text: 'Unauthorized Charges', action: 'unauthorized_charges' },
      { icon: '📱', text: 'Enable 2FA', action: 'enable_2fa' },
      { icon: '🔑', text: 'Change Password', action: 'change_password' },
      { icon: '📧', text: 'Secure Email', action: 'secure_email' }
    ])
  }

  const handleAdvancedSupport = (issueType) => {
    switch (issueType) {
      case 'suspicious_activity':
        addMessage('bot', "I take security concerns very seriously. Let me help you secure your account immediately.", null)
        setTimeout(() => {
          addMessage('bot', "**🚨 Immediate Security Actions:**\n\n1. ✅ Temporarily locked your account\n2. 🔍 Reviewing recent activity\n3. 📧 Sending security alert email\n4. 🔒 Requiring password reset\n\n**What I found:**\n• Login from new device detected\n• No unauthorized purchases found\n• Account activity looks normal", [
            { icon: '🔑', text: 'Reset Password Now', action: 'reset_password_now' },
            { icon: '📱', text: 'Enable 2FA', action: 'enable_2fa_now' },
            { icon: '👨‍💼', text: 'Speak to Security Team', action: 'security_team' },
            { icon: '📧', text: 'Security Report', action: 'security_report' }
          ])
        }, 2000)
        break

      case 'unauthorized_charges':
        addMessage('bot', "Unauthorized charges are serious. I'm initiating our fraud protection protocol immediately.", null)
        setTimeout(() => {
          addMessage('bot', "**💳 Fraud Protection Activated:**\n\n1. 🛡️ Flagged suspicious transactions\n2. 💰 Initiating refund process\n3. 🔒 Securing payment methods\n4. 📞 Contacting your bank\n\n**Next Steps:**\n• Refund will process in 3-5 business days\n• New secure payment method recommended\n• Fraud report filed", [
            { icon: '💰', text: 'Track Refund', action: 'track_refund' },
            { icon: '💳', text: 'Add New Payment', action: 'add_payment' },
            { icon: '📞', text: 'Call Bank', action: 'call_bank' },
            { icon: '📋', text: 'Fraud Report', action: 'fraud_report' }
          ])
        }, 2500)
        break

      case 'account_locked':
        addMessage('bot', "I can help you regain access to your account. Let me check why it was locked.", null)
        setTimeout(() => {
          addMessage('bot', "**🔒 Account Lock Reason:**\nMultiple failed login attempts detected\n\n**🔓 Unlock Options:**\n• Verify your identity\n• Reset your password\n• Contact support for manual unlock\n\n**Security Check:**\nWas this you trying to log in?", [
            { icon: '✅', text: 'Yes, that was me', action: 'confirm_user' },
            { icon: '❌', text: 'No, suspicious activity', action: 'report_suspicious' },
            { icon: '🔑', text: 'Reset Password', action: 'reset_password' },
            { icon: '📞', text: 'Call Support', action: 'call_support' }
          ])
        }, 1800)
        break

      default:
        addMessage('bot', "I'm here to help resolve this issue. Let me connect you with the appropriate support team.", [
          { icon: '👨‍💼', text: 'Specialist Support', action: 'specialist_support' },
          { icon: '📞', text: 'Priority Call', action: 'priority_call' },
          { icon: '📧', text: 'Urgent Email', action: 'urgent_email' }
        ])
    }
  }

  const handleOptionClick = (action) => {
    switch (action) {
      case 'find_gifts':
        addMessage('user', 'Help me find gifts')
        simulateTyping(() => handleGiftRecommendation())
        break
      case 'generate_image':
        addMessage('user', 'Generate a gift image')
        simulateTyping(() => handleImageGeneration())
        break
      case 'analyze_image':
        addMessage('user', 'Analyze an image')
        simulateTyping(() => handleImageAnalysis())
        break
      case 'find_sellers':
        addMessage('user', 'Find sellers')
        simulateTyping(() => handleSellerRecommendation())
        break
      case 'upload_image':
        fileInputRef.current?.click()
        break

      // Customer Support Actions
      case 'customer_support':
        addMessage('user', 'I need customer support')
        simulateTyping(() => handleCustomerSupport())
        break
      case 'payment_help':
        addMessage('user', 'I need help with payment issues')
        simulateTyping(() => handlePaymentHelp())
        break
      case 'dispute_help':
        addMessage('user', 'I need help with a dispute')
        simulateTyping(() => handleDisputeResolution())
        break
      case 'customization_help':
        addMessage('user', 'I need help with customization')
        simulateTyping(() => handleCustomizationHelp())
        break
      case 'order_help':
        addMessage('user', 'I need help with my order')
        simulateTyping(() => handleOrderHelp())
        break
      case 'return_help':
        addMessage('user', 'I need help with returns')
        simulateTyping(() => handleReturnHelp())
        break
      case 'shipping_help':
        addMessage('user', 'I need help with shipping')
        simulateTyping(() => handleShippingHelp())
        break
      case 'account_help':
        addMessage('user', 'I need help with my account')
        simulateTyping(() => handleAccountHelp())
        break
      case 'security_help':
        addMessage('user', 'I have security concerns')
        simulateTyping(() => handleSecurityHelp())
        break

      // Specific Issue Actions
      case 'dispute_not_received':
      case 'dispute_not_described':
      case 'payment_failed':
      case 'edit_customization':
      case 'track_order':
        addMessage('user', 'Let me get help with this specific issue')
        simulateTyping(() => handleSpecificIssue(action))
        break

      // Advanced Security Actions
      case 'suspicious_activity':
      case 'unauthorized_charges':
      case 'account_locked':
        addMessage('user', 'I need immediate help with this security issue')
        simulateTyping(() => handleAdvancedSupport(action))
        break

      // Quick Resolution Actions
      case 'human_agent':
        addMessage('user', 'I want to speak to a human agent')
        addMessage('bot', "I'm connecting you with our customer service team. Average wait time is 2-3 minutes. A human agent will be with you shortly!", [
          { icon: '📞', text: 'Call Instead', action: 'call_support' },
          { icon: '📧', text: 'Email Support', action: 'email_support' },
          { icon: '💬', text: 'Live Chat Queue', action: 'chat_queue' }
        ])
        break

      case 'schedule_call':
        addMessage('user', 'I want to schedule a call')
        addMessage('bot', "I can schedule a call with our support team. When would be convenient for you?", [
          { icon: '🌅', text: 'Morning (9AM-12PM)', action: 'schedule_morning' },
          { icon: '☀️', text: 'Afternoon (12PM-5PM)', action: 'schedule_afternoon' },
          { icon: '🌆', text: 'Evening (5PM-8PM)', action: 'schedule_evening' },
          { icon: '📅', text: 'Choose Specific Time', action: 'choose_time' }
        ])
        break

      case 'email_support':
        addMessage('user', 'I want to email support')
        addMessage('bot', "I've prepared an email template for you with your issue details. Our support team typically responds within 2-4 hours.", [
          { icon: '📧', text: 'Send Email Now', action: 'send_email' },
          { icon: '✏️', text: 'Edit Email', action: 'edit_email' },
          { icon: '📋', text: 'Copy Email Address', action: 'copy_email' }
        ])
        break

      case 'all_good':
        addMessage('user', 'Everything is great!')
        addMessage('bot', "Wonderful! 🎉 I'm so glad I could help. Feel free to reach out anytime if you need assistance. Have a fantastic day!", [
          { icon: '🎁', text: 'Browse More Gifts', action: 'find_gifts' },
          { icon: '⭐', text: 'Rate This Chat', action: 'rate_chat' },
          { icon: '💬', text: 'Start New Chat', action: 'new_chat' }
        ])
        break

      case 'continue_chat':
        addMessage('user', 'I want to continue chatting')
        addMessage('bot', "Great! I'm here and ready to help with anything else you need. What would you like to explore?", [
          { icon: '🎁', text: 'Gift Ideas', action: 'find_gifts' },
          { icon: '🖼️', text: 'Generate Images', action: 'generate_image' },
          { icon: '🏪', text: 'Find Sellers', action: 'find_sellers' },
          { icon: '🛡️', text: 'Customer Support', action: 'customer_support' }
        ])
        break

      case 'rate_chat':
        addMessage('user', 'I want to rate this chat')
        addMessage('bot', "Thank you for taking the time to provide feedback! How would you rate your experience with me today?", [
          { icon: '⭐', text: '⭐⭐⭐⭐⭐ Excellent', action: 'rate_5' },
          { icon: '⭐', text: '⭐⭐⭐⭐ Good', action: 'rate_4' },
          { icon: '⭐', text: '⭐⭐⭐ Average', action: 'rate_3' },
          { icon: '⭐', text: '⭐⭐ Poor', action: 'rate_2' }
        ])
        break

      case 'new_chat':
        addMessage('user', 'Start a new chat')
        setMessages([{
          id: 1,
          type: 'bot',
          content: "Hi! I'm your MR.GIFT AI assistant! 🎁 I can help you with:",
          timestamp: new Date(),
          options: [
            { icon: '🎁', text: 'Find perfect gifts', action: 'find_gifts' },
            { icon: '🖼️', text: 'Generate gift images', action: 'generate_image' },
            { icon: '📸', text: 'Analyze uploaded images', action: 'analyze_image' },
            { icon: '🏪', text: 'Find sellers', action: 'find_sellers' },
            { icon: '🛡️', text: 'Customer Support', action: 'customer_support' },
            { icon: '💳', text: 'Payment Issues', action: 'payment_help' }
          ]
        }])
        setMessageCount(0)
        break

      default:
        addMessage('bot', "I'm here to help! Let me know what specific issue you're facing and I'll guide you through the solution.", [
          { icon: '🛡️', text: 'Customer Support', action: 'customer_support' },
          { icon: '💳', text: 'Payment Issues', action: 'payment_help' },
          { icon: '📦', text: 'Order Issues', action: 'order_help' }
        ])
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        addMessage('user', 'Uploaded an image for analysis', null, e.target.result)
        simulateTyping(() => {
          addMessage('bot', "Great! I can see this is a beautiful gift item! Here's my analysis:", null)
          setTimeout(() => {
            addMessage('bot', "**Analysis Results:**\n• Category: Luxury Accessories\n• Style: Modern/Contemporary\n• Price Range: $50-150\n• Perfect for: Birthdays, Anniversaries", [
              { icon: '🏪', text: 'Find Similar Sellers', action: 'find_sellers' },
              { icon: '🔍', text: 'Search Similar Items', action: 'search_similar' },
              { icon: '💝', text: 'Gift Recommendations', action: 'find_gifts' }
            ])
          }, 1000)
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      {/* Chat Button */}
      <div
        style={{ 
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-button"
          style={{
            display: isOpen ? 'none' : 'flex',
            background: 'linear-gradient(135deg, #4ecdc4 0%, #ff6347 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(78, 205, 196, 0.4)',
            fontSize: '24px'
          }}
        >
          <MessageCircle size={24} />
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ff4444',
              color: 'white',
              fontSize: '10px',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            AI
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="chatbot-window"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '384px',
            height: '600px',
            background: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #4ecdc4 0%, #ff6347 100%)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🤖
              </div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '600', margin: 0 }}>MR.GIFT AI</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: 0 }}>Your Gift Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="chatbot-messages"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: '#111827'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px',
                    borderRadius: '16px',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #4ecdc4 0%, #ff6347 100%)'
                      : '#374151',
                    color: 'white'
                  }}
                >
                  {message.imageUrl && (
                    <div style={{ marginBottom: '8px' }}>
                      <img
                        src={message.imageUrl}
                        alt="Gift"
                        style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>
                  )}
                  <p style={{ fontSize: '14px', whiteSpace: 'pre-line', margin: 0 }}>{message.content}</p>
                  {message.options && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option.action)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '8px',
                            background: '#4b5563',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <span>{option.icon}</span>
                          <span>{option.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#374151',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '16px'
                }}>
                  <div className="typing-indicator" style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%' }}></div>
                    <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%' }}></div>
                    <div style={{ width: '8px', height: '8px', background: '#9ca3af', borderRadius: '50%' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            background: '#1f2937',
            borderTop: '1px solid #374151'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer'
                }}
              >
                <Camera size={20} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about gifts, generate images, or upload photos..."
                style={{
                  flex: 1,
                  background: '#374151',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #4b5563',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, #4ecdc4 0%, #ff6347 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  opacity: inputValue.trim() ? 1 : 0.5
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimpleChatbot
