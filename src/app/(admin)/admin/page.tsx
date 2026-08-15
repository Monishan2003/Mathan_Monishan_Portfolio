"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface ProfileType {
  id?: string
  full_name?: string
  headline?: string
  hero_intro?: string
  roles?: string[] | string
  bio_short?: string
  bio_long?: string
  location?: string
  email?: string
  phone?: string
  whatsapp_number?: string
  whatsapp_message?: string
  avatar_url?: string
  resume_url?: string
}

interface ProjectType {
  id?: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  status?: string
  summary: string
  problem?: string
  solution?: string
  outcome?: string
  body?: string
  tech_stack?: string[] | string
  repo_url?: string
  live_url?: string
  resource_url?: string
  resource_label?: string
  icon?: string
  accent_gradient?: string
  cover_image_url?: string
  gallery_urls?: string[]
  role?: string
  client_name?: string
  sort_order?: number
  is_published?: boolean
}

interface EducationType {
  id?: string
  degree: string
  institution: string
  field_of_study?: string
  start_date?: string
  end_date?: string
  is_current?: boolean
  description?: string
  icon?: string
  sort_order?: number
  is_published?: boolean
}

interface CertificationType {
  id?: string
  title: string
  issuer: string
  issue_date?: string
  credential_url?: string
  description?: string
  icon?: string
  sort_order?: number
  is_published?: boolean
}

interface SkillCategoryType {
  id?: string
  name: string
  icon?: string
  sort_order?: number
  is_published?: boolean
}

interface SkillType {
  id?: string
  name: string
  icon?: string
  category_id?: string
  sort_order?: number
  is_published?: boolean
}

interface SocialLinkType {
  id?: string
  platform: string
  label?: string
  url: string
  icon?: string
  sort_order?: number
  is_published?: boolean
}

interface ContactMessageType {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED" | "SPAM"
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "projects" | "education" | "skills" | "socials" | "messages"
  >("overview")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Data states
  const [profile, setProfile] = useState<ProfileType>({})
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [education, setEducation] = useState<EducationType[]>([])
  const [certifications, setCertifications] = useState<CertificationType[]>([])
  const [categories, setCategories] = useState<SkillCategoryType[]>([])
  const [skills, setSkills] = useState<SkillType[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([])
  const [messages, setMessages] = useState<ContactMessageType[]>([])

  // Modal / Editing states
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null)
  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null)
  const [editingCert, setEditingCert] = useState<CertificationType | null>(null)
  const [editingSkill, setEditingSkill] = useState<SkillType | null>(null)
  const [editingCategory, setEditingCategory] = useState<SkillCategoryType | null>(null)
  const [editingSocial, setEditingSocial] = useState<SocialLinkType | null>(null)

  // File upload refs
  const cvInputRef = useRef<HTMLInputElement | null>(null)
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const projectCoverInputRef = useRef<HTMLInputElement | null>(null)
  const projectGalleryInputRef = useRef<HTMLInputElement | null>(null)

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg)
    setToastType(type)
    setTimeout(() => setToastMessage(null), 4000)
  }, [])

  // Fetch all admin data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [
        { data: prof },
        { data: projs },
        { data: edu },
        { data: certs },
        { data: cats },
        { data: sks },
        { data: socs },
        { data: msgs },
      ] = await Promise.all([
        supabase.from("profile").select("*").maybeSingle(),
        supabase.from("projects").select("*").order("sort_order", { ascending: true }),
        supabase.from("education").select("*").order("sort_order", { ascending: true }),
        supabase.from("certifications").select("*").order("sort_order", { ascending: true }),
        supabase.from("skill_categories").select("*").order("sort_order", { ascending: true }),
        supabase.from("skills").select("*").order("sort_order", { ascending: true }),
        supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ])

      if (prof) setProfile(prof as ProfileType)
      if (projs) setProjects((projs as ProjectType[]) || [])
      if (edu) setEducation((edu as EducationType[]) || [])
      if (certs) setCertifications((certs as CertificationType[]) || [])
      if (cats) setCategories((cats as SkillCategoryType[]) || [])
      if (sks) setSkills((sks as SkillType[]) || [])
      if (socs) setSocialLinks((socs as SocialLinkType[]) || [])
      if (msgs) setMessages((msgs as ContactMessageType[]) || [])
    } catch (err: unknown) {
      console.error("Fetch data error:", err)
      showToast("Failed to load portfolio data", "error")
    } finally {
      setLoading(false)
    }
  }, [supabase, showToast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  // Admin action helper
  const performAction = async (action: string, table?: string, data?: unknown, id?: string) => {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, table, data, id }),
      })
      const result = await res.json()
      if (!res.ok || result.error) {
        throw new Error(result.error || "Action failed")
      }
      showToast("Changes saved successfully!")
      await fetchData()
      return true
    } catch (err: unknown) {
      console.error("Action error:", err)
      const message = err instanceof Error ? err.message : "Failed to perform action"
      showToast(message, "error")
      return false
    } finally {
      setSaving(false)
    }
  }

  // File Upload Helper
  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", bucket)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const result = await res.json()
      if (!res.ok || result.error) {
        throw new Error(result.error || "Upload failed")
      }

      showToast(`Uploaded ${file.name} successfully!`)
      return result.url
    } catch (err: unknown) {
      console.error("Upload error:", err)
      const message = err instanceof Error ? err.message : "Failed to upload file"
      showToast(message, "error")
      return null
    } finally {
      setUploading(false)
    }
  }

  // Handle CV Upload
  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadFile(file, "documents")
    if (url) {
      const updated = { ...profile, resume_url: url }
      setProfile(updated)
      await performAction("update_profile", undefined, updated)
    }
  }

  // Handle Avatar Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadFile(file, "avatars")
    if (url) {
      const updated = { ...profile, avatar_url: url }
      setProfile(updated)
      await performAction("update_profile", undefined, updated)
    }
  }

  // Handle Project Cover Upload (Photo or Video)
  const handleProjectCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProject) return
    const url = await uploadFile(file, "projects")
    if (url) {
      setEditingProject({
        ...editingProject,
        cover_image_url: url,
      })
    }
  }

  // Handle Project Gallery Upload (Photos or Videos)
  const handleProjectGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0 || !editingProject) return

    const newUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i], "projects")
      if (url) newUrls.push(url)
    }

    const currentGallery = editingProject.gallery_urls || []
    setEditingProject({
      ...editingProject,
      gallery_urls: [...currentGallery, ...newUrls],
    })
  }

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...profile,
      roles: typeof profile.roles === "string"
        ? profile.roles.split(",").map((s: string) => s.trim()).filter(Boolean)
        : profile.roles,
    }
    await performAction("update_profile", undefined, payload)
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <i className="fas fa-spinner fa-spin" style={{ fontSize: "32px", color: "var(--primary-color)" }} />
        <p style={{ color: "#64748b", fontWeight: 500 }}>Loading Admin Dashboard...</p>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: toastType === "success" ? "#10b981" : "#ef4444",
            color: "#ffffff",
            padding: "14px 24px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 500,
            fontSize: "14.5px",
          }}
        >
          <i className={`fas ${toastType === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #090642 0%, #1b0072 100%)",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--accent-color)",
              color: "#090642",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <i className="fas fa-sliders-h" />
          </div>
          <div>
            <h2 style={{ fontSize: "16px", margin: 0, color: "#ffffff" }}>Moni Admin</h2>
            <span style={{ fontSize: "12px", color: "var(--accent-color)" }}>Control Panel</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
          {[
            { id: "overview", label: "Overview", icon: "fas fa-chart-pie" },
            { id: "profile", label: "Profile & CV", icon: "fas fa-user-edit" },
            { id: "projects", label: "Projects & Media", icon: "fas fa-briefcase", count: projects.length },
            { id: "education", label: "Education & Certs", icon: "fas fa-graduation-cap", count: education.length + certifications.length },
            { id: "skills", label: "Skills", icon: "fas fa-tools", count: skills.length },
            { id: "socials", label: "Social Links", icon: "fas fa-share-alt", count: socialLinks.length },
            { id: "messages", label: "Inquiries Inbox", icon: "fas fa-envelope", count: messages.filter((m) => m.status === "NEW").length },
          ].map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive ? "rgba(20, 177, 255, 0.2)" : "transparent",
                  color: isActive ? "var(--accent-color)" : "rgba(255, 255, 255, 0.75)",
                  fontSize: "14.5px",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  marginBottom: "4px",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <i className={tab.icon} style={{ width: "18px", textAlign: "center" }} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    style={{
                      background: tab.id === "messages" ? "#ef4444" : "rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              fontSize: "13.5px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <i className="fas fa-external-link-alt" /> View Live Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px",
              borderRadius: "8px",
              background: "transparent",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-sign-out-alt" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "36px", overflowY: "auto" }}>
        {/* Top Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "30px",
            background: "#ffffff",
            padding: "20px 28px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div>
            <h1 style={{ fontSize: "24px", color: "var(--secondary-color)", margin: 0 }}>
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "profile" && "Profile & Direct CV Upload"}
              {activeTab === "projects" && "Projects & Photos/Videos Management"}
              {activeTab === "education" && "Education & Certifications"}
              {activeTab === "skills" && "Skills & Categories"}
              {activeTab === "socials" && "Social Media Links"}
              {activeTab === "messages" && "Contact Messages Inbox"}
            </h1>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
              Welcome back, Mathan Monishan
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {uploading && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: "#eff6ff",
                  color: "#3b82f6",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <i className="fas fa-spinner fa-spin" /> Uploading to Supabase...
              </span>
            )}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "20px",
                background: "#e6f9ed",
                color: "#10b981",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <span
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }}
              />
              Supabase Connected
            </span>
          </div>
        </header>

        {/* 1. TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            {/* Quick Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {[
                { title: "Total Projects", value: projects.length, icon: "fas fa-briefcase", color: "#3b82f6", tab: "projects" },
                { title: "Skill Count", value: skills.length, icon: "fas fa-tools", color: "#10b981", tab: "skills" },
                { title: "Education & Certs", value: education.length + certifications.length, icon: "fas fa-graduation-cap", color: "#8b5cf6", tab: "education" },
                { title: "Unread Messages", value: messages.filter((m) => m.status === "NEW").length, icon: "fas fa-envelope-open-text", color: "#ef4444", tab: "messages" },
              ].map((stat, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(stat.tab as typeof activeTab)}
                  style={{
                    background: "#ffffff",
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                      {stat.title}
                    </span>
                    <h3 style={{ fontSize: "32px", color: "#1e293b", margin: "6px 0 0", fontFamily: "var(--font-heading)" }}>
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: `${stat.color}15`,
                      color: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    <i className={stat.icon} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Messages Preview */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Recent Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab("messages")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  View All ({messages.length}) →
                </button>
              </div>

              {messages.length === 0 ? (
                <p style={{ color: "#64748b", textAlign: "center", padding: "30px 0" }}>
                  No messages received yet. Submit a test message through the public contact form!
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {messages.slice(0, 5).map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: "16px",
                        borderRadius: "10px",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <strong style={{ fontSize: "15px", color: "#1e293b" }}>{m.name}</strong>
                          <span style={{ fontSize: "13px", color: "#64748b" }}>&lt;{m.email}&gt;</span>
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontWeight: 600,
                              background: m.status === "NEW" ? "#fee2e2" : "#e2e8f0",
                              color: m.status === "NEW" ? "#ef4444" : "#475569",
                            }}
                          >
                            {m.status}
                          </span>
                        </div>
                        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#334155" }}>
                          <strong>{m.subject}:</strong> {m.message.length > 80 ? m.message.substring(0, 80) + "..." : m.message}
                        </p>
                      </div>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                        {new Date(m.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. TAB: PROFILE & BIO + CV UPLOAD */}
        {activeTab === "profile" && (
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Direct CV & Avatar Upload Box */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                padding: "20px",
                background: "#f0f9ff",
                borderRadius: "12px",
                border: "1.5px dashed #38bdf8",
                marginBottom: "24px",
              }}
            >
              {/* CV / Resume Upload Box */}
              <div>
                <h4 style={{ fontSize: "15px", color: "#0369a1", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fas fa-file-pdf" style={{ fontSize: "18px", color: "#ef4444" }} />
                  Direct CV / Resume Upload
                </h4>
                <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px" }}>
                  Upload your CV (PDF or Doc) directly to Supabase storage.
                </p>
                <input
                  type="file"
                  ref={cvInputRef}
                  onChange={handleCVUpload}
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                />
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => cvInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      background: "var(--primary-color)",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i className="fas fa-upload" /> Select & Upload CV (PDF)
                  </button>
                  {profile.resume_url && (
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: "13px", color: "#0284c7", fontWeight: 600 }}
                    >
                      <i className="fas fa-external-link-alt" /> Test CV Link
                    </a>
                  )}
                </div>
              </div>

              {/* Avatar Photo Upload Box */}
              <div>
                <h4 style={{ fontSize: "15px", color: "#0369a1", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fas fa-image" style={{ fontSize: "18px", color: "#3b82f6" }} />
                  Profile Photo Upload
                </h4>
                <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px" }}>
                  Upload a profile picture for your About & Hero section.
                </p>
                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      background: "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i className="fas fa-camera" /> Upload Photo
                  </button>
                  {profile.avatar_url && (
                    <span style={{ fontSize: "12.5px", color: "#64748b" }}>
                      Current: {profile.avatar_url.split("/").pop()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.full_name || ""}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    required
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                    Hero Intro Line
                  </label>
                  <input
                    type="text"
                    value={profile.hero_intro || ""}
                    onChange={(e) => setProfile({ ...profile, hero_intro: e.target.value })}
                    placeholder="Hello, my name is"
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                  Rotating Typewriter Roles (comma-separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(profile.roles) ? profile.roles.join(", ") : profile.roles || ""}
                  onChange={(e) => setProfile({ ...profile, roles: e.target.value })}
                  placeholder="Full Stack Developer, Mobile App Developer, UI/UX Designer"
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                    Phone (Display)
                  </label>
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+94 76 763 4359"
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                    WhatsApp Number (Digits only)
                  </label>
                  <input
                    type="text"
                    value={profile.whatsapp_number || ""}
                    onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
                    placeholder="94767634359"
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Thalaimannar, Mannar, Sri Lanka"
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                  Resume / CV URL (Updated automatically upon upload)
                </label>
                <input
                  type="text"
                  value={profile.resume_url || ""}
                  onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
                  placeholder="https://..."
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                  About Bio (Short Paragraph)
                </label>
                <textarea
                  rows={2}
                  value={profile.bio_short || ""}
                  onChange={(e) => setProfile({ ...profile, bio_short: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                  About Bio (Full Content - separate paragraphs with empty line)
                </label>
                <textarea
                  rows={5}
                  value={profile.bio_long || ""}
                  onChange={(e) => setProfile({ ...profile, bio_long: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn"
                  style={{ padding: "12px 30px" }}
                >
                  {saving ? (
                    <>
                      <i className="fas fa-spinner fa-spin" /> Saving Changes...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save" /> Save Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. TAB: PROJECTS & PHOTOS/VIDEOS */}
        {activeTab === "projects" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  All Projects ({projects.length})
                </h3>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  Click any project to edit details, upload photos/videos, or view its dedicated page.
                </span>
              </div>
              <button
                onClick={() =>
                  setEditingProject({
                    title: "",
                    slug: `project-${Date.now()}`,
                    category: "Web App",
                    summary: "",
                    tech_stack: [],
                    repo_url: "",
                    live_url: "",
                    icon: "fas fa-code",
                    accent_gradient: "linear-gradient(135deg, #2b3fa7 0%, #14b1ff 100%)",
                    gallery_urls: [],
                    sort_order: projects.length + 1,
                    is_published: true,
                  })
                }
                className="btn"
                style={{ padding: "8px 20px", fontSize: "14px" }}
              >
                <i className="fas fa-plus" /> Add New Project
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
              {projects.map((proj) => {
                const hasCover = Boolean(proj.cover_image_url)
                const isVid = proj.cover_image_url?.endsWith(".mp4") || proj.cover_image_url?.endsWith(".webm")

                return (
                  <div
                    key={proj.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        height: "140px",
                        background: hasCover && !isVid ? "none" : proj.accent_gradient || "linear-gradient(135deg, #2b3fa7 0%, #14b1ff 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontSize: "36px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {hasCover ? (
                        isVid ? (
                          <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <video src={proj.cover_image_url} muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <span style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "#fff", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" }}>
                              <i className="fas fa-video" /> Video
                            </span>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={proj.cover_image_url} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )
                      ) : (
                        <i className={proj.icon || "fas fa-code"} />
                      )}
                    </div>

                    <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <h4 style={{ fontSize: "17px", color: "var(--secondary-color)", margin: 0 }}>
                          {proj.title}
                        </h4>
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontWeight: 600,
                            background: proj.is_published ? "#e6f9ed" : "#f1f5f9",
                            color: proj.is_published ? "#10b981" : "#64748b",
                          }}
                        >
                          {proj.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p style={{ fontSize: "13.5px", color: "#64748b", flex: 1, marginBottom: "14px" }}>
                        {proj.summary}
                      </p>

                      <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                        <Link
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            background: "#f1f5f9",
                            color: "#334155",
                            fontSize: "13px",
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            textDecoration: "none",
                          }}
                          title="View Detail Page"
                        >
                          <i className="fas fa-eye" />
                        </Link>
                        <button
                          onClick={() => setEditingProject({ ...proj })}
                          style={{
                            flex: 1,
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid var(--primary-color)",
                            background: "transparent",
                            color: "var(--primary-color)",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-edit" /> Edit / Upload Media
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              await performAction("delete", "projects", undefined, proj.id)
                            }
                          }}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "1px solid #fecaca",
                            background: "#fee2e2",
                            color: "#ef4444",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Project Edit & Upload Media Modal */}
            {editingProject && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    width: "100%",
                    maxWidth: "750px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", margin: 0 }}>
                      {editingProject.id ? "Edit Project & Media" : "New Project"}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      style={{ border: "none", background: "transparent", fontSize: "20px", color: "#94a3b8", cursor: "pointer" }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>

                  {/* MEDIA UPLOAD SECTION */}
                  <div
                    style={{
                      background: "#f8fafc",
                      padding: "20px",
                      borderRadius: "12px",
                      border: "1.5px solid #e2e8f0",
                      marginBottom: "20px",
                    }}
                  >
                    <h4 style={{ fontSize: "15px", color: "var(--secondary-color)", margin: "0 0 12px", fontWeight: 700 }}>
                      <i className="fas fa-photo-video" style={{ color: "var(--primary-color)", marginRight: "6px" }} />
                      Project Cover & Video Demo
                    </h4>

                    {/* Cover Media Uploader */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "16px" }}>
                      <input
                        type="file"
                        ref={projectCoverInputRef}
                        onChange={handleProjectCoverUpload}
                        accept="image/*,video/*"
                        style={{ display: "none" }}
                      />
                      <button
                        type="button"
                        onClick={() => projectCoverInputRef.current?.click()}
                        disabled={uploading}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: "1px solid var(--primary-color)",
                          background: "rgba(43, 63, 167, 0.08)",
                          color: "var(--primary-color)",
                          fontWeight: 600,
                          fontSize: "13px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="fas fa-upload" /> Upload Cover Photo / Video
                      </button>

                      {editingProject.cover_image_url && (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "12.5px", color: "#10b981", fontWeight: 600 }}>
                            <i className="fas fa-check-circle" /> Media Uploaded
                          </span>
                          <button
                            type="button"
                            onClick={() => setEditingProject({ ...editingProject, cover_image_url: undefined })}
                            style={{ border: "none", background: "transparent", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Gallery Photos & Videos Uploader */}
                    <div>
                      <label style={{ display: "block", fontSize: "13.5px", fontWeight: 600, marginBottom: "6px", color: "#334155" }}>
                        Gallery Screenshots & Video Clips
                      </label>
                      <input
                        type="file"
                        ref={projectGalleryInputRef}
                        onChange={handleProjectGalleryUpload}
                        accept="image/*,video/*"
                        multiple
                        style={{ display: "none" }}
                      />
                      <button
                        type="button"
                        onClick={() => projectGalleryInputRef.current?.click()}
                        disabled={uploading}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "6px",
                          border: "1px dashed #94a3b8",
                          background: "#ffffff",
                          color: "#475569",
                          fontWeight: 500,
                          fontSize: "12.5px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="fas fa-plus-circle" /> Add Gallery Photos / Videos
                      </button>

                      {editingProject.gallery_urls && editingProject.gallery_urls.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
                          {editingProject.gallery_urls.map((gUrl, gIdx) => {
                            const isVid = gUrl.endsWith(".mp4") || gUrl.endsWith(".webm")
                            return (
                              <div
                                key={gIdx}
                                style={{
                                  position: "relative",
                                  width: "90px",
                                  height: "60px",
                                  borderRadius: "6px",
                                  overflow: "hidden",
                                  border: "1px solid #cbd5e1",
                                  background: "#000",
                                }}
                              >
                                {isVid ? (
                                  <video src={gUrl} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={gUrl} alt="gallery thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = (editingProject.gallery_urls || []).filter((_, idx) => idx !== gIdx)
                                    setEditingProject({ ...editingProject, gallery_urls: next })
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "2px",
                                    right: "2px",
                                    background: "rgba(239, 68, 68, 0.9)",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const techArr = Array.isArray(editingProject.tech_stack)
                        ? editingProject.tech_stack
                        : typeof editingProject.tech_stack === "string"
                        ? editingProject.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
                        : []

                      const payload = {
                        ...editingProject,
                        tech_stack: techArr,
                      }
                      const ok = await performAction("upsert", "projects", payload, editingProject.id)
                      if (ok) setEditingProject(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          Slug (URL: /projects/[slug])
                        </label>
                        <input
                          type="text"
                          value={editingProject.slug || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          required
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          Category
                        </label>
                        <input
                          type="text"
                          value={editingProject.category || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Summary (Card blurb)
                      </label>
                      <textarea
                        rows={2}
                        value={editingProject.summary || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    {/* DETAIL PAGE BREAKDOWN FIELDS */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          Problem / Challenge Description
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.problem || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                          placeholder="What problem was this project solving?"
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          Solution & Key Features
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.solution || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                          placeholder="What architecture/solution was implemented?"
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Outcome / Results
                      </label>
                      <textarea
                        rows={2}
                        value={editingProject.outcome || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                        placeholder="Impact, metric improvements, or achievements"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Tech Stack (comma-separated, e.g. React, Next.js, Python)
                      </label>
                      <input
                        type="text"
                        value={Array.isArray(editingProject.tech_stack) ? editingProject.tech_stack.join(", ") : editingProject.tech_stack || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, tech_stack: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          GitHub Repo URL
                        </label>
                        <input
                          type="text"
                          value={editingProject.repo_url || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, repo_url: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          Live Demo URL
                        </label>
                        <input
                          type="text"
                          value={editingProject.live_url || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          FontAwesome Icon (e.g. fas fa-hotel)
                        </label>
                        <input
                          type="text"
                          value={editingProject.icon || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, icon: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          Accent Gradient CSS
                        </label>
                        <input
                          type="text"
                          value={editingProject.accent_gradient || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, accent_gradient: e.target.value })}
                          placeholder="linear-gradient(135deg, #4a6fc7 0%, #3f51b5 100%)"
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={editingProject.is_published}
                          onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                        />
                        <span>Published</span>
                      </label>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button type="submit" disabled={saving || uploading} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save Project"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. TAB: EDUCATION & CERTS */}
        {activeTab === "education" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Education section */}
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Education Degrees ({education.length})
                </h3>
                <button
                  onClick={() =>
                    setEditingEducation({
                      degree: "",
                      institution: "",
                      field_of_study: "",
                      start_date: "2024-01-01",
                      is_current: true,
                      description: "",
                      icon: "fas fa-university",
                      sort_order: education.length + 1,
                      is_published: true,
                    })
                  }
                  className="btn"
                  style={{ padding: "6px 16px", fontSize: "13px" }}
                >
                  <i className="fas fa-plus" /> Add Education
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {education.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "16px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: "0 0 4px" }}>
                        {item.degree}
                      </h4>
                      <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--primary-color)", fontWeight: 500 }}>
                        {item.institution}
                      </p>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>
                        {item.is_current ? "In Progress" : "Completed"}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => setEditingEducation({ ...item })}
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", cursor: "pointer", fontSize: "13px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete "${item.degree}"?`)) {
                            await performAction("delete", "education", undefined, item.id)
                          }
                        }}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fee2e2", color: "#ef4444", cursor: "pointer", fontSize: "13px" }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications section */}
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Certifications ({certifications.length})
                </h3>
                <button
                  onClick={() =>
                    setEditingCert({
                      title: "",
                      issuer: "",
                      issue_date: "2024-10-01",
                      credential_url: "",
                      description: "",
                      icon: "fas fa-certificate",
                      sort_order: certifications.length + 1,
                      is_published: true,
                    })
                  }
                  className="btn"
                  style={{ padding: "6px 16px", fontSize: "13px" }}
                >
                  <i className="fas fa-plus" /> Add Certification
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {certifications.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "16px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: "0 0 4px" }}>
                        {item.title}
                      </h4>
                      <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--primary-color)", fontWeight: 500 }}>
                        {item.issuer}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => setEditingCert({ ...item })}
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", cursor: "pointer", fontSize: "13px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete "${item.title}"?`)) {
                            await performAction("delete", "certifications", undefined, item.id)
                          }
                        }}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fee2e2", color: "#ef4444", cursor: "pointer", fontSize: "13px" }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Edit Modal */}
            {editingEducation && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: "20px",
                }}
              >
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "550px", borderRadius: "16px", padding: "26px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", marginBottom: "16px" }}>
                    {editingEducation.id ? "Edit Education" : "New Education"}
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "education", editingEducation, editingEducation.id)
                      if (ok) setEditingEducation(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Degree Title</label>
                      <input
                        type="text"
                        value={editingEducation.degree || ""}
                        onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Institution</label>
                      <input
                        type="text"
                        value={editingEducation.institution || ""}
                        onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Description</label>
                      <textarea
                        rows={3}
                        value={editingEducation.description || ""}
                        onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={editingEducation.is_current}
                        onChange={(e) => setEditingEducation({ ...editingEducation, is_current: e.target.checked })}
                      />
                      <span>Currently in progress</span>
                    </label>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingEducation(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Certification Edit Modal */}
            {editingCert && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: "20px",
                }}
              >
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "550px", borderRadius: "16px", padding: "26px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", marginBottom: "16px" }}>
                    {editingCert.id ? "Edit Certification" : "New Certification"}
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "certifications", editingCert, editingCert.id)
                      if (ok) setEditingCert(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Course / Cert Title</label>
                      <input
                        type="text"
                        value={editingCert.title || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Issuer</label>
                      <input
                        type="text"
                        value={editingCert.issuer || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Verification Link (URL)</label>
                      <input
                        type="text"
                        value={editingCert.credential_url || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Description</label>
                      <textarea
                        rows={3}
                        value={editingCert.description || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingCert(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. TAB: SKILLS */}
        {activeTab === "skills" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                Skills Management
              </h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() =>
                    setEditingCategory({
                      name: "",
                      icon: "fas fa-code",
                      sort_order: categories.length + 1,
                      is_published: true,
                    })
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid var(--primary-color)",
                    background: "transparent",
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  <i className="fas fa-folder-plus" /> New Category
                </button>
                <button
                  onClick={() =>
                    setEditingSkill({
                      name: "",
                      icon: "fas fa-code",
                      category_id: categories[0]?.id || "",
                      sort_order: skills.length + 1,
                      is_published: true,
                    })
                  }
                  className="btn"
                  style={{ padding: "8px 16px", fontSize: "13px" }}
                >
                  <i className="fas fa-plus" /> Add Skill
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category_id === cat.id)
                return (
                  <div
                    key={cat.id}
                    style={{
                      background: "#ffffff",
                      padding: "24px",
                      borderRadius: "16px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <h4 style={{ fontSize: "17px", color: "var(--secondary-color)", margin: 0 }}>
                        <i className={cat.icon || "fas fa-folder"} /> {cat.name}
                      </h4>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete category "${cat.name}" and all its skills?`)) {
                            await performAction("delete", "skill_categories", undefined, cat.id)
                          }
                        }}
                        style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer" }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {catSkills.map((skill) => (
                        <div
                          key={skill.id}
                          style={{
                            background: "#f1f5f9",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          <i className={skill.icon || "fas fa-check"} />
                          <span>{skill.name}</span>
                          <button
                            onClick={async () => {
                              await performAction("delete", "skills", undefined, skill.id)
                            }}
                            style={{ border: "none", background: "transparent", color: "#94a3b8", cursor: "pointer", padding: "0 2px" }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Add Skill Modal */}
            {editingSkill && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: "20px",
                }}
              >
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "26px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", marginBottom: "16px" }}>
                    Add New Skill
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "skills", editingSkill, editingSkill.id)
                      if (ok) setEditingSkill(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Skill Name</label>
                      <input
                        type="text"
                        value={editingSkill.name || ""}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        required
                        placeholder="e.g. Next.js"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                      <select
                        value={editingSkill.category_id || ""}
                        onChange={(e) => setEditingSkill({ ...editingSkill, category_id: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>FontAwesome Icon</label>
                      <input
                        type="text"
                        value={editingSkill.icon || ""}
                        onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                        placeholder="fab fa-react"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingSkill(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add Category Modal */}
            {editingCategory && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: "20px",
                }}
              >
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "26px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", marginBottom: "16px" }}>
                    Add Skill Category
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "skill_categories", editingCategory, editingCategory.id)
                      if (ok) setEditingCategory(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Category Name</label>
                      <input
                        type="text"
                        value={editingCategory.name || ""}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        required
                        placeholder="e.g. Cloud & DevOps"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Icon</label>
                      <input
                        type="text"
                        value={editingCategory.icon || ""}
                        onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                        placeholder="fas fa-cloud"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingCategory(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. TAB: SOCIALS */}
        {activeTab === "socials" && (
          <div style={{ background: "#ffffff", padding: "26px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                Social Media Links ({socialLinks.length})
              </h3>
              <button
                onClick={() =>
                  setEditingSocial({
                    platform: "",
                    label: "",
                    url: "",
                    icon: "fab fa-globe",
                    sort_order: socialLinks.length + 1,
                    is_published: true,
                  })
                }
                className="btn"
                style={{ padding: "6px 16px", fontSize: "13px" }}
              >
                <i className="fas fa-plus" /> Add Social Link
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {socialLinks.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "16px",
                    borderRadius: "10px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(43, 63, 167, 0.1)",
                        color: "var(--primary-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                      }}
                    >
                      <i className={item.icon || "fas fa-link"} />
                    </div>
                    <div>
                      <strong style={{ fontSize: "15px", textTransform: "capitalize", color: "#1e293b" }}>
                        {item.label || item.platform}
                      </strong>
                      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>{item.url}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setEditingSocial({ ...item })}
                      style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", cursor: "pointer", fontSize: "13px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete "${item.platform}" link?`)) {
                          await performAction("delete", "social_links", undefined, item.id)
                        }
                      }}
                      style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fee2e2", color: "#ef4444", cursor: "pointer", fontSize: "13px" }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Edit Modal */}
            {editingSocial && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                  padding: "20px",
                }}
              >
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "26px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", marginBottom: "16px" }}>
                    {editingSocial.id ? "Edit Social Link" : "New Social Link"}
                  </h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "social_links", editingSocial, editingSocial.id)
                      if (ok) setEditingSocial(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Platform</label>
                      <input
                        type="text"
                        value={editingSocial.platform || ""}
                        onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                        required
                        placeholder="e.g. github, linkedin"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Label</label>
                      <input
                        type="text"
                        value={editingSocial.label || ""}
                        onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                        placeholder="e.g. GitHub Profile"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>URL</label>
                      <input
                        type="url"
                        value={editingSocial.url || ""}
                        onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                        required
                        placeholder="https://..."
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>FontAwesome Icon</label>
                      <input
                        type="text"
                        value={editingSocial.icon || ""}
                        onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                        placeholder="fab fa-github"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingSocial(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. TAB: MESSAGES INBOX */}
        {activeTab === "messages" && (
          <div style={{ background: "#ffffff", padding: "26px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", marginBottom: "20px" }}>
              Inquiries Inbox ({messages.length})
            </h3>

            {messages.length === 0 ? (
              <p style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>
                No messages found in database yet.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      padding: "20px",
                      borderRadius: "12px",
                      background: m.status === "NEW" ? "#f0fdf4" : "#f8fafc",
                      border: m.status === "NEW" ? "1.5px solid #86efac" : "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <strong style={{ fontSize: "16px", color: "#0f172a" }}>{m.name}</strong>
                        <a href={`mailto:${m.email}`} style={{ color: "var(--primary-color)", fontSize: "14px" }}>
                          {m.email}
                        </a>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {new Date(m.created_at).toLocaleString()}
                        </span>
                        <button
                          onClick={async () => {
                            const newStatus = m.status === "NEW" ? "READ" : "NEW"
                            await performAction("upsert", "contact_messages", { status: newStatus }, m.id)
                          }}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Mark as {m.status === "NEW" ? "Read" : "New"}
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm("Delete this message?")) {
                              await performAction("delete", "contact_messages", undefined, m.id)
                            }
                          }}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid #fecaca",
                            background: "#fee2e2",
                            color: "#ef4444",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#475569" }}>
                        Subject: {m.subject}
                      </span>
                      <p style={{ margin: "6px 0 0", fontSize: "14.5px", color: "#1e293b", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                        {m.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
