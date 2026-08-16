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
      title: "Diploma of Education in Project Management",
      issuer: "Uki (Yarl IT Hub)",
      issue_date: "Aug 2024",
      description:
        "Comprehensive training in Agile, Scrum, and Waterfall methodologies, cross-functional team leadership, stakeholder communication, and project delivery.",
      icon: "fas fa-tasks",
    },
    {
      id: 2,
      title: "Python (Programming Language)",
      issuer: "Uki (Yarl IT Hub)",
      issue_date: "Mar 2025",
      description:
        "Intensive programming course covering core Python, OOP, data structures, algorithm design, file processing, and backend development.",
      icon: "fab fa-python",
    },
    {
      id: 3,
      title: "Front-End Development",
      issuer: "Meta (via Coursera)",
      issue_date: "Oct 2024",
      description:
        "Professional front-end certification covering HTML5, CSS3, JavaScript, React.js, UI/UX design principles, and responsive web applications.",
      icon: "fab fa-react",
      credential_url:
        "https://www.coursera.org/account/accomplishments/verify/B9JH54BPHVSO",
    },
    {
      id: 4,
      title: "Artificial Intelligence with Python",
      issuer: "NoviTech R&D Pvt Ltd",
      issue_date: "Apr 2024",
      description:
        "Practical course exploring artificial intelligence fundamentals, machine learning models, neural networks, and Python-based AI development.",
      icon: "fas fa-brain",
    },
  ]

  const certList = items.length > 0 ? items : defaultItems

  return (
    <section id="certifications" className="section-wrapper bg-slate-50/50 border-y border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-certificate text-blue-600 text-xs" />
            <span>Credentials & Accreditations</span>
          </div>
          <h2 className="section-headline">
            Verified Certifications
          </h2>
          <p className="section-subtext">
            Specialized engineering credentials in front-end architecture, Python programming, artificial intelligence, and agile project management.
          </p>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certList.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center text-sm shadow-xs">
                    <i className={cert.icon || "fas fa-certificate"} />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <i className="fas fa-check-circle text-[9px]" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div className="text-xs font-semibold text-blue-600 mb-2">
                  {cert.issuer}
                </div>

                {/* Date */}
                {cert.issue_date && (
                  <div className="text-[11px] text-slate-500 font-medium mb-3 flex items-center gap-1">
                    <i className="far fa-calendar-alt text-slate-400" />
                    <span>{cert.issue_date}</span>
                  </div>
                )}

                {/* Description */}
                {cert.description && (
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Action */}
              {cert.credential_url ? (
                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 py-2 rounded-lg transition-colors"
                  >
                    <span>View Meta Credential</span>
                    <i className="fas fa-external-link-alt text-[10px]" />
                  </a>
                </div>
              ) : (
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium text-center">
                  Accredited Program
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
