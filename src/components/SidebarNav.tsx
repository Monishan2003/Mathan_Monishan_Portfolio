"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

interface SidebarNavProps {
  name?: string
}

export default function SidebarNav({ name = "Mathan Monishan" }: SidebarNavProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sharePopup, setSharePopup] = useState(false)

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Projects", href: "#work", id: "work" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Vlogs", href: "#vlog", id: "vlog" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

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

  return (
    <>
      {/* Mobile Top Header */}
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

      {/* Main Left Vertical Sidebar (Revan Signature Clean Layout) */}
      <aside className={`sidebar ${mobileMenuOpen ? "show-sidebar" : ""}`} id="side-bar">
        <nav className="nav">
          {/* Rotated Vertical Menu (Centered & Clean) */}
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
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Share Button at Bottom */}
          <div className="btn__share" onClick={handleShare} title="Share Portfolio">
            <svg
              width="20"
              height="20"
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
          width: 85px;
          height: 100vh;
          background-color: var(--body-color, rgb(10, 10, 15));
          border-right: 1px solid rgba(255, 255, 255, 0.07);
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

        /* 90-Degree Rotated Navigation Menu */
        .nav__menu {
          position: fixed;
          transform: rotate(-90deg) translateX(-100%);
          transform-origin: left top;
          width: 100vh;
          top: 0;
          left: 85px;
          pointer-events: auto;
        }

        .menu {
          display: flex;
          justify-content: center;
          height: 85px;
          align-items: center;
          padding: 0 1rem;
        }

        .nav__list {
          display: flex;
          flex-direction: row-reverse;
          gap: 0.25rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nav__item {
          display: inline-block;
        }

        .nav__link {
          display: block;
          height: 85px;
          line-height: 85px;
          padding: 0 0.85rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: 500;
          font-size: 14.5px;
          letter-spacing: 0.3px;
          position: relative;
          white-space: nowrap;
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .nav__link:hover,
        .nav__link.active-link {
          color: var(--skin-color, #3482ff);
        }

        .nav__link.active-link::after,
        .nav__link:hover::after {
          position: absolute;
          content: "";
          width: 5px;
          height: 5px;
          background-color: var(--skin-color, #3482ff);
          border-radius: 50%;
          bottom: 1.5rem;
          left: 0;
          right: 0;
          margin: auto;
          box-shadow: 0 0 8px var(--skin-color, #3482ff);
        }

        .btn__share {
          position: absolute;
          bottom: 1.8rem;
          left: 0;
          right: 0;
          margin: auto;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-color, rgb(214, 214, 220));
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
          z-index: 10;
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
            background-color: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(12px);
            padding: 0 1.25rem;
            z-index: 999;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

          .nav__menu {
            position: static;
            transform: none;
            width: 100%;
            margin-top: 4.5rem;
          }

          .menu {
            height: auto;
            display: block;
            padding: 0 1.5rem;
          }

          .nav__list {
            flex-direction: column;
            gap: 0;
          }

          .nav__link {
            line-height: normal;
            height: auto;
            padding: 0.9rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 15px;
          }

          .nav__link.active-link::after,
          .nav__link:hover::after {
            bottom: auto;
            top: 50%;
            right: 0;
            left: auto;
            transform: translateY(-50%);
          }

          .btn__share {
            position: static;
            margin: 2rem 1.5rem 1.5rem;
            width: calc(100% - 3rem);
          }

          .nav__close {
            display: block;
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            font-size: 1.3rem;
            color: var(--title-color, rgb(241, 241, 243));
            background: none;
            border: none;
            cursor: pointer;
          }
        }

        /* Share Modal */
        .share-toast {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .share-toast-content {
          background: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 12px;
          padding: 24px;
          width: 100%;
          max-width: 340px;
          text-align: center;
        }

        .share-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        .share-btn.wa { background: #25d366; }
        .share-btn.li { background: #0077b5; }
        .share-btn.cp { background: #374151; }
      `}</style>
    </>
  )
}
