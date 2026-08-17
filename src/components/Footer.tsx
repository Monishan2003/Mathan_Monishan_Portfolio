"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Mathan Monishan</h1>
        <p className="footer__subtitle">AI & Full-Stack Engineer | Mechatronics</p>

        {/* Footer Navigation Links */}
        <ul className="footer__links">
          <li>
            <a href="#about" className="footer__link">About</a>
          </li>
          <li>
            <a href="#skills" className="footer__link">Skills</a>
          </li>
          <li>
            <a href="#experience" className="footer__link">Experience</a>
          </li>
          <li>
            <a href="#work" className="footer__link">Projects</a>
          </li>
          <li>
            <a href="#services" className="footer__link">Services</a>
          </li>
          <li>
            <a href="#contact" className="footer__link">Contact</a>
          </li>
        </ul>

        {/* Social Links */}
        <div className="footer__socials">
          <a
            href="https://github.com/Monishan2003"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="GitHub Profile"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/mathan-monishan2003"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn Profile"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://x.com/Monishan2003"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Twitter X Profile"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            href="https://wa.me/94767634359"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="WhatsApp Message"
          >
            <i className="fab fa-whatsapp" />
          </a>
        </div>

        {/* Bottom Copy */}
        <div className="footer__bottom">
          <span className="footer__copy">
            &#169; {currentYear} Mathan Monishan. All rights reserved.
          </span>
          <Link href="/login" className="footer__admin-link">
            Admin Portal
          </Link>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--box-color, rgb(22, 22, 29));
          padding-top: 4rem;
          padding-bottom: 2.5rem;
          border-top: 1px solid var(--box-border);
        }

        .footer__container {
          text-align: center;
        }

        .footer__title {
          font-size: var(--h1-font-size, 2.25rem);
          margin-bottom: 0.25rem;
          color: var(--title-color, rgb(241, 241, 243));
        }

        .footer__subtitle {
          font-size: var(--small-font-size, 0.875rem);
          color: var(--skin-color, #3482ff);
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .footer__links {
          display: flex;
          justify-content: center;
          column-gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          row-gap: 0.75rem;
        }

        .footer__link {
          color: var(--text-color, rgb(214, 214, 220));
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .footer__link:hover {
          color: var(--skin-color, #3482ff);
        }

        .footer__socials {
          display: flex;
          justify-content: center;
          column-gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .footer__social-link {
          background-color: var(--body-color, rgb(10, 10, 15));
          color: var(--title-color, rgb(241, 241, 243));
          padding: 0.65rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 1.15rem;
          display: inline-flex;
          border: 1px solid var(--box-border);
          transition: all 0.3s ease;
        }

        .footer__social-link:hover {
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.4);
        }

        .footer__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: var(--smaller-font-size, 0.813rem);
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .footer__admin-link {
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .footer__admin-link:hover {
          color: var(--skin-color, #3482ff);
        }

        @media screen and (max-width: 600px) {
          .footer__bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
