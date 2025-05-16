"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import WaitlistModal from "./WaitlistModal"

// Create context for the waitlist modal
interface WaitlistModalContextType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const WaitlistModalContext = createContext<WaitlistModalContextType | undefined>(undefined)

// Hook to use the waitlist modal context
export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext)
  if (context === undefined) {
    throw new Error("useWaitlistModal must be used within a WaitlistModalProvider")
  }
  return context
}

// Provider component
export function WaitlistModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <WaitlistModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={closeModal} />
    </WaitlistModalContext.Provider>
  )
}
