"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  type: "blue" | "green" | "purple" | "orange"
  opacity: number
  fadeDirection: "in" | "out"
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 25))

    for (let i = 0; i < particleCount; i++) {
      const type = getRandomParticleType()
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        type,
        opacity: Math.random() * 0.5 + 0.1,
        fadeDirection: Math.random() > 0.5 ? "in" : "out",
      })
    }

    function getRandomParticleType() {
      const rand = Math.random()
      if (rand < 0.4) return "green"
      if (rand < 0.7) return "purple"
      if (rand < 0.9) return "blue"
      return "orange"
    }

    function getParticleColor(type: string, opacity: number) {
      switch (type) {
        case "green":
          return `rgba(20, 241, 149, ${opacity})`
        case "purple":
          return `rgba(153, 69, 255, ${opacity})`
        case "blue":
          return `rgba(0, 191, 255, ${opacity})`
        case "orange":
          return `rgba(255, 69, 0, ${opacity})`
        default:
          return `rgba(255, 255, 255, ${opacity})`
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update opacity for fade effect
        if (particle.fadeDirection === "in") {
          particle.opacity += 0.002
          if (particle.opacity >= 0.6) {
            particle.fadeDirection = "out"
          }
        } else {
          particle.opacity -= 0.002
          if (particle.opacity <= 0.1) {
            particle.fadeDirection = "in"
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = getParticleColor(particle.type, particle.opacity)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = getParticleColor(particle.type, 0.3)

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}
