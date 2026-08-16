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
    <section id="work" className="section-wrapper bg-white border-y border-slate-200/80">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="section-label">
            <i className="fas fa-layer-group text-blue-600 text-xs" />
            <span>Selected Work & Case Studies</span>
          </div>
          <h2 className="section-headline">
            Engineering Production Systems
          </h2>
          <p className="section-subtext">
            A curated selection of production applications, AI systems, and enterprise software built with focus on architecture, performance, and real-world impact.
          </p>
        </div>

        {/* Featured Case Studies Grid (Large Cards) */}
        <div className="space-y-16">
          {featuredProjects.map((project, index) => {
            const projectSlug = project.slug || `project-${project.id}`
            const isEven = index % 2 === 1

            return (
              <div
                key={project.id}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 overflow-hidden bg-slate-900 relative min-h-[300px] lg:min-h-[420px] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="block w-full h-full relative"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.cover_image_url || "/projects/pynimox.jpg"}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <span className="text-white text-sm font-semibold inline-flex items-center gap-2 bg-blue-600 px-3.5 py-1.5 rounded-lg shadow-md">
                          <span>Read Full Case Study</span>
                          <i className="fas fa-arrow-right text-xs" />
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Details Column */}
                  <div
                    className={`lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-md">
                          0{index + 1} / Case Study
                        </span>
                        {project.role && (
                          <span className="text-xs text-slate-500 font-medium">
                            Role: <strong className="text-slate-700">{project.role}</strong>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/projects/${projectSlug}`} className="text-decoration-none">
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                          {project.title}
                        </h3>
                      </Link>

                      {project.subtitle && (
                        <p className="text-sm font-semibold text-slate-500 mb-4">
                          {project.subtitle}
                        </p>
                      )}

                      {/* Summary */}
                      <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                        {project.summary}
                      </p>

                      {/* Problem & Solution Snippet */}
                      {project.solution && (
                        <div className="bg-white border border-slate-200/80 rounded-xl p-4 mb-6 shadow-xs">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                            <i className="fas fa-cogs text-blue-600 text-xs" />
                            <span>Architecture & Solution</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-normal">
                            {project.solution}
                          </p>
                        </div>
                      )}

                      {/* Tech Chips */}
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {project.tech_stack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-xs font-medium bg-white text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/70">
                      <Link
                        href={`/projects/${projectSlug}`}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                      >
                        <i className="fas fa-file-alt text-xs" />
                        <span>Case Study Details</span>
                      </Link>

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 text-xs font-semibold px-3.5 py-2.5 rounded-lg transition-colors"
                        >
                          <i className="fas fa-external-link-alt text-xs" />
                          <span>Live Site</span>
                        </a>
                      )}

                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold px-3.5 py-2.5 rounded-lg transition-colors"
                        >
                          <i className="fab fa-github text-xs" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Projects (Secondary Grid) */}
        {additionalProjects.length > 0 && (
          <div className="mt-20">
            <div className="border-t border-slate-200 pt-12 mb-8">
              <h3 className="text-xl font-bold text-slate-900">
                Additional Technical Projects
              </h3>
              <p className="text-sm text-slate-500">
                Foundational explorations in web design, algorithms, and CLI automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalProjects.map((proj) => {
                const projSlug = proj.slug || `project-${proj.id}`
                return (
                  <div
                    key={proj.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-slate-900">
                          {proj.title}
                        </h4>
                        {proj.repo_url && (
                          <a
                            href={proj.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-slate-900"
                            aria-label="GitHub Repository"
                          >
                            <i className="fab fa-github text-lg" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        {proj.summary}
                      </p>
                      {proj.tech_stack && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.tech_stack.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/projects/${projSlug}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <i className="fas fa-chevron-right text-[10px]" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
