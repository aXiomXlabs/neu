export default function StaticBDNMap() {
  return (
    <div className="relative aspect-[2/1] rounded-xl overflow-hidden border border-gray-800 bg-background-secondary/30 backdrop-blur-sm">
      <div className="absolute inset-0 w-full h-full bg-background-secondary/50"></div>

      {/* Statische Darstellung der Netzwerkknoten */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/80"></div>

        {/* Einige statische Knoten */}
        <div className="absolute top-[38%] left-[15%] w-4 h-4 rounded-full bg-solana-green/80"></div>
        <div className="absolute top-[35%] left-[25%] w-4 h-4 rounded-full bg-solana-purple/80"></div>
        <div className="absolute top-[28%] left-[42%] w-4 h-4 rounded-full bg-solana-purple/80"></div>
        <div className="absolute top-[29%] left-[46%] w-4 h-4 rounded-full bg-solana-green/80"></div>
        <div className="absolute top-[42%] left-[56%] w-4 h-4 rounded-full bg-solana-green/80"></div>
        <div className="absolute top-[52%] left-[72%] w-4 h-4 rounded-full bg-solana-green/80"></div>
        <div className="absolute top-[35%] left-[82%] w-4 h-4 rounded-full bg-solana-purple/80"></div>
        <div className="absolute top-[65%] left-[85%] w-4 h-4 rounded-full bg-solana-purple/80"></div>

        {/* Verbindungslinien */}
        <div className="absolute inset-0 w-full h-full">
          <svg width="100%" height="100%" className="opacity-20">
            <line x1="15%" y1="38%" x2="50%" y2="50%" stroke="#14F195" strokeWidth="1" />
            <line x1="25%" y1="35%" x2="50%" y2="50%" stroke="#9945FF" strokeWidth="1" />
            <line x1="42%" y1="28%" x2="50%" y2="50%" stroke="#9945FF" strokeWidth="1" />
            <line x1="46%" y1="29%" x2="50%" y2="50%" stroke="#14F195" strokeWidth="1" />
            <line x1="56%" y1="42%" x2="50%" y2="50%" stroke="#14F195" strokeWidth="1" />
            <line x1="72%" y1="52%" x2="50%" y2="50%" stroke="#14F195" strokeWidth="1" />
            <line x1="82%" y1="35%" x2="50%" y2="50%" stroke="#9945FF" strokeWidth="1" />
            <line x1="85%" y1="65%" x2="50%" y2="50%" stroke="#9945FF" strokeWidth="1" />
          </svg>
        </div>

        {/* Hintergrundgitter */}
        <div className="absolute inset-0 w-full h-full">
          <svg width="100%" height="100%" className="opacity-20">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(50, 50, 50, 0.2)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Map legend */}
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
        <h4 className="text-text-primary text-sm font-medium mb-2">Global BDN Network</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-text-secondary text-xs">Central Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-solana-purple"></div>
            <span className="text-text-secondary text-xs">Primary Gateway</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-solana-green"></div>
            <span className="text-text-secondary text-xs">Secondary Gateway</span>
          </div>
        </div>
      </div>

      {/* Comparison overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
            <h4 className="text-text-secondary font-medium mb-2 text-sm">Standard Transaction Path</h4>
            <div className="flex items-center gap-2 text-red-400 text-sm">Slow • Multiple hops • Congested</div>
          </div>

          <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-solana-green/30">
            <h4 className="text-text-secondary font-medium mb-2 text-sm">Rust Rocket BDN Path</h4>
            <div className="flex items-center gap-2 text-solana-green text-sm">Direct • Fast • Optimized</div>
          </div>
        </div>
      </div>
    </div>
  )
}
