import { isAnalyticsAllowed } from "./cookieConsent"

// Google Analytics 4 utility functions

/**
 * Tracks a page view in Google Analytics
 * @param url The URL to track
 */
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && isAnalyticsAllowed()) {
    window.gtag("config", "G-6GRKXCYXWW", {
      page_path: url,
    })
  }
}

/**
 * Tracks an event in Google Analytics
 * @param action The event action
 * @param params Additional event parameters
 */
export const event = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function" && isAnalyticsAllowed()) {
    window.gtag("event", action, params)
  } else if (!isAnalyticsAllowed()) {
    console.log("Analytics event not sent (no consent):", action, params)
  } else {
    console.warn("gtag function not found for Analytics event:", action)
  }
}

// Define common events for reuse
export const ANALYTICS_EVENTS = {
  WAITLIST_SIGNUP: "join_waitlist",
  WAITLIST_MODAL_OPEN: "waitlist_modal_open",
  WAITLIST_MODAL_CLOSE: "waitlist_modal_close",
  NAVIGATION_CLICK: "navigation_click",
  FEATURE_INTERACTION: "feature_interaction",
  FAQ_INTERACTION: "faq_interaction",
}
