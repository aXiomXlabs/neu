"use server"

import OpenAI from "openai"

export interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

// Erstelle den OpenAI-Client außerhalb der Funktion, damit er nur einmal initialisiert wird
let openaiClient: OpenAI | null = null

// Funktion zum Initialisieren des Clients
function getOpenAIClient() {
  if (!openaiClient) {
    const apiKey = process.env.XAI_API_KEY

    if (!apiKey) {
      throw new Error("Fehlender API-Schlüssel: XAI_API_KEY muss gesetzt sein")
    }

    openaiClient = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.x.ai/v1",
    })
  }

  return openaiClient
}

export async function chatWithGrokAI(messages: Message[]) {
  try {
    // Versuche, den OpenAI-Client zu initialisieren
    let client
    try {
      client = getOpenAIClient()
    } catch (error) {
      console.error("Fehler beim Initialisieren des OpenAI-Clients:", error)
      return {
        success: false,
        message: "API configuration error. Please contact the administrator.",
        error: error instanceof Error ? error.message : String(error),
      }
    }

    console.log("Using OpenAI SDK with xAI/Grok")

    // Systemanweisung für den Assistenten
    const systemMessage = {
      role: "system" as const,
      content:
        "You are Rust Rocket's AI assistant. You help users understand Rust Rocket, a Solana trading bot with same-block execution and copy trading features. Be concise, helpful, and knowledgeable about cryptocurrency trading, especially on Solana.",
    }

    // Formatiere die Nachrichten für die API
    const formattedMessages = [
      systemMessage,
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ]

    // Sende die Anfrage an die API
    try {
      const completion = await client.chat.completions.create({
        model: "grok-2-latest",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1000,
      })

      // Extrahiere die Antwort
      const responseText = completion.choices[0]?.message?.content || ""

      return {
        success: true,
        message: responseText,
      }
    } catch (aiError) {
      console.error("Error using OpenAI SDK with xAI:", aiError)

      // Verbesserte Fehlerbehandlung
      if (aiError instanceof Error) {
        // Prüfe auf spezifische Fehlermeldungen
        const errorMessage = aiError.message

        if (errorMessage.includes("browser-like environment")) {
          console.error("Browser-Umgebungsfehler erkannt. Server-seitige Ausführung sicherstellen.")

          // Fallback zu lokalen Antworten
          return {
            success: false,
            message: "I'm currently in offline mode. I can answer basic questions about Rust Rocket.",
            error: "Browser environment detection issue",
          }
        }

        if (errorMessage.includes("API key")) {
          return {
            success: false,
            message: "I'm having trouble connecting to my knowledge base. The team has been notified.",
            error: "API key issue: " + errorMessage,
          }
        }
      }

      return {
        success: false,
        message: "I'm experiencing technical difficulties. Please try again later.",
        error: aiError instanceof Error ? aiError.message : String(aiError),
      }
    }
  } catch (error) {
    console.error("Error calling AI:", error)
    return {
      success: false,
      message: "Sorry, I encountered an error while processing your request. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
