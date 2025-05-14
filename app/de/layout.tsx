import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ChatBubble from "@/components/ChatBubble"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rust Rocket | Der führende Telegram Trading und Sniping Bot",
  description:
    "Entdecke Rust Rocket, den Top-Telegram-Trading-Bot, der DeFi auf Ethereum, Solana und anderen Chains revolutioniert.",
  generator: "v0.dev",
}

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body>
        {children}
        <ChatBubble />
      </body>
    </html>
  )
}
