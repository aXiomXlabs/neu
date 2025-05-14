"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Globe } from "lucide-react"

// Define gateway nodes with city names and coordinates
const gatewayNodes = [
  { id: 1, city: "San Francisco", x: 0.15, y: 0.38, color: "#14F195" },
  { id: 2, city: "New York", x: 0.25, y: 0.35, color: "#9945FF" },
  { id: 3, city: "Chicago", x: 0.22, y: 0.33, color: "#14F195" },
  { id: 4, city: "London", x: 0.42, y: 0.28, color: "#9945FF" },
  { id: 5, city: "Frankfurt", x: 0.46, y: 0.29, color: "#14F195" },
  { id: 6, city: "Stockholm", x: 0.48, y: 0.22, color: "#9945FF" },
  { id: 7, city: "Dubai", x: 0.56, y: 0.42, color: "#14F195" },
  { id: 8, city: "Mumbai", x: 0.62, y: 0.45, color: "#9945FF" },
  { id: 9, city: "Singapore", x: 0.72, y: 0.52, color: "#14F195" },
  { id: 10, city: "Tokyo", x: 0.82, y: 0.35, color: "#9945FF" },
  { id: 11, city: "Seoul", x: 0.8, y: 0.32, color: "#14F195" },
  { id: 12, city: "Sydney", x: 0.85, y: 0.65, color: "#9945FF" },
  { id: 13, city: "São Paulo", x: 0.3, y: 0.62, color: "#14F195" },
  { id: 14, city: "Johannesburg", x: 0.52, y: 0.62, color: "#9945FF" },
  { id: 15, city: "Hong Kong", x: 0.76, y: 0.42, color: "#14F195" },
]

// Central Solana node
const centralNode = { x: 0.5, y: 0.45 }

export default function BDNNetworkSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Animation for the BDN network map
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Track mouse position for hover effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })

      // Check if mouse is over any node
      let hoveredNodeId = null
      for (const node of gatewayNodes) {
        const nodeX = node.x * canvas.width
        const nodeY = node.y * canvas.height
        const distance = Math.sqrt(Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2))
        if (distance < 15) {
          hoveredNodeId = node.id
          break
        }
      }
      setHoveredNode(hoveredNodeId)
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Create data flow animations
    const dataFlows: {
      fromX: number
      fromY: number
      progress: number
      speed: number
      color: string
      active: boolean
      delay: number
    }[] = []

    // Initialize data flows
    gatewayNodes.forEach((node) => {
      for (let i = 0; i < 3; i++) {
        dataFlows.push({
          fromX: node.x,
          fromY: node.y,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01,
          color: node.color,
          active: false,
          delay: Math.random() * 2000, // Random delay for staggered animation
        })
      }
    })

    // Create world map image
    const worldMapImage = new Image()
    worldMapImage.crossOrigin = "anonymous"
    worldMapImage.src = "/images/world-map-dark.png"

    // Animation function
    let animationFrame: number
    let lastTime = 0

    const animate = (time: number) => {
      if (!ctx || !canvas) return

      // Calculate delta time for smooth animation
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw world map background
      if (worldMapImage.complete && worldMapImage.naturalWidth > 0) {
        ctx.globalAlpha = 0.2
        ctx.drawImage(worldMapImage, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
      }

      // Draw grid lines for tech effect
      ctx.beginPath()
      const gridSize = 40
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }
      ctx.strokeStyle = "rgba(50, 50, 50, 0.2)"
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Draw connection lines
      gatewayNodes.forEach((node) => {
        ctx.beginPath()
        ctx.moveTo(node.x * canvas.width, node.y * canvas.height)
        ctx.lineTo(centralNode.x * canvas.width, centralNode.y * canvas.height)
        ctx.strokeStyle = "rgba(100, 100, 100, 0.2)"
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Update and draw data flows
      dataFlows.forEach((flow, index) => {
        // Check if flow should be active based on delay
        if (!flow.active && time > flow.delay) {
          flow.active = true
        }

        if (flow.active) {
          // Update flow progress
          flow.progress += flow.speed * (deltaTime / 16.67) // Normalize by 60fps

          // Reset flow when complete
          if (flow.progress >= 1) {
            flow.progress = 0
            flow.speed = 0.005 + Math.random() * 0.01
          }

          // Draw flow
          const startX = flow.fromX * canvas.width
          const startY = flow.fromY * canvas.height
          const endX = centralNode.x * canvas.width
          const endY = centralNode.y * canvas.height

          // Calculate current position
          const currentX = startX + (endX - startX) * flow.progress
          const currentY = startY + (endY - startY) * flow.progress

          // Draw flow particle
          ctx.beginPath()
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2)
          ctx.fillStyle = flow.color
          ctx.fill()

          // Draw trail
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(currentX, currentY)
          ctx.strokeStyle = `${flow.color}40` // 25% opacity
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // Draw central Solana node
      ctx.beginPath()
      ctx.arc(centralNode.x * canvas.width, centralNode.y * canvas.height, 10, 0, Math.PI * 2)
      ctx.fillStyle = "#FF4500" // Primary orange color
      ctx.fill()

      // Add glow to central node
      ctx.beginPath()
      ctx.arc(centralNode.x * canvas.width, centralNode.y * canvas.height, 15, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(
        centralNode.x * canvas.width,
        centralNode.y * canvas.height,
        10,
        centralNode.x * canvas.width,
        centralNode.y * canvas.height,
        25,
      )
      gradient.addColorStop(0, "rgba(255, 69, 0, 0.5)")
      gradient.addColorStop(1, "rgba(255, 69, 0, 0)")
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw gateway nodes
      gatewayNodes.forEach((node) => {
        const nodeX = node.x * canvas.width
        const nodeY = node.y * canvas.height
        const isHovered = node.id === hoveredNode

        // Node glow
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, isHovered ? 12 : 8, 0, Math.PI * 2)
        const nodeGradient = ctx.createRadialGradient(
          nodeX,
          nodeY,
          isHovered ? 6 : 4,
          nodeX,
          nodeY,
          isHovered ? 18 : 12,
        )
        nodeGradient.addColorStop(0, `${node.color}80`) // 50% opacity
        nodeGradient.addColorStop(1, `${node.color}00`) // 0% opacity
        ctx.fillStyle = nodeGradient
        ctx.fill()

        // Node center
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, isHovered ? 6 : 4, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Draw city label if hovered
        if (isHovered) {
          const labelX = nodeX
          const labelY = nodeY - 20

          ctx.font = "12px Inter, sans-serif"
          ctx.textAlign = "center"
          ctx.fillStyle = "#F3F4F6"

          // Draw background for better readability
          const textWidth = ctx.measureText(node.city).width
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
          ctx.fillRect(labelX - textWidth / 2 - 5, labelY - 12, textWidth + 10, 20)

          // Draw text
          ctx.fillStyle = "#F3F4F6"
          ctx.fillText(node.city, labelX, labelY)
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrame = requestAnimationFrame(animate)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [hoveredNode])

  return (
    <section className="py-20 relative overflow-hidden" id="bdn-network">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Outpace the Market: Same-Block Execution via Our Exclusive <span className="text-primary">BDN Network</span>
            .
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Same-Block Execution */}
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Same-Block Execution: Maximum Impact.</h3>
            </div>
            <p className="text-text-secondary text-lg">
              Rust Rocket aims to execute your sniper and copy trades in the{" "}
              <span className="text-primary font-semibold">exact same Solana block</span> as the original event. No
              waiting, no delays, maximum hit rate.
            </p>
          </div>

          {/* 15 Global BDN Gateways */}
          <div className="bg-background-secondary/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-solana-green/30 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-solana-green/10 text-solana-green">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">
                15 Proprietary BDN Gateways: Your Global Speed Advantage.
              </h3>
            </div>
            <p className="text-text-secondary text-lg">
              Our global network of 15 private, optimized Solana gateways (Block Dependent Network) ensures your
              transactions are routed via the fastest, most reliable paths, bypassing public congestion. This is the
              technological edge essential for successful sniping on pump.fun and beyond.
            </p>
          </div>
        </div>

        {/* Visual Element - Enhanced World Map with BDN Nodes */}
        <div className="relative aspect-[2/1] rounded-xl overflow-hidden border border-gray-800 bg-background-secondary/30 backdrop-blur-sm">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
            style={{ touchAction: "none" }}
          ></canvas>

          {/* Map legend */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
            <h4 className="text-text-primary text-sm font-medium mb-2">Global BDN Network</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-text-secondary text-xs">Central Node</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-solana-purple"></div>
                <span className="text-text-secondary text-xs">Primary Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-solana-green"></div>
                <span className="text-text-secondary text-xs">Secondary Gateway</span>
              </div>
            </div>
            <div className="mt-2 text-text-secondary text-xs">Hover over nodes to see locations</div>
          </div>

          {/* Comparison overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
                <h4 className="text-text-secondary font-medium mb-2 text-sm">Standard Transaction Path</h4>
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <span>Slow</span>
                  <span>•</span>
                  <span>Multiple hops</span>
                  <span>•</span>
                  <span>Congested</span>
                </div>
              </div>

              <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-solana-green/30">
                <h4 className="text-text-secondary font-medium mb-2 text-sm">Rust Rocket BDN Path</h4>
                <div className="flex items-center gap-2 text-solana-green text-sm">
                  <span>Direct</span>
                  <span>•</span>
                  <span>Fast</span>
                  <span>•</span>
                  <span>Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
