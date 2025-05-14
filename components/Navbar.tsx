"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Copy Trading", href: "#copy-trading" },
  { name: "Network", href: "#bdn-network" },
  { name: "Dashboard", href: "#dashboard-preview" },
  { name: "Waitlist", href: "#waitlist" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-[#141414] border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
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
            Join Waitlist
          </Link>
          <div className="h-6 w-px bg-gray-700"></div>
          <Link href="#" className="flex items-center space-x-1 nav-link">
            <Image src="/images/en-flag.png" alt="English" width={20} height={15} className="h-4 w-auto" />
            <Globe className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            href="#waitlist"
            className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            Join Waitlist
          </Link>
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
            <div className="pt-2 border-t border-gray-800 mt-4">
              <Link href="#" className="flex items-center space-x-2 nav-link py-2">
                <Image src="/images/en-flag.png" alt="English" width={20} height={15} className="h-4 w-auto" />
                <span>English</span>
                <Globe className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
