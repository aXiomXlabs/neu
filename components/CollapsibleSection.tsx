"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CollapsibleSectionProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  titleClassName?: string
  contentClassName?: string
  iconPosition?: "left" | "right"
  id?: string
}

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  titleClassName = "",
  contentClassName = "",
  iconPosition = "right",
  id,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto")
  const uniqueId = id || `collapsible-${Math.random().toString(36).substring(2, 9)}`

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [children])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="collapsible-section">
      <div
        className={`w-full text-left flex items-center justify-between py-4 cursor-pointer group ${titleClassName}`}
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`content-${uniqueId}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleOpen()
          }
        }}
      >
        {iconPosition === "left" && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mr-2 flex-shrink-0 text-primary"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        )}

        <div className="flex-grow">{title}</div>

        {iconPosition === "right" && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2 flex-shrink-0 text-primary"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`content-${uniqueId}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: contentHeight,
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className={`pb-4 ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
