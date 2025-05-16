import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ChatBubble from "@/components/ChatBubble"
import { WaitlistModalProvider } from "@/components/WaitlistModalProvider"
import Script from "next/script"
// Add the import for AnalyticsProvider near the top of the file
import AnalyticsProvider from "@/components/AnalyticsProvider"
import { Suspense } from "react"
import { CookieConsentProvider } from "@/lib/cookieConsent"
import CookieConsent from "@/components/CookieConsent"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rust Rocket | #1 Solana Sniper Bot with Pro Copy Trading",
  description:
    "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading. Perfect for pump.fun sniping and professional Solana trading.",
  generator: "Next.js",
  applicationName: "Rust Rocket",
  keywords: [
    "Solana sniper bot",
    "meme coin sniper",
    "copy trader bot Solana",
    "Rust Rocket bot",
    "pump.fun sniper bot",
    "Solana trading bot",
    "same-block execution",
    "Solana meme coins",
    "crypto trading automation",
  ],
  authors: [{ name: "Rust Rocket Team" }],
  creator: "Rust Rocket",
  publisher: "Rust Rocket",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.rust-rocket.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rust Rocket | #1 Solana Sniper Bot with Pro Copy Trading",
    description:
      "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading.",
    url: "https://www.rust-rocket.com",
    siteName: "Rust Rocket",
    images: [
      {
        url: "/images/og-image.jpg", // TODO: Create and add actual OG image
        width: 1200,
        height: 630,
        alt: "Rust Rocket - Solana Trading Bot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rust Rocket | #1 Solana Sniper Bot with Pro Copy Trading",
    description:
      "Dominate Solana meme coins with Rust Rocket - the fastest same-block execution bot with intelligent copy trading.",
    images: ["/images/twitter-image.jpg"], // TODO: Create and add actual Twitter card image
    creator: "@rustrocket",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8AE234",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#8AE234",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Find the return statement and wrap the content with AnalyticsProvider
  return (
    <html lang="en" className={inter.variable} itemScope itemType="http://schema.org/WebPage">
      <head>
        {/* Additional meta tags can be added here if needed */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CookieConsentProvider>
          <AnalyticsProvider>
            <WaitlistModalProvider>
              <Suspense>{children}</Suspense>
              <ChatBubble />
              <CookieConsent />
            </WaitlistModalProvider>
          </AnalyticsProvider>
        </CookieConsentProvider>

        {/* Google Analytics 4 - Only loads if consent is given */}
        <Script
          id="ga4-check-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Check if user has given consent for analytics cookies
              function hasAnalyticsConsent() {
                try {
                  const consents = localStorage.getItem('cookieConsents');
                  return consents ? JSON.parse(consents).analytics === true : false;
                } catch (e) {
                  return false;
                }
              }

              // Only load GA if consent is given
              if (hasAnalyticsConsent()) {
                // Load GA script
                const gaScript = document.createElement('script');
                gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6GRKXCYXWW";
                gaScript.async = true;
                document.head.appendChild(gaScript);

                // Initialize GA
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6GRKXCYXWW', {
                  page_path: window.location.pathname,
                });
              }
            `,
          }}
        />

        {/* JSON-LD Schema for SoftwareApplication */}
        <Script
          id="schema-software-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rust Rocket",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web-based, Telegram",
              description: "Advanced Solana trading bot with same-block execution and copy trading features",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/ComingSoon",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "94",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
