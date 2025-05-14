import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ChatBubble from "@/components/ChatBubble"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rust Rocket | The Leading Telegram Trading and Sniping Bot",
  description:
    "Discover Rust Rocket, the top Telegram trading bot revolutionizing DeFi on Ethereum, Solana, and other chains.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <ChatBubble />
      </body>
    </html>
  )
}
