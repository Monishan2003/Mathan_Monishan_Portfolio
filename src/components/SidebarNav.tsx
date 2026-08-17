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

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "work",
        "services",
        "vlog",
        "education",
        "contact",
      ]
      const scrollPosition = window.scrollY + 250

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

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#work", id: "work" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Vlog & Logs", href: "#vlog", id: "vlog" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

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

      {/* Main Left Vertical Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? "show-sidebar" : ""}`} id="side-bar">
        <nav className="nav">
          {/* Logo Badge */}
          <div className="nav__logo">
            <Link href="#home" className="nav__logo-text">
              M
            </Link>
          </div>

          {/* 90-Degree Rotated Menu */}
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
            <i className="fas fa-share-alt social__share" />
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

      {/* Share Toast */}
      {sharePopup && (
        <div className="share-toast" onClick={() => setSharePopup(false)}>
          <div className="share-toast-content" onClick={(e) => e.stopPropagation()}>
            <p>Share Monishan&apos;s Portfolio:</p>
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
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.monishan.me`}
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
        /* Sidebar Styling strictly matching Revan Portfolio */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100px;
          height: 100vh;
          background-color: var(--body-color, rgb(10, 10, 15));
          border-right: 1px solid var(--box-color, rgb(22, 22, 29));
          z-index: 1000;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .nav__logo {
          position: absolute;
          left: 0;
          right: 0;
          top: 1.8rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--skin-color, #3482ff);
          text-align: center;
          margin: auto;
          box-shadow: 0 4px 16px rgba(52, 130, 255, 0.4);
          transition: transform 0.3s ease;
        }

        .nav__logo:hover {
          transform: scale(1.08);
        }

        .nav__logo-text {
          font-size: 1.4rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: var(--font-bold, 600);
          line-height: 44px;
          display: block;
        }

        .nav__menu {
          position: fixed;
          transform: rotate(-90deg) translateX(-100%);
          transform-origin: left top;
          width: 100vh;
          top: 0;
          left: 100px;
        }

        .menu {
          display: flex;
          justify-content: center;
          height: 100px;
          align-items: center;
        }

        .nav__list {
          display: flex;
          flex-direction: row-reverse;
          gap: 0.5rem;
        }

        .nav__item {
          display: block;
        }

        .nav__link {
          float: right;
          height: 100%;
          line-height: 100px;
          padding: 0 1rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: var(--font-medium, 500);
          font-size: 15px;
          position: relative;
          transition: 0.3s ease;
        }

        .nav__link:hover,
        .nav__link.active-link {
          color: var(--skin-color, #3482ff);
        }

        .nav__link.active-link::after,
        .nav__link:hover::after {
          position: absolute;
          content: "";
          width: 6px;
          height: 6px;
          background-color: var(--skin-color, #3482ff);
          border-radius: 50%;
          bottom: 2rem;
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
          text-align: center;
          cursor: pointer;
          color: var(--text-color, rgb(214, 214, 220));
          transition: all 0.3s ease;
        }

        .btn__share:hover {
          color: var(--skin-color, #3482ff);
          transform: scale(1.15);
        }

        .social__share {
          font-size: 1.6rem;
        }

        .nav__close {
          display: none;
        }

        .mobile-header {
          display: none;
        }

        /* Mobile Sidebar Drawer */
        @media screen and (max-width: 1024px) {
          .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 65px;
            background-color: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(10px);
            padding: 0 1.5rem;
            z-index: 999;
            border-bottom: 1px solid var(--box-color, rgb(22, 22, 29));
          }

          .mobile-logo {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--title-color, rgb(241, 241, 243));
          }

          .nav__toggle {
            width: 38px;
            height: 38px;
            background-color: var(--skin-color, #3482ff);
            color: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            cursor: pointer;
          }

          .sidebar {
            left: -100%;
            width: 260px;
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
          }

          .sidebar.show-sidebar {
            left: 0;
          }

          .nav__menu {
            position: static;
            transform: none;
            width: 100%;
            margin-top: 5.5rem;
          }

          .menu {
            height: auto;
            display: block;
          }

          .nav__list {
            flex-direction: column;
            gap: 0;
            padding: 0 1.5rem;
          }

          .nav__link {
            float: none;
            line-height: normal;
            padding: 1rem 0;
            display: block;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 16px;
          }

          .nav__link.active-link::after,
          .nav__link:hover::after {
            bottom: auto;
            top: 50%;
            right: 0;
            left: auto;
            transform: translateY(-50%);
          }

          .nav__close {
            display: block;
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            font-size: 1.4rem;
            color: var(--title-color, rgb(241, 241, 243));
            background: none;
            cursor: pointer;
          }
        }

        /* Share Modal */
        .share-toast {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
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
          max-width: 360px;
          text-align: center;
        }

        .share-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 16px;
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
        }

        .share-btn.wa { background: #25d366; }
        .share-btn.li { background: #0077b5; }
        .share-btn.cp { background: #374151; }
      `}</style>
    </>
  )
}
