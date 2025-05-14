"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "./LanguageSwitcher"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Einfache Spracherkennung
  const isGerman = pathname.startsWith("/de")

  // Übersetzte Navigationstexte
  const navTexts = {
    features: isGerman ? "Funktionen" : "Features",
    copyTrading: isGerman ? "Copy-Trading" : "Copy Trading",
    network: isGerman ? "Netzwerk" : "Network",
    dashboard: "Dashboard",
    waitlist: isGerman ? "Warteliste" : "Waitlist",
    joinWaitlist: isGerman ? "Warteliste beitreten" : "Join Waitlist",
    join: isGerman ? "Beitreten" : "Join",
  }

  const navLinks = [
    { name: navTexts.features, href: "#features" },
    { name: navTexts.copyTrading, href: "#copy-trading" },
    { name: navTexts.network, href: "#bdn-network" },
    { name: navTexts.dashboard, href: "#dashboard-preview" },
    { name: navTexts.waitlist, href: "#waitlist" },
  ]

  return (
    <header className="bg-[#141414] border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={isGerman ? "/de" : "/en"} className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Image
                src="/images/rust-rocket-logo.png"
                alt="Rust Rocket Logo"
                width={30}
                height={30}
                className="h-6 w-auto"
              />
            </div>
            <span className="text-xl font-bold text-text-primary">Rust Rocket</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button and Language Selector */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="#waitlist"
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {navTexts.joinWaitlist}
          </Link>
          <div className="h-6 w-px bg-gray-700"></div>
          <LanguageSwitcher />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            href="#waitlist"
            className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            {navTexts.join}
          </Link>
          <LanguageSwitcher />
          <button type="button" className="text-text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800">
          <div className="container-custom py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block nav-link text-base font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
