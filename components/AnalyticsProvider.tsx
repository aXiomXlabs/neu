"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { pageView } from "@/lib/analytics"

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Construct the full URL including search parameters
      let url = pathname
      if (searchParams?.toString()) {
        url += `?${searchParams.toString()}`
      }

      // Send pageview event to Google Analytics
      pageView(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
