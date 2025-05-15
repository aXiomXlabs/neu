"use client"

import type React from "react"

import { useRef } from "react"
import { Target, Snail, HelpCircle, Frown } from "lucide-react"
import { motion, useInView } from "framer-motion"
import CollapsibleSection from "./CollapsibleSection"

interface PainPointProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

function PainPoint({ icon, title, description, index }: PainPointProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 hover:border-solana-purple/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md group"
    >
      <CollapsibleSection
        title={
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-solana-purple/10 text-solana-purple group-hover:bg-solana-purple/20 transition-all duration-300">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-solana-purple transition-colors duration-300">
              {title}
            </h3>
          </div>
        }
        titleClassName="hover:opacity-90 transition-opacity duration-300"
      >
        <p className="text-text-secondary group-hover:text-text-primary transition-colors duration-300 ml-14">
          {description}
        </p>
      </CollapsibleSection>
    </motion.div>
  )
}

export default function ProblemSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="problems">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-solana-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <CollapsibleSection
          title={
            <>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                The Problem
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
                Lost in the Solana Meme Coin Frenzy? A High-Speed Game Where{" "}
                <span className="text-gradient">Seconds Decide</span>
              </h2>
            </>
          }
          defaultOpen={false}
          titleClassName="hover:opacity-90 transition-opacity duration-300 flex flex-col items-center text-center"
        >
          <p className="text-text-secondary text-lg">
            In the fast-paced world of Solana meme coins, especially on platforms like pump.fun, most traders are left
            behind while a select few consistently profit.
          </p>
        </CollapsibleSection>

        <div className="grid md:grid-cols-2 gap-6">
          <PainPoint
            icon={<Target className="h-6 w-6" />}
            title="Missed Opportunities"
            description="New coins moon before you can even click. By the time you see the launch, early buyers are already taking profits."
            index={0}
          />

          <PainPoint
            icon={<Snail className="h-6 w-6" />}
            title="Slow Bots"
            description="Your trades lag, your profits vanish. Standard bots can't compete with professional trading infrastructure."
            index={1}
          />

          <PainPoint
            icon={<HelpCircle className="h-6 w-6" />}
            title="Information Overload"
            description="Which wallets to follow? Which coin is the next 100x? Too many options, too little reliable information."
            index={2}
          />

          <PainPoint
            icon={<Frown className="h-6 w-6" />}
            title="Constant Frustration"
            description="Others always seem one step ahead. You're left wondering how they consistently get in early on winning trades."
            index={3}
          />
        </div>

        {/* Stats section */}
        <CollapsibleSection
          title={<h3 className="text-xl font-bold text-center text-text-primary">Key Statistics</h3>}
          titleClassName="hover:opacity-90 transition-opacity duration-300"
          defaultOpen={false}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 grid md:grid-cols-3 gap-6"
          >
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <p className="text-text-secondary">of traders miss the initial price surge</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-solana-purple mb-2">1.2s</div>
              <p className="text-text-secondary">average reaction time to new listings</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-bold text-solana-green mb-2">10x</div>
              <p className="text-text-secondary">potential gains lost to slow execution</p>
            </div>
          </motion.div>
        </CollapsibleSection>
      </div>
    </section>
  )
}
