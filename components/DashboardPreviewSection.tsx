import { LineChart, TrendingUp, Filter, Search, Clock, Wallet } from "lucide-react"

export default function DashboardPreviewSection() {
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
    <section className="py-20 relative overflow-hidden" id="dashboard-preview">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Discover Top Traders & Hot Meme Coins: A Sneak Peek of Your{" "}
            <span className="text-primary">Rust Rocket</span> Dashboard.
          </h2>
          <p className="text-text-secondary text-lg">
            This page shows a <span className="text-primary font-semibold">demo with sample data</span> of how Rust
            Rocket will help you identify the most profitable wallets on Solana. Filter, analyze, and choose who to
            copy.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-primary/5 bg-background-secondary">
          {/* Dashboard Header */}
          <div className="bg-background p-4 border-b border-gray-800 flex items-center justify-between">
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
              <button className="flex items-center gap-2 bg-background border border-gray-800 rounded-md py-2 px-3 text-sm hover:bg-gray-900 transition-colors">
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
                      className={`border-b border-gray-800/50 hover:bg-background/50 transition-colors ${
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
                <button className="px-3 py-1 border border-gray-800 rounded-md hover:bg-background transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
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
