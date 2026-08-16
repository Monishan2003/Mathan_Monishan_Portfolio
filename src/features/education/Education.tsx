"use client"

import React from "react"

export interface EducationItem {
  id: string | number
  title: string
  institution: string
  year: string
  status: "present" | "completed"
  description: string
  icon?: string | null
}

interface EducationProps {
  items?: EducationItem[]
}

export default function Education({ items = [] }: EducationProps) {
  const defaultItems: EducationItem[] = [
    {
      id: 1,
      title: "BSc (Hons) in Science & Technology",
      institution: "Uva Wellassa University of Sri Lanka",
      year: "2024 – Present",
      status: "present",
      description:
        "Currently pursuing a comprehensive degree program specializing in Mechatronics, automation, robotics, computational science, and emerging engineering technologies.",
      icon: "fas fa-robot",
    },
    {
      id: 2,
      title: "Bachelor of Information Technology (External Degree)",
      institution: "University of Moratuwa",
      year: "2025 – Present",
      status: "present",
      description:
        "External degree program focusing on software engineering principles, database architecture, network systems, and enterprise application development.",
      icon: "fas fa-laptop-code",
    },
    {
      id: 3,
      title: "G.C.E. A/L - Physical Science",
      institution: "Mn/Thalaimannar Pier G.T.M.S",
      year: "2009 – 2022",
      status: "completed",
      description:
        "Completed secondary education with specialization in Physical Science (Combined Mathematics, Physics, and Chemistry).",
      icon: "fas fa-graduation-cap",
    },
  ]

  const educationList = items.length > 0 ? items : defaultItems

  return (
    <section id="education" style={{ background: "transparent" }}>
      <div className="container">
        <h2 className="section-title">
          My Education
          <span className="section-subtitle">Academic Background</span>
        </h2>

        <div className="timeline-container">
          <div className="timeline-line" />

          {educationList.map((item, index) => {
            const isLeft = index % 2 === 0
            const isInProgress = item.status === "present"

            return (
              <div
                key={item.id}
                className={`timeline-item ${isLeft ? "left" : "right"}`}
              >
                <div className="timeline-dot">
                  <i className={item.icon || "fas fa-university"} />
                </div>
                <div className="timeline-card">
                  <h4 className="timeline-title">{item.title}</h4>
                  <div className="timeline-institution">
                    <i className={item.icon || "fas fa-university"} />
                    <span>{item.institution}</span>
                  </div>
                  <div className="timeline-year-row">
                    <span className="timeline-year">{item.year}</span>
                    <span className={`status-badge ${isInProgress ? "in-progress" : "completed"}`}>
                      <i
                        className={`fas ${isInProgress ? "fa-spinner fa-spin" : "fa-check-circle"}`}
                        style={{ fontSize: "11px" }}
                      />
                      {isInProgress ? "In Progress" : "Completed"}
                    </span>
                  </div>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .timeline-line {
          position: absolute;
          width: 4px;
          background: linear-gradient(180deg, var(--primary-color) 0%, var(--accent-color) 100%);
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          box-sizing: border-box;
          margin-bottom: 25px;
        }

        .timeline-item.left {
          left: 0;
          text-align: right;
        }

        .timeline-item.right {
          left: 50%;
          text-align: left;
        }

        .timeline-dot {
          position: absolute;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--primary-color);
          border: 4px solid #ffffff;
          box-shadow: 0 0 10px rgba(43, 63, 167, 0.4);
          top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 16px;
          z-index: 2;
        }

        .timeline-item.left .timeline-dot {
          right: -21px;
        }

        .timeline-item.right .timeline-dot {
          left: -21px;
        }

        .timeline-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 14px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(43, 63, 167, 0.08);
          transition: all 0.3s ease;
          text-align: left;
        }

        .timeline-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(43, 63, 167, 0.14);
          border-color: rgba(43, 63, 167, 0.25);
        }

        .timeline-title {
          font-size: 19px;
          color: var(--secondary-color);
          margin-bottom: 6px;
          font-family: var(--font-heading);
          font-weight: 700;
        }

        .timeline-institution {
          font-size: 15px;
          color: var(--primary-color);
          font-weight: 600;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .timeline-year-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .timeline-year {
          font-size: 13px;
          color: #718096;
          font-weight: 500;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .status-badge.in-progress {
          background: rgba(20, 177, 255, 0.12);
          color: #0077b6;
        }

        .status-badge.completed {
          background: rgba(40, 167, 69, 0.12);
          color: #28a745;
        }

        .timeline-desc {
          font-size: 14.5px;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 30px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 15px;
          }

          .timeline-item.left,
          .timeline-item.right {
            left: 0;
            text-align: left;
          }

          .timeline-item.left .timeline-dot,
          .timeline-item.right .timeline-dot {
            left: 9px;
            right: auto;
          }
        }
      `}</style>
    </section>
  )
}
