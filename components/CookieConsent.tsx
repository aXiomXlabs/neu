"use client"
import { X, Settings, Shield, BarChart, Target } from "lucide-react"
import { useCookieConsent } from "@/lib/cookieConsent"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieConsent() {
  const {
    consents,
    setConsent,
    hasResponded,
    acceptAll,
    declineAll,
    savePreferences,
    isPreferencesOpen,
    closePreferences,
    setIsPreferencesOpen,
  } = useCookieConsent()

  if (hasResponded && !isPreferencesOpen) return null

  return (
    <>
      {/* Main Cookie Banner */}
      <AnimatePresence>
        {!hasResponded && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background-secondary border-t border-gray-800 shadow-lg"
            role="dialog"
            aria-labelledby="cookie-consent-title"
          >
            <div className="container-custom">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 id="cookie-consent-title" className="text-lg font-semibold text-text-primary mb-2">
                    Cookie Consent
                  </h2>
                  <p className="text-text-secondary text-sm">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    By clicking "Accept All", you consent to our use of cookies. You can also customize your
                    preferences.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-2 md:mt-0">
                  <button
                    onClick={() => declineAll()}
                    className="px-4 py-2 bg-background-tertiary text-text-primary border border-gray-700 rounded-md hover:bg-background transition-colors text-sm"
                  >
                    Decline All
                  </button>
                  <button
                    onClick={() => setIsPreferencesOpen(true)}
                    className="px-4 py-2 bg-background-tertiary text-text-primary border border-gray-700 rounded-md hover:bg-background transition-colors text-sm flex items-center gap-1"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Preferences</span>
                  </button>
                  <button
                    onClick={() => acceptAll()}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors text-sm"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {isPreferencesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => closePreferences()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-background-secondary border border-gray-800 rounded-xl shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-text-primary">Cookie Preferences</h2>
                <button
                  onClick={() => closePreferences()}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <p className="text-text-secondary mb-6">
                  Manage your cookie preferences. Necessary cookies are always enabled as they are essential for the
                  website to function properly.
                </p>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-primary/10 text-primary mt-1">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-text-primary">Necessary Cookies</h3>
                          <div className="relative inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={consents.necessary}
                              disabled
                              className="sr-only"
                              id="necessary-cookies"
                            />
                            <div className="w-10 h-5 bg-primary rounded-full shadow-inner"></div>
                            <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition"></div>
                          </div>
                        </div>
                        <p className="text-text-secondary text-sm mt-1">
                          These cookies are essential for the website to function properly and cannot be disabled.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-solana-purple/10 text-solana-purple mt-1">
                        <BarChart className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-text-primary">Analytics Cookies</h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consents.analytics}
                              onChange={(e) => setConsent("analytics", e.target.checked)}
                              className="sr-only peer"
                              id="analytics-cookies"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <p className="text-text-secondary text-sm mt-1">
                          These cookies help us understand how visitors interact with our website by collecting and
                          reporting information anonymously.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-solana-green/10 text-solana-green mt-1">
                        <Target className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-text-primary">Marketing Cookies</h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consents.marketing}
                              onChange={(e) => setConsent("marketing", e.target.checked)}
                              className="sr-only peer"
                              id="marketing-cookies"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                        <p className="text-text-secondary text-sm mt-1">
                          These cookies are used to track visitors across websites to display relevant advertisements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-800 flex justify-end gap-3">
                <button
                  onClick={() => closePreferences()}
                  className="px-4 py-2 bg-background-tertiary text-text-primary border border-gray-700 rounded-md hover:bg-background transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => savePreferences()}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
