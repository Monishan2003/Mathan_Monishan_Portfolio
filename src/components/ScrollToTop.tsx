"use client"

import React, { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "95px",
        right: "30px",
        width: "48px",
        height: "48px",
        background: "var(--primary-color)",
        color: "#ffffff",
        border: "none",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        cursor: "pointer",
        zIndex: 990,
        boxShadow: "0 4px 15px rgba(43, 63, 167, 0.35)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(43, 63, 167, 0.5)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(43, 63, 167, 0.35)"
      }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}
