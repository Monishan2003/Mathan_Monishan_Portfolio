import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

function isVideoUrl(url: string) {
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".mov") ||
    url.endsWith(".ogg") ||
    url.includes("video")
  )
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const supabase = await createServerClient()

  // Fetch project by slug
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (!project) {
    notFound()
  }

  // Fetch other projects
  const { data: otherProjects } = await supabase
    .from("projects")
    .select("id, slug, title, summary, icon, cover_image_url, category")
    .neq("slug", slug)
    .eq("is_published", true)
    .limit(3)

  const hasMedia = Boolean(project.cover_image_url) || Boolean(project.gallery_urls && project.gallery_urls.length > 0)
  const isCoverVideo = project.cover_image_url ? isVideoUrl(project.cover_image_url) : false

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--body-color, rgb(10, 10, 15))" }}>
      {/* Top Header */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 990,
          backgroundColor: "rgba(10, 10, 15, 0.95)",
          backdropFilter: "blur(12px)",
          padding: "16px 0",
          borderBottom: "1px solid var(--box-border, rgba(255, 255, 255, 0.08))",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--title-color, rgb(241, 241, 243))",
              fontSize: "20px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--skin-color, #3482ff)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              M
            </span>
            Mathan Monishan
          </Link>

          <Link
            href="/#work"
            className="button button--outline"
            style={{ padding: "0.5rem 1.2rem", fontSize: "0.88rem" }}
          >
            <i className="fas fa-arrow-left" /> Back to Projects
          </Link>
        </div>
      </nav>

      {/* Main Project Content */}
      <main className="container" style={{ padding: "50px 24px 80px", position: "relative", zIndex: 1, maxWidth: "1100px" }}>
        {/* Project Header Card */}
        <div
          style={{
            backgroundColor: "var(--box-color, rgb(22, 22, 29))",
            borderRadius: "20px",
            border: "1px solid var(--box-border, rgba(255, 255, 255, 0.08))",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Top Banner */}
          <div
            style={{
              padding: "48px 40px",
              borderBottom: "1px solid var(--box-border, rgba(255, 255, 255, 0.08))",
              background: "linear-gradient(180deg, rgba(52, 130, 255, 0.1) 0%, transparent 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              {project.category && (
                <span
                  style={{
                    background: "rgba(52, 130, 255, 0.15)",
                    color: "var(--skin-color, #3482ff)",
                    border: "1px solid rgba(52, 130, 255, 0.3)",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  {project.category}
                </span>
              )}
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {project.status || "LIVE"}
              </span>
            </div>

            <h1
              style={{
                fontSize: "36px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "var(--title-color, rgb(241, 241, 243))",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h1>

            {project.subtitle && (
              <p style={{ fontSize: "16px", color: "var(--text-color, rgb(214, 214, 220))", marginBottom: "20px" }}>
                {project.subtitle}
              </p>
            )}

            {project.tech_stack && project.tech_stack.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                {project.tech_stack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "var(--text-color, rgb(214, 214, 220))",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "12.5px",
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Links Bar */}
          <div
            style={{
              padding: "18px 40px",
              backgroundColor: "rgba(10, 10, 15, 0.4)",
              borderBottom: "1px solid var(--box-border, rgba(255, 255, 255, 0.08))",
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                  style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
                >
                  <i className="fas fa-external-link-alt" /> Live Demo
                </a>
              )}

              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--outline"
                  style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
                >
                  <i className="fab fa-github" /> View Code
                </a>
              )}
            </div>

            {project.role && (
              <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 500 }}>
                Role: <strong style={{ color: "var(--title-color)" }}>{project.role}</strong>
              </span>
            )}
          </div>

          {/* Media Showcase */}
          {hasMedia && (
            <div style={{ padding: "40px", borderBottom: "1px solid var(--box-border, rgba(255, 255, 255, 0.08))" }}>
              <h3 style={{ fontSize: "20px", color: "var(--title-color)", marginBottom: "20px" }}>
                Project Media & Preview
              </h3>

              {project.cover_image_url && (
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid var(--box-border)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    background: "#000000",
                  }}
                >
                  {isCoverVideo ? (
                    <video
                      src={project.cover_image_url}
                      controls
                      style={{ width: "100%", maxHeight: "550px", display: "block" }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      style={{ width: "100%", maxHeight: "550px", objectFit: "cover", display: "block" }}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Project Details Breakdown */}
          <div style={{ padding: "40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
              <div>
                <section style={{ marginBottom: "30px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--skin-color)", marginBottom: "10px" }}>
                    Overview
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: "1.8", color: "var(--text-color)" }}>
                    {project.summary}
                  </p>
                </section>

                {project.problem && (
                  <section style={{ marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "18px", color: "var(--skin-color)", marginBottom: "10px" }}>
                      The Problem & Challenge
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: "1.8", color: "var(--text-color)", whiteSpace: "pre-wrap" }}>
                      {project.problem}
                    </p>
                  </section>
                )}

                {project.solution && (
                  <section style={{ marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "18px", color: "var(--skin-color)", marginBottom: "10px" }}>
                      The Solution & Architecture
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: "1.8", color: "var(--text-color)", whiteSpace: "pre-wrap" }}>
                      {project.solution}
                    </p>
                  </section>
                )}

                {project.outcome && (
                  <section style={{ marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "18px", color: "var(--skin-color)", marginBottom: "10px" }}>
                      Outcome & Key Results
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: "1.8", color: "var(--text-color)", whiteSpace: "pre-wrap" }}>
                      {project.outcome}
                    </p>
                  </section>
                )}
              </div>

              {/* Sidebar Info */}
              <div>
                <div
                  style={{
                    backgroundColor: "rgba(10, 10, 15, 0.6)",
                    padding: "24px",
                    borderRadius: "14px",
                    border: "1px solid var(--box-border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <h4 style={{ fontSize: "16px", color: "var(--title-color)", margin: 0, fontWeight: 600 }}>
                    Project Information
                  </h4>

                  {project.role && (
                    <div>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                        Role
                      </span>
                      <p style={{ margin: "2px 0 0", fontSize: "14.5px", color: "var(--title-color)", fontWeight: 600 }}>
                        {project.role}
                      </p>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Share Project
                    </span>
                    <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Check out ${project.title} by Mathan Monishan: ${project.live_url || ""}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          backgroundColor: "#25d366",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                        }}
                      >
                        <i className="fab fa-whatsapp" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(project.live_url || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          backgroundColor: "#0077b5",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                        }}
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Recommendation */}
        {otherProjects && otherProjects.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h3 style={{ fontSize: "22px", color: "var(--title-color)", marginBottom: "24px" }}>
              Explore Other Projects
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {otherProjects.map((op) => (
                <Link
                  key={op.id}
                  href={`/projects/${op.slug}`}
                  style={{
                    backgroundColor: "var(--box-color, rgb(22, 22, 29))",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid var(--box-border)",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <h4 style={{ fontSize: "16px", color: "var(--title-color)", margin: "0 0 8px" }}>
                      {op.title}
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--text-color)", margin: 0 }}>
                      {op.summary.length > 80 ? op.summary.substring(0, 80) + "..." : op.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
