"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Settings, Shield, BarChart, Mail } from "lucide-react"
import { useCookieConsent } from "@/lib/cookieConsent"

export default function CookieConsent() {
  const {
    hasInteracted,
    acceptAll,
    declineAll,
    showSettings,
    settingsVisible,
    hideSettings,
    updateConsents,
    consents,
    savePreferences,
  } = useCookieConsent()

  const [isClient, setIsClient] = useState(false)

  // Ensure we only render this component on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // If user has already made a choice, don't show the banner
  if (hasInteracted && !settingsVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background-secondary border-t border-gray-800 shadow-lg"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="container-custom max-w-6xl mx-auto">
          {settingsVisible ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-text-primary" id="cookie-settings-title">
                  Cookie Settings
                </h2>
                <button
                  onClick={hideSettings}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close cookie settings"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-text-secondary" id="cookie-settings-description">
                Customize your cookie preferences. Necessary cookies are always enabled as they are essential for the
                website to function properly.
              </p>

              <div className="space-y-4">
                {/* Necessary Cookies - Always enabled */}
                <div className="p-4 bg-background-tertiary/50 rounded-lg border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md text-primary">
                      <Shield size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-text-primary">Necessary Cookies</h3>
                        <div className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Always Active</div>
                      </div>
                      <p className="text-text-secondary text-sm">
                        These cookies are essential for the website to function properly and cannot be disabled.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-background-tertiary/50 rounded-lg border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-solana-purple/10 rounded-md text-solana-purple">
                      <BarChart size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-text-primary">Analytics Cookies</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consents.analytics}
                            onChange={(e) => updateConsents({ analytics: e.target.checked })}
                            className="sr-only peer"
                            aria-describedby="analytics-description"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <p className="text-text-secondary text-sm" id="analytics-description">
                        These cookies help us understand how visitors interact with our website, helping us improve our
                        services.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 bg-background-tertiary/50 rounded-lg border border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-solana-green/10 rounded-md text-solana-green">
                      <Mail size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-text-primary">Marketing Cookies</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consents.marketing}
                            onChange={(e) => updateConsents({ marketing: e.target.checked })}
                            className="sr-only peer"
                            aria-describedby="marketing-description"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <p className="text-text-secondary text-sm" id="marketing-description">
                        These cookies are used to track visitors across websites to display relevant advertisements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={declineAll}
                  className="px-4 py-2 bg-background-tertiary hover:bg-background text-text-primary rounded-md transition-colors"
                >
                  Decline All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-background-tertiary hover:bg-background text-text-primary rounded-md transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={savePreferences}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-text-primary mb-1" id="cookie-consent-title">
                  We Value Your Privacy
                </h2>
                <p className="text-text-secondary text-sm" id="cookie-consent-description">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By
                  clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={showSettings}
                  className="flex items-center gap-2 px-4 py-2 bg-background-tertiary hover:bg-background text-text-primary rounded-md transition-colors"
                >
                  <Settings size={16} />
                  <span>Customize</span>
                </button>
                <button
                  onClick={declineAll}
                  className="px-4 py-2 bg-background-tertiary hover:bg-background text-text-primary rounded-md transition-colors"
                >
                  Decline All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
