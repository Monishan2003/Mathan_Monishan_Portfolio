"use client"

import React, { useEffect, useRef } from "react"

interface Dot {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  baseAlpha: number
  alpha: number
  color: string
}

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Smooth mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 120,
      isActive: false,
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.isActive = true
    }

    const handleMouseLeave = () => {
      mouse.isActive = false
      mouse.targetX = -1000
      mouse.targetY = -1000
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Clean, subtle particles (small elegant dots)
    const dotCount = Math.min(Math.floor((width * height) / 30000), 35)
    const dots: Dot[] = []
    const colors = ["#2b3fa7", "#14b1ff", "#4a6fc7"]

    for (let i = 0; i < dotCount; i++) {
      const posX = Math.random() * width
      const posY = Math.random() * height
      const baseAlpha = Math.random() * 0.2 + 0.1
      dots.push({
        x: posX,
        y: posY,
        originX: posX,
        originY: posY,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1.5,
        baseAlpha,
        alpha: baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      // 1. Ultra-subtle, clean cursor glow (professional soft ambient highlight)
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180
        )
        glow.addColorStop(0, "rgba(20, 177, 255, 0.06)")
        glow.addColorStop(0.6, "rgba(43, 63, 167, 0.02)")
        glow.addColorStop(1, "transparent")

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Render clean subtle dots with gentle drift
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]

        d.x += d.vx
        d.y += d.vy

        // Wrap edges gently
        if (d.x < -10) d.x = width + 10
        if (d.x > width + 10) d.x = -10
        if (d.y < -10) d.y = height + 10
        if (d.y > height + 10) d.y = -10

        // Gentle mouse interaction (subtle repulsion)
        if (mouse.isActive) {
          const dx = mouse.x - d.x
          const dy = mouse.y - d.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius
            const angle = Math.atan2(dy, dx)
            d.x -= Math.cos(angle) * force * 1.5
            d.y -= Math.sin(angle) * force * 1.5
            d.alpha = Math.min(d.baseAlpha + force * 0.3, 0.5)
          } else {
            d.alpha = d.baseAlpha
          }
        }

        // Draw dot
        ctx.save()
        ctx.globalAlpha = d.alpha
        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
}
