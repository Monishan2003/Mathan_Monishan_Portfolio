"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mathan-monishan2003", icon: "fab fa-linkedin-in" },
    { label: "GitHub", href: "https://github.com/Monishan2003", icon: "fab fa-github" },
    { label: "Twitter / X", href: "https://x.com/Monishan2003", icon: "fab fa-twitter" },
    { label: "WhatsApp", href: "https://wa.me/94767634359", icon: "fab fa-whatsapp" },
    { label: "Email", href: "mailto:mathanmonishan@gmail.com", icon: "fas fa-envelope" },
  ]

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "How I Build", href: "#approach" },
    { label: "Vlog & Logs", href: "#vlog" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Positioning */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                M
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Mathan Monishan
              </h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              AI & Full-Stack Engineer specializing in Mechatronics. Building production software systems today and engineering intelligent physical systems for tomorrow. Founder @ Pynimox.
            </p>

            <div className="text-xs text-slate-400">
              📍 Thalaimannar, Mannar, Sri Lanka · Global Collaborations
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Connect & Follow
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center text-sm transition-all shadow-xs"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} Mathan Monishan. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Engineered with Next.js 15 & Supabase</span>
            <Link href="/login" className="text-slate-400 hover:text-slate-200">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
