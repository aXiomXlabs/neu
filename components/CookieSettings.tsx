"use client"

import { Settings } from "lucide-react"
import { useCookieConsent } from "@/lib/cookieConsent"

export default function CookieSettings() {
  const { showPreferences } = useCookieConsent()

  return (
    <button
      onClick={showPreferences}
      className="text-text-secondary hover:text-primary text-sm flex items-center gap-1 transition-colors"
      aria-label="Manage cookie preferences"
    >
      <Settings className="w-3 h-3" />
      <span>Cookie Settings</span>
    </button>
  )
}
