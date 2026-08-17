"use client"

import React, { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
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
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scrollup"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>

      <style jsx>{`
        .scrollup {
          position: fixed;
          right: 25px;
          bottom: 90px;
          background-color: var(--skin-color, #3482ff);
          opacity: 0.9;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          z-index: 980;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.4);
          animation: bounceIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .scrollup:hover {
          opacity: 1;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(52, 130, 255, 0.6);
        }

        @media screen and (max-width: 600px) {
          .scrollup {
            right: 20px;
            bottom: 78px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </button>
  )
}
