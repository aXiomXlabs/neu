"use client"
import { useEffect, useState } from "react"
import { Search, Download, Trash2, ChevronLeft, ChevronRight, Filter } from "lucide-react"

interface WaitlistEntry {
  id: string
  email: string
  telegram_username: string | null
  created_at: string
  ip_address: string
  referral_source: string
}

interface SourceStat {
  referral_source: string
  count: number
}

interface DayStat {
  date: string
  count: number
}

export default function WaitlistDashboard() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [sourceFilter, setSourceFilter] = useState<string>("")
  const [sourceStats, setSourceStats] = useState<SourceStat[]>([])
  const [signupsByDay, setSignupsByDay] = useState<DayStat[]>([])

  const fetchWaitlist = async () => {
    try {
      setLoading(true)
      setError(null)

      // Baue die URL mit Abfrageparametern
      const url = new URL("/api/admin/waitlist", window.location.origin)
      url.searchParams.append("page", page.toString())
      url.searchParams.append("limit", "10")

      if (searchTerm) {
        url.searchParams.append("search", searchTerm)
      }

      if (sourceFilter) {
        url.searchParams.append("source", sourceFilter)
      }

      // Führe die Anfrage aus
      const response = await fetch(url.toString(), {
        headers: {
          // In einer echten Anwendung würdest du hier einen sicheren Auth-Token verwenden
          Authorization: "Basic dGVzdDp0ZXN0", // test:test in Base64
        },
      })

      if (!response.ok) {
        throw new Error(`Fehler beim Abrufen der Daten: ${response.statusText}`)
      }

      const data = await response.json()

      setEntries(data.data || [])
      setTotalPages(data.totalPages || 1)
      setTotalEntries(data.total || 0)
      setSourceStats(data.sourceStats || [])
      setSignupsByDay(data.signupsByDay || [])
    } catch (err) {
      console.error("Fehler beim Laden der Waitlist:", err)
      setError(err instanceof Error ? err.message : "Unbekannter Fehler")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWaitlist()
  }, [page, searchTerm, sourceFilter])

  const handleDelete = async (id: string) => {
    if (!confirm("Möchtest du diesen Eintrag wirklich löschen?")) {
      return
    }

    try {
      const response = await fetch("/api/admin/waitlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic dGVzdDp0ZXN0",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error(`Fehler beim Löschen: ${response.statusText}`)
      }

      // Aktualisiere die Liste nach dem Löschen
      fetchWaitlist()
    } catch (err) {
      console.error("Fehler beim Löschen des Eintrags:", err)
      alert(err instanceof Error ? err.message : "Unbekannter Fehler beim Löschen")
    }
  }

  const exportCsv = () => {
    // Erstelle CSV-Daten aus den Einträgen
    const headers = ["E-Mail", "Telegram", "Datum", "Quelle", "IP-Adresse"]
    const csvRows = [
      headers.join(","),
      ...entries.map((entry) =>
        [
          `"${entry.email}"`,
          `"${entry.telegram_username || ""}"`,
          `"${new Date(entry.created_at).toLocaleString("de-DE")}"`,
          `"${entry.referral_source}"`,
          `"${entry.ip_address}"`,
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")

    // Erstelle einen Download-Link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `waitlist-export-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Waitlist Dashboard</h1>
          <a href="/admin/supabase-test" className="text-primary hover:text-primary-hover underline">
            Verbindungstest
          </a>
        </div>

        {/* Statistik-Karten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-background-secondary rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-2 text-text-secondary">Gesamtanmeldungen</h2>
            <p className="text-3xl font-bold text-text-primary">{totalEntries}</p>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-2 text-text-secondary">Anmeldungen heute</h2>
            <p className="text-3xl font-bold text-text-primary">
              {signupsByDay.length > 0 ? signupsByDay[signupsByDay.length - 1].count : 0}
            </p>
          </div>

          <div className="bg-background-secondary rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-2 text-text-secondary">Häufigste Quelle</h2>
            <p className="text-3xl font-bold text-text-primary">
              {sourceStats.length > 0 ? sourceStats.sort((a, b) => b.count - a.count)[0]?.referral_source : "-"}
            </p>
          </div>
        </div>

        {/* Suchleiste und Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Suche nach E-Mail oder Telegram..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-secondary border border-gray-800 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 bg-background-secondary border border-gray-800 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Alle Quellen</option>
                {sourceStats.map((stat) => (
                  <option key={stat.referral_source} value={stat.referral_source}>
                    {stat.referral_source} ({stat.count})
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            </div>

            <button
              onClick={exportCsv}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exportieren</span>
            </button>
          </div>
        </div>

        {/* Tabelle */}
        <div className="bg-background-secondary rounded-lg border border-gray-800 overflow-hidden mb-6">
          {loading ? (
            <div className="p-8 text-center text-text-secondary">
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <p>Daten werden geladen...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400">
              <p>{error}</p>
              <button
                onClick={fetchWaitlist}
                className="mt-4 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors"
              >
                Erneut versuchen
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-8 text-center text-text-secondary">
              <p>Keine Einträge gefunden.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">E-Mail</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Telegram</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Quelle</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">Datum</th>
                    <th className="text-right py-3 px-4 text-text-secondary font-medium">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-800/50 hover:bg-background/50 transition-colors">
                      <td className="py-4 px-4 text-text-primary">{entry.email}</td>
                      <td className="py-4 px-4 text-text-primary">{entry.telegram_username || "-"}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-background border border-gray-800 text-text-secondary">
                          {entry.referral_source}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-text-secondary">
                        {new Date(entry.created_at).toLocaleString("de-DE")}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center">
            <div className="text-text-secondary text-sm">
              Zeige {(page - 1) * 10 + 1} bis {Math.min(page * 10, totalEntries)} von {totalEntries} Einträgen
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-background-secondary border border-gray-800 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-center px-4 h-10 rounded-md bg-background-secondary border border-gray-800 text-text-primary">
                {page} / {totalPages}
              </div>

              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-background-secondary border border-gray-800 text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
