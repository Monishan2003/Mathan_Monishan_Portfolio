"use client"

import React from "react"

export interface CertificationItem {
  id: string | number
  title: string
  issuer: string
  issue_date?: string
  credential_url?: string | null
  description?: string | null
  icon?: string | null
}

interface CertificationsProps {
  items?: CertificationItem[]
}

export default function Certifications({ items = [] }: CertificationsProps) {
  const defaultCerts: CertificationItem[] = [
    {
      id: 1,
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta & Coursera",
      issue_date: "Verified Professional Credential",
      description: "Comprehensive 9-course specialization covering React.js, Advanced JS, UI/UX Design, Version Control, and Front-End Capstone project.",
      credential_url: "https://coursera.org/verify/professional-cert/5R8M460E7EFP",
      icon: "fab fa-react",
    },
    {
      id: 2,
      title: "Project Management Foundations & Agile Delivery",
      issuer: "Uki & Vocational Institute",
      issue_date: "2024",
      description: "Structured certification in project scoping, Agile/Scrum sprint cycles, risk management, and stakeholder alignment.",
      icon: "fas fa-tasks",
    },
    {
      id: 3,
      title: "Python for Data Science & Systems Programming",
      issuer: "Uki Tech Institute",
      issue_date: "2024",
      description: "Hands-on certification in Python object-oriented programming, data structures, automation scripts, and REST APIs.",
      icon: "fab fa-python",
    },
    {
      id: 4,
      title: "Artificial Intelligence & Machine Learning Specialization",
      issuer: "NoviTech R&D Pvt Ltd",
      issue_date: "2024",
      description: "Intensive training on neural network foundations, computer vision fundamentals, and intelligent algorithms.",
      icon: "fas fa-brain",
    },
  ]

  const certList = items.length > 0 ? items : defaultCerts

  return (
    <section id="certifications" className="section-wrapper certs-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-certificate" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-headline">
            Verified Certifications
          </h2>
          <p className="section-subtext">
            Industry credentials and specialized training validating engineering proficiency across software architecture, project management, and AI.
          </p>
        </div>

        {/* 2-Column / 4-Grid Certifications */}
        <div className="certs-grid">
          {certList.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div>
                {/* Top Meta */}
                <div className="cert-top-row">
                  <div className="cert-icon-box">
                    <i className={cert.icon || "fas fa-certificate"} />
                  </div>
                  <span className="cert-verified-badge">
                    <i className="fas fa-check-circle" style={{ fontSize: "10px" }} />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-issuer">
                  <i className="fas fa-award" style={{ fontSize: "11px" }} />
                  <span>{cert.issuer}</span>
                </div>

                {/* Description */}
                {cert.description && (
                  <p className="cert-desc">{cert.description}</p>
                )}
              </div>

              {/* Bottom Action / Meta */}
              <div className="cert-bottom-row">
                <span className="cert-date">{cert.issue_date || "Certified"}</span>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                  >
                    <span>Verify Credential</span>
                    <i className="fas fa-external-link-alt" style={{ fontSize: "10px" }} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .certs-section {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .certs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .cert-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .cert-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.08);
          transform: translateY(-3px);
        }

        .cert-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .cert-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
        }

        .cert-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 700;
          color: #065f46;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 3px 10px;
          border-radius: 100px;
        }

        .cert-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.35;
          margin-bottom: 6px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .cert-issuer {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .cert-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 20px;
        }

        .cert-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .cert-date {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
        }

        .cert-verify-link {
          font-size: 12.5px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .cert-verify-link:hover {
          color: #1d4ed8;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .certs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
