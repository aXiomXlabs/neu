"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { z } from "zod"

// Schema for validating waitlist form data
const waitlistSchema = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein"),
  telegramUsername: z.string().optional(),
  referralSource: z.string().optional(),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>

export async function joinWaitlist(formData: FormData) {
  try {
    // Extract and validate form data
    const email = formData.get("email") as string
    const telegramUsername = formData.get("telegramUsername") as string
    const referralSource = (formData.get("referralSource") as string) || "website"

    // Validate the data
    const validatedData = waitlistSchema.parse({
      email,
      telegramUsername,
      referralSource,
    })

    // Get IP address from headers (in a real app)
    // const ipAddress = headers().get('x-forwarded-for') || 'unknown'
    const ipAddress = "unknown" // Simplified for this example

    // Initialize Supabase client
    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", validatedData.email)
      .single()

    if (existingUser) {
      return {
        success: false,
        message: "Diese E-Mail-Adresse ist bereits registriert.",
      }
    }

    // Insert new waitlist entry
    const { error } = await supabase.from("waitlist").insert([
      {
        email: validatedData.email,
        telegram_username: validatedData.telegramUsername || null,
        ip_address: ipAddress,
        referral_source: validatedData.referralSource,
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: "Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.",
      }
    }

    return {
      success: true,
      message: "Vielen Dank für deine Anmeldung! Wir werden dich benachrichtigen, sobald Rust Rocket startet.",
    }
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return {
      success: false,
      message: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später noch einmal.",
    }
  }
}
