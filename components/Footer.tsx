"use client"

import Link from "next/link"
import { MessageCircle, Twitter, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations("footer")

  return (
    <footer className="bg-[#141414] border-t border-gray-800 py-12 shadow-md">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <span className="text-xl font-bold text-text-primary">
                <span className="text-primary">Rust</span> Rocket
              </span>
            </Link>
            <p className="text-text-secondary text-sm">{t("copyright", { year: currentYear })}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-medium text-text-primary mb-4">{t("links")}</h4>
            <div className="flex flex-col items-center space-y-2">
              <Link
                href="/privacy"
                className="text-text-secondary hover:text-primary transition-colors text-sm flex items-center gap-1"
              >
                {t("privacy")}
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link
                href="/disclaimer"
                className="text-text-secondary hover:text-primary transition-colors text-sm flex items-center gap-1"
              >
                {t("disclaimer")}
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Social media */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-medium text-text-primary mb-4">{t("connect")}</h4>
            <div className="flex space-x-4">
              <Link
                href="https://t.me/rustrocket"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com/rustrocket"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className="bg-background/50 border border-gray-800 rounded-full px-4 py-1 text-xs text-text-secondary flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-solana-green"></span>
            {t("builtOn")}
          </div>
          <div className="bg-background/50 border border-gray-800 rounded-full px-4 py-1 text-xs text-text-secondary flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            {t("poweredBy")}
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="border border-gray-800 rounded-lg p-4 bg-background/50">
          <h5 className="text-center font-medium text-text-primary mb-2">{t("riskTitle")}</h5>
          <p className="text-text-secondary text-xs text-center">{t("riskText")}</p>
        </div>
      </div>
    </footer>
  )
}
