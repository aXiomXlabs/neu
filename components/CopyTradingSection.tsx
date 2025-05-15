"use client"

import { useRef } from "react"
import Image from "next/image"
import { Search, Zap, TrendingUp, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import WaitlistButton from "./WaitlistButton"
import CollapsibleSection from "./CollapsibleSection"

export default function CopyTradingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="copy-trading"
      aria-labelledby="copy-trading-heading"
      itemScope
      itemType="http://schema.org/WebPageElement"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-solana-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <CollapsibleSection
          title={
            <>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-solana-purple mr-2" aria-hidden="true"></span>
                Copy Trading
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-text-primary"
                id="copy-trading-heading"
                itemProp="headline"
              >
                Stop Guessing, Start Copying: <span className="text-gradient">Intelligent Copy Trading</span>
              </h2>
            </>
          }
          defaultOpen={false}
          titleClassName="hover:opacity-90 transition-opacity duration-300 flex flex-col items-center text-center"
        >
          <p className="text-text-secondary text-lg" itemProp="description">
            Why spend hours analyzing wallets when Rust Rocket can find top performers and
            <span className="text-primary font-semibold"> automatically</span> execute their trades for you,
            <span className="text-primary font-semibold"> lightning-fast</span>?
          </p>
        </CollapsibleSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 border-solana-purple/20 hover:border-solana-purple/40 transition-all duration-500"
          >
            <CollapsibleSection
              title={<h3 className="text-xl font-semibold text-center text-text-primary">How Copy Trading Works</h3>}
              titleClassName="hover:opacity-90 transition-opacity duration-300"
              defaultOpen={false}
            >
              <div className="space-y-8 mt-4">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-solana-purple/20 flex items-center justify-center">
                    <Search className="w-6 h-6 text-solana-purple" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Pro Wallet Identification</h4>
                    <p className="text-text-secondary text-sm">
                      Our system identifies and tracks top-performing wallets in real-time
                    </p>
                  </div>
                </motion.div>

                {/* Connector Line */}
                <div
                  className="w-0.5 h-8 bg-gradient-to-b from-solana-purple to-primary mx-auto"
                  aria-hidden="true"
                ></div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Instant Analysis & Execution</h4>
                    <p className="text-text-secondary text-sm">
                      Our algorithm instantly analyzes and executes the same trades with precision
                    </p>
                  </div>
                </motion.div>

                {/* Connector Line */}
                <div
                  className="w-0.5 h-8 bg-gradient-to-b from-primary to-solana-green mx-auto"
                  aria-hidden="true"
                ></div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-solana-green/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-solana-green" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Profit Generation</h4>
                    <p className="text-text-secondary text-sm">
                      You benefit from professional trading strategies without the work
                    </p>
                  </div>
                </motion.div>
              </div>
            </CollapsibleSection>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 relative"
            >
              <div className="aspect-video rounded-lg overflow-hidden border border-gray-700 bg-background-secondary relative">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Solana copy trading dashboard preview showing wallet performance metrics"
                  width={600}
                  height={338}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"
                  aria-hidden="true"
                ></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-sm font-medium px-3 py-1 bg-primary/90 rounded-full text-white">
                    Dashboard Preview
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Feature cards */}
            <div className="space-y-4 mt-8">
              <CollapsibleSection
                title={
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-solana-purple/10 text-solana-purple">
                      <svg
                        width="24"
                        height="24"
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
                          d="M12 6V12L16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-text-primary">Real-Time Tracking</h4>
                  </div>
                }
                titleClassName="hover:bg-background-tertiary/30 rounded-md p-2 transition-all duration-300"
              >
                <p className="text-text-secondary text-sm ml-10">
                  Monitor top wallets 24/7 without missing a single trade
                </p>
              </CollapsibleSection>

              <CollapsibleSection
                title={
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M22 12H18L15 21L9 3L6 12H2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-text-primary">Performance Analytics</h4>
                  </div>
                }
                titleClassName="hover:bg-background-tertiary/30 rounded-md p-2 transition-all duration-300"
              >
                <p className="text-text-secondary text-sm ml-10">
                  Detailed metrics on each wallet's trading history and success rate
                </p>
              </CollapsibleSection>

              <CollapsibleSection
                title={
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-solana-green/10 text-solana-green">
                      <svg
                        width="24"
                        height="24"
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
                          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 9H9.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 9H15.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-medium text-text-primary">Customizable Parameters</h4>
                  </div>
                }
                titleClassName="hover:bg-background-tertiary/30 rounded-md p-2 transition-all duration-300"
              >
                <p className="text-text-secondary text-sm ml-10">Set your own risk tolerance and trading preferences</p>
              </CollapsibleSection>
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 glass-card p-6 border-gray-800/50"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-solana-purple flex-shrink-0"
                  aria-hidden="true"
                ></div>
                <div>
                  <p className="text-text-secondary italic mb-2" itemProp="reviewBody">
                    "Rust Rocket's copy trading feature has completely transformed my trading experience. I've seen a
                    300% increase in my portfolio in just two weeks."
                  </p>
                  <p className="text-text-primary font-medium" itemProp="author">
                    Alex K.
                  </p>
                  <p className="text-text-tertiary text-sm">Early Beta Tester</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <WaitlistButton
                id="copy-trading-waitlist-button"
                data-tracking-id="copy_trading_waitlist_click"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors group"
              >
                <span>Learn more about our copy trading features</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                />
              </WaitlistButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
