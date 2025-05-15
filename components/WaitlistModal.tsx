"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [emailError, setEmailError] = useState("")

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail("")
      setTelegramUsername("")
      setConsent(false)
      setFormStatus({ type: null, message: null })
      setEmailError("")

      // Track modal open event
      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-ignore - gtag is not typed
        window.gtag("event", "waitlist_modal_open", {
          event_category: "engagement",
          event_label: "waitlist_modal",
        })
      }
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()

        // Track modal close via escape key
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore - gtag is not typed
          window.gtag("event", "waitlist_modal_close", {
            event_category: "engagement",
            event_label: "escape_key",
          })
        }
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Validate email format
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset errors
    setEmailError("")
    setFormStatus({ type: null, message: null })

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")

      // Track validation error
      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-ignore - gtag is not typed
        window.gtag("event", "waitlist_form_error", {
          event_category: "form",
          event_label: "invalid_email",
        })
      }
      return
    }

    // Validate consent
    if (!consent) {
      setFormStatus({
        type: "error",
        message: "Please agree to the privacy policy to continue",
      })

      // Track validation error
      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-ignore - gtag is not typed
        window.gtag("event", "waitlist_form_error", {
          event_category: "form",
          event_label: "consent_missing",
        })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Supabase integration
      await handleSupabaseSubmit(email, telegramUsername)

      // Google Analytics tracking
      trackWaitlistSignup(email)

      // Show success message
      setFormStatus({
        type: "success",
        message: "Thanks for joining! We'll be in touch soon.",
      })

      // Clear form
      setEmail("")
      setTelegramUsername("")
      setConsent(false)

      // Close modal after 3 seconds on success
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)

      // Check if it's a duplicate email error
      if (error instanceof Error && error.message.includes("already on our waitlist")) {
        setFormStatus({
          type: "error",
          message: "This email is already on our waitlist.",
        })

        // Track duplicate email error
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore - gtag is not typed
          window.gtag("event", "waitlist_form_error", {
            event_category: "form",
            event_label: "duplicate_email",
          })
        }
      } else {
        setFormStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        })

        // Track general error
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore - gtag is not typed
          window.gtag("event", "waitlist_form_error", {
            event_category: "form",
            event_label: "server_error",
          })
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Supabase submission
  const handleSupabaseSubmit = async (email: string, telegramUsername: string) => {
    const supabase = createClientSupabaseClient()

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      throw new Error("Error checking database")
    }

    if (existingUser) {
      throw new Error("This email is already on our waitlist")
    }

    // Insert new waitlist entry
    const { error: insertError } = await supabase.from("waitlist").insert({
      email,
      telegram_username: telegramUsername || null,
      referral_source: getReferralSource(),
      created_at: new Date().toISOString(),
    })

    if (insertError) {
      console.error("Error inserting waitlist entry:", insertError)
      throw insertError
    }

    return true
  }

  // Get referral source from URL parameters
  const getReferralSource = () => {
    if (typeof window === "undefined") return "direct"

    const urlParams = new URLSearchParams(window.location.search)
    const source = urlParams.get("utm_source") || urlParams.get("ref") || urlParams.get("source") || "direct"

    return source
  }

  // Google Analytics tracking
  const trackWaitlistSignup = (email: string) => {
    try {
      // Check if gtag is available
      if (typeof window !== "undefined" && "gtag" in window) {
        // @ts-ignore - gtag is not typed
        window.gtag("event", "join_waitlist_success", {
          event_category: "conversion",
          event_label: "waitlist_signup",
          method: "email",
          email_domain: email.split("@")[1],
          referral_source: getReferralSource(),
        })

        // TODO: GOOGLE ANALYTICS EVENT - Waitlist Signup Success
        // dataLayer.push({'event': 'join_waitlist_success', 'form_location': 'modal'});
        // gtag('event', 'conversion', {'send_to': 'AW-YOUR_AW_ID/YOUR_CONVERSION_LABEL'}); // Example Google Ads Conversion
        // Track other analytics events here (e.g., Meta Pixel)
      }

      console.log("Tracking waitlist signup for:", email)
    } catch (error) {
      console.error("Error tracking signup:", error)
      // Don't throw error here, as tracking failure shouldn't affect user experience
    }
  }

  const handleModalClose = () => {
    // Track modal close via button
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag is not typed
      window.gtag("event", "waitlist_modal_close", {
        event_category: "engagement",
        event_label: "close_button",
      })
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleModalClose}
      role="dialog"
      aria-labelledby="waitlist-modal-title"
      aria-modal="true"
      id="waitlist-modal"
    >
      <div
        className="relative w-full max-w-md bg-[#2C2C2C] border border-gray-800 p-6 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
          id="waitlist-modal-close"
          data-tracking-id="waitlist_modal_close_button"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Modal header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2" id="waitlist-modal-title">
            Join the Rust Rocket Waitlist!
          </h2>
          <p className="text-gray-300">
            Be the first to know when Rust Rocket launches. Get exclusive early access and updates.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          id="waitlist-form"
          data-tracking-id="waitlist_form"
          aria-labelledby="waitlist-modal-title"
        >
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Your Email Address{" "}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-2 bg-[#1A1A1A] border ${
                emailError ? "border-red-500" : "border-gray-700"
              } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white`}
              required
              aria-required="true"
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby={emailError ? "email-error" : undefined}
              data-tracking-id="waitlist_email_input"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-500" id="email-error" role="alert">
                {emailError}
              </p>
            )}
          </div>

          {/* Telegram username field */}
          <div>
            <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-1">
              Your Telegram Username (Optional)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 bg-[#1A1A1A] border border-r-0 border-gray-700 rounded-l-lg text-gray-400">
                @
              </span>
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="username"
                className="flex-1 px-4 py-2 bg-[#1A1A1A] border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white"
                aria-required="false"
                data-tracking-id="waitlist_telegram_input"
              />
            </div>
          </div>

          {/* Consent checkbox */}
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 bg-[#1A1A1A] border border-gray-700 rounded focus:ring-primary focus:ring-2"
                required
                aria-required="true"
                data-tracking-id="waitlist_consent_checkbox"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="text-gray-300">
                I agree to receive updates about Rust Rocket and confirm I have read the{" "}
                <a
                  href="https://www.rust-rocket.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                  data-tracking-id="privacy_policy_link"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>

          {/* Status message */}
          {formStatus.message && (
            <div
              className={`p-3 rounded-lg ${
                formStatus.type === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
              role="alert"
              aria-live="assertive"
            >
              {formStatus.message}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            id="waitlist-submit-button"
            data-tracking-id="waitlist_submit_button"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Processing...</span>
                <span className="sr-only">Please wait while we process your submission</span>
              </>
            ) : (
              "Secure My Spot!"
            )}
          </button>

          {/* Privacy note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            We respect your privacy and will never share your information with third parties.
          </p>
        </form>
      </div>
    </div>
  )
}
