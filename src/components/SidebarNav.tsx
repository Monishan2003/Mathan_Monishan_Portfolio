"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

interface SidebarNavProps {
  name?: string
  hasVlogs?: boolean
  hasExperience?: boolean
  hasEducation?: boolean
  hasProjects?: boolean
  hasSkills?: boolean
}

export default function SidebarNav({
  name = "Mathan Monishan",
  hasVlogs = true,
  hasExperience = true,
  hasEducation = true,
  hasProjects = true,
  hasSkills = true,
}: SidebarNavProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sharePopup, setSharePopup] = useState(false)

  const navItems = [
    { label: "Home", href: "#home", id: "home", show: true },
    { label: "About", href: "#about", id: "about", show: true },
    { label: "Experience", href: "#experience", id: "experience", show: hasExperience },
    { label: "Education", href: "#education", id: "education", show: hasEducation },
    { label: "Projects", href: "#work", id: "work", show: hasProjects },
    { label: "Skills", href: "#skills", id: "skills", show: hasSkills },
    { label: "Vlogs", href: "#vlog", id: "vlog", show: hasVlogs },
    { label: "Services", href: "#services", id: "services", show: true },
    { label: "Contact", href: "#contact", id: "contact", show: true },
  ].filter((item) => item.show)

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "home",
        "about",
        "experience",
        "education",
        "work",
        "skills",
        "vlog",
        "services",
        "contact",
      ]
      const scrollPosition = window.scrollY + 200

      for (const section of sectionIds) {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name} | AI & Full-Stack Engineer`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      setSharePopup(!sharePopup)
    }
  }

  const initialLetter = name.charAt(0).toUpperCase() || "M"

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="mobile-header">
        <Link href="#home" className="mobile-logo">
          {name}
        </Link>
        <button
          type="button"
          className="nav__toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <i className="fas fa-bars" />
        </button>
      </header>

      {/* Main Left Vertical Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? "show-sidebar" : ""}`} id="side-bar">
        <nav className="nav">
          {/* 1. Top Brand Logo Avatar (Circular Blue Badge) */}
          <div className="nav__brand-circle">
            <Link href="#home" className="nav__brand-link">
              {initialLetter}
            </Link>
          </div>

          {/* 2. Rotated Vertical Nav Menu */}
          <div className="nav__menu">
            <div className="menu">
              <ul className="nav__list">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <li key={item.id} className="nav__item">
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`nav__link ${isActive ? "active-link" : ""}`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="nav__active-dot" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* 3. Bottom Share Button */}
          <div className="btn__share" onClick={handleShare} title="Share Portfolio">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="nav__close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <i className="fas fa-times" />
          </button>
        </nav>
      </aside>

      {/* Share Toast Modal */}
      {sharePopup && (
        <div className="share-toast" onClick={() => setSharePopup(false)}>
          <div className="share-toast-content" onClick={(e) => e.stopPropagation()}>
            <p style={{ fontWeight: 600, color: "var(--title-color, #fff)", marginBottom: "12px" }}>
              Share Monishan&apos;s Portfolio:
            </p>
            <div className="share-links">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out Mathan Monishan's portfolio: https://www.monishan.me`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn wa"
              >
                <i className="fab fa-whatsapp" /> WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.monishan.me"
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn li"
              >
                <i className="fab fa-linkedin-in" /> LinkedIn
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("https://www.monishan.me")
                  setSharePopup(false)
                }}
                className="share-btn cp"
              >
                <i className="fas fa-copy" /> Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Sidebar Styling */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 76px;
          height: 100vh;
          background-color: var(--body-color, rgb(10, 10, 15));
          border-right: 1px solid var(--box-border, rgba(255, 255, 255, 0.08));
          z-index: 1000;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Top Brand Circle Logo */
        .nav__brand-circle {
          position: absolute;
          top: 1.6rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--skin-color, #3482ff);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.4);
          z-index: 20;
          transition: transform 0.25s ease;
        }

        .nav__brand-circle:hover {
          transform: scale(1.08);
        }

        .nav__brand-link {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.15rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-family: var(--font-heading, 'Poppins', sans-serif);
        }

        /* 90-Degree Rotated Navigation Menu */
        .nav__menu {
          position: fixed;
          transform: rotate(-90deg) translateX(-100%);
          transform-origin: left top;
          width: 100vh;
          top: 0;
          left: 76px;
          pointer-events: auto;
        }

        .menu {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 76px;
          padding: 0 5rem 0 3.5rem; /* Generous clearance for top logo and bottom share */
        }

        .nav__list {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          gap: 0.2rem;
          margin: 0;
          padding: 0;
          list-style: none;
          max-width: calc(100vh - 140px);
        }

        .nav__item {
          display: inline-block;
          flex-shrink: 1;
        }

        .nav__link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          height: 76px;
          line-height: 76px;
          padding: 0 0.55rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: 500;
          font-size: 13.5px;
          letter-spacing: 0.2px;
          position: relative;
          white-space: nowrap;
          transition: color 0.25s ease;
          text-decoration: none;
        }

        .nav__link:hover,
        .nav__link.active-link {
          color: var(--skin-color, #3482ff);
        }

        .nav__active-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--skin-color, #3482ff);
          box-shadow: 0 0 8px var(--skin-color, #3482ff);
        }

        /* Bottom Share Button */
        .btn__share {
          position: absolute;
          bottom: 1.6rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.7);
          border-radius: 8px;
          background-color: var(--box-color, rgba(255, 255, 255, 0.04));
          border: 1px solid var(--box-border, rgba(255, 255, 255, 0.06));
          transition: all 0.25s ease;
          z-index: 20;
        }

        .btn__share:hover {
          color: var(--skin-color, #3482ff);
          background-color: rgba(52, 130, 255, 0.12);
          border-color: var(--skin-color, #3482ff);
          transform: translateY(-2px);
        }

        .nav__close {
          display: none;
        }

        .mobile-header {
          display: none;
        }

        /* Responsive height scaling for smaller laptop screens */
        @media screen and (max-height: 750px) {
          .nav__link {
            font-size: 12px;
            padding: 0 0.35rem;
          }
          .menu {
            padding: 0 4rem 0 2.5rem;
          }
        }

        /* Mobile Responsive Drawer */
        @media screen and (max-width: 1024px) {
          .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: var(--body-color, rgb(10, 10, 15));
            backdrop-filter: blur(12px);
            padding: 0 1.25rem;
            z-index: 999;
            border-bottom: 1px solid var(--box-border);
          }

          .mobile-logo {
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--title-color, rgb(241, 241, 243));
            text-decoration: none;
          }

          .nav__toggle {
            width: 36px;
            height: 36px;
            background-color: var(--skin-color, #3482ff);
            color: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            cursor: pointer;
            border: none;
          }

          .sidebar {
            left: -100%;
            width: 250px;
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.7);
            overflow-y: auto;
          }

          .sidebar.show-sidebar {
            left: 0;
          }

          .nav__brand-circle {
            position: static;
            margin: 2rem auto 1rem;
          }

          .nav__menu {
            position: static;
            transform: none;
            width: 100%;
            height: auto;
            margin: auto 0;
          }

          .menu {
            height: auto;
            padding: 1.5rem 1.5rem;
          }

          .nav__list {
            flex-direction: column;
            gap: 1.25rem;
            align-items: flex-start;
            max-width: 100%;
          }

          .nav__link {
            height: auto;
            line-height: normal;
            font-size: 1.1rem;
            padding: 0.25rem 0;
          }

          .nav__close {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            font-size: 1.25rem;
            color: var(--text-color);
            background: transparent;
            cursor: pointer;
          }

          .btn__share {
            position: static;
            margin: 2rem auto;
          }
        }

        /* Share Toast Modal Styling */
        .share-toast {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .share-toast-content {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1rem;
          padding: 1.5rem;
          width: 90%;
          max-width: 380px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          animation: scaleIn 0.3s ease;
        }

        .share-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          font-size: 0.95rem;
          color: #ffffff;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .share-btn.wa {
          background-color: #25d366;
        }

        .share-btn.li {
          background-color: #0a66c2;
        }

        .share-btn.cp {
          background-color: var(--box-border);
          color: var(--title-color);
        }

        .share-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  )
}
