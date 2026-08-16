"use client"

import React from "react"
import Link from "next/link"

export interface ProjectItem {
  id: string | number
  slug?: string
  title: string
  subtitle?: string | null
  summary: string
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
  const defaultProjects: ProjectItem[] = [
    {
      id: 1,
      slug: "pynimox-ai-website",
      title: "Pynimox AI Studio",
      subtitle: "AI Automation & Full-Stack Engineering Studio (Founder Venture)",
      summary:
        "Engineered an automated AI studio platform enabling global clients to orchestrate intelligent AI agent workflows, dynamic LLM integrations, and production web systems.",
      problem:
        "International clients needed an intuitive, production-ready interface to deploy custom AI assistants, automate repetitive business workflows, and manage full-stack systems.",
      solution:
        "Architected a Next.js and Supabase web app with server-side LLM streaming, interactive AI chat widgets, secure cloud endpoints, and instant client onboarding.",
      outcome:
        "Successfully launched studio serving international clients with low-latency AI responses, robust authentication, and high performance.",
      tech_stack: ["Next.js", "TypeScript", "Node.js", "Supabase", "LLM APIs", "Tailwind CSS"],
      live_url: "https://www.pynimox.com",
      cover_image_url: "/projects/pynimox.jpg",
      role: "Founder & Lead Engineer",
      is_featured: true,
    },
    {
      id: 2,
      slug: "medicross-ai-healthcare",
      title: "MediCross AI — Healthcare Platform",
      subtitle: "Clinical Operations & Patient Management System",
      summary:
        "Full-stack healthcare management system with multi-role access control, patient record indexing, appointment scheduling, and health metrics analytics.",
      problem:
        "Medical clinics required a centralized, secure digital system to manage patient histories, doctor availability, and diagnostic records without data fragmentation.",
      solution:
        "Developed a responsive health portal with strict role-based authorization, calendar booking engine, patient vitals tracking, and cloud database storage on AWS.",
      outcome:
        "Streamlined patient appointment lifecycle, eliminated paper records, and ensured encrypted HIPAA-aware data flows.",
      tech_stack: ["Next.js", "React.js", "Node.js", "PostgreSQL", "Prisma", "AWS", "Vercel"],
      live_url: "https://medicross-wine.vercel.app",
      cover_image_url: "/projects/medicross.jpg",
      role: "Lead Full-Stack Developer",
      is_featured: true,
    },
    {
      id: 3,
      slug: "srmj-enterprises-ecommerce",
      title: "SRMJ Enterprises E-Commerce",
      subtitle: "Modern Fashion & Retail Digital Storefront",
      summary:
        "Production-grade e-commerce web application featuring high-speed catalog filtering, interactive cart drawer, secure authentication, and Stripe payment processing.",
      problem:
        "Fashion retailer needed a fast, scalable mobile-first storefront capable of handling dynamic inventory, seasonal discounts, and instant checkout.",
      solution:
        "Built with Next.js, Prisma ORM, and PostgreSQL database with Stripe webhooks for automated order confirmation and Supabase auth.",
      outcome:
        "Achieved sub-second page transitions, 99+ Lighthouse performance score, and automated checkout fulfillment.",
      tech_stack: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS"],
      live_url: "https://www.srmjenterprises.com",
      cover_image_url: "/projects/srmj.jpg",
      role: "Full-Stack Developer",
      is_featured: true,
    },
    {
      id: 4,
      slug: "unisphere-lms",
      title: "UniSphere LMS — Academic Portal",
      subtitle: "Enterprise Learning Management System (C# & .NET)",
      summary:
        "Comprehensive educational management system supporting 4 distinct user tiers (Admin, Staff, Lecturers, Students) with course workflows, assignments, and grading.",
      problem:
        "Institutions required an enterprise-grade solution to administer semester curriculums, student gradebooks, and assignment submissions with strict permissions.",
      solution:
        "Architected using C#, ASP.NET, and SQL Server with normalized relational schemas, role authorization, and assignment evaluation pipelines.",
      outcome:
        "Demonstrated enterprise OOP design patterns, transaction safety, and clean software architecture.",
      tech_stack: ["C#", ".NET", "ASP.NET", "SQL Server", "Architecture"],
      repo_url: "https://github.com/Monishan2003/LMS_project_C-_-Learning_Management_Systam-.git",
      cover_image_url: "/projects/unisphere.jpg",
      role: "Software Developer",
      is_featured: true,
    },
    {
      id: 5,
      slug: "hotel-website",
      title: "Luxury Hotel Web Platform",
      subtitle: "Responsive Boutique Resort Showcase",
      summary:
        "Fully responsive booking and amenities showcase website built with HTML5, CSS3, and modern UI best practices.",
      tech_stack: ["HTML5", "CSS3", "Responsive UI", "Web Design"],
      repo_url: "https://github.com/Monishan2003/Web-design-project1",
      cover_image_url: "/projects/hotel.jpg",
      is_featured: false,
    },
    {
      id: 6,
      slug: "personal-expense-tracker",
      title: "Personal Expense Tracker",
      subtitle: "Python CLI Financial Management Tool",
      summary:
        "Command-line application to track personal expenses, categorize spending, and generate visual financial reports.",
      tech_stack: ["Python", "CLI", "Data Handling", "File I/O"],
      repo_url: "https://github.com/Monishan2003/Personal-Expense-Tracker",
      cover_image_url: "/projects/expense.jpg",
      is_featured: false,
    },
  ]

  const projectList = projects.length > 0 ? projects : defaultProjects
  const featuredProjects = projectList.slice(0, 4)
  const additionalProjects = projectList.slice(4)

  return (
    <section id="work" className="section-wrapper work-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <i className="fas fa-layer-group" />
            <span>Selected Work & Case Studies</span>
          </div>
          <h2 className="section-headline">
            Engineering Production Systems
          </h2>
          <p className="section-subtext">
            A curated selection of production applications, AI systems, and enterprise software built with focus on architecture, performance, and real-world impact.
          </p>
        </div>

        {/* Featured Case Studies Grid */}
        <div className="case-studies-list">
          {featuredProjects.map((project, index) => {
            const projectSlug = project.slug || `project-${project.id}`
            const isReversed = index % 2 === 1

            return (
              <div
                key={project.id}
                className={`case-card ${isReversed ? "reversed" : ""}`}
              >
                {/* Media Image Box */}
                <div className="case-media">
                  <Link href={`/projects/${projectSlug}`} className="case-media-link">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover_image_url || "/projects/pynimox.jpg"}
                      alt={project.title}
                      className="case-img"
                    />
                    <div className="case-hover-overlay">
                      <span className="case-hover-btn">
                        <span>Read Case Study</span>
                        <i className="fas fa-arrow-right" />
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Content Box */}
                <div className="case-content">
                  <div>
                    {/* Top Meta */}
                    <div className="case-meta-row">
                      <span className="case-number-badge">
                        0{index + 1} / CASE STUDY
                      </span>
                      {project.role && (
                        <span className="case-role">
                          Role: <strong>{project.role}</strong>
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <Link href={`/projects/${projectSlug}`} className="case-title-link">
                      <h3 className="case-title">{project.title}</h3>
                    </Link>
                    {project.subtitle && (
                      <div className="case-subtitle">{project.subtitle}</div>
                    )}

                    {/* Summary */}
                    <p className="case-summary">{project.summary}</p>

                    {/* Architecture Box */}
                    {project.solution && (
                      <div className="case-arch-box">
                        <div className="arch-header">
                          <i className="fas fa-cogs text-blue" />
                          <span>Architecture & Solution</span>
                        </div>
                        <p className="arch-text">{project.solution}</p>
                      </div>
                    )}

                    {/* Tech Chips */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="tech-chips-row">
                        {project.tech_stack.map((tech, tIdx) => (
                          <span key={tIdx} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="case-actions-row">
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="btn-dark"
                    >
                      <i className="fas fa-file-alt" />
                      <span>Case Study Details</span>
                    </Link>

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-blue-outline"
                      >
                        <i className="fas fa-external-link-alt" />
                        <span>Live Site</span>
                      </a>
                    )}

                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                      >
                        <i className="fab fa-github" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Projects Section */}
        {additionalProjects.length > 0 && (
          <div className="additional-projects-wrapper">
            <div className="addl-header">
              <h3 className="addl-title">Additional Technical Projects</h3>
              <p className="addl-subtitle">
                Foundational explorations in web design, algorithms, and CLI automation.
              </p>
            </div>

            <div className="addl-grid">
              {additionalProjects.map((proj) => {
                const projSlug = proj.slug || `project-${proj.id}`
                return (
                  <div key={proj.id} className="addl-card">
                    <div className="addl-card-top">
                      <div className="addl-card-header">
                        <h4 className="addl-card-title">{proj.title}</h4>
                        {proj.repo_url && (
                          <a
                            href={proj.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="addl-repo-link"
                            aria-label="GitHub Repository"
                          >
                            <i className="fab fa-github" />
                          </a>
                        )}
                      </div>
                      <p className="addl-card-desc">{proj.summary}</p>
                      {proj.tech_stack && (
                        <div className="tech-chips-row">
                          {proj.tech_stack.map((t, idx) => (
                            <span key={idx} className="tech-badge-sm">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="addl-card-bottom">
                      <Link
                        href={`/projects/${projSlug}`}
                        className="addl-details-btn"
                      >
                        <span>View Details</span>
                        <i className="fas fa-chevron-right" style={{ fontSize: "11px" }} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .work-section {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }

        .case-studies-list {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .case-card {
          display: grid;
          grid-template-columns: 1.1fr 1.2fr;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .case-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 16px 36px rgba(37, 99, 235, 0.1);
          transform: translateY(-4px);
        }

        .case-card.reversed {
          grid-template-columns: 1.2fr 1.1fr;
        }

        .case-card.reversed .case-media {
          order: 2;
        }

        .case-card.reversed .case-content {
          order: 1;
        }

        .case-media {
          position: relative;
          background: #0f172a;
          min-height: 380px;
          overflow: hidden;
        }

        .case-media-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .case-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.5s ease;
        }

        .case-card:hover .case-img {
          transform: scale(1.04);
        }

        .case-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(15, 23, 42, 0.7) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 24px;
        }

        .case-card:hover .case-hover-overlay {
          opacity: 1;
        }

        .case-hover-btn {
          background: #2563eb;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }

        .case-content {
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #f8fafc;
        }

        .case-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .case-number-badge {
          font-size: 11.5px;
          font-weight: 700;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.2);
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .case-role {
          font-size: 12.5px;
          color: #64748b;
        }

        .case-role strong {
          color: #1e293b;
        }

        .case-title-link {
          text-decoration: none;
        }

        .case-title {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
          font-family: var(--font-heading, 'Ubuntu', sans-serif);
          transition: color 0.2s ease;
        }

        .case-title:hover {
          color: #2563eb;
        }

        .case-subtitle {
          font-size: 13.5px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 16px;
        }

        .case-summary {
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 20px;
        }

        .case-arch-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
        }

        .arch-header {
          font-size: 12px;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .text-blue {
          color: #2563eb;
        }

        .arch-text {
          font-size: 13px;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
        }

        .tech-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }

        .tech-badge {
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .case-actions-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        /* Additional Projects */
        .additional-projects-wrapper {
          margin-top: 70px;
          padding-top: 40px;
          border-top: 1px solid #e2e8f0;
        }

        .addl-header {
          margin-bottom: 28px;
        }

        .addl-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .addl-subtitle {
          font-size: 14px;
          color: #64748b;
        }

        .addl-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .addl-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          transition: all 0.25s ease;
        }

        .addl-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.08);
          transform: translateY(-2px);
        }

        .addl-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .addl-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .addl-repo-link {
          color: #64748b;
          font-size: 20px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .addl-repo-link:hover {
          color: #0f172a;
        }

        .addl-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 16px;
        }

        .tech-badge-sm {
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .addl-card-bottom {
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .addl-details-btn {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s ease;
        }

        .addl-details-btn:hover {
          gap: 10px;
          color: #1d4ed8;
        }

        @media (max-width: 992px) {
          .case-card,
          .case-card.reversed {
            grid-template-columns: 1fr;
          }

          .case-card.reversed .case-media {
            order: 1;
          }

          .case-card.reversed .case-content {
            order: 2;
          }

          .case-media {
            min-height: 280px;
          }

          .case-content {
            padding: 28px 24px;
          }

          .addl-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
