"use client"

import type React from "react"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { pageview } from "@/lib/analytics"

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Create URL from pathname and search params
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      // Track page view
      pageview(url)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
