"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ConsentType = "analytics" | "marketing" | "necessary"

interface CookieConsentContextType {
  consents: Record<ConsentType, boolean>
  setConsent: (type: ConsentType, value: boolean) => void
  hasResponded: boolean
  acceptAll: () => void
  declineAll: () => void
  savePreferences: () => void
  showPreferences: () => void
  isPreferencesOpen: boolean
  closePreferences: () => void
}

const defaultConsents: Record<ConsentType, boolean> = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
}

export const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}

interface CookieConsentProviderProps {
  children: ReactNode
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [consents, setConsents] = useState<Record<ConsentType, boolean>>(defaultConsents)
  const [hasResponded, setHasResponded] = useState<boolean>(true) // Default to true to prevent flash
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedConsents = localStorage.getItem("cookieConsents")
    const hasUserResponded = localStorage.getItem("cookieConsentResponse")

    if (savedConsents) {
      setConsents(JSON.parse(savedConsents))
    }

    setHasResponded(hasUserResponded === "true")
  }, [])

  // Set individual consent
  const setConsent = (type: ConsentType, value: boolean) => {
    setConsents((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setConsents(allAccepted)
    localStorage.setItem("cookieConsents", JSON.stringify(allAccepted))
    localStorage.setItem("cookieConsentResponse", "true")
    setHasResponded(true)
    setIsPreferencesOpen(false)

    // Reload the page to apply analytics scripts
    window.location.reload()
  }

  // Decline all optional cookies
  const declineAll = () => {
    const allDeclined = {
      necessary: true, // Always required
      analytics: false,
      marketing: false,
    }
    setConsents(allDeclined)
    localStorage.setItem("cookieConsents", JSON.stringify(allDeclined))
    localStorage.setItem("cookieConsentResponse", "true")
    setHasResponded(true)
    setIsPreferencesOpen(false)
  }

  // Save current preferences
  const savePreferences = () => {
    localStorage.setItem("cookieConsents", JSON.stringify(consents))
    localStorage.setItem("cookieConsentResponse", "true")
    setHasResponded(true)
    setIsPreferencesOpen(false)

    // Reload the page to apply analytics scripts if analytics was enabled
    if (consents.analytics) {
      window.location.reload()
    }
  }

  // Show preferences modal
  const showPreferences = () => {
    setIsPreferencesOpen(true)
  }

  // Close preferences modal
  const closePreferences = () => {
    setIsPreferencesOpen(false)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consents,
        setConsent,
        hasResponded,
        acceptAll,
        declineAll,
        savePreferences,
        showPreferences,
        isPreferencesOpen,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

// Helper function to check if analytics is allowed
export function isAnalyticsAllowed(): boolean {
  if (typeof window === "undefined") return false

  const savedConsents = localStorage.getItem("cookieConsents")
  if (!savedConsents) return false

  try {
    const consents = JSON.parse(savedConsents)
    return consents.analytics === true
  } catch (e) {
    return false
  }
}
