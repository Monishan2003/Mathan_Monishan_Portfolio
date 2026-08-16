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

      const sections = ["home", "work", "experience", "approach", "vlog", "about", "education", "contact"]
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
    { label: "About", href: "#about", id: "about" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand */}
        <Link href="#home" className="flex items-center gap-2.5 text-decoration-none group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-[16px] leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
              {name}
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
              AI & Mechatronics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-[14px] font-medium transition-colors duration-200 ${
                  isActive ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-[13.5px] font-medium px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow"
          >
            <i className="fas fa-file-alt text-[12px] text-blue-400" />
            <span>Download CV</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-6 py-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[15px] py-1.5 font-medium ${
                  activeSection === link.id ? "text-blue-600 font-semibold" : "text-slate-700"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm"
              >
                <i className="fas fa-file-download" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
