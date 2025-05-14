import type React from "react"
import { Target, GitBranch, MessageCircle, Shield } from "lucide-react"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
}

function FeatureCard({ icon, title, description, accentColor }: FeatureProps) {
  return (
    <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-opacity-50 transition-all duration-300 hover:translate-y-[-2px] h-full">
      <div className={`p-3 rounded-lg ${accentColor} mb-4`}>{icon}</div>
      <h4 className="text-xl font-bold mb-3 text-text-primary">{title}</h4>
      <p className="text-text-secondary">{description}</p>
    </div>
  )
}

export default function AdditionalFeaturesSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            More Than Just Speed – A Full Arsenal.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Target className="h-6 w-6 text-primary" />}
            title="Pump.fun Specialist"
            description="Configure Rust Rocket to automatically snipe new pump.fun listings with your custom strategy."
            accentColor="bg-primary/10"
          />

          <FeatureCard
            icon={<GitBranch className="h-6 w-6 text-solana-purple" />}
            title="Multi-Route Transactions"
            description="Intelligent order routing for maximum transaction success rates."
            accentColor="bg-solana-purple/10"
          />

          <FeatureCard
            icon={<MessageCircle className="h-6 w-6 text-solana-green" />}
            title="Telegram-Native Interface"
            description="Control all features conveniently and intuitively directly through your Telegram client."
            accentColor="bg-solana-green/10"
          />

          <FeatureCard
            icon={<Shield className="h-6 w-6 text-primary" />}
            title="Security & Reliability Focus"
            description="Developed with a strong focus on stability and the security of your operations (further details forthcoming)."
            accentColor="bg-primary/10"
          />
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl -z-10"></div>
    </section>
  )
}
