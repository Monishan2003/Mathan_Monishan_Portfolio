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
  logo_url?: string | null
  icon?: string | null
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
  if (!items || items.length === 0) {
    return null
  }

  const expList = items

  return (
    <section className="experience section" id="experience">
      <h2 className="section__title" data-heading="Track Record">
        Experience & Ventures
      </h2>

      <div className="experience__container container">
        <div className="experience__timeline">
          {expList.map((exp) => (
            <div
              key={exp.id}
              className={`experience__card ${exp.is_founder ? "founder-card" : ""}`}
            >
              {/* Timeline Dot */}
              <div className="timeline__dot" />

              {/* Card Header */}
              <div className="experience__header">
                <div className="company__brand-wrap">
                  {exp.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={exp.logo_url} alt={exp.company} className="experience__company-logo" />
                  ) : exp.icon ? (
                    <div className="experience__icon-box">
                      <i className={exp.icon} />
                    </div>
                  ) : null}
                  <div>
                    <div className="role__row">
                      <h3 className="experience__role">{exp.role}</h3>
                      {exp.is_founder && (
                        <span className="founder__badge">
                          <i className="fas fa-crown" /> Own Venture
                        </span>
                      )}
                    </div>
                    <div className="company__row">
                      <span className="company__name">{exp.company}</span>
                      <span className="bullet-sep">•</span>
                      <span className="company__loc">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="date__actions">
                  <span className="experience__date">
                    <i className="far fa-calendar-alt" /> {exp.start_date}
                  </span>
                  {exp.company_url && (
                    <a
                      href={exp.company_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visit__link"
                    >
                      <span>Visit</span>
                      <i className="fas fa-external-link-alt" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="experience__desc">{exp.description}</p>

              {/* Highlights */}
              {exp.highlights && (
                <ul className="experience__highlights">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="highlight__item">
                      <i className="fas fa-check-circle check-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack */}
              {exp.tech_stack && (
                <div className="experience__tech">
                  {exp.tech_stack.map((t, tIdx) => (
                    <span key={tIdx} className="tech__chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .experience__container {
          max-width: 900px;
        }

        .experience__timeline {
          position: relative;
          border-left: 2px solid rgba(255, 255, 255, 0.08);
          padding-left: 2.2rem;
          margin-left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .experience__card {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1rem;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
        }

        .experience__card:hover {
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--box-border-hover);
          transform: translateX(6px);
        }

        .experience__card.founder-card {
          border-color: rgba(52, 130, 255, 0.4);
          background: linear-gradient(180deg, rgb(22, 22, 29) 0%, rgba(27, 123, 226, 0.08) 100%);
        }

        .timeline__dot {
          position: absolute;
          left: -2.85rem;
          top: 2rem;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: var(--skin-color, #3482ff);
          border: 3px solid var(--body-color, rgb(10, 10, 15));
          box-shadow: 0 0 10px var(--skin-color, #3482ff);
        }

        .experience__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .company__brand-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .experience__company-logo {
          width: 44px;
          height: 44px;
          object-fit: contain;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px;
          border: 1px solid var(--box-border);
          flex-shrink: 0;
        }

        .experience__icon-box {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(52, 130, 255, 0.1);
          color: var(--skin-color, #3482ff);
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .role__row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .experience__role {
          font-size: 1.15rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: 600;
        }

        .founder__badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          background-color: var(--skin-color, #3482ff);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .company__row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.35rem;
          font-size: 0.9rem;
        }

        .company__name {
          color: var(--skin-color, #3482ff);
          font-weight: 500;
        }

        .bullet-sep {
          color: var(--text-muted);
        }

        .company__loc {
          color: var(--text-muted);
        }

        .date__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .experience__date {
          font-size: 0.82rem;
          color: var(--text-muted);
          background-color: rgba(255, 255, 255, 0.04);
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .visit__link {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--skin-color, #3482ff);
          background-color: rgba(52, 130, 255, 0.1);
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
          border: 1px solid rgba(52, 130, 255, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }

        .visit__link:hover {
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
        }

        .experience__desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 1.2rem;
        }

        .experience__highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.4rem;
        }

        .highlight__item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--text-color, rgb(214, 214, 220));
          line-height: 1.6;
        }

        .check-icon {
          color: var(--skin-color, #3482ff);
          font-size: 0.85rem;
          margin-top: 0.3rem;
          flex-shrink: 0;
        }

        .experience__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech__chip {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--title-color, rgb(241, 241, 243));
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.7rem;
          border-radius: 0.35rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        @media screen and (max-width: 768px) {
          .experience__timeline {
            padding-left: 1.5rem;
            margin-left: 0.5rem;
          }

          .timeline__dot {
            left: -2.15rem;
          }

          .experience__header {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  )
}
