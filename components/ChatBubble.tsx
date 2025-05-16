"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { event, ANALYTICS_EVENTS } from "@/lib/analytics"

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  // Show chat bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setHasBeenShown(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    const newState = !isOpen
    setIsOpen(newState)

    // Track event
    event(newState ? ANALYTICS_EVENTS.CHAT_BUBBLE_OPEN : ANALYTICS_EVENTS.CHAT_BUBBLE_CLOSE, {
      event_category: "engagement",
      event_label: "chat_bubble",
    })
  }

  const handleTelegramClick = () => {
    // Track event
    event(ANALYTICS_EVENTS.TELEGRAM_CLICK, {
      event_category: "outbound",
      event_label: "telegram_chat",
    })
  }

  if (!isVisible && !hasBeenShown) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="mb-4 w-72 rounded-xl bg-background-secondary border border-gray-800 shadow-lg overflow-hidden"
          >
            <div className="bg-primary p-4 flex justify-between items-center">
              <h3 className="text-white font-medium">Rust Rocket Support</h3>
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-text-primary mb-4">
                Have questions about Rust Rocket? Chat with our team on Telegram!
              </p>
              <a
                href="https://t.me/Rust_Rocket"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramClick}
                className="block w-full bg-[#0088cc] hover:bg-[#0099dd] text-white text-center py-2 px-4 rounded-md transition-colors"
              >
                Chat on Telegram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
          isOpen ? "bg-gray-700" : "bg-primary"
        } text-white hover:scale-105 transition-all duration-300`}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        id="chat-bubble-button"
        data-tracking-id="chat_bubble_toggle"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  )
}
