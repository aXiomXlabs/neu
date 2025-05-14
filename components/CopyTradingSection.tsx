import Image from "next/image"
import { Search, Zap, TrendingUp } from "lucide-react"

export default function CopyTradingSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="copy-trading">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Stop Guessing, Start Copying: <span className="text-primary">Rust Rocket's</span> Intelligent Copy
              Trading.
            </h2>

            <div className="space-y-4">
              <p className="text-text-primary text-lg">
                Why spend hours analyzing wallets when Rust Rocket can find top performers and{" "}
                <span className="text-primary font-semibold">automatically</span> execute their trades for you,{" "}
                <span className="text-primary font-semibold">lightning-fast</span>?
              </p>

              <p className="text-text-secondary">
                Other bots like Maestro, Bonk Bot, or Trojan might offer sniping, but only Rust Rocket empowers you with
                true Copy Trading – your definitive advantage.
              </p>

              <p className="text-text-secondary">
                Our system (soon with live data in your dashboard!) identifies wallets with proven success.
              </p>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-semibold mb-6 text-center text-text-primary">How Copy Trading Works</h3>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-solana-purple/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-solana-purple" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Pro Wallet Trades</h4>
                  <p className="text-text-secondary text-sm">
                    Our system identifies and tracks top-performing wallets in real-time
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-solana-purple to-primary mx-auto"></div>

              {/* Step 2 */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Rust Rocket Analyzes & Copies</h4>
                  <p className="text-text-secondary text-sm">
                    Our algorithm instantly analyzes and executes the same trades with precision
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-solana-green mx-auto"></div>

              {/* Step 3 */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-solana-green/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-solana-green" />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">Your Wallet Profits</h4>
                  <p className="text-text-secondary text-sm">
                    You benefit from professional trading strategies without the work
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-8 relative">
              <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-background-secondary">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Nansen-style dashboard preview"
                  width={600}
                  height={338}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-sm font-medium px-3 py-1 bg-primary/90 rounded-full text-white">
                    Dashboard Preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-solana-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl -z-10"></div>
    </section>
  )
}
