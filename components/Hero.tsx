import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main Headline - Updated to use consistent text color */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-text-primary">
            Dominate Solana Meme Coins: Snipe in the Same Block & Copy the Pros – With{" "}
            <span className="text-primary">Rust Rocket</span>.
          </h1>

          {/* Sub-Headline */}
          <p className="text-text-secondary text-lg md:text-xl max-w-3xl mb-10">
            Tired of missed launches and slow bots? Rust Rocket (www.rust-rocket.com) is your Telegram bot for Solana,
            catapulting you to the top with 15 proprietary BDN gateways and intelligent copy trading.
          </p>

          {/* CTA Button */}
          <Link
            href="#waitlist"
            className="btn-primary text-lg px-8 py-4 rounded-lg flex items-center gap-2 group shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:translate-y-[-2px]"
          >
            Join Waitlist & Secure Launch Access!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Small Text Below CTA */}
          <p className="text-text-secondary text-sm mt-4">
            Be part of the exclusive Rust Rocket community – Launching next week!
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-solana-purple/5 blur-3xl"></div>
      <div className="absolute top-1/4 -right-16 w-48 h-48 rounded-full bg-solana-green/5 blur-3xl"></div>
    </section>
  )
}
