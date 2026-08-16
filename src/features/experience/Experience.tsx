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
    <section id="experience" className="section-wrapper bg-slate-50/50">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="section-label">
            <i className="fas fa-briefcase text-blue-600 text-xs" />
            <span>Work & Engineering Experience</span>
          </div>
          <h2 className="section-headline">
            Professional Track Record & Ventures
          </h2>
          <p className="section-subtext">
            Hands-on commercial engineering experience spanning enterprise applications, startup venture leadership at Pynimox, and production software delivery.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {expList.map((exp) => {
            return (
              <div
                key={exp.id}
                className={`bg-white rounded-2xl p-7 sm:p-9 border transition-all duration-300 ${
                  exp.is_founder
                    ? "border-blue-300 shadow-md ring-1 ring-blue-500/10 hover:shadow-xl"
                    : "border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {exp.role}
                      </h3>
                      {exp.is_founder && (
                        <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          <i className="fas fa-crown text-[9px]" />
                          <span>Own Venture</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-slate-600 font-medium text-sm">
                      <span className="text-blue-600 font-semibold">{exp.company}</span>
                      <span>·</span>
                      <span className="text-slate-500">{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg whitespace-nowrap">
                      <i className="far fa-calendar-alt text-slate-400 mr-1.5" />
                      {exp.start_date}
                    </span>
                    {exp.company_url && (
                      <a
                        href={exp.company_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Visit</span>
                        <i className="fas fa-external-link-alt text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-slate-600 text-[15px] leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Highlights List */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Deliverables & Responsibilities
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                        >
                          <i className="fas fa-check-circle text-blue-600 text-xs mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Chips */}
                {exp.tech_stack && exp.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                    {exp.tech_stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-medium bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
