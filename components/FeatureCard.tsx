import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  accentColor: string
}

export default function FeatureCard({ title, description, icon, accentColor }: FeatureCardProps) {
  return (
    <div className="feature-card group">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${accentColor} bg-opacity-10`}>{icon}</div>
        <div className="space-y-2">
          <h3 className={`text-xl font-bold ${accentColor}`}>{title}</h3>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}
