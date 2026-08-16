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
        "Specializing in Mechatronics, automation, robotics, computational physical science, circuit analysis, and embedded control systems.",
      icon: "fas fa-robot",
    },
    {
      id: 2,
      title: "Bachelor of Information Technology (External)",
      institution: "University of Moratuwa",
      year: "2025 – Present",
      status: "present",
      description:
        "Comprehensive software engineering curriculum covering relational database architecture, object-oriented software design, networking, and cloud computing.",
      icon: "fas fa-laptop-code",
    },
    {
      id: 3,
      title: "G.C.E. A/L - Physical Science Stream",
      institution: "Mn/Thalaimannar Pier G.T.M.S",
      year: "2009 – 2022",
      status: "completed",
      description:
        "Completed secondary education in Physical Science stream with focused coursework in Combined Mathematics, Physics, and Chemistry.",
      icon: "fas fa-graduation-cap",
    },
  ]

  const educationList = items.length > 0 ? items : defaultItems

  return (
    <section id="education" className="section-wrapper bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-university text-blue-600 text-xs" />
            <span>Academic Background</span>
          </div>
          <h2 className="section-headline">
            Education & Degrees
          </h2>
          <p className="section-subtext">
            Rigorous dual-degree foundation in Mechatronics Engineering and Information Technology from top Sri Lankan universities.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationList.map((item) => {
            const isOngoing = item.status === "present"

            return (
              <div
                key={item.id}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center text-sm shadow-xs">
                      <i className={item.icon || "fas fa-university"} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                        isOngoing
                          ? "bg-blue-50 text-blue-600 border border-blue-200/60"
                          : "bg-slate-200/60 text-slate-700"
                      }`}
                    >
                      {isOngoing ? "In Progress" : "Completed"}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Institution */}
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    {item.institution}
                  </div>

                  {/* Year */}
                  <div className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1.5">
                    <i className="far fa-calendar-alt text-slate-400" />
                    <span>{item.year}</span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
