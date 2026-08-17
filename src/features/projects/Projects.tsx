"use client"

import React, { useState } from "react"
import Link from "next/link"

export interface ProjectItem {
  id: string | number
  slug?: string
  title: string
  subtitle?: string | null
  summary: string
  category?: string
  problem?: string | null
  solution?: string | null
  outcome?: string | null
  tech_stack?: string[] | null
  repo_url?: string | null
  live_url?: string | null
  resource_url?: string | null
  resource_label?: string | null
  icon?: string | null
  accent_gradient?: string | null
  cover_image_url?: string | null
  is_featured?: boolean
  role?: string | null
}

interface ProjectsProps {
  projects?: ProjectItem[]
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  if (!projects || projects.length === 0) {
    return null
  }

  const projectList = projects

  const filterCategories = [
    { label: "All", value: "all" },
    { label: "AI & Automation", value: "AI & Automation" },
    { label: "Full-Stack Web", value: "Full-Stack Web" },
    { label: "Enterprise & Systems", value: "Enterprise & Systems" },
  ]

  const filteredProjects =
    activeFilter === "all"
      ? projectList
      : projectList.filter((p) => {
          if (p.category) {
            return p.category.toLowerCase().includes(activeFilter.toLowerCase())
          }
          if (activeFilter === "AI & Automation") return p.title.includes("AI") || p.title.includes("Pynimox")
          if (activeFilter === "Enterprise & Systems") return p.title.includes("LMS") || p.title.includes("Expense")
          return true
        })

  return (
    <section className="work section" id="work">
      <h2 className="section__title" data-heading="My Portfolio">
        Recent Works
      </h2>

      <div className="work__container container">
        {/* Category Filter Tabs */}
        <div className="work__filters">
          {filterCategories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveFilter(cat.value)}
              className={`work__item ${activeFilter === cat.value ? "active-work" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="work__grid grid">
          {filteredProjects.map((project) => {
            const projectSlug = project.slug || `project-${project.id}`
            return (
              <div key={project.id} className="work__card">
                {/* Media Image Box */}
                <div className="work__img-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.cover_image_url || "/projects/pynimox.jpg"}
                    alt={project.title}
                    className="work__img"
                  />
                  {project.category && (
                    <span className="work__category-badge">{project.category}</span>
                  )}
                </div>

                {/* Card Content */}
                <div className="work__data">
                  <h3 className="work__title">{project.title}</h3>
                  <p className="work__desc">{project.summary}</p>

                  {/* Tech Stack Chips */}
                  {project.tech_stack && (
                    <div className="work__tech-stack">
                      {project.tech_stack.slice(0, 4).map((tech, tIdx) => (
                        <span key={tIdx} className="work__tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Link Button */}
                  <div className="work__actions">
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="work__button"
                    >
                      <span>View Details</span>
                      <i className="fas fa-arrow-right work__button-icon" />
                    </Link>

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work__live-link"
                        title="Open Live Site"
                      >
                        <i className="fas fa-external-link-alt" />
                      </a>
                    )}

                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work__live-link"
                        title="GitHub Repository"
                      >
                        <i className="fab fa-github" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .work__filters {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.8rem;
          flex-wrap: wrap;
        }

        .work__item {
          padding: 0.5rem 1.2rem;
          color: var(--title-color, rgb(241, 241, 243));
          font-weight: var(--font-medium, 500);
          font-size: 0.9rem;
          border-radius: 0.5rem;
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          transition: all 0.3s ease;
        }

        .work__item:hover {
          color: var(--skin-color, #3482ff);
          background-color: var(--box-color-hover, rgb(28, 28, 38));
          border-color: var(--box-border-hover);
        }

        .work__item.active-work {
          background-color: var(--skin-color, #3482ff);
          color: #ffffff;
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 4px 15px rgba(52, 130, 255, 0.35);
        }

        .work__grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .work__card {
          background-color: var(--box-color, rgb(22, 22, 29));
          border: 1px solid var(--box-border);
          border-radius: 1.25rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .work__card:hover {
          transform: translateY(-8px);
          border-color: var(--skin-color, #3482ff);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
        }

        .work__img-box {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background-color: #000000;
        }

        .work__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .work__card:hover .work__img {
          transform: scale(1.08);
        }

        .work__category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(8px);
          color: var(--skin-color, #3482ff);
          border: 1px solid rgba(52, 130, 255, 0.3);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
        }

        .work__data {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
        }

        .work__title {
          font-size: var(--h3-font-size, 1.25rem);
          margin-bottom: 0.5rem;
          color: var(--title-color, rgb(241, 241, 243));
          line-height: 1.35;
        }

        .work__desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-color, rgb(214, 214, 220));
          margin-bottom: 1.2rem;
        }

        .work__tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.4rem;
        }

        .work__tech-chip {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          background-color: rgba(255, 255, 255, 0.04);
          padding: 0.2rem 0.55rem;
          border-radius: 0.3rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .work__actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .work__button {
          color: var(--skin-color, #3482ff);
          font-size: var(--small-font-size, 0.875rem);
          display: inline-flex;
          align-items: center;
          column-gap: 0.4rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .work__button-icon {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .work__button:hover .work__button-icon {
          transform: translateX(5px);
        }

        .work__live-link {
          color: var(--text-muted);
          font-size: 1rem;
          transition: color 0.2s ease;
          padding: 4px;
        }

        .work__live-link:hover {
          color: var(--skin-color, #3482ff);
        }

        @media screen and (max-width: 1024px) {
          .work__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (max-width: 600px) {
          .work__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
