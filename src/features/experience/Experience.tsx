"use client"

import React from "react"

export interface ExperienceItem {
  id: string | number
  company: string
  role: string
  employment_type?: string | null
  location?: string | null
  work_mode?: string | null
  company_url?: string | null
  start_date: string
  end_date?: string | null
  is_current: boolean
  description: string
  highlights?: string[] | null
  tech_stack?: string[] | null
  is_founder?: boolean
}

interface ExperienceProps {
  items?: ExperienceItem[]
}

export default function Experience({ items = [] }: ExperienceProps) {
  const defaultExperiences: ExperienceItem[] = [
    {
      id: 1,
      company: "Pynimox",
      role: "Founder & Lead Full-Stack / AI Engineer",
      employment_type: "Founder Venture",
      location: "Remote / Global",
      work_mode: "Global Clients",
      company_url: "https://www.pynimox.com",
      start_date: "2025 – Present",
      is_current: true,
      description:
        "Founded and currently lead Pynimox, an AI automation and full-stack engineering studio serving international clients. Architect and deliver production-ready software systems end-to-end with low-latency LLM agent integrations.",
      highlights: [
        "Architected and deployed custom multi-agent LLM systems and customer support bots with real-time streaming.",
        "Built production web and mobile applications using Next.js, TypeScript, Supabase, and cloud microservices.",
        "Managed end-to-end client discovery, technical scoping, sprint execution, and automated deployment pipelines.",
      ],
      tech_stack: ["Next.js", "TypeScript", "Python", "Supabase", "LLM APIs", "AWS", "Tailwind CSS"],
      is_founder: true,
    },
    {
      id: 2,
      company: "NF Group of Companies",
      role: "Full-Stack Developer",
      employment_type: "Professional Role",
      location: "Hybrid, Sri Lanka",
      work_mode: "Hybrid",
      start_date: "2025 – Present",
      is_current: true,
      description:
        "Develop full-stack web and mobile applications, RESTful APIs, and enterprise modules for retail, plantation, and ERP management systems.",
      highlights: [
        "Built and maintained core web properties: NFPlantation.com, NaturePlantation.lk, NFFarming.lk, and NF Farming App.",
        "Engineered backend RESTful APIs and modules for enterprise POS & ERP systems using ASP.NET Core and SQL Server.",
        "Collaborated in cross-functional Agile sprint teams to enhance UI/UX, database normalization, and release stability.",
      ],
      tech_stack: ["ASP.NET Core", "Next.js", "React.js", "Flutter", "SQL Server", "MongoDB", "AWS"],
      is_founder: false,
    },
    {
      id: 3,
      company: "Yarl IT Hub",
      role: "Project Volunteer (Social Impact)",
      employment_type: "Volunteer",
      location: "Mannar District, Sri Lanka",
      work_mode: "On-site",
      start_date: "Jul 2024 – Oct 2024",
      is_current: false,
      description:
        "Contributed to a community-focused social impact initiative addressing school dropout rates and youth empowerment in Mannar District.",
      highlights: [
        "Assisted in structured project planning, requirement analysis, and documentation using Agile methodologies.",
        "Coordinated with diverse stakeholders, community leaders, and multidisciplinary teams to track progress milestones.",
      ],
      tech_stack: ["Project Management", "Agile / Scrum", "Documentation", "Stakeholder Coordination"],
      is_founder: false,
    },
  ]

  const expList = items.length > 0 ? items : defaultExperiences

  return (
    <section id="experience" className="section-wrapper experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-briefcase" />
            <span>Work & Engineering Experience</span>
          </div>
          <h2 className="section-headline">
            Professional Track Record & Ventures
          </h2>
          <p className="section-subtext">
            Hands-on commercial engineering experience spanning enterprise applications, startup venture leadership at Pynimox, and production software delivery.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="experience-stack">
          {expList.map((exp) => (
            <div
              key={exp.id}
              className={`exp-card ${exp.is_founder ? "founder-highlight" : ""}`}
            >
              {/* Top Header */}
              <div className="exp-top-row">
                <div>
                  <div className="exp-role-row">
                    <h3 className="exp-role-title">{exp.role}</h3>
                    {exp.is_founder && (
                      <span className="founder-badge">
                        <i className="fas fa-crown" style={{ fontSize: "10px" }} />
                        <span>Own Venture</span>
                      </span>
                    )}
                  </div>

                  <div className="exp-company-info">
                    <span className="exp-company-name">{exp.company}</span>
                    <span className="dot-sep">·</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </div>

                <div className="exp-meta-actions">
                  <span className="exp-date-badge">
                    <i className="far fa-calendar-alt" style={{ marginRight: "6px" }} />
                    {exp.start_date}
                  </span>
                  {exp.company_url && (
                    <a
                      href={exp.company_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-visit-btn"
                    >
                      <span>Visit</span>
                      <i className="fas fa-external-link-alt" style={{ fontSize: "10px" }} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="exp-description">{exp.description}</p>

              {/* Key Deliverables */}
              {exp.highlights && exp.highlights.length > 0 && (
                <div className="exp-highlights-box">
                  <div className="highlights-title">Key Deliverables & Responsibilities</div>
                  <ul className="highlights-list">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="highlight-item">
                        <i className="fas fa-check-circle text-blue check-icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Chips */}
              {exp.tech_stack && exp.tech_stack.length > 0 && (
                <div className="exp-tech-row">
                  {exp.tech_stack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .experience-section {
          background: #f8fafc;
        }

        .experience-stack {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 900px;
          margin: 0 auto;
        }

        .exp-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px 36px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .exp-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .exp-card.founder-highlight {
          border-color: #93c5fd;
          box-shadow: 0 8px 30px rgba(37, 99, 235, 0.1);
          background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
        }

        .exp-card.founder-highlight:hover {
          border-color: #3b82f6;
          box-shadow: 0 16px 40px rgba(37, 99, 235, 0.16);
        }

        .exp-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid #f1f5f9;
        }

        .exp-role-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .exp-role-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .founder-badge {
          background: #2563eb;
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
        }

        .exp-company-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
          font-size: 14.5px;
          font-weight: 500;
        }

        .exp-company-name {
          color: #2563eb;
          font-weight: 600;
        }

        .dot-sep {
          color: #cbd5e1;
        }

        .exp-location {
          color: #64748b;
        }

        .exp-meta-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .exp-date-badge {
          font-size: 12.5px;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 6px 12px;
          border-radius: 8px;
          white-space: nowrap;
        }

        .exp-visit-btn {
          font-size: 12.5px;
          font-weight: 600;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.2);
          padding: 6px 12px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .exp-visit-btn:hover {
          background: #2563eb;
          color: #ffffff;
        }

        .exp-description {
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 20px;
        }

        .exp-highlights-box {
          margin-bottom: 22px;
        }

        .highlights-title {
          font-size: 12px;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          line-height: 1.6;
          color: #475569;
        }

        .check-icon {
          font-size: 13px;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .text-blue {
          color: #2563eb;
        }

        .exp-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-top: 18px;
          border-top: 1px solid #f1f5f9;
        }

        .tech-badge-sm {
          font-size: 11.5px;
          font-weight: 600;
          color: #334155;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .exp-card {
            padding: 24px 20px;
          }

          .exp-top-row {
            flex-direction: column;
            gap: 12px;
          }

          .exp-role-title {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  )
}
