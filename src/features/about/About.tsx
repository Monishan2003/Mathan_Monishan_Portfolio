"use client"

import React from "react"

interface AboutProps {
  avatarUrl?: string
  roles?: string[]
  bioShort?: string
  bioLong?: string
  resumeUrl?: string
}

export default function About({
  avatarUrl = "/monishan.jpeg",
  resumeUrl = "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
}: AboutProps) {
  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-user" />
            <span>Background & Journey</span>
          </div>
          <h2 className="section-headline">
            About Mathan Monishan
          </h2>
          <p className="section-subtext">
            Bridging software intelligence and physical computing through rigorous dual-degree engineering studies, startup venture leadership, and production software craftsmanship.
          </p>
        </div>

        {/* 2-Column Content */}
        <div className="about-grid">
          {/* Left Column: Portrait Card */}
          <div className="about-portrait-wrapper">
            <div className="about-portrait-card">
              <div className="about-image-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt="Mathan Monishan Portrait"
                  className="about-img"
                />
              </div>

              <div className="about-card-details">
                <h3 className="about-card-name">Mathan Monishan</h3>
                <p className="about-card-role">AI & Full-Stack Engineer | Mechatronics</p>
                <div className="about-location-badge">
                  <i className="fas fa-map-marker-alt" />
                  <span>Thalaimannar, Mannar, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="about-narrative">
            <div className="story-card">
              <h3 className="story-title">
                Driven by Rigor across Digital & Physical Engineering
              </h3>

              <p className="story-p">
                I am an engineer with a deep passion for building intelligent systems. Currently, I am pursuing my <strong>BSc (Hons) in Science & Technology, specializing in Mechatronics</strong> at Uva Wellassa University of Sri Lanka, alongside a <strong>Bachelor of Information Technology (External)</strong> at the University of Moratuwa.
              </p>

              <p className="story-p">
                As the <strong>Founder & Lead Engineer of Pynimox</strong>, I architect AI automation pipelines and full-stack cloud applications for international clients. Concurrently, as a <strong>Full-Stack Developer at NF Group of Companies</strong>, I build high-availability ERP modules, POS systems, and responsive web applications using Next.js, C#, and ASP.NET Core.
              </p>

              <p className="story-p">
                My ultimate mission is to bridge the software-hardware boundary: combining modern AI architectures (LLMs, multi-agent frameworks, computer vision) with mechatronics (embedded microcontrollers, actuators, and sensor networks) to build the next generation of autonomous and intelligent systems.
              </p>

              {/* 3 Pillars Summary */}
              <div className="about-pillars-grid">
                <div className="about-pillar-box">
                  <i className="fas fa-brain text-blue pillar-icon" />
                  <div className="pillar-info">
                    <div className="pillar-heading">AI & LLM Integration</div>
                    <div className="pillar-sub">Production agents & streaming workflows</div>
                  </div>
                </div>

                <div className="about-pillar-box">
                  <i className="fas fa-laptop-code text-blue pillar-icon" />
                  <div className="pillar-info">
                    <div className="pillar-heading">Full-Stack Architecture</div>
                    <div className="pillar-sub">Next.js, TypeScript, C#, PostgreSQL</div>
                  </div>
                </div>

                <div className="about-pillar-box">
                  <i className="fas fa-microchip text-blue pillar-icon" />
                  <div className="pillar-info">
                    <div className="pillar-heading">Mechatronics & Robotics</div>
                    <div className="pillar-sub">Physical computing, sensors & control</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="story-action-row">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <i className="fas fa-file-pdf" />
                  <span>Download Curriculum Vitae (CV)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background: #f8fafc;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.2fr;
          gap: 48px;
          align-items: start;
        }

        .about-portrait-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .about-image-container {
          border-radius: 16px;
          overflow: hidden;
          background: #f1f5f9;
          aspect-ratio: 4 / 5;
        }

        .about-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .about-card-details {
          padding: 16px 8px 6px;
          text-align: center;
        }

        .about-card-name {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .about-card-role {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          margin-bottom: 12px;
        }

        .about-location-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 4px 12px;
          border-radius: 100px;
        }

        .story-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .story-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
          line-height: 1.3;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .story-p {
          font-size: 15px;
          line-height: 1.8;
          color: #475569;
          margin-bottom: 16px;
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin: 24px 0 28px;
        }

        .about-pillar-box {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px 18px;
          border-radius: 12px;
        }

        .pillar-icon {
          font-size: 20px;
          color: #2563eb;
          flex-shrink: 0;
        }

        .pillar-heading {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .pillar-sub {
          font-size: 12px;
          color: #64748b;
        }

        .story-action-row {
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
          }

          .about-portrait-wrapper {
            max-width: 320px;
          }

          .story-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  )
}
