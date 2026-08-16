"use client"

import React from "react"
import TypingEffect from "@/components/TypingEffect"

interface HeroProps {
  name?: string
  roles?: string[]
  resumeUrl?: string
}

export default function Hero({
  name = "Mathan Monishan",
  roles = [
    "AI & Full-Stack Engineer",
    "Founder of Pynimox",
    "Mechatronics Engineer",
    "Robotics & Automation Builder",
    "Next.js & C# Developer",
  ],
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: HeroProps) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Editorial Headline & Positioning */}
        <div className="hero-content">
          {/* Availability Pill */}
          <div className="availability-pill">
            <span className="pulse-dot" />
            <span>Open to engineering internships, graduate roles & collaborations</span>
          </div>

          {/* Name */}
          <h1 className="hero-name">{name}</h1>

          {/* Typewriter Subtitle */}
          <div className="hero-roles">
            <span>AI & Full-Stack Engineer</span>
            <span className="divider">|</span>
            <span className="typewriter-text">
              <TypingEffect strings={roles} typeSpeed={70} backSpeed={45} loop={true} />
            </span>
          </div>

          {/* Tagline / Positioning */}
          <div className="hero-tagline">
            &ldquo;Building intelligent software systems today and engineering intelligent physical systems for tomorrow.&rdquo;
          </div>

          {/* Narrative Summary */}
          <p className="hero-bio">
            I design and build production-ready full-stack applications, AI-powered systems, and automation solutions while pursuing my dual specialization in Mechatronics at Uva Wellassa University and IT at University of Moratuwa. Founder & Lead Engineer at <strong>Pynimox</strong>.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#work" className="btn-primary">
              <span>Explore Selected Work</span>
              <i className="fas fa-arrow-down" style={{ fontSize: "12px" }} />
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="fas fa-file-pdf" style={{ color: "#ef4444" }} />
              <span>Download CV</span>
            </a>
          </div>

          {/* Core Focus Chips */}
          <div className="hero-focus-row">
            <span className="focus-label">Core Focus:</span>
            <div className="focus-chips">
              <span className="focus-chip">AI / LLM APIs</span>
              <span className="focus-chip">Next.js & React</span>
              <span className="focus-chip">C# & .NET Core</span>
              <span className="focus-chip">Supabase & Postgres</span>
              <span className="focus-chip">Mechatronics & Robotics</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech Technical Portrait Card */}
        <div className="hero-visual">
          <div className="portrait-card">
            <div className="portrait-image-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/monishan.jpeg"
                alt="Mathan Monishan - AI & Mechatronics Engineer"
                className="portrait-img"
              />
              <div className="portrait-overlay">
                <span className="portrait-name">Mathan Monishan</span>
                <span className="portrait-title">Founder @ Pynimox · Mechatronics & AI</span>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="metrics-grid">
              <div className="metric-box">
                <div className="metric-val">Founder</div>
                <div className="metric-lbl">Pynimox AI</div>
              </div>
              <div className="metric-box">
                <div className="metric-val" style={{ color: "#2563eb" }}>6+</div>
                <div className="metric-lbl">Production Apps</div>
              </div>
              <div className="metric-box">
                <div className="metric-val" style={{ color: "#10b981" }}>Dual Deg.</div>
                <div className="metric-lbl">Tech & IT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 130px 0 80px;
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .availability-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12.5px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .hero-name {
          font-size: 58px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .hero-roles {
          font-size: 24px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .divider {
          color: #cbd5e1;
        }

        .typewriter-text {
          color: #2563eb;
        }

        .hero-tagline {
          font-size: 18px;
          font-weight: 500;
          color: #334155;
          font-style: italic;
          padding-left: 16px;
          border-left: 3px solid #2563eb;
          margin-bottom: 18px;
          line-height: 1.5;
        }

        .hero-bio {
          font-size: 16px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 30px;
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
        }

        .hero-focus-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .focus-label {
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
        }

        .focus-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .focus-chip {
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
        }

        /* Right Visual Portrait Card */
        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .portrait-card {
          width: 100%;
          max-width: 380px;
          background: #ffffff;
          border-radius: 24px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 40px -15px rgba(37, 99, 235, 0.15);
          position: relative;
        }

        .portrait-image-wrapper {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: #f8fafc;
          aspect-ratio: 4 / 5;
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .portrait-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.85) 100%);
          padding: 20px 16px 14px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .portrait-name {
          font-size: 17px;
          font-weight: 700;
          line-height: 1.2;
        }

        .portrait-title {
          font-size: 12px;
          color: #93c5fd;
          font-weight: 500;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 12px;
        }

        .metric-box {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 10px 4px;
          text-align: center;
        }

        .metric-val {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }

        .metric-lbl {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-name {
            font-size: 44px;
          }

          .hero-roles {
            font-size: 20px;
          }

          .hero-visual {
            justify-content: flex-start;
          }

          .portrait-card {
            max-width: 320px;
          }
        }

        @media (max-width: 600px) {
          .hero-section {
            padding: 100px 0 50px;
          }

          .hero-name {
            font-size: 36px;
          }

          .hero-roles {
            font-size: 17px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .hero-actions :global(a) {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
