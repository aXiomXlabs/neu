// Definiere die Event-Typen für die Anwendung
export const ANALYTICS_EVENTS = {
  // Waitlist-bezogene Events
  WAITLIST_BUTTON_CLICK: "waitlist_button_click",
  WAITLIST_MODAL_OPEN: "waitlist_modal_open",
  WAITLIST_MODAL_CLOSE: "waitlist_modal_close",
  WAITLIST_SIGNUP: "waitlist_signup",
  WAITLIST_FORM_ERROR: "waitlist_form_error",

  // Navigation Events
  NAVIGATION_CLICK: "navigation_click",
  SCROLL_TO_SECTION: "scroll_to_section",

  // Engagement Events
  FEATURE_CARD_CLICK: "feature_card_click",
  FAQ_INTERACTION: "faq_interaction",
  SOCIAL_LINK_CLICK: "social_link_click",
  TELEGRAM_CLICK: "telegram_click",

  // Chat Bubble Events
  CHAT_BUBBLE_OPEN: "chat_bubble_open",
  CHAT_BUBBLE_CLOSE: "chat_bubble_close",

  // Cookie Consent Events
  COOKIE_CONSENT_SHOWN: "cookie_consent_shown",
  COOKIE_CONSENT_ACCEPTED: "cookie_consent_accepted",
  COOKIE_CONSENT_DECLINED: "cookie_consent_declined",
  COOKIE_SETTINGS_OPEN: "cookie_settings_open",
  COOKIE_SETTINGS_SAVE: "cookie_settings_save",
}

// Typen für die Event-Parameter
interface EventParams {
  event_category?: string
  event_label?: string
  [key: string]: any
}

// Funktion zum Senden von Events an Google Analytics
export function event(eventName: string, params: EventParams = {}) {
  // Prüfen, ob wir im Browser sind und ob gtag verfügbar ist
  if (typeof window !== "undefined" && "gtag" in window) {
    try {
      // @ts-ignore - gtag ist nicht typisiert
      window.gtag("event", eventName, {
        ...params,
        send_to: "G-6GRKXCYXWW", // Google Analytics 4 Measurement ID
        timestamp: new Date().toISOString(),
      })

      // Logging im Development-Modus
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Event: ${eventName}`, params)
      }
    } catch (error) {
      // Fehler beim Tracking sollten die Anwendung nicht beeinträchtigen
      console.error("[Analytics] Error tracking event:", error)
    }
  }
}

// Funktion zum Setzen von User Properties
export function setUserProperty(name: string, value: string) {
  if (typeof window !== "undefined" && "gtag" in window) {
    try {
      // @ts-ignore - gtag ist nicht typisiert
      window.gtag("set", "user_properties", { [name]: value })

      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] User Property: ${name}=${value}`)
      }
    } catch (error) {
      console.error("[Analytics] Error setting user property:", error)
    }
  }
}

// Funktion zum Tracken von Seitenaufrufen
export function pageView(url: string) {
  if (typeof window !== "undefined" && "gtag" in window) {
    try {
      // @ts-ignore - gtag ist nicht typisiert
      window.gtag("config", "G-6GRKXCYXWW", {
        page_path: url,
      })

      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Page View: ${url}`)
      }
    } catch (error) {
      console.error("[Analytics] Error tracking page view:", error)
    }
  }
}
