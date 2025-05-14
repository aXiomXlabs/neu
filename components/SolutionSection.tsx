import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function SolutionSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="solution">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            <span className="text-primary">Rust Rocket</span> (www.rust-rocket.com): Precision, Speed, and Strategy –
            Straight to Your Telegram.
          </h2>

          <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            We built Rust Rocket to level the playing field for ambitious traders like you. Get the edge you need to
            navigate the Solana meme coin market successfully.
          </p>

          <div className="flex justify-center">
            <Link
              href="#waitlist"
              className="btn-primary text-lg px-8 py-4 rounded-lg flex items-center gap-2 group shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:translate-y-[-2px]"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-solana-purple/5 to-solana-green/5 rounded-full blur-[100px]"></div>
        </div>
      </div>
    </section>
  )
}
