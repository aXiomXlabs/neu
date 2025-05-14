export default function VisionSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="vision">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            More Than Just a Bot: Our Mission for Solana Traders.
          </h2>

          <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
            We are traders and developers fascinated by the potential of Solana.{" "}
            <span className="text-primary">Rust Rocket</span> (www.rust-rocket.com) is our contribution to making
            advanced trading technology accessible and fair for a wider community. We are committed to continuously
            evolving Rust Rocket – be part of the journey!
          </p>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 via-solana-purple/5 to-solana-green/5 blur-3xl -z-10"></div>
    </section>
  )
}
