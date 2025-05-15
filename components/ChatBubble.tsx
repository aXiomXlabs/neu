"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Bot, X, Send, AlertTriangle } from "lucide-react"
import { chatWithGrokAI, type Message } from "@/app/actions/grok-ai"

export default function ChatBubble() {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm Rust Rocket's AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState<"unchecked" | "connected" | "error">("unchecked")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Testing AI connection...")
        setApiStatus("unchecked")

        // Verwende einen einfachen Test, um die API-Verbindung zu prüfen
        const testMessage = { role: "user" as const, content: "Hello, this is a connection test." }

        try {
          const response = await chatWithGrokAI([testMessage])
          console.log("AI test response:", response)

          if (response.success) {
            console.log("AI connection successful!")
            setApiStatus("connected")
          } else {
            console.error("AI connection failed:", response.error)
            setApiStatus("error")
            setMessages([
              {
                role: "assistant",
                content: "Hi there! I'm currently in offline mode. I can answer basic questions about Rust Rocket.",
              },
            ])
          }
        } catch (error) {
          console.error("Error in test connection:", error)
          setApiStatus("error")
          setMessages([
            {
              role: "assistant",
              content: "Hi there! I'm currently in offline mode. I can answer basic questions about Rust Rocket.",
            },
          ])
        }
      } catch (error) {
        console.error("Error testing AI connection:", error)
        setApiStatus("error")
      }
    }

    testConnection()
  }, [])

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
        // Erweiterte lokale Fallback-Antworten für häufige Fragen
        const localResponses: Record<string, string> = {
          "what is rust rocket":
            "Rust Rocket is a Solana trading bot with same-block execution and copy trading features, designed to give you an edge in the fast-paced Solana meme coin market.",
          "how does copy trading work":
            "Rust Rocket's copy trading feature automatically identifies top-performing wallets on Solana and executes the same trades for you with lightning speed, allowing you to benefit from professional trading strategies.",
          "what is same-block execution":
            "Same-block execution means your trades are executed in exactly the same Solana block as the original event, giving you maximum speed and precision when trading meme coins.",
          "when will rust rocket launch":
            "Rust Rocket is currently in the final testing phase and will be launching soon. Join our waitlist to be notified first and receive exclusive benefits.",
          "how much does it cost":
            "Pricing details for Rust Rocket will be announced closer to launch. Join our waitlist to be among the first to receive this information.",
          "is it safe":
            "Rust Rocket is being developed with a strong focus on security and reliability. We implement industry best practices to protect your operations and data.",
          "how do i get started":
            "To get started with Rust Rocket, join our waitlist by clicking the 'Join Waitlist' button on our website. You'll be notified when access becomes available.",
          "what is bdn network":
            "The BDN (Block Dependent Network) is our global network of 15 proprietary, optimized Solana gateways strategically distributed around the world to route your transactions through the fastest and most reliable paths.",
          "what can you do":
            "I can answer questions about Rust Rocket, including its features like same-block execution, copy trading, and the BDN network. I can also explain how to get started and provide information about Solana trading.",
          "who created you":
            "I was created by the Rust Rocket team to help users understand our Solana trading bot and its features.",
          "what is solana":
            "Solana is a high-performance blockchain platform known for its fast transaction speeds and low fees. It's particularly popular for DeFi applications, NFTs, and meme coins due to its efficiency.",
        }

        // Prüfe, ob eine lokale Antwort verfügbar ist
        const lowerCaseInput = input.toLowerCase()
        let foundLocalResponse = false

        for (const [key, value] of Object.entries(localResponses)) {
          if (lowerCaseInput.includes(key)) {
            setMessages((prev) => [...prev, { role: "assistant", content: value }])
            foundLocalResponse = true
            break
          }
        }

        // Wenn keine lokale Antwort gefunden wurde und die API verfügbar ist, versuche die API zu nutzen
        if (!foundLocalResponse && apiStatus === "connected") {
          console.log("No local response found, trying AI...")
          // Call the AI API through our server action
          const response = await chatWithGrokAI([...messages, userMessage])

          if (response.success) {
            setMessages((prev) => [...prev, { role: "assistant", content: response.message }])
          } else {
            console.error("Error from AI API:", response.error)
            // Fallback auf generische Antwort bei API-Fehler
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content:
                  "I'm sorry, I don't have enough information to answer that question. Please ask about Rust Rocket's features, copy trading, or same-block execution.",
              },
            ])
            setApiStatus("error")
          }
        } else if (!foundLocalResponse) {
          // Fallback-Antwort, wenn die API nicht verfügbar ist und keine lokale Antwort gefunden wurde
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "I'm sorry, I don't have enough information to answer that question in offline mode. Please ask about Rust Rocket's core features like copy trading or same-block execution.",
            },
          ])
        }
      } catch (error) {
        console.error("Error in chat submission:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try asking about Rust Rocket's core features instead.",
          },
        ])
        setApiStatus("error")
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, messages, apiStatus],
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
              <span className="font-medium text-text-primary">Rust Rocket Assistant</span>
              {apiStatus === "error" && (
                <span className="flex items-center text-xs text-amber-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Offline Mode
                </span>
              )}
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
                placeholder="Ask about Rust Rocket..."
                className="flex-1 bg-background border border-gray-800 rounded-md px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-solana-purple"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-solana-purple/20 hover:bg-solana-purple/30 text-solana-purple px-3 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
                aria-label="Send message"
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
            aria-label="Chat with Rust Rocket Assistant"
            onClick={toggleChat}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-solana-purple/20 to-solana-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Bot className="h-6 w-6 text-solana-purple group-hover:text-solana-purple transition-colors duration-300" />
            {apiStatus === "error" && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-full border border-background-secondary"></span>
            )}
          </button>

          {/* Tooltip */}
          <div
            className={`absolute bottom-full right-0 mb-3 bg-background-secondary border border-gray-800 rounded-lg py-2 px-4 shadow-lg transition-all duration-300 whitespace-nowrap ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="text-sm font-medium">Chat with Rust Rocket Assistant</div>
            <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-2 h-2 bg-background-secondary border-r border-b border-gray-800"></div>
          </div>

          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full border-4 border-solana-purple/30 animate-ping opacity-30"></div>
        </div>
      )}
    </div>
  )
}
