"use client"

import type React from "react"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Rocket, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { joinWaitlist } from "@/app/actions/waitlist"

export default function WaitlistSignupSection() {
  const [email, setEmail] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      setResult({
        success: false,
        message: "Bitte gib deine E-Mail-Adresse ein.",
      })
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const result = await joinWaitlist(formData)
      setResult(result)

      if (result.success) {
        // Reset form on success
        setEmail("")
        setTelegramUsername("")
      }
    })
  }

  const resetForm = () => {
    setResult(null)
    setEmail("")
    setTelegramUsername("")
  }

  return (
    <section className="py-24 relative overflow-hidden" id="waitlist">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-solana-purple/10 to-solana-green/10 blur-3xl opacity-30 -z-10"></div>

          {/* Content container */}
          <div className="bg-background-secondary/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800 shadow-xl">
            {result?.success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-solana-green/20 text-solana-green mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">You're On The List!</h2>
                <div className="space-y-4 mb-8">
                  <p className="text-text-primary text-lg">
                    Thank you for joining the <span className="text-primary font-medium">Rust Rocket</span> waitlist!
                    Your spot is secured.
                  </p>

                  <div className="bg-background/40 rounded-lg p-4 border border-gray-800 max-w-xl mx-auto">
                    <h3 className="font-semibold text-text-primary mb-2">What happens next:</h3>
                    <ul className="text-text-secondary text-left space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">1</span>
                        </div>
                        <span>You'll receive a confirmation email shortly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">2</span>
                        </div>
                        <span>We'll send you exclusive updates as we approach launch (expected next week)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary text-xs">3</span>
                        </div>
                        <span>Early access members will receive priority onboarding and special benefits</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <a
                      href="https://t.me/rustrocket"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-background/60 hover:bg-background/80 text-text-primary px-4 py-2 rounded-md border border-gray-800 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#229ED9]"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                      Join Telegram Channel
                    </a>
                    <a
                      href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20waitlist%20for%20Rust%20Rocket%20-%20the%20ultimate%20Solana%20trading%20bot%20with%20same-block%20execution%20and%20copy%20trading!%20www.rust-rocket.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-background/60 hover:bg-background/80 text-text-primary px-4 py-2 rounded-md border border-gray-800 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#1DA1F2]"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      Share on Twitter
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <button
                    onClick={resetForm}
                    className="text-primary hover:text-primary-hover underline transition-colors"
                  >
                    Sign up with another email
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                    <Rocket className="h-8 w-8" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-primary">
                  The Countdown is On: Secure Your Early Access to <span className="text-primary">Rust Rocket</span>{" "}
                  Now!
                </h2>

                <p className="text-text-secondary text-lg text-center mb-8">
                  Be among the first to launch with Rust Rocket (www.rust-rocket.com) next week. Exclusive updates and
                  benefits for waitlist members only.
                </p>

                {result?.success === false && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{result.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-gray-800 text-text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telegramUsername" className="sr-only">
                      Telegram Username
                    </label>
                    <input
                      type="text"
                      id="telegramUsername"
                      name="telegramUsername"
                      value={telegramUsername}
                      onChange={(e) => setTelegramUsername(e.target.value)}
                      placeholder="Your Telegram username (optional)"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-gray-800 text-text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <input type="hidden" name="referralSource" value="website" />

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isPending ? (
                      <>
                        <span className="animate-pulse">Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Secure My Spot & Get Launch Updates!</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  <p className="text-text-secondary text-sm text-center mt-4">
                    No spam, ever. Only rocket fuel for your Solana trades. By signing up, you agree to our{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary-hover transition-colors">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
