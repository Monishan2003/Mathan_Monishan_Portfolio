"use client"

import React, { useState } from "react"

export interface SkillCategoryItem {
  id: string | number
  name: string
  icon?: string | null
  skills: Array<{
    id: string | number
    name: string
    percentage?: number
    icon?: string | null
  }>
}

interface SkillsProps {
  categories?: SkillCategoryItem[]
}

export default function Skills({ categories = [] }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<number>(0)

  const defaultCategories = [
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      icon: "fas fa-brain",
      skills: [
        { id: "ai-1", name: "LLM APIs & Prompt Engineering", percentage: 95 },
        { id: "ai-2", name: "Multi-Agent Workflows", percentage: 90 },
        { id: "ai-3", name: "Python, NumPy & Data Handling", percentage: 88 },
        { id: "ai-4", name: "RAG & Vector Databases", percentage: 85 },
      ],
    },
    {
      id: "frontend",
      name: "Frontend Development",
      icon: "fas fa-laptop-code",
      skills: [
        { id: "fe-1", name: "Next.js 15 & React.js", percentage: 95 },
        { id: "fe-2", name: "TypeScript / Modern ES6+", percentage: 92 },
        { id: "fe-3", name: "Tailwind CSS & Responsive UI", percentage: 90 },
        { id: "fe-4", name: "State Management & Optimization", percentage: 88 },
      ],
    },
    {
      id: "backend",
      name: "Backend & Systems",
      icon: "fas fa-server",
      skills: [
        { id: "be-1", name: "C# & .NET Core / ASP.NET", percentage: 90 },
        { id: "be-2", name: "Node.js & Express APIs", percentage: 88 },
        { id: "be-3", name: "Supabase, PostgreSQL & SQL Server", percentage: 92 },
        { id: "be-4", name: "RESTful & Streaming Architectures", percentage: 90 },
      ],
    },
    {
      id: "hardware",
      name: "Hardware & Mechatronics",
      icon: "fas fa-microchip",
      skills: [
        { id: "me-1", name: "Microcontrollers (Arduino / STM32)", percentage: 90 },
        { id: "me-2", name: "Sensors & Actuators Interfacing", percentage: 88 },
        { id: "me-3", name: "Control Systems & Robotics", percentage: 85 },
        { id: "me-4", name: "Circuit Design & MATLAB", percentage: 82 },
      ],
    },
  ]

  const catList = categories.length > 0 ? categories : defaultCategories

  return (
    <section className="skills section" id="skills">
      <h2 className="section__title" data-heading="My Abilities">
        My Skills
      </h2>

      <div className="skills__container container">
        {/* Skills Category Tabs */}
        <div className="skills__tabs">
          {catList.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`skills__tab-btn ${activeTab === idx ? "active-tab" : ""}`}
            >
              <i className={cat.icon || "fas fa-code"} />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Skill Bars */}
        <div className="skills__content grid">
          {catList[activeTab]?.skills.map((skill) => {
            const pct = skill.percentage || 85
            return (
              <div key={skill.id} className="skills__data">
                <div className="skills__titles">
                  <h3 className="skills__name">{skill.name}</h3>
                  <span className="skills__number">{pct}%</span>
                </div>
                <div className="skills__bar">
                  <div
                    className="skills__percentage"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .skills__container {
          max-width: 900px;
        }

        .skills__tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.85rem;
          margin-bottom: 3rem;
        }

        .skills__tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.4rem;
          background-color: var(--box-color, rgb(22, 22, 29));
          color: var(--text-color, rgb(214, 214, 220));
          border-radius: 0.5rem;
          border: 1px solid var(--box-border);
          font-weight: var(--font-medium, 500);
          font-size: 0.92rem;
          transition: all 0.3s ease;
        }

        .skills__tab-btn:hover {
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          color: var(--skin-color, #3482ff);
          border-color: var(--box-border-hover);
        }

        .skills__tab-btn.active-tab {
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.35);
        }

        .skills__content {
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem 3rem;
          background-color: var(--box-color, rgb(22, 22, 29));
          padding: 2.5rem;
          border-radius: 1.25rem;
          border: 1px solid var(--box-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .skills__data {
          display: flex;
          flex-direction: column;
        }

        .skills__titles {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .skills__name {
          font-size: var(--normal-font-size, 1rem);
          font-weight: var(--font-medium, 500);
          color: var(--title-color, rgb(241, 241, 243));
        }

        .skills__number {
          font-size: var(--small-font-size, 0.875rem);
          font-weight: 600;
          color: var(--skin-color, #3482ff);
        }

        .skills__bar {
          height: 8px;
          background-color: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .skills__percentage {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #1b7be2, #3482ff);
          position: relative;
          transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .skills__percentage::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite;
        }

        @media screen and (max-width: 768px) {
          .skills__content {
            grid-template-columns: 1fr;
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
