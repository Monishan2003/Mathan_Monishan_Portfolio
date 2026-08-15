"use client"

import React from "react"
import Link from "next/link"

export interface ProjectItem {
  id: string | number
  slug?: string
  title: string
  summary: string
  tech_stack?: string[] | null
  repo_url?: string | null
  live_url?: string | null
  resource_url?: string | null
  resource_label?: string | null
  icon?: string | null
  accent_gradient?: string | null
  cover_image_url?: string | null
}

interface ProjectsProps {
  projects?: ProjectItem[]
}

function isVideo(url?: string | null) {
  if (!url) return false
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov") || url.includes("video")
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const defaultProjects: ProjectItem[] = [
    {
      id: 1,
      slug: "hotel-website",
      title: "Hotel Website",
      summary:
        "A responsive website for a hotel showcasing rooms, amenities, and booking information with a clean, modern design.",
      tech_stack: ["HTML5", "CSS"],
      repo_url: "https://github.com/Monishan2003/Web-design-project1",
      live_url: null,
      icon: "fas fa-hotel",
      accent_gradient: "linear-gradient(135deg, #4a6fc7 0%, #3f51b5 100%)",
    },
    {
      id: 2,
      slug: "portfolio-website",
      title: "Portfolio Website",
      summary:
        "A personal portfolio website showcasing skills, projects, and experience with interactive elements and responsive design.",
      tech_stack: ["HTML5", "CSS", "JavaScript"],
      repo_url: "https://github.com/Monishan2003/My-Portfolio-website-.git",
      live_url: "https://www.monishan.me",
      icon: "fas fa-user",
      accent_gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
    },
    {
      id: 3,
      slug: "personal-expense-tracker",
      title: "Personal Expense Tracker",
      summary:
        "A command-line application to track personal expenses, generate reports, and analyze spending patterns.",
      tech_stack: ["Python", "CLI"],
      repo_url: "https://github.com/Monishan2003/Personal-Expense-Tracker.git",
      live_url: null,
      icon: "fas fa-money-bill-wave",
      accent_gradient: "linear-gradient(135deg, #20bf6b 0%, #01baef 100%)",
    },
    {
      id: 4,
      slug: "unisphere-lms",
      title: "UniSphere LMS - Learning Management System",
      summary:
        "A comprehensive Learning Management System built with C# supporting 4 user roles (Admin, Staff, Lecturers, Students). Features include course management, assignments, grading, and all essential learning activities for educational institutions.",
      tech_stack: ["C#", ".NET", "ASP.NET", "SQL Server"],
      repo_url:
        "https://github.com/Monishan2003/LMS_project_C-_-Learning_Management_Systam-.git",
      live_url: null,
      icon: "fas fa-graduation-cap",
      accent_gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 5,
      slug: "community-project-uki-jaffna",
      title: "Community Project (Uki/Jaffna)",
      summary:
        "Tackling school dropout and drug abuse in Mannar via stakeholder engagement and community initiatives.",
      tech_stack: [],
      repo_url: null,
      resource_url:
        "https://drive.google.com/file/d/1sTs55D9uDlRDtzE3LrWYNdtZxZTJf6wu/view?usp=drive_link",
      resource_label: "Project Folder",
      icon: "fas fa-hands-helping",
      accent_gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
    },
  ]

  const projectList = projects.length > 0 ? projects : defaultProjects

  return (
    <section id="projects" style={{ background: "transparent" }}>
      <div className="container">
        <h2 className="section-title">
          My Projects
          <span className="section-subtitle">My Work</span>
        </h2>

        <div className="projects-grid">
          {projectList.map((project, index) => {
            const hasTech = project.tech_stack && project.tech_stack.length > 0
            const gradient =
              project.accent_gradient ||
              "linear-gradient(135deg, #2b3fa7 0%, #14b1ff 100%)"

            const projectSlug = project.slug || `project-${project.id}`
            const hasCover = Boolean(project.cover_image_url)
            const isCoverVid = isVideo(project.cover_image_url)

            return (
              <div
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Clickable Card Header */}
                <Link
                  href={`/projects/${projectSlug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="project-image-box"
                    style={{
                      background: hasCover && !isCoverVid ? "none" : gradient,
                    }}
                  >
                    {hasCover ? (
                      isCoverVid ? (
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                          <video
                            src={project.cover_image_url!}
                            muted
                            playsInline
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "10px",
                              right: "10px",
                              background: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              borderRadius: "20px",
                              padding: "2px 8px",
                              fontSize: "11px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <i className="fas fa-play" style={{ fontSize: "9px" }} /> Video
                          </div>
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.cover_image_url!}
                          alt={project.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )
                    ) : (
                      <i className={project.icon || "fas fa-code"} />
                    )}
                  </div>
                </Link>

                {/* Project Body */}
                <div className="project-body">
                  <Link
                    href={`/projects/${projectSlug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h3 className="project-title">{project.title}</h3>
                  </Link>
                  <p className="project-desc">{project.summary}</p>

                  {hasTech && (
                    <div className="tech-tags">
                      {project.tech_stack!.map((tech, techIdx) => (
                        <span key={techIdx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="project-btn detail-btn"
                    >
                      <i className="fas fa-info-circle" /> Details
                    </Link>

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn live-btn"
                      >
                        <i className="fas fa-external-link-alt" /> Demo
                      </a>
                    )}

                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn repo-btn"
                      >
                        <i className="fab fa-github" /> Code
                      </a>
                    )}

                    {project.resource_url && (
                      <a
                        href={project.resource_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn resource-btn"
                      >
                        <i className="fas fa-folder-open" /> Folder
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
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(43, 63, 167, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(43, 63, 167, 0.16);
          border-color: rgba(43, 63, 167, 0.25);
        }

        .project-image-box {
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 56px;
          overflow: hidden;
          background-position: center;
          background-size: cover;
        }

        .project-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .project-title {
          font-size: 20px;
          color: var(--secondary-color);
          margin-bottom: 10px;
          font-family: var(--font-heading);
          font-weight: 700;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .project-title:hover {
          color: var(--primary-color);
        }

        .project-desc {
          font-size: 14.5px;
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 16px;
          flex: 1;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tech-tag {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          background: rgba(43, 63, 167, 0.08);
          color: var(--primary-color);
          border-radius: 6px;
        }

        .project-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }

        .project-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 6px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .detail-btn {
          background: var(--primary-color);
          color: #ffffff;
        }

        .detail-btn:hover {
          background: var(--secondary-color);
        }

        .repo-btn {
          background: #1e293b;
          color: #ffffff;
        }

        .repo-btn:hover {
          background: #0f172a;
        }

        .live-btn,
        .resource-btn {
          background: transparent;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }

        .live-btn:hover,
        .resource-btn:hover {
          background: var(--primary-color);
          color: #ffffff;
        }

        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
