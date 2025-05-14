import type React from "react"
import { Target, Snail, HelpCircle, Frown } from "lucide-react"

interface PainPointProps {
  icon: React.ReactNode
  title: string
  description: string
}

function PainPoint({ icon, title, description }: PainPointProps) {
  return (
    <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-solana-purple/30 transition-all duration-300 hover:translate-y-[-2px]">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-solana-purple/10 text-solana-purple">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">{title}</h3>
          <p className="text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProblemSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="problems">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            Lost in the Solana Meme Coin Frenzy? Pump.fun & Beyond: A High-Speed Game Where Seconds Decide (and Most
            Lose Out).
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <PainPoint
            icon={<Target className="h-6 w-6" />}
            title="Missed Opportunities"
            description="New coins moon before you can even click. By the time you see the launch, early buyers are already taking profits."
          />

          <PainPoint
            icon={<Snail className="h-6 w-6" />}
            title="Slow Bots"
            description="Your trades lag, your profits vanish. Standard bots can't compete with professional trading infrastructure."
          />

          <PainPoint
            icon={<HelpCircle className="h-6 w-6" />}
            title="Information Overload"
            description="Which wallets to follow? Which coin is the next 100x? Too many options, too little reliable information."
          />

          <PainPoint
            icon={<Frown className="h-6 w-6" />}
            title="Constant Frustration"
            description="Others always seem one step ahead. You're left wondering how they consistently get in early on winning trades."
          />
        </div>

        {/* Abstract background graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl opacity-5 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-solana-purple to-solana-green rounded-full blur-[100px]"></div>
        </div>
      </div>
    </section>
  )
}
