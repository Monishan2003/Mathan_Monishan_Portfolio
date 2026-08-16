"use client"

import React from "react"

export interface SkillCategoryItem {
  id: string | number
  name: string
  icon?: string | null
  skills: Array<{
    id: string | number
    name: string
    icon?: string | null
  }>
}

interface SkillsProps {
  categories?: SkillCategoryItem[]
}

export default function Skills({ categories = [] }: SkillsProps) {
  const defaultCategories: SkillCategoryItem[] = [
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      icon: "fas fa-brain",
      skills: [
        { id: "ai-1", name: "LLM APIs (OpenAI / Claude / Gemini)", icon: "fas fa-robot" },
        { id: "ai-2", name: "Multi-Agent Workflows", icon: "fas fa-project-diagram" },
        { id: "ai-3", name: "Python & NumPy", icon: "fab fa-python" },
        { id: "ai-4", name: "RAG & Vector Embeddings", icon: "fas fa-database" },
        { id: "ai-5", name: "Prompt Engineering", icon: "fas fa-terminal" },
      ],
    },
    {
      id: "frontend",
      name: "Frontend Engineering",
      icon: "fas fa-laptop-code",
      skills: [
        { id: "fe-1", name: "Next.js 15 & React.js", icon: "fab fa-react" },
        { id: "fe-2", name: "TypeScript / Modern JS", icon: "fab fa-js" },
        { id: "fe-3", name: "Tailwind CSS & CSS Modules", icon: "fab fa-css3-alt" },
        { id: "fe-4", name: "State Management (Zustand/Redux)", icon: "fas fa-code-branch" },
        { id: "fe-5", name: "Responsive UI / UX Design", icon: "fas fa-mobile-alt" },
      ],
    },
    {
      id: "backend",
      name: "Backend & Systems",
      icon: "fas fa-server",
      skills: [
        { id: "be-1", name: "C# & .NET Core / ASP.NET", icon: "fas fa-cube" },
        { id: "be-2", name: "Node.js & Express.js", icon: "fab fa-node-js" },
        { id: "be-3", name: "RESTful & Streaming APIs", icon: "fas fa-network-wired" },
        { id: "be-4", name: "PostgreSQL & SQL Server", icon: "fas fa-database" },
        { id: "be-5", name: "Supabase & Prisma ORM", icon: "fas fa-bolt" },
      ],
    },
    {
      id: "cloud-devops",
      name: "Cloud & DevOps",
      icon: "fas fa-cloud",
      skills: [
        { id: "cl-1", name: "Amazon Web Services (AWS)", icon: "fab fa-aws" },
        { id: "cl-2", name: "Vercel Cloud Deployment", icon: "fas fa-globe" },
        { id: "cl-3", name: "Docker & Containerization", icon: "fab fa-docker" },
        { id: "cl-4", name: "Git & GitHub CI/CD", icon: "fab fa-github" },
        { id: "cl-5", name: "Agile & Scrum Methodologies", icon: "fas fa-tasks" },
      ],
    },
    {
      id: "mechatronics",
      name: "Hardware & Mechatronics",
      icon: "fas fa-microchip",
      skills: [
        { id: "me-1", name: "Microcontrollers (Arduino / STM32)", icon: "fas fa-microchip" },
        { id: "me-2", name: "Sensor & Actuator Interfacing", icon: "fas fa-wave-square" },
        { id: "me-3", name: "Circuit Design & Prototyping", icon: "fas fa-plug" },
        { id: "me-4", name: "Control Systems & Robotics", icon: "fas fa-cogs" },
        { id: "me-5", name: "MATLAB & Simulation", icon: "fas fa-calculator" },
      ],
    },
  ]

  const catList = categories.length > 0 ? categories : defaultCategories

  return (
    <section id="skills" className="section-wrapper skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-tools" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-headline">
            Technology Stack & Toolkit
          </h2>
          <p className="section-subtext">
            A comprehensive overview of programming languages, modern frameworks, cloud architectures, and hardware disciplines I actively use to engineer intelligent systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-categories-grid">
          {catList.map((cat) => (
            <div key={cat.id} className="skill-cat-card">
              {/* Category Header */}
              <div className="cat-card-header">
                <div className="cat-title-group">
                  <div className="cat-icon-box">
                    <i className={cat.icon || "fas fa-layer-group"} />
                  </div>
                  <h3 className="cat-name">{cat.name}</h3>
                </div>
                <span className="cat-badge">{cat.skills.length} tools</span>
              </div>

              {/* Skills Chips */}
              <div className="skills-chips-wrapper">
                {cat.skills.map((s) => (
                  <div key={s.id} className="skill-chip">
                    <i className={s.icon || "fas fa-check"} />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }

        .skills-categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .skill-cat-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .skill-cat-card:hover {
          background: #ffffff;
          border-color: #93c5fd;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.08);
          transform: translateY(-3px);
        }

        .cat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid #e2e8f0;
        }

        .cat-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cat-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .cat-name {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
        }

        .cat-badge {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 2px 8px;
          border-radius: 100px;
        }

        .skills-chips-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
          transition: all 0.2s ease;
        }

        .skill-chip i {
          color: #2563eb;
          font-size: 13px;
        }

        .skill-chip:hover {
          border-color: #2563eb;
          color: #2563eb;
          transform: translateY(-1px);
        }

        @media (max-width: 992px) {
          .skills-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .skills-categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
