"use client"

import React, { useState } from "react"

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
  const [activeTab, setActiveTab] = useState<"education" | "certifications">("education")

  const defaultEducation: EducationItem[] = [
    {
      id: 1,
      title: "BSc (Hons) in Science & Technology (Mechatronics)",
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

  const certifications = [
    {
      id: 1,
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta & Coursera",
      date: "Verified Professional Credential",
      link: "https://coursera.org/verify/professional-cert/5R8M460E7EFP",
      icon: "fab fa-react",
      desc: "9-course specialization covering React, Advanced JS, UI/UX, and Front-End Capstone.",
    },
    {
      id: 2,
      title: "Project Management Foundations & Agile Delivery",
      issuer: "Uki & Vocational Institute",
      date: "2024",
      icon: "fas fa-tasks",
      desc: "Structured certification in project scoping, Scrum sprint cycles, and risk management.",
    },
    {
      id: 3,
      title: "Python for Data Science & Systems Programming",
      issuer: "Uki Tech Institute",
      date: "2024",
      icon: "fab fa-python",
      desc: "Certification in Python OOP, automation scripts, and REST APIs.",
    },
    {
      id: 4,
      title: "Artificial Intelligence & Machine Learning Specialization",
      issuer: "NoviTech R&D Pvt Ltd",
      date: "2024",
      icon: "fas fa-brain",
      desc: "Training on neural networks, computer vision fundamentals, and AI algorithms.",
    },
  ]

  const eduList = items.length > 0 ? items : defaultEducation

  return (
    <section className="education section" id="education">
      <h2 className="section__title" data-heading="Academic Rigor">
        Education & Certifications
      </h2>

      <div className="education__container container">
        {/* Toggle Tabs */}
        <div className="qualification__tabs">
          <button
            type="button"
            onClick={() => setActiveTab("education")}
            className={`qualification__button ${activeTab === "education" ? "qualification__active" : ""}`}
          >
            <i className="fas fa-graduation-cap" />
            <span>Education Degrees</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certifications")}
            className={`qualification__button ${activeTab === "certifications" ? "qualification__active" : ""}`}
          >
            <i className="fas fa-certificate" />
            <span>Verified Certifications</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="qualification__sections">
          {activeTab === "education" ? (
            <div className="qualification__content grid">
              {eduList.map((edu) => (
                <div key={edu.id} className="qualification__card">
                  <div className="qualification__header">
                    <div className="qualification__icon-box">
                      <i className={edu.icon || "fas fa-university"} />
                    </div>
                    <span className="qualification__status">
                      {edu.status === "present" ? "Present" : "Completed"}
                    </span>
                  </div>

                  <h3 className="qualification__title">{edu.title}</h3>
                  <span className="qualification__subtitle">{edu.institution}</span>
                  <p className="qualification__desc">{edu.description}</p>

                  <div className="qualification__calendar">
                    <i className="far fa-calendar-alt" /> {edu.year}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="qualification__content grid">
              {certifications.map((cert) => (
                <div key={cert.id} className="qualification__card">
                  <div className="qualification__header">
                    <div className="qualification__icon-box">
                      <i className={cert.icon} />
                    </div>
                    <span className="qualification__status verified">
                      <i className="fas fa-check-circle" /> Verified
                    </span>
                  </div>

                  <h3 className="qualification__title">{cert.title}</h3>
                  <span className="qualification__subtitle">{cert.issuer}</span>
                  <p className="qualification__desc">{cert.desc}</p>

                  <div className="qualification__footer-row">
                    <div className="qualification__calendar">
                      <i className="far fa-calendar-alt" /> {cert.date}
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="verify__link"
                      >
                        <span>Verify Credential</span>
                        <i className="fas fa-external-link-alt" style={{ fontSize: "10px" }} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .education__container {
          max-width: 950px;
        }

        .qualification__tabs {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .qualification__button {
          font-size: var(--h3-font-size, 1.25rem);
          font-weight: var(--font-medium, 500);
          color: var(--title-color, rgb(241, 241, 243));
          cursor: pointer;
          background: none;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .qualification__button:hover {
          color: var(--skin-color, #3482ff);
        }

        .qualification__button.qualification__active {
          color: var(--skin-color, #3482ff);
        }

        .qualification__button.qualification__active::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--skin-color, #3482ff);
          box-shadow: 0 0 8px var(--skin-color, #3482ff);
        }

        .qualification__content {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .qualification__card {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1.25rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .qualification__card:hover {
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--box-border-hover);
          transform: translateY(-4px);
        }

        .qualification__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .qualification__icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background-color: rgba(52, 130, 255, 0.12);
          color: var(--skin-color, #3482ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .qualification__status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-color, rgb(214, 214, 220));
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .qualification__status.verified {
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.3);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .qualification__title {
          font-size: 1.15rem;
          color: var(--title-color, rgb(241, 241, 243));
          margin-bottom: 0.4rem;
          line-height: 1.35;
        }

        .qualification__subtitle {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--skin-color, #3482ff);
          display: block;
          margin-bottom: 1rem;
        }

        .qualification__desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 1.5rem;
        }

        .qualification__calendar {
          font-size: 0.82rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .qualification__footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .verify__link {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--skin-color, #3482ff);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .verify__link:hover {
          text-decoration: underline;
        }

        @media screen and (max-width: 768px) {
          .qualification__content {
            grid-template-columns: 1fr;
          }

          .qualification__tabs {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}
