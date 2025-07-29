import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone, Monitor } from 'lucide-react'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    setIsStandalone(standalone)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after a delay if not already installed
      if (!standalone) {
        setTimeout(() => {
          setShowPrompt(true)
        }, 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false)
      setDeferredPrompt(null)
      console.log('GIFTPAL was installed')
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  // Don't show if already installed or dismissed
  if (isStandalone || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Install GIFTPAL</h3>
                  <p className="text-gray-400 text-sm">Get the full app experience</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span>Works offline</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Monitor className="w-4 h-4 text-orange-500" />
                <span>Fast loading</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Download className="w-4 h-4 text-orange-500" />
                <span>Push notifications</span>
              </div>
            </div>

            {isIOS ? (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm mb-2 font-medium">
                  Install on iOS:
                </p>
                <ol className="text-blue-200 text-xs space-y-1">
                  <li>1. Tap the Share button in Safari</li>
                  <li>2. Scroll down and tap "Add to Home Screen"</li>
                  <li>3. Tap "Add" to install GIFTPAL</li>
                </ol>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-3 text-gray-400 hover:text-white transition-colors"
                >
                  Later
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PWAInstallPrompt
