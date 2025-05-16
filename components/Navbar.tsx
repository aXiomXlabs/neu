"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import WaitlistButton from "./WaitlistButton"
import { event, ANALYTICS_EVENTS } from "@/lib/analytics"

// Füge diese Konstante am Anfang der Datei nach den Imports hinzu
const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const navLinks = [
  { name: "Features", href: "#features", id: "nav-features" },
  { name: "Copy Trading", href: "#copy-trading", id: "nav-copy-trading" },
  { name: "Network", href: "#bdn-network", id: "nav-network" },
  { name: "Dashboard", href: "#dashboard-preview", id: "nav-dashboard" },
  { name: "FAQ", href: "#faq", id: "nav-faq" },
]

// Füge diese Funktion nach den navLinks hinzu
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const isScrolling = useRef(false)
  const prefersReducedMotion = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Rest des Codes bleibt unverändert...

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Nur aktualisieren, wenn sich der Status wirklich ändert
      const shouldBeScrolled = window.scrollY > 20
      if (scrolled !== shouldBeScrolled) {
        setScrolled(shouldBeScrolled)
      }

      // Aktiven Abschnitt nur berechnen, wenn das Fenster nicht scrollt
      if (!isScrolling.current) {
        isScrolling.current = true

        // Verzögere die Berechnung des aktiven Abschnitts
        setTimeout(() => {
          const sections = navLinks.map((link) => link.href.substring(1))
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section)
            if (!element) return false

            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          })

          if (currentSection && activeSection !== currentSection) {
            setActiveSection(currentSection)
          }

          isScrolling.current = false
        }, 100)
      }
    }

    // Verwende passive Event-Listener für bessere Scrolling-Performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled, activeSection])

  const trackNavClick = (linkName: string) => {
    // Google Analytics tracking
    event(ANALYTICS_EVENTS.NAVIGATION_CLICK, {
      event_category: "navigation",
      event_label: linkName,
    })

    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  const renderMobileMenu = () => {
    if (!mobileMenuOpen) return null

    return (
      <motion.div
        id="mobile-menu"
        initial={prefersReducedMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        className="md:hidden bg-background-secondary/90 backdrop-blur-md border-t border-gray-800"
        aria-labelledby="mobile-menu-button"
      >
        <nav className="container-custom py-4 space-y-2" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              id={`mobile-${link.id}`}
              data-tracking-id={`mobile_nav_${link.name.toLowerCase().replace(/\s+/g, "_")}_click`}
              onClick={() => trackNavClick(`mobile_${link.name}`)}
              className="block text-base font-medium py-3 px-4 rounded-md text-text-primary hover:text-primary hover:bg-background-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-800 mt-4"></div>
          <div className="pt-2 border-t border-gray-800 mt-2">
            <a
              href="https://t.me/rustrocket"
              target="_blank"
              rel="noopener noreferrer"
              id="mobile-telegram-link"
              data-tracking-id="mobile_telegram_click"
              onClick={() => trackNavClick("telegram")}
              className="flex items-center justify-between py-3 px-4 text-text-primary hover:text-primary hover:bg-background-tertiary rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Telegram Channel (opens in a new tab)"
            >
              <span>Telegram Channel</span>
              <ExternalLink className="h-4 w-4 ml-2" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </motion.div>
    )
  }

  // Füge einen Effekt hinzu, um den Fokus zu verwalten
  useEffect(() => {
    if (mobileMenuOpen) {
      // Setze einen Timeout, um sicherzustellen, dass das Menü gerendert wurde
      const timer = setTimeout(() => {
        const firstLink = document.querySelector("#mobile-menu a") as HTMLElement
        if (firstLink) firstLink.focus()
      }, 100)
      return () => clearTimeout(timer)
    } else if (menuButtonRef.current) {
      // Fokus zurück auf den Menü-Button setzen, wenn das Menü geschlossen wird
      menuButtonRef.current.focus()
    }
  }, [mobileMenuOpen])

  // Füge einen Effekt hinzu, um Escape-Taste zu behandeln
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${prefersReducedMotion ? "" : "duration-200"} ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-gray-800/50 py-2" : "bg-transparent py-3"
      }`}
      role="banner"
    >
      {/* Skip-Link für Tastaturnavigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container-custom flex items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <motion.div
          initial={prefersReducedMotion ? reducedMotionVariants.visible : { opacity: 0, x: -20 }}
          animate={prefersReducedMotion ? reducedMotionVariants.visible : { opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, type: "tween" }}
          className="flex items-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 group py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Rust Rocket Home"
            id="logo-link"
            data-tracking-id="logo_click"
            onClick={() => trackNavClick("logo")}
          >
            <span className="text-primary font-bold text-lg md:text-lg">Rust Rocket</span>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <motion.nav
          initial={prefersReducedMotion ? reducedMotionVariants.visible : { opacity: 0, y: -10 }}
          animate={prefersReducedMotion ? reducedMotionVariants.visible : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
          className="hidden md:flex items-center space-x-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              id={link.id}
              data-tracking-id={`nav_${link.name.toLowerCase().replace(/\s+/g, "_")}_click`}
              onClick={() => trackNavClick(link.name)}
              className={`nav-link text-sm font-medium transition-colors py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                activeSection === link.href.substring(1)
                  ? "text-primary after:scale-x-100"
                  : "text-text-primary after:scale-x-0"
              }`}
              aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </motion.nav>

        {/* CTA Button */}
        <motion.div
          initial={prefersReducedMotion ? reducedMotionVariants.visible : { opacity: 0, x: 20 }}
          animate={prefersReducedMotion ? reducedMotionVariants.visible : { opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="hidden md:flex items-center space-x-4"
        >
          <WaitlistButton
            id="nav-waitlist-button"
            data-tracking-id="nav_waitlist_click"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          >
            Join Waitlist
          </WaitlistButton>
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <WaitlistButton
            id="nav-mobile-waitlist-button"
            data-tracking-id="nav_mobile_waitlist_click"
            className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
          >
            Join Waitlist
          </WaitlistButton>
          <button
            ref={menuButtonRef}
            type="button"
            className="text-text-primary hover:text-primary transition-colors p-2 rounded-md hover:bg-background-tertiary/30 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            id="mobile-menu-button"
            data-tracking-id={mobileMenuOpen ? "mobile_menu_close" : "mobile_menu_open"}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence mode="wait">{mobileMenuOpen && renderMobileMenu()}</AnimatePresence>
    </header>
  )
}
