"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Animation Varianten für Container-Elemente
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Animation Varianten für einzelne Elemente
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <footer className="bg-[#141414] border-t border-gray-800 py-6 shadow-md" role="contentinfo">
      <motion.div
        className="container-custom"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Main footer content - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Logo and copyright - full width on mobile, normal on larger screens */}
          <motion.div
            className="flex flex-col items-center sm:items-start col-span-1 order-1 sm:order-1"
            variants={itemVariants}
          >
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              aria-label="Rust Rocket Home"
              id="footer-logo-link"
              data-tracking-id="footer_logo_click"
            >
              <Image
                src="/images/rust-rocket-logo.png"
                alt="Rust Rocket Logo"
                width={107}
                height={107}
                className="h-[85px] w-auto"
              />
            </Link>
            <div className="h-2"></div>
          </motion.div>

          {/* Social media - centered on mobile, right-aligned on larger screens */}
          <motion.div className="flex flex-col items-center sm:items-end order-2 sm:order-2" variants={itemVariants}>
            <h2 className="font-medium text-text-primary mb-2 text-lg">Connect With Us</h2>
            <div className="flex flex-wrap justify-center lg:justify-end gap-5">
              {/* Telegram */}
              <SocialLink
                href="https://t.me/rustrocket"
                label="Telegram Channel"
                id="footer-telegram-link"
                trackingId="footer_telegram_click"
                bgColor="bg-[#0088cc]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </SocialLink>

              {/* X (formerly Twitter) */}
              <SocialLink
                href="https://x.com/rustrocket"
                label="X Profile"
                id="footer-x-link"
                trackingId="footer_x_click"
                bgColor="bg-black"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </SocialLink>

              {/* Discord */}
              <SocialLink
                href="https://discord.gg/rustrocket"
                label="Discord Server"
                id="footer-discord-link"
                trackingId="footer_discord_click"
                bgColor="bg-[#5865F2]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.977-.608 1.414a17.27 17.27 0 0 0-5.487 0 12.623 12.623 0 0 0-.617-1.414.077.077 0 0 0-.079-.036 19.798 19.798 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.203 13.203 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"></path>
                </svg>
              </SocialLink>

              {/* GitHub */}
              <SocialLink
                href="https://github.com/rustrocket"
                label="GitHub Repository"
                id="footer-github-link"
                trackingId="footer_github_click"
                bgColor="bg-[#333333]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                  ></path>
                </svg>
              </SocialLink>

              {/* YouTube */}
              <SocialLink
                href="https://www.youtube.com/c/rustrocket"
                label="YouTube Channel"
                id="footer-youtube-link"
                trackingId="footer_youtube_click"
                bgColor="bg-[#FF0000]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </SocialLink>

              {/* LinkedIn */}
              <SocialLink
                href="https://www.linkedin.com/company/rustrocket"
                label="LinkedIn Page"
                id="footer-linkedin-link"
                trackingId="footer_linkedin_click"
                bgColor="bg-[#0077B5]"
                hoverEffect="hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </SocialLink>
            </div>
          </motion.div>
        </div>

        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rust Rocket",
              url: "https://www.rust-rocket.com",
              logo: "https://www.rust-rocket.com/images/rust-rocket-logo.png",
              sameAs: [
                "https://x.com/rustrocket",
                "https://t.me/rustrocket",
                "https://discord.gg/rustrocket",
                "https://github.com/rustrocket",
                "https://www.youtube.com/c/rustrocket",
                "https://www.linkedin.com/company/rustrocket",
              ],
            }),
          }}
        />
      </motion.div>
    </footer>
  )
}

// Helper component for social links to reduce repetition
interface SocialLinkProps {
  href: string
  label: string
  id: string
  trackingId: string
  bgColor: string
  hoverEffect: string
  children: React.ReactNode
}

function SocialLink({ href, label, id, trackingId, bgColor, hoverEffect, children }: SocialLinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${bgColor} text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hoverEffect}`}
        aria-label={`${label} (opens in a new tab)`}
        id={id}
        data-tracking-id={trackingId}
      >
        {children}
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  )
}
