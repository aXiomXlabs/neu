"use client"

import { createClientSupabaseClient } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function SupabaseTestPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [latestEntries, setLatestEntries] = useState<any[]>([])

  useEffect(() => {
    async function testSupabaseConnection() {
      try {
        setStatus("loading")

        // Initialize Supabase client
        const supabase = createClientSupabaseClient()

        // Test connection by getting count of waitlist entries
        const { count, error: countError } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

        if (countError) {
          throw new Error(`Fehler beim Abrufen der Anzahl: ${countError.message}`)
        }

        // Get latest 5 entries
        const { data, error: dataError } = await supabase
          .from("waitlist")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5)

        if (dataError) {
          throw new Error(`Fehler beim Abrufen der Einträge: ${dataError.message}`)
        }

        // Update state with results
        setCount(count)
        setLatestEntries(data || [])
        setStatus("success")
      } catch (error) {
        console.error("Supabase connection test failed:", error)
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Unbekannter Fehler")
      }
    }

    testSupabaseConnection()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-text-primary">Supabase Verbindungstest</h1>

        <div className="bg-background-secondary rounded-lg p-6 border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">Verbindungsstatus</h2>

          {status === "loading" && (
            <div className="flex items-center space-x-2 text-text-secondary">
              <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse"></div>
              <span>Verbindung wird getestet...</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center space-x-2 text-solana-green">
              <div className="w-4 h-4 rounded-full bg-solana-green"></div>
              <span>Verbindung erfolgreich hergestellt!</span>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-red-500">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Verbindungsfehler</span>
              </div>
              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}
            </div>
          )}
        </div>

        {status === "success" && (
          <>
            <div className="bg-background-secondary rounded-lg p-6 border border-gray-800 mb-6">
              <h2 className="text-xl font-semibold mb-2 text-text-primary">Waitlist Statistik</h2>
              <p className="text-text-primary text-2xl font-bold">{count} Einträge insgesamt</p>
            </div>

            <div className="bg-background-secondary rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-text-primary">Neueste Einträge</h2>

              {latestEntries.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-2 px-4 text-text-secondary">E-Mail</th>
                        <th className="text-left py-2 px-4 text-text-secondary">Telegram</th>
                        <th className="text-left py-2 px-4 text-text-secondary">Quelle</th>
                        <th className="text-left py-2 px-4 text-text-secondary">Datum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-gray-800/50">
                          <td className="py-3 px-4 text-text-primary">{entry.email}</td>
                          <td className="py-3 px-4 text-text-primary">{entry.telegram_username || "-"}</td>
                          <td className="py-3 px-4 text-text-primary">{entry.referral_source}</td>
                          <td className="py-3 px-4 text-text-secondary">
                            {new Date(entry.created_at).toLocaleString("de-DE")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-text-secondary">Keine Einträge gefunden.</p>
              )}
            </div>
          </>
        )}

        <div className="mt-6">
          <a href="/" className="text-primary hover:text-primary-hover underline">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  )
}
