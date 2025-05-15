import type { ReactNode } from "react"

interface TooltipProps {
  text: string
  children: ReactNode
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  )
}
