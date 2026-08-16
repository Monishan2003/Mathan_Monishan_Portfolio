"use client"

import React from "react"

export default function HowIBuild() {
  const pillars = [
    {
      step: "01",
      title: "Discover & Frame",
      subtitle: "Understand the real problem",
      description:
        "Deep-dive into domain requirements, user bottlenecks, and technical constraints before writing code. Define clear functional boundaries and data models.",
      icon: "fas fa-search",
      points: ["Requirement modeling", "Data flow analysis", "Scope & feasibility"],
    },
    {
      step: "02",
      title: "Architect & Design",
      subtitle: "Scalable architecture & UX",
      description:
        "Design normalized database schemas, type-safe API contracts, and clean component hierarchies. Plan for high throughput, security, and effortless user interactions.",
      icon: "fas fa-drafting-compass",
      points: ["Relational & vector schemas", "REST / GraphQL APIs", "Ergonomic UI interfaces"],
    },
    {
      step: "03",
      title: "Build & Automate",
      subtitle: "Robust, production-grade code",
      description:
        "Implement solutions using modern frameworks (Next.js, TypeScript, C#, Python) and integrate intelligent AI agent pipelines with low-latency streaming.",
      icon: "fas fa-code",
      points: ["Type-safe development", "LLM API pipelines", "Automated testing"],
    },
    {
      step: "04",
      title: "Ship & Scale",
      subtitle: "Continuous delivery & telemetry",
      description:
        "Deploy to resilient cloud infrastructure (AWS, Vercel, Supabase) with automated CI/CD workflows, real-time logging, security headers, and sub-second performance.",
      icon: "fas fa-rocket",
      points: ["Automated CI/CD deployment", "Telemetry & performance", "Iterative enhancements"],
    },
  ]

  return (
    <section id="approach" className="section-wrapper approach-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-microchip" />
            <span>Engineering Discipline</span>
          </div>
          <h2 className="section-headline">
            How I Build Systems
          </h2>
          <p className="section-subtext">
            A disciplined, four-phase engineering methodology focused on translating complex business and physical requirements into scalable, maintainable production software.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.step} className="pillar-card">
              <div>
                {/* Step & Icon */}
                <div className="pillar-header">
                  <span className="pillar-step">{pillar.step}</span>
                  <div className="pillar-icon-box">
                    <i className={pillar.icon} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="pillar-title">{pillar.title}</h3>
                <div className="pillar-subtitle">{pillar.subtitle}</div>

                {/* Description */}
                <p className="pillar-desc">{pillar.description}</p>
              </div>

              {/* Bullet Points */}
              <div className="pillar-points">
                {pillar.points.map((pt, pIdx) => (
                  <div key={pIdx} className="point-item">
                    <span className="point-bullet" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .approach-section {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .pillar-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .pillar-card:hover {
          background: #ffffff;
          border-color: #93c5fd;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.08);
          transform: translateY(-4px);
        }

        .pillar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .pillar-step {
          font-size: 32px;
          font-weight: 800;
          color: #cbd5e1;
          font-family: monospace;
          line-height: 1;
        }

        .pillar-card:hover .pillar-step {
          color: #2563eb;
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          transition: all 0.25s ease;
        }

        .pillar-card:hover .pillar-icon-box {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .pillar-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .pillar-subtitle {
          font-size: 12.5px;
          font-weight: 600;
          color: #2563eb;
          margin-bottom: 14px;
        }

        .pillar-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 20px;
        }

        .pillar-points {
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .point-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #475569;
        }

        .point-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563eb;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .pillars-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
