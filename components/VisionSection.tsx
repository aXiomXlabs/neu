"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import CollapsibleSection from "./CollapsibleSection"

export default function VisionSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true })

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
  }

  return (
    <section className="py-20 relative overflow-hidden" id="vision" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={fadeInAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <CollapsibleSection
            title={
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
                More Than Just a Bot: Our Mission for Solana Traders.
              </h2>
            }
            titleClassName="hover:opacity-90 transition-opacity duration-300"
            defaultOpen={false}
          >
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed">
              We are traders and developers fascinated by the potential of Solana.{" "}
              <span className="text-primary">Rust Rocket</span> is our contribution to making advanced trading
              technology accessible and fair for a wider community. We are committed to continuously evolving Rust
              Rocket – be part of the journey!
            </p>
          </CollapsibleSection>
        </motion.div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 via-solana-purple/5 to-solana-green/5 blur-3xl -z-10"></div>
    </section>
  )
}
