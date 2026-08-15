import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import BackgroundAnimation from "@/components/BackgroundAnimation"
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

  // Fetch profile for footer & other projects
  const [{ data: profile }, { data: otherProjects }] = await Promise.all([
    supabase.from("profile").select("*").maybeSingle(),
    supabase
      .from("projects")
      .select("id, slug, title, summary, icon, accent_gradient, category")
      .neq("slug", slug)
      .eq("is_published", true)
      .limit(3),
  ])

  const fullName = profile?.full_name || "Mathan Monishan"
  const gradient = project.accent_gradient || "linear-gradient(135deg, #1b0072 0%, #2b3fa7 50%, #14b1ff 100%)"

  const hasMedia = Boolean(project.cover_image_url) || Boolean(project.gallery_urls && project.gallery_urls.length > 0)
  const isCoverVideo = project.cover_image_url ? isVideoUrl(project.cover_image_url) : false

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg-light)" }}>
      <BackgroundAnimation />

      {/* Top Header / Navigation Bar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 990,
          background: "var(--primary-color)",
          padding: "16px 0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
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
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {fullName}
          </Link>

          <Link
            href="/#projects"
            style={{
              color: "#ffffff",
              background: "rgba(255, 255, 255, 0.15)",
              padding: "8px 18px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
          >
            <i className="fas fa-arrow-left" /> Back to All Projects
          </Link>
        </div>
      </nav>

      {/* Main Project Content */}
      <main className="container" style={{ padding: "50px 30px 100px", position: "relative", zIndex: 1 }}>
        {/* Project Header Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 6px 30px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(43, 63, 167, 0.1)",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          {/* Top Banner */}
          <div
            style={{
              background: gradient,
              padding: "50px 40px",
              color: "#ffffff",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              {project.category && (
                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(5px)",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {project.category}
                </span>
              )}
              <span
                style={{
                  background: project.status === "LIVE" ? "#10b981" : "rgba(255, 255, 255, 0.3)",
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
                fontSize: "38px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h1>

            {project.subtitle && (
              <p style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.9)", marginBottom: "20px" }}>
                {project.subtitle}
              </p>
            )}

            {project.tech_stack && project.tech_stack.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                {project.tech_stack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(0, 0, 0, 0.25)",
                      color: "#ffffff",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "13px",
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
              padding: "20px 40px",
              background: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
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
                  className="btn"
                  style={{ padding: "10px 24px", fontSize: "14.5px" }}
                >
                  <i className="fas fa-external-link-alt" /> Live Demo
                </a>
              )}

              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: "10px 24px", fontSize: "14.5px" }}
                >
                  <i className="fab fa-github" /> View Code
                </a>
              )}

              {project.resource_url && (
                <a
                  href={project.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: "10px 24px", fontSize: "14.5px" }}
                >
                  <i className="fas fa-folder-open" /> {project.resource_label || "Project Files"}
                </a>
              )}
            </div>

            {project.role && (
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>
                Role: <strong style={{ color: "#1e293b" }}>{project.role}</strong>
              </span>
            )}
          </div>

          {/* Media Showcase (Cover / Video & Gallery) */}
          {hasMedia && (
            <div style={{ padding: "40px", borderBottom: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", marginBottom: "20px", fontFamily: "var(--font-heading)" }}>
                Project Media & Preview
              </h3>

              {/* Main Cover Image / Video */}
              {project.cover_image_url && (
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    marginBottom: "24px",
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

              {/* Gallery Photos / Videos Grid */}
              {project.gallery_urls && project.gallery_urls.length > 0 && (
                <div>
                  <h4 style={{ fontSize: "16px", color: "#475569", marginBottom: "14px", fontWeight: 600 }}>
                    Gallery & Screenshots
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "18px",
                    }}
                  >
                    {project.gallery_urls.map((mediaUrl: string, idx: number) => {
                      const isVid = isVideoUrl(mediaUrl)
                      return (
                        <div
                          key={idx}
                          style={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                            background: "#000000",
                          }}
                        >
                          {isVid ? (
                            <video
                              src={mediaUrl}
                              controls
                              style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={mediaUrl}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project Details / Breakdown */}
          <div style={{ padding: "40px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "40px",
              }}
            >
              {/* Left Details Column */}
              <div>
                <section style={{ padding: 0, marginBottom: "30px" }}>
                  <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
                    Overview
                  </h3>
                  <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#334155" }}>
                    {project.summary}
                  </p>
                </section>

                {project.problem && (
                  <section style={{ padding: 0, marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
                      The Problem & Challenge
                    </h3>
                    <p style={{ fontSize: "15.5px", lineHeight: "1.8", color: "#475569", whiteSpace: "pre-wrap" }}>
                      {project.problem}
                    </p>
                  </section>
                )}

                {project.solution && (
                  <section style={{ padding: 0, marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
                      The Solution & Features
                    </h3>
                    <p style={{ fontSize: "15.5px", lineHeight: "1.8", color: "#475569", whiteSpace: "pre-wrap" }}>
                      {project.solution}
                    </p>
                  </section>
                )}

                {project.outcome && (
                  <section style={{ padding: 0, marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
                      Outcome & Key Results
                    </h3>
                    <p style={{ fontSize: "15.5px", lineHeight: "1.8", color: "#475569", whiteSpace: "pre-wrap" }}>
                      {project.outcome}
                    </p>
                  </section>
                )}

                {project.body && (
                  <section style={{ padding: 0, marginBottom: "30px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
                      Full Project Description
                    </h3>
                    <div style={{ fontSize: "15.5px", lineHeight: "1.8", color: "#334155", whiteSpace: "pre-wrap" }}>
                      {project.body}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Sidebar Column */}
              <div>
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "24px",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: 0, fontWeight: 700 }}>
                    Project Information
                  </h4>

                  {project.client_name && (
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
                        Client / Organization
                      </span>
                      <p style={{ margin: "2px 0 0", fontSize: "14.5px", color: "#1e293b", fontWeight: 600 }}>
                        {project.client_name}
                      </p>
                    </div>
                  )}

                  {project.role && (
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
                        Role
                      </span>
                      <p style={{ margin: "2px 0 0", fontSize: "14.5px", color: "#1e293b", fontWeight: 600 }}>
                        {project.role}
                      </p>
                    </div>
                  )}

                  {project.started_on && (
                    <div>
                      <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
                        Timeline
                      </span>
                      <p style={{ margin: "2px 0 0", fontSize: "14.5px", color: "#1e293b", fontWeight: 500 }}>
                        {new Date(project.started_on).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        {project.completed_on
                          ? ` – ${new Date(project.completed_on).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
                          : " – Present"}
                      </p>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
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
                          borderRadius: "50%",
                          background: "#25d366",
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
                          borderRadius: "50%",
                          background: "#0077b5",
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
            <h3 style={{ fontSize: "24px", color: "var(--secondary-color)", marginBottom: "24px", fontFamily: "var(--font-heading)" }}>
              Explore Other Projects
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {otherProjects.map((op) => (
                <Link
                  key={op.id}
                  href={`/projects/${op.slug}`}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      height: "100px",
                      background: op.accent_gradient || "linear-gradient(135deg, #2b3fa7 0%, #14b1ff 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontSize: "30px",
                    }}
                  >
                    <i className={op.icon || "fas fa-code"} />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: "0 0 6px" }}>
                      {op.title}
                    </h4>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                      {op.summary.length > 70 ? op.summary.substring(0, 70) + "..." : op.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer
        fullName={fullName}
        location={profile?.location || undefined}
        email={profile?.email || undefined}
        phone={profile?.phone || undefined}
        whatsappNumber={profile?.whatsapp_number || undefined}
        bioNote={profile?.bio_short || undefined}
      />
      <ScrollToTop />
    </div>
  )
}
