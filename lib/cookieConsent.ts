"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { event, ANALYTICS_EVENTS } from "@/lib/analytics"

// Define the types for cookie consent
export type ConsentCategories = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

// Define the context type
type CookieConsentContextType = {
  consents: ConsentCategories
  hasInteracted: boolean
  updateConsents: (newConsents: Partial<ConsentCategories>) => void
  acceptAll: () => void
  declineAll: () => void
  savePreferences: () => void
  showSettings: () => void
  hideSettings: () => void
  settingsVisible: boolean
}

// Create the context with default values
const CookieConsentContext = createContext<CookieConsentContextType>({
  consents: { necessary: true, analytics: false, marketing: false },
  hasInteracted: false,
  updateConsents: () => {},
  acceptAll: () => {},
  declineAll: () => {},
  savePreferences: () => {},
  showSettings: () => {},
  hideSettings: () => {},
  settingsVisible: false,
})

// Hook to use the cookie consent context
export const useCookieConsent = () => useContext(CookieConsentContext)

// Provider component
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // Default state: necessary cookies are always accepted
  const [consents, setConsents] = useState<ConsentCategories>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const [hasInteracted, setHasInteracted] = useState(true) // Default to true to hide banner until we check localStorage
  const [settingsVisible, setSettingsVisible] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedConsents = localStorage.getItem("cookieConsents")
    if (savedConsents) {
      try {
        const parsedConsents = JSON.parse(savedConsents)
        setConsents(parsedConsents)
        setHasInteracted(true)
      } catch (e) {
        console.error("Error parsing saved cookie consents:", e)
        setHasInteracted(false)
      }
    } else {
      // No saved preferences, show the banner
      setHasInteracted(false)
    }
  }, [])

  // Update specific consent categories
  const updateConsents = (newConsents: Partial<ConsentCategories>) => {
    setConsents((prev) => ({ ...prev, ...newConsents }))
  }

  // Accept all cookies
  const acceptAll = () => {
    const allConsents = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setConsents(allConsents)
    setHasInteracted(true)
    localStorage.setItem("cookieConsents", JSON.stringify(allConsents))

    // Track event
    event(ANALYTICS_EVENTS.COOKIE_CONSENT_ACCEPTED, {
      event_category: "consent",
      event_label: "all",
    })

    // Reload the page to activate analytics scripts
    window.location.reload()
  }

  // Decline all optional cookies
  const declineAll = () => {
    const minimalConsents = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setConsents(minimalConsents)
    setHasInteracted(true)
    localStorage.setItem("cookieConsents", JSON.stringify(minimalConsents))

    // Track event
    event(ANALYTICS_EVENTS.COOKIE_CONSENT_DECLINED, {
      event_category: "consent",
      event_label: "all",
    })
  }

  // Save current preferences
  const savePreferences = () => {
    localStorage.setItem("cookieConsents", JSON.stringify(consents))
    setHasInteracted(true)
    setSettingsVisible(false)

    // Track event
    event(ANALYTICS_EVENTS.COOKIE_SETTINGS_SAVE, {
      event_category: "consent",
      event_label: "custom",
      analytics: consents.analytics,
      marketing: consents.marketing,
    })

    // Reload the page to activate/deactivate analytics scripts
    window.location.reload()
  }

  // Show cookie settings
  const showSettings = () => {
    setSettingsVisible(true)

    // Track event
    event(ANALYTICS_EVENTS.COOKIE_SETTINGS_OPEN, {
      event_category: "consent",
      event_label: "settings_open",
    })
  }

  // Hide cookie settings
  const hideSettings = () => {
    setSettingsVisible(false)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consents,
        hasInteracted,
        updateConsents,
        acceptAll,
        declineAll,
        savePreferences,
        showSettings,
        hideSettings,
        settingsVisible,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}
