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
    { label: "Work & Projects", href: "#work" },
    { label: "Experience & Ventures", href: "#experience" },
    { label: "How I Build", href: "#approach" },
    { label: "Vlog & Logs", href: "#vlog" },
    { label: "Skills & Stack", href: "#skills" },
    { label: "About Me", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <div className="footer-brand-badge">M</div>
              <span className="footer-brand-name">Mathan Monishan</span>
            </div>
            <p className="footer-tagline">
              AI & Full-Stack Engineer specializing in Mechatronics. Building production software systems today and engineering intelligent physical systems for tomorrow. Founder @ Pynimox.
            </p>
            <div className="footer-location">
              <i className="fas fa-map-marker-alt" style={{ color: "#60a5fa" }} />
              <span>Thalaimannar, Mannar, Sri Lanka · Global Collaborations</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Navigation</h4>
            <div className="footer-nav-grid">
              {navLinks.map((link, idx) => (
                <a key={idx} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="footer-connect-col">
            <h4 className="footer-heading">Connect & Socials</h4>
            <div className="footer-social-icons">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social-btn"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>

            <div className="footer-admin-box">
              <Link href="/login" className="footer-admin-link">
                <i className="fas fa-lock" style={{ fontSize: "11px" }} />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>© {currentYear} Mathan Monishan. All rights reserved.</div>
          <div className="footer-built-with">
            <span>Engineered with Next.js 15 & Supabase</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: #0f172a;
          color: #ffffff;
          padding: 80px 0 40px;
          border-top: 1px solid #1e293b;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 1.2fr 0.9fr;
          gap: 48px;
          padding-bottom: 50px;
          border-bottom: 1px solid #1e293b;
        }

        .footer-brand-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .footer-brand-badge {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #2563eb;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
        }

        .footer-brand-name {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-tagline {
          font-size: 14px;
          line-height: 1.7;
          color: #94a3b8;
          margin-bottom: 18px;
          max-width: 440px;
        }

        .footer-location {
          font-size: 12.5px;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-heading {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #cbd5e1;
          margin-bottom: 20px;
        }

        .footer-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
        }

        .footer-link {
          font-size: 13.5px;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #ffffff;
        }

        .footer-social-icons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #1e293b;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-social-btn:hover {
          background: #2563eb;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .footer-admin-link {
          font-size: 12.5px;
          color: #64748b;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .footer-admin-link:hover {
          color: #94a3b8;
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          font-size: 13px;
          color: #64748b;
          flex-wrap: wrap;
          gap: 12px;
        }

        @media (max-width: 992px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
          }

          .footer-brand-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .footer-brand-col {
            grid-column: span 1;
          }

          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  )
}
