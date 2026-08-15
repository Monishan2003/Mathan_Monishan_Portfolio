"use client"

import React from "react"

export interface SkillItem {
  id?: string | number
  name: string
  icon?: string | null
}

export interface SkillCategoryItem {
  id?: string | number
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
      name: "Frontend Development",
      icon: "fas fa-laptop-code",
      skills: [
        { name: "HTML5", icon: "fab fa-html5" },
        { name: "CSS3", icon: "fab fa-css3-alt" },
        { name: "JavaScript", icon: "fab fa-js" },
        { name: "React", icon: "fab fa-react" },
        { name: "Flutter", icon: "fab fa-android" },
      ],
    },
    {
      name: "Backend & Databases",
      icon: "fas fa-server",
      skills: [
        { name: "C#", icon: "fab fa-microsoft" },
        { name: "Node.js", icon: "fab fa-node-js" },
        { name: "Python", icon: "fab fa-python" },
        { name: "MySQL", icon: "fas fa-database" },
        { name: "MongoDB", icon: "fas fa-database" },
      ],
    },
    {
      name: "Tools & Methods",
      icon: "fas fa-tools",
      skills: [
        { name: "Git", icon: "fab fa-git-alt" },
        { name: "Figma", icon: "fab fa-figma" },
        { name: "Canva", icon: "fas fa-palette" },
        { name: "Project Management", icon: "fas fa-tasks" },
        { name: "Responsive Design", icon: "fas fa-mobile-alt" },
      ],
    },
  ]

  const skillCats = categories.length > 0 ? categories : defaultCategories

  return (
    <section id="skills" style={{ background: "transparent" }}>
      <div className="container">
        <h2 className="section-title">
          My Skills
          <span className="section-subtitle">My Skills</span>
        </h2>

        <div className="skills-grid">
          {skillCats.map((cat, catIdx) => (
            <div key={cat.id || catIdx} className="category-card">
              <h3 className="category-header">
                <i className={cat.icon || "fas fa-code"} /> {cat.name}
              </h3>
              <div className="skills-item-grid">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skill.id || skillIdx} className="skill-box">
                    <i className={skill.icon || "fas fa-check"} />
                    <h4>{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .category-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(43, 63, 167, 0.08);
          transition: all 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(43, 63, 167, 0.14);
          border-color: rgba(43, 63, 167, 0.2);
        }

        .category-header {
          font-size: 20px;
          color: var(--secondary-color);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(43, 63, 167, 0.1);
          font-family: var(--font-heading);
        }

        .category-header i {
          color: var(--primary-color);
        }

        .skills-item-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 15px;
        }

        .skill-box {
          background: rgba(43, 63, 167, 0.04);
          border: 1px solid rgba(43, 63, 167, 0.08);
          padding: 18px 10px;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .skill-box:hover {
          background: linear-gradient(135deg, #1b0072 0%, #2b3fa7 100%);
          color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 6px 15px rgba(43, 63, 167, 0.25);
        }

        .skill-box i {
          font-size: 28px;
          color: var(--primary-color);
          transition: color 0.3s ease;
        }

        .skill-box:hover i {
          color: var(--accent-color);
        }

        .skill-box h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          color: var(--text-dark);
          transition: color 0.3s ease;
        }

        .skill-box:hover h4 {
          color: #ffffff;
        }
      `}</style>
    </section>
  )
}
