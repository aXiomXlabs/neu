"use client"

import { useRef } from "react"
import { LineChart, TrendingUp, Filter, Search, Clock, Wallet, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

export default function DashboardPreviewSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Dummy data for the dashboard
  const topWallets = [
    {
      id: "8xzt...4rGh",
      pnl: "+1250%",
      winRate: "85%",
      favoriteCoins: ["$RUSTY", "$WIF", "$PEPE"],
      lastActive: "2 min ago",
      positive: true,
    },
    {
      id: "3vFx...9qLm",
      pnl: "+870%",
      winRate: "72%",
      favoriteCoins: ["$BONK", "$PUMPIT", "$SOLANA"],
      lastActive: "15 min ago",
      positive: true,
    },
    {
      id: "7kRt...2zPw",
      pnl: "+625%",
      winRate: "68%",
      favoriteCoins: ["$RUSTY", "$BONK", "$WIF"],
      lastActive: "1 hr ago",
      positive: true,
    },
    {
      id: "5jHn...8xYz",
      pnl: "+410%",
      winRate: "63%",
      favoriteCoins: ["$PUMPIT", "$PEPE", "$SOLANA"],
      lastActive: "3 hrs ago",
      positive: true,
    },
    {
      id: "2qAb...6cVd",
      pnl: "-50%",
      winRate: "40%",
      favoriteCoins: ["$DOGE", "$SHIB", "$FLOKI"],
      lastActive: "5 hrs ago",
      positive: false,
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="dashboard-preview">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-solana-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-solana-blue mr-2"></span>
            Dashboard Preview
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            Discover Top Traders & Hot Meme Coins: Your <span className="text-gradient">Rust Rocket</span> Dashboard
          </h2>

          <p className="text-text-secondary text-lg">
            This page shows a <span className="text-primary font-semibold">demo with sample data</span> of how Rust
            Rocket will help you identify the most profitable wallets on Solana. Filter, analyze, and choose who to
            copy.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-primary/5 glass-card"
        >
          {/* Dashboard Header */}
          <div className="bg-background-tertiary p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-md">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-text-primary">Rust Rocket Alpha Dashboard</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-red-400 font-medium bg-red-400/10 px-3 py-1 rounded-full">
              DEMO DATA - For Illustrative Purposes Only
            </div>
          </div>

          {/* Dashboard Controls */}
          <div className="p-4 border-b border-gray-800 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Wallets..."
                  className="bg-background border border-gray-800 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-background border border-gray-800 rounded-md py-2 px-3 text-sm hover:bg-background-tertiary transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <select className="bg-background border border-gray-800 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>All Time</option>
              </select>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-text-primary flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-solana-green" />
                Top Performing Wallets
              </h4>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>

            {/* Wallets Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Wallet ID</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">P&L (7d)</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Win Rate (7d)</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Favorite Meme Coins</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Last Active</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topWallets.map((wallet, index) => (
                    <tr
                      key={wallet.id}
                      className={`border-b border-gray-800/50 hover:bg-background-tertiary/50 transition-colors ${
                        index === 0 ? "bg-solana-green/5" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0
                                ? "bg-solana-green/20 text-solana-green"
                                : "bg-gray-800/50 text-text-secondary"
                            }`}
                          >
                            <Wallet className="h-4 w-4" />
                          </div>
                          <span className="font-mono">{wallet.id}</span>
                          {index === 0 && (
                            <span className="bg-solana-green/20 text-solana-green text-xs px-2 py-0.5 rounded-full">
                              Top Performer
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              wallet.positive ? "text-solana-green font-semibold" : "text-red-400 font-semibold"
                            }
                          >
                            {wallet.pnl}
                          </span>
                          <MiniChart positive={wallet.positive} />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${wallet.positive ? "bg-solana-green" : "bg-red-400"}`}
                              style={{ width: wallet.winRate }}
                            ></div>
                          </div>
                          <span>{wallet.winRate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          {wallet.favoriteCoins.map((coin, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-background border border-gray-800"
                            >
                              {coin}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-text-secondary">
                          <Clock className="h-3 w-3" />
                          <span>{wallet.lastActive}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-md text-sm transition-colors">
                          Copy Trades
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dashboard Footer */}
            <div className="mt-6 flex justify-between items-center text-text-secondary text-sm">
              <div>Showing 5 of 100 wallets</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-800 rounded-md hover:bg-background-tertiary transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features highlight */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
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
              <h4 className="text-lg font-semibold mb-2 text-text-primary">Real-Time Analytics</h4>
              <p className="text-text-secondary">Track wallet performance and market trends as they happen</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 hover:border-solana-purple/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-solana-purple/10 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-solana-purple"
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
              <h4 className="text-lg font-semibold mb-2 text-text-primary">Performance Metrics</h4>
              <p className="text-text-secondary">Detailed statistics on wallet performance and trading patterns</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 hover:border-solana-green/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-solana-green/10 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-solana-green"
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
              <h4 className="text-lg font-semibold mb-2 text-text-primary">Customizable Interface</h4>
              <p className="text-text-secondary">Personalize your dashboard to focus on what matters to you</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors group"
          >
            <span>Get early access to the full dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Mini chart component for P&L visualization
function MiniChart({ positive }: { positive: boolean }) {
  const color = positive ? "text-solana-green" : "text-red-400"

  return (
    <svg width="40" height="16" viewBox="0 0 40 16" className={color}>
      <polyline
        points={
          positive ? "0,14 5,11 10,12 15,10 20,8 25,6 30,4 35,2 40,1" : "0,1 5,2 10,4 15,3 20,6 25,8 30,10 35,12 40,14"
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
