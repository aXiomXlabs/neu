"use server"

export interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export async function chatWithGrokAI(messages: Message[]) {
  try {
    // Prepare the conversation history
    const conversation = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Add system message if not present
    if (!conversation.some((msg) => msg.role === "system")) {
      conversation.unshift({
        role: "system",
        content:
          "You are Rust Rocket's AI assistant powered by Grok. You help users understand Rust Rocket, a Solana trading bot with same-block execution and copy trading features. Be concise, helpful, and knowledgeable about cryptocurrency trading, especially on Solana.",
      })
    }

    // Use the Grok API directly with the XAI_API_KEY environment variable
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-2",
        messages: conversation,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    const text = data.choices[0].message.content

    return {
      success: true,
      message: text,
    }
  } catch (error) {
    console.error("Error calling Grok AI:", error)
    return {
      success: false,
      message: "Sorry, I encountered an error while processing your request. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
