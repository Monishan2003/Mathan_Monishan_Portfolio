"use client"

import React from "react"

export interface CertificationItem {
  id: string | number
  title: string
  issuer: string
  issue_date?: string | null
  description?: string | null
  icon?: string | null
  credential_url?: string | null
}

interface CertificationsProps {
  items?: CertificationItem[]
}

export default function Certifications({ items = [] }: CertificationsProps) {
  const defaultItems: CertificationItem[] = [
    {
      id: 1,
      title: "Introduction to Front-End Development",
      issuer: "Meta (via Coursera)",
      issue_date: "Oct 2024",
      description:
        "Comprehensive training in HTML5, CSS3, JavaScript, React.js, UI/UX principles, and responsive web application design.",
      icon: "fab fa-react",
      credential_url:
        "https://www.coursera.org/account/accomplishments/verify/B9JH54BPHVSO",
    },
    {
      id: 2,
      title: "Diploma of Education in Project Management",
      issuer: "Uki (Yarl IT Hub)",
      issue_date: "2024",
      description:
        "Practical training in modern Agile, Scrum, and Waterfall methodologies, cross-functional team collaboration, and stakeholder communication.",
      icon: "fas fa-tasks",
      credential_url: null,
    },
  ]

  const certList = items.length > 0 ? items : defaultItems

  return (
    <section id="certifications" style={{ background: "transparent" }}>
      <div className="container">
        <h2 className="section-title">
          Certifications
          <span className="section-subtitle">Courses & Credentials</span>
        </h2>

        <div className="certs-grid">
          {certList.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-header">
                <div className="cert-icon-box">
                  <i className={cert.icon || "fas fa-certificate"} />
                </div>
                <div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-issuer">{cert.issuer}</span>
                </div>
              </div>

              {cert.issue_date && (
                <div className="cert-date-row">
                  <span className="cert-date">
                    <i className="far fa-calendar-alt" style={{ marginRight: "6px" }} />
                    {cert.issue_date}
                  </span>
                  <span className="cert-badge">
                    <i className="fas fa-check-circle" style={{ marginRight: "4px" }} />
                    Verified
                  </span>
                </div>
              )}

              {cert.description && (
                <p className="cert-desc">{cert.description}</p>
              )}

              {cert.credential_url && (
                <div className="cert-action">
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ padding: "8px 18px", fontSize: "13.5px", width: "100%", justifyContent: "center" }}
                  >
                    <i className="fas fa-external-link-alt" /> View Credential
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .cert-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 26px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(43, 63, 167, 0.08);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .cert-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(43, 63, 167, 0.16);
          border-color: rgba(43, 63, 167, 0.25);
        }

        .cert-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 14px;
        }

        .cert-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(43, 63, 167, 0.1) 0%, rgba(20, 177, 255, 0.15) 100%);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justifyContent: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .cert-title {
          font-size: 18px;
          color: var(--secondary-color);
          margin: 0 0 4px;
          font-family: var(--font-heading);
          font-weight: 700;
          line-height: 1.3;
        }

        .cert-issuer {
          font-size: 14px;
          color: var(--primary-color);
          font-weight: 600;
        }

        .cert-date-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .cert-date {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .cert-badge {
          font-size: 11.5px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
          background: #e6f9ed;
          color: #10b981;
          display: inline-flex;
          align-items: center;
        }

        .cert-desc {
          font-size: 14px;
          color: #4a5568;
          line-height: 1.6;
          margin: 0 0 16px;
          flex: 1;
        }

        .cert-action {
          margin-top: auto;
        }

        @media (max-width: 600px) {
          .certs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
