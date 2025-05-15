"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import CollapsibleSection from "./CollapsibleSection"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is Rust Rocket?",
    answer:
      "Rust Rocket is an advanced Solana trading bot that specializes in same-block execution and copy trading. With our proprietary BDN network (Block Dependent Network), we enable you to execute trades in the same block as the original event and automatically copy successful traders.",
  },
  {
    question: "What does Same-Block Execution mean?",
    answer:
      "Same-Block Execution means that your trades are executed in exactly the same Solana block as the original event (e.g., a token launch or a trade by a successful trader). This is crucial for success when trading meme coins, as even fractions of a second can determine profit or loss.",
  },
  {
    question: "How does Copy Trading work?",
    answer:
      "Our system continuously identifies and tracks top-performing wallets on Solana. When these wallets execute a trade, our algorithm analyzes the transaction and automatically executes the same trade for you - with maximum speed and precision. You can decide which wallets to copy and set your risk parameters individually.",
  },
  {
    question: "What is the BDN Network?",
    answer:
      "The BDN (Block Dependent Network) is our global network of 15 proprietary, optimized Solana gateways. These are strategically distributed around the world and equipped with special hardware to route your transactions through the fastest and most reliable paths. Unlike public nodes, we bypass congestion and achieve a significantly higher success rate.",
  },
  {
    question: "What are the success rates?",
    answer:
      "Rust Rocket achieves a success rate of over 95% when executing trades in the same block. The average execution time is about 0.4 seconds, which is significantly faster than conventional bots or manual trades.",
  },
  {
    question: "How can I use Rust Rocket?",
    answer:
      "Rust Rocket is provided via Telegram. After registration, you get access to our Telegram bot, through which you can control all functions. The setup is simple and intuitive, and we offer comprehensive documentation and support for all users.",
  },
  {
    question: "When will Rust Rocket launch?",
    answer:
      "Rust Rocket is currently in the final testing phase and will officially launch next week. Join our waitlist to be notified first and receive exclusive benefits.",
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const toggleFAQ = (index: number) => {
    // Track FAQ interaction
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag is not typed
      window.gtag("event", "faq_interaction", {
        event_category: "engagement",
        event_label: `faq_${index + 1}_${activeIndex === index ? "close" : "open"}`,
      })
    }

    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      id="faq"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="container-custom">
        <CollapsibleSection
          title={
            <>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-tertiary text-text-secondary text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary mr-2" aria-hidden="true"></span>
                FAQ
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary" id="faq-heading">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </>
          }
          defaultOpen={false}
          titleClassName="hover:opacity-90 transition-opacity duration-300 flex flex-col items-center text-center"
        >
          <p className="text-text-secondary text-lg">
            Here you'll find answers to the most common questions about Rust Rocket. If you have any other questions,
            don't hesitate to contact us via Telegram.
          </p>
        </CollapsibleSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-background-tertiary border-primary/30 border"
                    : "bg-background-secondary hover:bg-background-tertiary border border-gray-800"
                }`}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                data-tracking-id={`faq_question_${index + 1}`}
              >
                <span className="font-medium text-text-primary" itemProp="name">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div className="p-5 bg-background-secondary/50 border border-t-0 border-gray-800 rounded-b-lg">
                      <p className="text-text-secondary" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* JSON-LD Schema for FAQ Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
