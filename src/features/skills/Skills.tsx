"use client"

import React from "react"

export interface SkillItem {
  id: string | number
  name: string
  icon?: string | null
}

export interface SkillCategoryItem {
  id: string | number
  name: string
  icon?: string | null
  skills: SkillItem[]
}

interface SkillsProps {
  categories?: SkillCategoryItem[]
}

export default function Skills({ categories = [] }: SkillsProps) {
  const defaultCategories: SkillCategoryItem[] = [
    {
      id: 1,
      name: "AI & Machine Learning",
      icon: "fas fa-brain",
      skills: [
        { id: 101, name: "LLM APIs (OpenAI, Claude)", icon: "fas fa-robot" },
        { id: 102, name: "AI Automation Agents", icon: "fas fa-network-wired" },
        { id: 103, name: "Prompt Engineering", icon: "fas fa-terminal" },
        { id: 104, name: "Neural Networks & ML (Python)", icon: "fas fa-project-diagram" },
        { id: 105, name: "Vector Databases & Embeddings", icon: "fas fa-database" },
      ],
    },
    {
      id: 2,
      name: "Frontend Engineering",
      icon: "fas fa-laptop-code",
      skills: [
        { id: 201, name: "Next.js 15 (App Router)", icon: "fab fa-react" },
        { id: 202, name: "React.js", icon: "fab fa-react" },
        { id: 203, name: "TypeScript / JavaScript", icon: "fab fa-js" },
        { id: 204, name: "Tailwind CSS & UI/UX", icon: "fab fa-css3-alt" },
        { id: 205, name: "Flutter (Cross-Platform Mobile)", icon: "fab fa-android" },
        { id: 206, name: "Angular", icon: "fab fa-angular" },
      ],
    },
    {
      id: 3,
      name: "Backend & Systems",
      icon: "fas fa-server",
      skills: [
        { id: 301, name: "Python", icon: "fab fa-python" },
        { id: 302, name: "C# & .NET Core", icon: "fab fa-microsoft" },
        { id: 303, name: "ASP.NET Core Web APIs", icon: "fas fa-code" },
        { id: 304, name: "Node.js & Express", icon: "fab fa-node-js" },
        { id: 305, name: "C Programming", icon: "fas fa-microchip" },
        { id: 306, name: "Prisma ORM", icon: "fas fa-layer-group" },
      ],
    },
    {
      id: 4,
      name: "Cloud & Databases",
      icon: "fas fa-cloud",
      skills: [
        { id: 401, name: "PostgreSQL & Supabase", icon: "fas fa-database" },
        { id: 402, name: "MySQL & SQL Server", icon: "fas fa-database" },
        { id: 403, name: "MongoDB", icon: "fas fa-database" },
        { id: 404, name: "AWS & Google Cloud", icon: "fab fa-aws" },
        { id: 405, name: "Git & CI/CD Pipelines", icon: "fab fa-git-alt" },
        { id: 406, name: "RESTful Architecture", icon: "fas fa-exchange-alt" },
      ],
    },
    {
      id: 5,
      name: "Hardware & Mechatronics",
      icon: "fas fa-cogs",
      skills: [
        { id: 501, name: "Electronics & Circuit Fundamentals", icon: "fas fa-microchip" },
        { id: 502, name: "Sensors & Actuator Interfaces", icon: "fas fa-bolt" },
        { id: 503, name: "Microcontrollers & Embedded Logic", icon: "fas fa-memory" },
        { id: 504, name: "Automation & Robotics Concepts", icon: "fas fa-robot" },
        { id: 505, name: "Project Management (Agile/Scrum)", icon: "fas fa-tasks" },
      ],
    },
  ]

  const catList = categories.length > 0 ? categories : defaultCategories

  return (
    <section id="skills" className="section-wrapper bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-cubes text-blue-600 text-xs" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-headline">
            Technology Stack & Toolkit
          </h2>
          <p className="section-subtext">
            Specialized toolset bridging modern cloud software, intelligent AI systems, and mechatronics engineering fundamentals.
          </p>
        </div>

        {/* Grouped Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catList.map((category) => (
            <div
              key={category.id}
              className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-7 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200/70">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center text-sm shadow-xs">
                    <i className={category.icon || "fas fa-code"} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {category.name}
                  </h3>
                </div>

                {/* Chips Grid */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 px-3 py-2 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-default"
                    >
                      {skill.icon && (
                        <i className={`${skill.icon} text-slate-400 group-hover:text-blue-600 text-xs`} />
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
