import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ChatBubble from "@/components/ChatBubble"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"

// Unterstützte Sprachen
const locales = ["en", "de"]

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rust Rocket | The Leading Telegram Trading and Sniping Bot",
  description:
    "Discover Rust Rocket, the top Telegram trading bot revolutionizing DeFi on Ethereum, Solana, and other chains.",
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Überprüfen, ob die angeforderte Sprache unterstützt wird
  if (!locales.includes(locale)) notFound()

  // Laden der Übersetzungen für die aktuelle Sprache
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <ChatBubble />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
