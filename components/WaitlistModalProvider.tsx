"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import WaitlistModal from "./WaitlistModal"

interface WaitlistModalContextType {
  openModal: () => void
  closeModal: () => void
}

const WaitlistModalContext = createContext<WaitlistModalContextType | undefined>(undefined)

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext)
  if (context === undefined) {
    throw new Error("useWaitlistModal must be used within a WaitlistModalProvider")
  }
  return context
}

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <WaitlistModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </WaitlistModalContext.Provider>
  )
}
