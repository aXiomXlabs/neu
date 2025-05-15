"use client"

import { useEffect, useRef } from "react"
import { Rocket, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import WaitlistButton from "./WaitlistButton"
import CollapsibleSection from "./CollapsibleSection"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Canvas animation for the hero background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.9 // 90% of viewport height
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create stars
    const stars: { x: number; y: number; size: number; speed: number }[] = []
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.05 + 0.01,
      })
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.5})`
        ctx.fill()

        // Move stars
        star.y += star.speed

        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      id="hero"
      aria-labelledby="hero-heading"
      itemScope
      itemType="http://schema.org/WebPageElement"
    >
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" aria-hidden="true" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background z-10" aria-hidden="true"></div>
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"
        aria-hidden="true"
      ></div>

      {/* Floating elements */}
      <div
        className="absolute top-1/4 left-1/5 w-24 h-24 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/3 right-1/5 w-32 h-32 rounded-full bg-solana-purple/5 blur-3xl animate-pulse-slow"
        aria-hidden="true"
      ></div>

      <div className="container-custom relative z-20 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Rocket className="w-4 h-4 mr-2" aria-hidden="true" />
                Launching Soon
              </span>
            </motion.div>

            <CollapsibleSection
              title={
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  itemProp="headline"
                >
                  Dominate Solana Meme Coins with <span className="text-gradient font-extrabold">Rust Rocket</span>
                </h1>
              }
              titleClassName="hover:opacity-90 transition-opacity duration-300"
              defaultOpen={false}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-text-secondary mb-6"
                itemProp="description"
              >
                The #1 Solana sniper bot with same-block execution and intelligent copy trading. Perfect for pump.fun
                sniping and professional Solana trading.
              </motion.p>

              {/* Feature icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 grid grid-cols-3 gap-6"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Zap className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-text-primary font-medium">Same-Block Execution</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-solana-purple/10 flex items-center justify-center mb-2">
                    <TrendingUp className="w-6 h-6 text-solana-purple" aria-hidden="true" />
                  </div>
                  <span className="text-text-primary font-medium">Copy Trading</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-solana-green/10 flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 text-solana-green"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-text-primary font-medium">Solana Optimized</span>
                </div>
              </motion.div>
            </CollapsibleSection>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex justify-center sm:justify-start"
            >
              <WaitlistButton
                id="hero-waitlist-button"
                data-tracking-id="hero_waitlist_click"
                className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-md text-base font-medium transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Join Waitlist{" "}
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                />
              </WaitlistButton>
            </motion.div>
          </div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glowing orb background */}
              <div
                className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-2xl animate-pulse-slow"
                aria-hidden="true"
              ></div>

              {/* 3D Rocket visualization */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 animate-float">
                  <Image
                    src="/images/rust-rocket-logo.png"
                    alt="Rust Rocket Logo - Solana Trading Bot"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Particle effects */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-24" aria-hidden="true">
                    <div className="absolute w-4 h-4 bg-[#8AE234]/80 rounded-full blur-sm animate-pulse-slow"></div>
                    <div
                      className="absolute w-3 h-3 bg-[#8AE234]/60 rounded-full blur-sm animate-pulse-slow"
                      style={{ top: "20%", left: "30%" }}
                    ></div>
                    <div
                      className="absolute w-2 h-2 bg-[#8AE234]/40 rounded-full blur-sm animate-pulse-slow"
                      style={{ top: "40%", left: "60%" }}
                    ></div>
                    <div
                      className="absolute w-3 h-3 bg-[#8AE234]/50 rounded-full blur-sm animate-pulse-slow"
                      style={{ top: "60%", right: "30%" }}
                    ></div>
                    <div
                      className="absolute w-2 h-2 bg-[#8AE234]/30 rounded-full blur-sm animate-pulse-slow"
                      style={{ top: "80%", right: "10%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div
                  className="w-full h-full border border-gray-700/30 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>
                <div
                  className="absolute w-4/5 h-4/5 border border-gray-700/20 rounded-full animate-spin"
                  style={{ animationDuration: "15s", animationDirection: "reverse" }}
                ></div>
                <div
                  className="absolute w-3/5 h-3/5 border border-gray-700/10 rounded-full animate-spin"
                  style={{ animationDuration: "10s" }}
                ></div>
              </div>
            </div>

            {/* Stats cards */}
            <div
              className="absolute -bottom-4 -left-4 glass-effect p-3 rounded-lg shadow-lg animate-float"
              style={{ animationDelay: "0.5s" }}
              aria-hidden="true"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-solana-green/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-solana-green" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary">Execution Speed</div>
                  <div className="text-sm font-bold text-text-primary">Same Block</div>
                </div>
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 glass-effect p-3 rounded-lg shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
              aria-hidden="true"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-solana-purple/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-solana-purple" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary">Success Rate</div>
                  <div className="text-sm font-bold text-text-primary">95%+</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        aria-hidden="true"
      >
        <span className="text-text-secondary text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-text-secondary rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
