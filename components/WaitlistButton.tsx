"use client"

import type React from "react"

import { useWaitlistModal } from "./WaitlistModalProvider"
import { event, ANALYTICS_EVENTS } from "@/lib/analytics"

interface WaitlistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export default function WaitlistButton({ children, ...props }: WaitlistButtonProps) {
  const { openModal } = useWaitlistModal()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // Track button click
    event(ANALYTICS_EVENTS.WAITLIST_BUTTON_CLICK, {
      event_category: "engagement",
      event_label: props.id || "unknown_button",
    })

    // Open the modal
    openModal()
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children || "Join Waitlist"}
    </button>
  )
}
