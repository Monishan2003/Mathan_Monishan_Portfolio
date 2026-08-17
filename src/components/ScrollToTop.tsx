"use client"

import React, { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
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
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scrollup"
    >
      <i className="fas fa-arrow-up scrollup__icon" />

      <style jsx>{`
        .scrollup {
          position: fixed;
          right: 2rem;
          bottom: 5.5rem;
          background-color: var(--skin-color, #3482ff);
          opacity: 0.9;
          padding: 0.65rem;
          border-radius: 0.4rem;
          z-index: var(--z-fixed, 100);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.4);
          animation: bounceIn 0.5s ease forwards;
          transition: all 0.3s ease;
        }

        .scrollup:hover {
          opacity: 1;
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(52, 130, 255, 0.6);
        }

        .scrollup__icon {
          font-size: 1.15rem;
        }

        @media screen and (max-width: 600px) {
          .scrollup {
            right: 1.25rem;
            bottom: 5rem;
          }
        }
      `}</style>
    </button>
  )
}
