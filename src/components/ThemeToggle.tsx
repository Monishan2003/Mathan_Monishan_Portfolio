"use client"

import React, { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("portfolio-theme") as "dark" | "light") || "dark"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (t: "dark" | "light") => {
    const root = document.documentElement
    const body = document.body
    if (t === "light") {
      root.setAttribute("data-theme", "light")
      body.classList.add("light-theme")
      body.classList.remove("dark-theme")
    } else {
      root.setAttribute("data-theme", "dark")
      body.classList.add("dark-theme")
      body.classList.remove("light-theme")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("portfolio-theme", newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
      >
        {theme === "dark" ? (
          <i className="fas fa-sun theme-icon sun" />
        ) : (
          <i className="fas fa-moon theme-icon moon" />
        )}
      </button>

      <style jsx>{`
        .theme-toggle-btn {
          position: fixed;
          bottom: 155px;
          right: 25px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--box-color, rgb(22, 22, 29));
          color: var(--title-color, rgb(241, 241, 243));
          border: 1px solid var(--box-border);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          z-index: 990;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .theme-toggle-btn:hover {
          transform: translateY(-4px) rotate(18deg);
          border-color: var(--skin-color, #3482ff);
          color: var(--skin-color, #3482ff);
          box-shadow: 0 12px 28px rgba(52, 130, 255, 0.35);
        }

        .theme-icon.sun {
          color: #f59e0b;
        }

        .theme-icon.moon {
          color: #3b82f6;
        }

        @media screen and (max-width: 768px) {
          .theme-toggle-btn {
            bottom: 150px;
            right: 20px;
            width: 44px;
            height: 44px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  )
}
