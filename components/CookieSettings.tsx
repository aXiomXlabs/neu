"use client"

import { Settings } from "lucide-react"
import { useCookieConsent } from "@/lib/cookieConsent"

export default function CookieSettings() {
  const { showSettings } = useCookieConsent()

  return (
    <button
      onClick={showSettings}
      className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors"
      aria-label="Open cookie settings"
    >
      <Settings size={14} />
      <span>Cookie Settings</span>
    </button>
  )
}
