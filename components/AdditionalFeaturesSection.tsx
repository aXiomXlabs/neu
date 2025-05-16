"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Target, GitBranch, MessageCircle, Shield, Zap, Rocket, X, ChevronRight } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
  index: number
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
  index: number
}

interface CollapsibleSectionProps {
  title: React.ReactNode
  children: React.ReactNode
  titleClassName?: string
  defaultOpen?: boolean
}

function CollapsibleSection({ title, children, titleClassName = "", defaultOpen = true }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="collapsible-section">
      <button
        className={`w-full flex items-center justify-between p-4 ${titleClassName} text-left`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M7 14.5L12 9.5L17 14.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      <motion.div
        className="collapsible-content overflow-hidden"
        style={{ height: "auto" }}
        initial={{ height: isOpen ? "auto" : 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function FeatureCard({ icon, title, description, accentColor, index }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 hover:translate-y-[-2px] transition-all duration-300 group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CollapsibleSection
        title={
          <div className="flex items-center gap-4">
            <motion.div
              className={`p-3 rounded-lg ${accentColor} flex items-center justify-center`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
          </div>
        }
        titleClassName="hover:bg-background-tertiary/30 rounded-lg transition-all duration-300"
        defaultOpen={false}
      >
        <div className="mt-4 ml-14">
          <p className="text-text-secondary group-hover:text-text-primary transition-colors duration-300 mb-4">
            {description}
          </p>

          {/* Interaktive Elemente im ausgeklappten Zustand */}
          <div className="flex flex-wrap gap-3 mt-4">
            <motion.button
              className="px-3 py-1 bg-background-tertiary hover:bg-background-secondary text-text-primary rounded-md text-sm flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor" />
              </svg>
              <span>Mehr erfahren</span>
            </motion.button>

            <motion.button
              className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
              </svg>
              <span>Ausprobieren</span>
            </motion.button>
          </div>

          {/* Interaktiver Fortschrittsbalken */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>Entwicklungsfortschritt</span>
              <span>85%</span>
            </div>
            <div className="w-full h-2 bg-background-tertiary rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${accentColor.replace("bg-", "bg-").replace("/10", "/80")}`}
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </motion.div>
  )
}

// Interface für die Roadmap-Meilenstein-Daten
interface RoadmapMilestone {
  id: string
  quarter: string
  year: string
  title: string
  description: string
  features: string[]
  color: string
  icon: React.ReactNode
  position: "left" | "right"
}

export default function AdditionalFeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [selectedMilestone, setSelectedMilestone] = useState<RoadmapMilestone | null>(null)

  // Detaillierte Daten für die Roadmap-Meilensteine
  const roadmapMilestones: RoadmapMilestone[] = [
    {
      id: "telegram-launch",
      quarter: "Q2",
      year: "2025",
      title: "Launch via Telegram",
      description:
        "Our initial launch will be through Telegram, providing a seamless and familiar interface for crypto traders. The Telegram bot will offer core functionality with an intuitive command system.",
      features: [
        "Same-block execution for Solana transactions",
        "Basic copy trading functionality",
        "Pump.fun sniping capabilities",
        "Custom trading parameters",
        "Real-time notifications and alerts",
      ],
      color: "primary",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.5 4.5L2.5 12.5L11.5 14.5L14.5 21.5L21.5 4.5Z"></path>
          <path d="M11.5 14.5L16.5 9.5"></path>
        </svg>
      ),
      position: "left",
    },
    {
      id: "advanced-dashboard",
      quarter: "Q3",
      year: "2025",
      title: "Advanced Dashboard",
      description:
        "We'll introduce a comprehensive web dashboard that provides detailed analytics, performance metrics, and advanced configuration options for your trading strategies.",
      features: [
        "Real-time performance tracking",
        "Historical trade analysis",
        "Wallet performance metrics",
        "Customizable dashboard widgets",
        "Strategy performance comparison",
        "Advanced risk management tools",
      ],
      color: "solana-purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      position: "right",
    },
    {
      id: "advanced-sniping",
      quarter: "Q3",
      year: "2025",
      title: "Advanced Sniping",
      description:
        "Enhanced sniping capabilities with AI-powered token analysis, multi-route execution, and predictive market analysis to maximize your success rate.",
      features: [
        "AI-powered token quality assessment",
        "Multi-route transaction execution",
        "Predictive market analysis",
        "Custom sniping strategies",
        "Automatic slippage optimization",
        "Priority transaction routing",
      ],
      color: "primary",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="22" y1="12" x2="18" y2="12"></line>
          <line x1="6" y1="12" x2="2" y2="12"></line>
          <line x1="12" y1="6" x2="12" y2="2"></line>
          <line x1="12" y1="22" x2="12" y2="18"></line>
        </svg>
      ),
      position: "left",
    },
    {
      id: "web-interface",
      quarter: "Q3",
      year: "2025",
      title: "Web Interface",
      description:
        "A full-featured web application that complements our Telegram bot, offering advanced visualization, configuration, and management capabilities.",
      features: [
        "Seamless integration with Telegram bot",
        "Advanced strategy builder",
        "Visual trade history and analytics",
        "Portfolio management tools",
        "Community features and leaderboards",
        "API access for developers",
      ],
      color: "solana-purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      position: "right",
    },
    {
      id: "mobile-apps",
      quarter: "Q4",
      year: "2025",
      title: "iOS & Android Apps",
      description:
        "Native mobile applications for iOS and Android, providing on-the-go access to all Rust Rocket features with push notifications and mobile-optimized interfaces.",
      features: [
        "Real-time push notifications",
        "Biometric authentication",
        "Mobile-optimized trading interface",
        "Offline mode for analytics",
        "Quick actions and widgets",
        "Cross-device synchronization",
      ],
      color: "solana-green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
      position: "left",
    },
  ]

  // Funktion zum Öffnen des Modals mit Milestone-Details
  const openMilestoneDetails = (milestone: RoadmapMilestone) => {
    setSelectedMilestone(milestone)
  }

  // Funktion zum Schließen des Modals
  const closeMilestoneDetails = () => {
    setSelectedMilestone(null)
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-solana-green/5 rounded-full blur-3xl"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          <div
            className="particle particle-orange w-2 h-2 absolute"
            style={{ top: "10%", left: "20%", animationDuration: "15s" }}
          ></div>
          <div
            className="particle particle-green w-3 h-3 absolute"
            style={{ top: "60%", left: "10%", animationDuration: "25s" }}
          ></div>
          <div
            className="particle particle-purple w-2 h-2 absolute"
            style={{ top: "20%", right: "10%", animationDuration: "20s" }}
          ></div>
          <div
            className="particle particle-blue w-3 h-3 absolute"
            style={{ top: "70%", right: "20%", animationDuration: "18s" }}
          ></div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            Features
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            More Than Just Speed – A Full <span className="text-gradient">Trading Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Target className="h-6 w-6 text-primary" />}
            title="Pump.fun Specialist"
            description="Configure Rust Rocket to automatically snipe new pump.fun listings with your custom strategy."
            accentColor="bg-primary/10"
            index={0}
          />

          <FeatureCard
            icon={<GitBranch className="h-6 w-6 text-solana-purple" />}
            title="Multi-Route Transactions"
            description="Intelligent order routing for maximum transaction success rates even during network congestion."
            accentColor="bg-solana-purple/10"
            index={1}
          />

          <FeatureCard
            icon={<MessageCircle className="h-6 w-6 text-solana-green" />}
            title="Telegram-Native Interface"
            description="Control all features conveniently and intuitively directly through your Telegram client."
            accentColor="bg-solana-green/10"
            index={2}
          />

          <FeatureCard
            icon={<Shield className="h-6 w-6 text-primary" />}
            title="Security & Reliability"
            description="Developed with a strong focus on stability and the security of your operations (further details forthcoming)."
            accentColor="bg-primary/10"
            index={3}
          />

          <FeatureCard
            icon={<Zap className="h-6 w-6 text-solana-purple" />}
            title="Advanced Trading Algorithms"
            description="Utilize sophisticated trading algorithms that adapt to market conditions for optimal entry and exit points."
            accentColor="bg-solana-purple/10"
            index={4}
          />

          <FeatureCard
            icon={<Rocket className="h-6 w-6 text-solana-green" />}
            title="Customizable Risk Management"
            description="Set your own risk parameters including stop-loss, take-profit, and maximum allocation per trade."
            accentColor="bg-solana-green/10"
            index={5}
          />
        </div>

        {/* Roadmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <motion.h3
            className="text-2xl font-bold mb-8 text-center text-text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="text-gradient"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 0%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              Roadmap
            </motion.span>
            : The Future of Rust Rocket
          </motion.h3>

          <div className="relative">
            {/* Vertical line for timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-solana-purple to-solana-green"></div>

            {/* Render each roadmap milestone */}
            {roadmapMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: milestone.position === "left" ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: milestone.position === "left" ? -50 : 50 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`relative mb-16 md:mb-24 ${index === roadmapMilestones.length - 1 ? "mb-0" : ""}`}
              >
                <div className="flex flex-col md:flex-row items-center">
                  {/* Left side content */}
                  <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                    {milestone.position === "left" && (
                      <motion.button
                        onClick={() => openMilestoneDetails(milestone)}
                        className={`glass-card p-6 border-${milestone.color}/20 hover:border-${milestone.color}/40 transition-all duration-300 hover:shadow-glow text-center w-full cursor-pointer`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`View details about ${milestone.title}`}
                      >
                        <h4 className={`text-xl font-bold text-${milestone.color} mb-2`}>
                          {milestone.quarter} {milestone.year}
                        </h4>
                        <h5 className="text-lg font-semibold text-text-primary mb-4">{milestone.title}</h5>
                        <RoadmapIcon milestone={milestone} />
                        <div className="mt-3 flex items-center justify-center gap-1 text-sm text-text-secondary">
                          <span>View details</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </motion.button>
                    )}
                  </div>

                  {/* Center node */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-${milestone.color} flex items-center justify-center z-10 border-4 border-background`}
                  >
                    <div className="w-6 h-6 text-background">{milestone.icon}</div>
                  </div>

                  {/* Right side content */}
                  <div className="md:w-1/2 md:pl-12 md:text-left">
                    {milestone.position === "right" && (
                      <motion.button
                        onClick={() => openMilestoneDetails(milestone)}
                        className={`glass-card p-6 border-${milestone.color}/20 hover:border-${milestone.color}/40 transition-all duration-300 hover:shadow-glow text-center w-full cursor-pointer`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`View details about ${milestone.title}`}
                      >
                        <h4 className={`text-xl font-bold text-${milestone.color} mb-2`}>
                          {milestone.quarter} {milestone.year}
                        </h4>
                        <h5 className="text-lg font-semibold text-text-primary mb-4">{milestone.title}</h5>
                        <RoadmapIcon milestone={milestone} />
                        <div className="mt-3 flex items-center justify-center gap-1 text-sm text-text-secondary">
                          <span>View details</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Future hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-16"
          >
            <p className="text-text-secondary text-lg italic">
              And this is just the beginning...{" "}
              <span className="text-primary">Stay tuned for more exciting features!</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for milestone details */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMilestoneDetails}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-background-secondary border border-gray-800 rounded-xl shadow-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with colored gradient based on milestone color */}
              <div
                className={`p-6 border-b border-gray-800 bg-gradient-to-r from-background-secondary to-${selectedMilestone.color}/30`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full bg-${selectedMilestone.color}/20 flex items-center justify-center`}
                    >
                      <div className={`w-6 h-6 text-${selectedMilestone.color}`}>{selectedMilestone.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary">{selectedMilestone.title}</h3>
                      <p className={`text-${selectedMilestone.color} font-medium`}>
                        {selectedMilestone.quarter} {selectedMilestone.year}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeMilestoneDetails}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800/50"
                    aria-label="Close details"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">Overview</h4>
                  <p className="text-text-secondary">{selectedMilestone.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedMilestone.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div
                          className={`mt-1 w-4 h-4 rounded-full bg-${selectedMilestone.color}/20 flex-shrink-0 flex items-center justify-center`}
                        >
                          <div className={`w-2 h-2 rounded-full bg-${selectedMilestone.color}`}></div>
                        </div>
                        <span className="text-text-primary">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-800 bg-background-tertiary/50 flex justify-end">
                <motion.button
                  onClick={closeMilestoneDetails}
                  className={`px-4 py-2 rounded-md bg-${selectedMilestone.color}/20 text-${selectedMilestone.color} hover:bg-${selectedMilestone.color}/30 transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Komponente für die animierten Roadmap-Icons
function RoadmapIcon({ milestone }: { milestone: RoadmapMilestone }) {
  const iconColor = `text-${milestone.color}`

  // Telegram Launch Icon
  if (milestone.id === "telegram-launch") {
    return (
      <motion.div
        className="w-24 h-24 mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-full h-full ${iconColor}`}
        >
          <motion.path
            d="M21.5 4.5L2.5 12.5L11.5 14.5L14.5 21.5L21.5 4.5Z"
            fill={`rgba(138, 226, 52, 0.2)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.path>
          <motion.path
            d="M11.5 14.5L16.5 9.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          ></motion.path>
        </motion.svg>
      </motion.div>
    )
  }

  // Dashboard Icon
  if (milestone.id === "advanced-dashboard") {
    return (
      <motion.div
        className="w-24 h-24 mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-full h-full ${iconColor}`}
        >
          <motion.rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            fill="rgba(153, 69, 255, 0.2)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.rect>
          <motion.line
            x1="3"
            y1="9"
            x2="21"
            y2="9"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.line>
          <motion.line
            x1="9"
            y1="21"
            x2="9"
            y2="9"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          ></motion.line>
        </motion.svg>
      </motion.div>
    )
  }

  // Sniping Icon
  if (milestone.id === "advanced-sniping") {
    return (
      <motion.div
        className="w-24 h-24 mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1, rotate: -5 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-full h-full ${iconColor}`}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="rgba(138, 226, 52, 0.2)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          ></motion.circle>
          <motion.circle
            cx="12"
            cy="12"
            r="6"
            fill="rgba(138, 226, 52, 0.1)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          ></motion.circle>
          <motion.circle
            cx="12"
            cy="12"
            r="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          ></motion.circle>
          <motion.line
            x1="22"
            y1="12"
            x2="18"
            y2="12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          ></motion.line>
          <motion.line
            x1="6"
            y1="12"
            x2="2"
            y2="12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          ></motion.line>
          <motion.line
            x1="12"
            y1="6"
            x2="12"
            y2="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          ></motion.line>
          <motion.line
            x1="12"
            y1="22"
            x2="12"
            y2="18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          ></motion.line>
        </motion.svg>
      </motion.div>
    )
  }

  // Web Interface Icon
  if (milestone.id === "web-interface") {
    return (
      <motion.div
        className="w-24 h-24 mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-full h-full ${iconColor}`}
        >
          <motion.rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            ry="2"
            fill="rgba(153, 69, 255, 0.2)"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          ></motion.rect>
          <motion.line
            x1="8"
            y1="21"
            x2="16"
            y2="21"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          ></motion.line>
          <motion.line
            x1="12"
            y1="17"
            x2="12"
            y2="21"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          ></motion.line>
        </motion.svg>
      </motion.div>
    )
  }

  // Mobile Apps Icon
  if (milestone.id === "mobile-apps") {
    return (
      <motion.div
        className="w-24 h-24 mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-full h-full ${iconColor}`}
        >
          <motion.rect
            x="5"
            y="2"
            width="14"
            height="20"
            rx="2"
            ry="2"
            fill="rgba(138, 226, 52, 0.2)"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          ></motion.rect>
          <motion.line
            x1="12"
            y1="18"
            x2="12.01"
            y2="18"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          ></motion.line>
          <motion.path
            d="M8 2v2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          ></motion.path>
          <motion.path
            d="M16 2v2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          ></motion.path>
          <motion.circle
            cx="12"
            cy="10"
            r="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.1,
              type: "spring",
              stiffness: 200,
            }}
          ></motion.circle>
        </motion.svg>
      </motion.div>
    )
  }

  // Fallback für unbekannte Milestone-IDs
  return (
    <motion.div
      className="w-24 h-24 mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
    >
      {milestone.icon}
    </motion.div>
  )
}
