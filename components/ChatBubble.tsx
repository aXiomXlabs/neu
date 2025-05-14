"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Bot, X, Send } from "lucide-react"
import { chatWithGrokAI, type Message } from "@/app/actions/grok-ai"
import { useTranslations, useLocale } from "next-intl"

export default function ChatBubble() {
  const t = useTranslations("chat")
  const locale = useLocale()

  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: t("welcome") }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return

      // Add user message
      const userMessage: Message = { role: "user", content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        // Call the Grok AI API through our server action
        const response = await chatWithGrokAI([...messages, userMessage])

        if (response.success) {
          setMessages((prev) => [...prev, { role: "assistant", content: response.message }])
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Sorry, I encountered an error. Please try again later.",
            },
          ])
          console.error("Error from Grok AI:", response.error)
        }
      } catch (error) {
        console.error("Error calling Grok AI:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again later.",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, messages],
  )

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-background-secondary border border-gray-800 rounded-lg shadow-xl w-80 sm:w-96 h-96 flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-solana-purple" />
              <span className="font-medium text-text-primary">{t("title")}</span>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-text-primary transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            ref={messagesContainerRef}
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === "user" ? "bg-primary/10 text-text-primary" : "bg-solana-purple/10 text-text-primary"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-solana-purple/10 text-text-primary max-w-[80%] rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-solana-purple/50 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-solana-purple/50 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-solana-purple/50 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                className="flex-1 bg-background border border-gray-800 rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-solana-purple"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-solana-purple/20 hover:bg-solana-purple/30 text-solana-purple px-3 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
                aria-label={t("send")}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <button
            className="flex items-center justify-center w-14 h-14 rounded-full bg-background-secondary border border-gray-800 shadow-lg hover:border-solana-purple/50 transition-all duration-300 hover:scale-105 group"
            aria-label={t("title")}
            onClick={toggleChat}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-solana-purple/20 to-solana-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Bot className="h-6 w-6 text-solana-purple group-hover:text-solana-purple transition-colors duration-300" />
          </button>

          {/* Tooltip */}
          <div
            className={`absolute bottom-full right-0 mb-3 bg-background-secondary border border-gray-800 rounded-lg py-2 px-4 shadow-lg transition-all duration-300 whitespace-nowrap ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="text-sm font-medium">{t("title")}</div>
            <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-2 h-2 bg-background-secondary border-r border-b border-gray-800"></div>
          </div>

          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full border-4 border-solana-purple/30 animate-ping opacity-30"></div>
        </div>
      )}
    </div>
  )
}
