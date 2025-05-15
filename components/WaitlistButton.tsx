"use client"

import type { ReactNode } from "react"
import { useWaitlistModal } from "./WaitlistModalProvider"

interface WaitlistButtonProps {
  children?: ReactNode
  className?: string
  id?: string
  "data-tracking-id"?: string
}

export default function WaitlistButton({
  children = "Join Waitlist",
  className = "bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md",
  id,
  "data-tracking-id": trackingId,
  ...props
}: WaitlistButtonProps) {
  const { openModal } = useWaitlistModal()

  const handleClick = () => {
    // Debugging log
    console.log("Waitlist button clicked - opening modal")

    // Track button click
    if (typeof window !== "undefined" && "gtag" in window && trackingId) {
      // @ts-ignore - gtag is not typed
      window.gtag("event", "waitlist_button_click", {
        event_category: "engagement",
        event_label: trackingId,
      })
    }

    openModal()
  }

  // Skip rendering the button if it's the hero button
  if (id === "hero-waitlist-button") {
    return null
  }

  return (
    <div
      onClick={handleClick}
      className={`open-waitlist-modal ${className} cursor-pointer`}
      id={id}
      data-tracking-id={trackingId}
      role="button"
      aria-haspopup="dialog"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}
