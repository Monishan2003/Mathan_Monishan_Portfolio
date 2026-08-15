"use client"

import React, { useState, useEffect } from "react"

interface TypingEffectProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  loop?: boolean
}

export default function TypingEffect({
  strings = ["Full Stack Developer"],
  typeSpeed = 100,
  backSpeed = 60,
  loop = true,
}: TypingEffectProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!strings || strings.length === 0) return

    const fullText = strings[currentStringIndex % strings.length]

    let timer: NodeJS.Timeout

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1))
        if (currentText.length === 0) {
          setIsDeleting(false)
          setCurrentStringIndex((prev) => (prev + 1) % strings.length)
        }
      }, backSpeed)
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText.length === fullText.length) {
          // Pause at full word before deleting
          timer = setTimeout(() => {
            if (loop || currentStringIndex < strings.length - 1) {
              setIsDeleting(true)
            }
          }, 2000)
        }
      }, typeSpeed)
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentStringIndex, strings, typeSpeed, backSpeed, loop])

  return (
    <span>
      {currentText}
      <span
        style={{
          display: "inline-block",
          marginLeft: "2px",
          color: "var(--primary-color)",
          animation: "blink 1s infinite",
          fontWeight: 300,
        }}
      >
        |
      </span>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
