"use client"

import React, { useState, useEffect } from "react"

interface NavbarProps {
  name?: string
}

export default function Navbar({ name = "Mathan Monishan" }: NavbarProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["home", "about", "education", "certifications", "projects", "skills", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  const isSticky = scrollY > 20

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        padding: isSticky ? "15px 0" : "25px 0",
        background: isSticky ? "var(--primary-color)" : "transparent",
        boxShadow: isSticky ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "28px", fontWeight: 700 }}>
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            style={{
              color: isSticky ? "#ffffff" : "var(--secondary-color)",
              fontFamily: "var(--font-heading)",
              transition: "color 0.3s ease",
            }}
          >
            {name}
          </a>
        </div>

        {/* Desktop Menu */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            listStyle: "none",
            gap: "24px",
          }}
          className="desktop-menu"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={{
                    color: isSticky
                      ? isActive
                        ? "var(--accent-color)"
                        : "#ffffff"
                      : isActive
                      ? "var(--primary-color)"
                      : "var(--text-dark)",
                    fontSize: "16px",
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                    position: "relative",
                    padding: "4px 0",
                    borderBottom: isActive
                      ? isSticky
                        ? "2px solid var(--accent-color)"
                        : "2px solid var(--primary-color)"
                      : "2px solid transparent",
                  }}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile Hamburger Button */}
        <div
          className="mobile-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            fontSize: "24px",
            color: isSticky ? "#ffffff" : "var(--secondary-color)",
            cursor: "pointer",
          }}
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(27, 0, 114, 0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "26px",
            zIndex: 998,
          }}
        >
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "absolute",
              top: "25px",
              right: "30px",
              fontSize: "28px",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-times"></i>
          </div>

          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              style={{
                color: activeSection === item.id ? "var(--accent-color)" : "#ffffff",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.desktop-menu) {
            display: none !important;
          }
          :global(.mobile-btn) {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  )
}
