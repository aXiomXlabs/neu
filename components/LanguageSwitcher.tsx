"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Globe } from "lucide-react"
import Image from "next/image"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Aktuelle Sprache aus dem Pfad ermitteln
  const currentLocale = pathname.startsWith("/de") ? "de" : "en"

  // Verfügbare Sprachen
  const languages = [
    { code: "en", name: "English", flag: "/images/en-flag.png" },
    { code: "de", name: "Deutsch", flag: "/images/de-flag.png" },
  ]

  // Die aktuelle Sprache
  const currentLanguage = languages.find((l) => l.code === currentLocale) || languages[0]

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false)

    // Einfache Umleitung zur neuen Sprache
    const newPath = pathname.replace(/^\/(en|de)/, `/${newLocale}`)
    router.push(newLocale === "en" ? newPath : newPath || `/${newLocale}`)
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center space-x-1 nav-link"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Image
          src={currentLanguage.flag || "/placeholder.svg"}
          alt={currentLanguage.code}
          width={20}
          height={15}
          className="h-4 w-auto"
        />
        <Globe className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background-secondary border border-gray-800 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                  currentLocale === language.code
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary hover:bg-background hover:text-primary"
                }`}
                role="menuitem"
                onClick={() => handleLanguageChange(language.code)}
              >
                <Image
                  src={language.flag || "/placeholder.svg"}
                  alt={language.code}
                  width={20}
                  height={15}
                  className="h-4 w-auto mr-2"
                />
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
