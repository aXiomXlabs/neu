"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Hero() {
  const pathname = usePathname()
  const isGerman = pathname.startsWith("/de")

  // Übersetzte Texte
  const texts = {
    title: isGerman
      ? "Dominiere Solana Meme Coins: Snipe im selben Block & Kopiere die Profis – Mit Rust Rocket."
      : "Dominate Solana Meme Coins: Snipe in the Same Block & Copy the Pros – With Rust Rocket.",
    subtitle: isGerman
      ? "Müde von verpassten Launches und langsamen Bots? Rust Rocket ist dein Telegram-Bot für Solana, der dich mit 15 proprietären BDN-Gateways und intelligentem Copy-Trading an die Spitze katapultiert."
      : "Tired of missed launches and slow bots? Rust Rocket is your Telegram bot for Solana, catapulting you to the top with 15 proprietary BDN gateways and intelligent copy trading.",
    cta: isGerman
      ? "Tritt der Warteliste bei & sichere dir Zugang zum Launch!"
      : "Join Waitlist & Secure Launch Access!",
    belowCta: isGerman
      ? "Sei Teil der exklusiven Rust Rocket Community – Launch nächste Woche!"
      : "Be part of the exclusive Rust Rocket community – Launching next week!",
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-text-primary">
            {texts.title.replace("Rust Rocket", "")}
            <span className="text-primary">Rust Rocket</span>.
          </h1>

          {/* Sub-Headline */}
          <p className="text-text-secondary text-lg md:text-xl max-w-3xl mb-10">{texts.subtitle}</p>

          {/* CTA Button */}
          <Link
            href="#waitlist"
            className="btn-primary text-lg px-8 py-4 rounded-lg flex items-center gap-2 group shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:translate-y-[-2px]"
          >
            {texts.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Small Text Below CTA */}
          <p className="text-text-secondary text-sm mt-4">{texts.belowCta}</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-solana-purple/5 blur-3xl"></div>
      <div className="absolute top-1/4 -right-16 w-48 h-48 rounded-full bg-solana-green/5 blur-3xl"></div>
    </section>
  )
}
