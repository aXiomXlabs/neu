"\"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [registeredUsers, setRegisteredUsers] = useState(0)
  const maxUsers = 1000 // Maximale Anzahl für den Fortschrittsbalken

  useEffect(() => {
    // Simuliere eine Startanzahl zwischen 580 und 620
    const initialCount = Math.floor(Math.random() * 40) + 580
    setRegisteredUsers(initialCount)

    // Simuliere gelegentliche neue Anmeldungen
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% Chance für eine neue Anmeldung
        setRegisteredUsers((prev) => Math.min(prev + 1, maxUsers))
      }
    }, 5000) // Alle 5 Sekunden prüfen

    return () => clearInterval(interval)
  }, [])

  // Berechne den Fortschritt in Prozent
  const progressPercentage = (registeredUsers / maxUsers) * 100

  return (
    <div className="flex flex-col items-center">
      <div className="text-text-secondary mb-2">Bereits angemeldet:</div>
      <div className="text-3xl font-bold text-primary mb-3">{registeredUsers}</div>

      {/* Fortschrittsbalken */}
      <div className="w-full bg-background-tertiary rounded-full h-4 mb-2">
        <div
          className="bg-primary h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between w-full text-xs text-text-secondary">
        <span>0</span>
        <span>Ziel: {maxUsers}</span>
      </div>

      {/* Zusätzliche Informationen */}
      <div className="mt-4 text-center text-sm text-text-secondary">
        <p>Sei einer der ersten 1000 Nutzer und sichere dir exklusive Vorteile!</p>
      </div>
    </div>
  )
}
"\
