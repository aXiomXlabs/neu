import { Zap, Globe } from "lucide-react"
import StaticBDNMap from "./StaticBDNMap"

interface BDNNetworkSectionProps {
  isGerman?: boolean
}

export default function StaticBDNNetworkSection({ isGerman = false }: BDNNetworkSectionProps) {
  // Übersetzte Texte
  const texts = {
    title: isGerman
      ? "Überhole den Markt: Same-Block-Ausführung über unser exklusives BDN-Netzwerk."
      : "Outpace the Market: Same-Block Execution via Our Exclusive BDN Network.",
    sameBlock: {
      title: isGerman ? "Same-Block-Ausführung: Maximale Wirkung." : "Same-Block Execution: Maximum Impact.",
      description: isGerman
        ? `Rust Rocket zielt darauf ab, deine Sniper- und Copy-Trades im exakt gleichen Solana-Block wie das Originalereignis auszuführen. Kein Warten, keine Verzögerungen, maximale Trefferquote.`
        : `Rust Rocket aims to execute your sniper and copy trades in the exact same Solana block as the original event. No waiting, no delays, maximum hit rate.`,
    },
    gateways: {
      title: isGerman
        ? "15 proprietäre BDN-Gateways: Dein globaler Geschwindigkeitsvorteil."
        : "15 Proprietary BDN Gateways: Your Global Speed Advantage.",
      description: isGerman
        ? "Unser globales Netzwerk aus 15 privaten, optimierten Solana-Gateways (Block Dependent Network) stellt sicher, dass deine Transaktionen über die schnellsten, zuverlässigsten Wege geleitet werden und öffentliche Überlastungen umgehen. Dies ist der technologische Vorsprung, der für erfolgreiches Sniping auf pump.fun und darüber hinaus unerlässlich ist."
        : "Our global network of 15 private, optimized Solana gateways (Block Dependent Network) ensures your transactions are routed via the fastest, most reliable paths, bypassing public congestion. This is the technological edge essential for successful sniping on pump.fun and beyond.",
    },
  }

  return (
    <section className="py-20 relative overflow-hidden" id="bdn-network">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">{texts.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Same-Block Execution */}
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">{texts.sameBlock.title}</h3>
            </div>
            <p className="text-text-secondary text-lg">{texts.sameBlock.description}</p>
          </div>

          {/* 15 Global BDN Gateways */}
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-solana-green/30 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-solana-green/10 text-solana-green">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">{texts.gateways.title}</h3>
            </div>
            <p className="text-text-secondary text-lg">{texts.gateways.description}</p>
          </div>
        </div>

        {/* Static Map */}
        <StaticBDNMap />
      </div>
    </section>
  )
}
