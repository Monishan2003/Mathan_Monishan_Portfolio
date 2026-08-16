"use client"

import React from "react"

export interface EducationItem {
  id: string | number
  title: string
  institution: string
  year: string
  status?: "present" | "completed"
  description: string
  icon?: string
}

interface EducationProps {
  items?: EducationItem[]
}

export default function Education({ items = [] }: EducationProps) {
  const defaultEducation: EducationItem[] = [
    {
      id: 1,
      title: "BSc (Hons) in Science & Technology (Mechatronics Specialization)",
      institution: "Uva Wellassa University of Sri Lanka",
      year: "2023 – Present",
      status: "present",
      description:
        "Specializing in Mechatronics Engineering, Robotics, Control Systems, Microcontroller Interfacing, and Automation.",
      icon: "fas fa-robot",
    },
    {
      id: 2,
      title: "Bachelor of Information Technology (BIT - External)",
      institution: "University of Moratuwa",
      year: "2024 – Present",
      status: "present",
      description:
        "Advanced software engineering curriculum covering Object-Oriented Analysis, Relational Databases, Web Technologies, and Data Structures.",
      icon: "fas fa-laptop-code",
    },
    {
      id: 3,
      title: "G.C.E. Advanced Level (Physical Science)",
      institution: "Mn/St. Anne's Central College",
      year: "2022",
      status: "completed",
      description:
        "Rigorous foundation in Combined Mathematics, Physics, and Chemistry leading to competitive university entrance.",
      icon: "fas fa-graduation-cap",
    },
  ]

  const eduList = items.length > 0 ? items : defaultEducation

  return (
    <section id="education" className="section-wrapper education-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-graduation-cap" />
            <span>Academic Background</span>
          </div>
          <h2 className="section-headline">
            Education & Degrees
          </h2>
          <p className="section-subtext">
            Formal dual-degree university engineering studies spanning Mechatronics and Information Technology.
          </p>
        </div>

        {/* 3-Column Education Grid */}
        <div className="education-grid">
          {eduList.map((item) => {
            const isPresent = item.status === "present" || item.year.toLowerCase().includes("present")
            return (
              <div key={item.id} className="edu-card">
                <div>
                  {/* Top Meta */}
                  <div className="edu-card-top">
                    <div className="edu-icon-box">
                      <i className={item.icon || "fas fa-university"} />
                    </div>
                    <span className={`edu-status-badge ${isPresent ? "present" : "completed"}`}>
                      {isPresent ? "Present / In Progress" : "Completed"}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="edu-title">{item.title}</h3>

                  {/* Institution */}
                  <div className="edu-institution">
                    <i className="fas fa-university" style={{ fontSize: "11px" }} />
                    <span>{item.institution}</span>
                  </div>

                  {/* Description */}
                  <p className="edu-desc">{item.description}</p>
                </div>

                {/* Timeline Footer */}
                <div className="edu-card-footer">
                  <span className="edu-year">
                    <i className="far fa-calendar-alt" style={{ marginRight: "6px" }} />
                    {item.year}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .education-section {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }

        .education-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .edu-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .edu-card:hover {
          background: #ffffff;
          border-color: #93c5fd;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.08);
          transform: translateY(-3px);
        }

        .edu-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .edu-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .edu-status-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .edu-status-badge.present {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .edu-status-badge.completed {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        .edu-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 8px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .edu-institution {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        .edu-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 20px;
        }

        .edu-card-footer {
          padding-top: 14px;
          border-top: 1px solid #e2e8f0;
        }

        .edu-year {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        @media (max-width: 992px) {
          .education-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .education-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
