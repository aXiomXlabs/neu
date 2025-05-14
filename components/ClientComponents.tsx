"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"

// Dynamisch laden der Client-Komponenten mit { ssr: false }
const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), { ssr: false })
const BDNNetworkSection = dynamic(() => import("@/components/BDNNetworkSection"), { ssr: false })

export function DynamicParticlesBackground() {
  return <ParticlesBackground />
}

export function DynamicBDNNetworkSection() {
  return <BDNNetworkSection />
}

// Wrapper für Client-Komponenten
export function ClientComponentsWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <DynamicParticlesBackground />
      {children}
    </>
  )
}
