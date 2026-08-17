"use client"

import React, { useEffect, useRef } from "react"

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -500, y: -500, targetX: -500, targetY: -500 })
  const hueRef = useRef(215) // Start at signature tech blue hue

  useEffect(() => {
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY

      // Calculate hue shift based on screen width/height position (dynamic color morphing)
      const ratioX = e.clientX / window.innerWidth
      const ratioY = e.clientY / window.innerHeight
      hueRef.current = Math.floor(190 + (ratioX * 90) + (ratioY * 40)) // Cycles 190 (cyan) -> 220 (blue) -> 280 (violet) -> 320 (magenta)
    }

    const handleMouseLeave = () => {
      posRef.current.targetX = -500
      posRef.current.targetY = -500
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    const render = () => {
      const pos = posRef.current

      // Smooth Lerp Easing (0.12 for main glow, 0.06 for outer aura)
      pos.x += (pos.targetX - pos.x) * 0.12
      pos.y += (pos.targetY - pos.y) * 0.12

      const hue = hueRef.current

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
        glowRef.current.style.background = `radial-gradient(circle, hsla(${hue}, 95%, 60%, 0.18) 0%, hsla(${hue + 40}, 90%, 55%, 0.08) 45%, transparent 70%)`
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
        auraRef.current.style.background = `radial-gradient(circle, hsla(${hue - 30}, 90%, 65%, 0.12) 0%, transparent 65%)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="cursor-glow-container" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={auraRef} className="cursor-aura" />

      <style jsx>{`
        .cursor-glow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .cursor-glow {
          position: absolute;
          top: -250px;
          left: -250px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(50px);
          will-change: transform, background;
          pointer-events: none;
          transition: background 0.3s ease;
          opacity: 0.85;
        }

        .cursor-aura {
          position: absolute;
          top: -380px;
          left: -380px;
          width: 760px;
          height: 760px;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform, background;
          pointer-events: none;
          transition: background 0.4s ease;
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .cursor-glow-container {
            display: none; /* Disable cursor glow on touch screens for battery efficiency */
          }
        }
      `}</style>
    </div>
  )
}
