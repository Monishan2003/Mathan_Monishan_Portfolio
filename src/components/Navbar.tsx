"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

interface NavbarProps {
  name?: string
  resumeUrl?: string
}

export default function Navbar({
  name = "Mathan Monishan",
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ["home", "work", "experience", "approach", "vlog", "skills", "about", "education", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "How I Build", href: "#approach", id: "approach" },
    { label: "Vlog & Logs", href: "#vlog", id: "vlog" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "About", href: "#about", id: "about" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Brand */}
        <Link href="#home" className="nav-brand">
          <div className="brand-badge">M</div>
          <div className="brand-text">
            <span className="brand-name">{name}</span>
            <span className="brand-tag">AI & Mechatronics</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Right Action */}
        <div className="nav-action">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv-btn"
          >
            <i className="fas fa-file-pdf" style={{ color: "#f87171" }} />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle-btn"
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link ${activeSection === link.id ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
            <div style={{ paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <i className="fas fa-file-pdf" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
          padding: 20px 0;
          background: transparent;
          transition: all 0.3s ease;
        }

        .navbar-header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 12px 0;
          box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid #e2e8f0;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-badge {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #2563eb;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }

        .brand-tag {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          font-size: 14.5px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          padding: 4px 0;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .nav-link.active {
          color: #2563eb;
          font-weight: 600;
        }

        .nav-action {
          display: flex;
          align-items: center;
        }

        .nav-cv-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0f172a;
          color: #ffffff !important;
          font-size: 13.5px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
        }

        .nav-cv-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          font-size: 22px;
          color: #0f172a;
          cursor: pointer;
          padding: 6px;
        }

        .mobile-menu-drawer {
          display: none;
        }

        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }

          .nav-action {
            display: none;
          }

          .mobile-toggle-btn {
            display: block;
          }

          .mobile-menu-drawer {
            display: block;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            padding: 20px 24px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .mobile-nav-link {
            font-size: 16px;
            font-weight: 500;
            color: #334155;
            text-decoration: none;
            padding: 6px 0;
          }

          .mobile-nav-link.active {
            color: #2563eb;
            font-weight: 700;
          }
        }
      `}</style>
    </header>
  )
}
