"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

// Types
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
  available_for_work?: boolean
}

interface ProjectType {
  id?: string
  title: string
  slug: string
  subtitle?: string
  category?: string
  summary: string
  problem?: string
  solution?: string
  outcome?: string
  body?: string
  cover_image_url?: string
  icon?: string
  accent_gradient?: string
  gallery_urls?: string[]
  tech_stack?: string[] | string
  role?: string
  client_name?: string
  live_url?: string
  repo_url?: string
  sort_order?: number
  is_featured?: boolean
  is_published?: boolean
}

interface ExperienceType {
  id?: string
  company: string
  role: string
  employment_type?: string | null
  location?: string | null
  work_mode?: string | null
  company_url?: string | null
  logo_url?: string | null
  icon?: string | null
  start_date: string
  end_date?: string | null
  is_current?: boolean
  summary?: string | null
  highlights?: string[] | string | null
  tech_stack?: string[] | string | null
  sort_order?: number
  is_published?: boolean
}

interface EducationType {
  id?: string
  institution: string
  degree: string
  field_of_study?: string
  start_date?: string
  end_date?: string | null
  is_current?: boolean
  grade?: string
  description?: string
  logo_url?: string | null
  icon?: string
  sort_order?: number
  is_published?: boolean
}

interface CertificationType {
  id?: string
  title: string
  issuer: string
  issue_date?: string
  expiry_date?: string | null
  is_current?: boolean
  description?: string
  credential_id?: string
  credential_url?: string
  image_url?: string | null
  icon?: string
  sort_order?: number
  is_published?: boolean
}

interface VlogType {
  id: string
  title: string
  category: "vlog" | "article" | "gallery"
  date: string
  read_time?: string
  summary: string
  content?: string
  video_url?: string | null
  cover_image_url?: string | null
  gallery_urls?: string[] | null
  tags?: string[] | string | null
}

interface HeroCustomizerType {
  greeting?: string
  name?: string
  headline?: string
  description?: string
  avatar_position?: string
  avatar_scale?: number
  highlight_color?: string
  cards?: Array<{ icon: string; title: string; subtitle: string }>
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
  category_id: string
  name: string
  icon?: string
  proficiency?: number
  years_used?: number
  is_core?: boolean
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
    "overview" | "profile" | "projects" | "experience" | "education" | "vlog" | "skills" | "socials" | "messages"
  >("overview")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // Data states
  const [profile, setProfile] = useState<ProfileType>({})
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [experiences, setExperiences] = useState<ExperienceType[]>([])
  const [education, setEducation] = useState<EducationType[]>([])
  const [certifications, setCertifications] = useState<CertificationType[]>([])
  const [vlogs, setVlogs] = useState<VlogType[]>([])
  const [heroCustomizer, setHeroCustomizer] = useState<HeroCustomizerType>({
    greeting: "Hello, my name is",
    name: "Mathan Monishan",
    headline: "Software Developer & Full-Stack / AI Engineer",
    description: "I build intelligent software systems today and engineer intelligent physical systems for tomorrow. Founder & Lead Engineer at Pynimox.",
    avatar_position: "top center",
    avatar_scale: 1.0,
    highlight_color: "#2563eb",
    cards: [
      { icon: "fas fa-crown", title: "Founder", subtitle: "Pynimox AI Studio" },
      { icon: "fas fa-laptop-code", title: "Specialization", subtitle: "AI, Next.js & .NET" },
      { icon: "fas fa-graduation-cap", title: "Dual Degree", subtitle: "Mechatronics & IT" },
    ],
  })
  const [categories, setCategories] = useState<SkillCategoryType[]>([])
  const [skills, setSkills] = useState<SkillType[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([])
  const [messages, setMessages] = useState<ContactMessageType[]>([])

  // Modal / Editing states
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null)
  const [editingExperience, setEditingExperience] = useState<ExperienceType | null>(null)
  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null)
  const [editingCert, setEditingCert] = useState<CertificationType | null>(null)
  const [editingVlog, setEditingVlog] = useState<VlogType | null>(null)
  const [editingSkill, setEditingSkill] = useState<SkillType | null>(null)
  const [editingCategory, setEditingCategory] = useState<SkillCategoryType | null>(null)
  const [editingSocial, setEditingSocial] = useState<SocialLinkType | null>(null)

  // File upload refs
  const cvInputRef = useRef<HTMLInputElement | null>(null)
  const avatarInputRef = useRef<HTMLInputElement | null>(null)
  const projectCoverInputRef = useRef<HTMLInputElement | null>(null)
  const projectGalleryInputRef = useRef<HTMLInputElement | null>(null)
  const companyLogoInputRef = useRef<HTMLInputElement | null>(null)
  const eduLogoInputRef = useRef<HTMLInputElement | null>(null)
  const certBadgeInputRef = useRef<HTMLInputElement | null>(null)
  const vlogCoverInputRef = useRef<HTMLInputElement | null>(null)

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
        { data: exps },
        { data: edu },
        { data: certs },
        { data: cats },
        { data: sks },
        { data: socs },
        { data: msgs },
        { data: settings },
      ] = await Promise.all([
        supabase.from("profile").select("*").maybeSingle(),
        supabase.from("projects").select("*").order("sort_order", { ascending: true }),
        supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
        supabase.from("education").select("*").order("sort_order", { ascending: true }),
        supabase.from("certifications").select("*").order("sort_order", { ascending: true }),
        supabase.from("skill_categories").select("*").order("sort_order", { ascending: true }),
        supabase.from("skills").select("*").order("sort_order", { ascending: true }),
        supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("site_settings").select("*").maybeSingle(),
      ])

      if (prof) setProfile(prof as ProfileType)
      if (projs) setProjects((projs as ProjectType[]) || [])
      if (exps) setExperiences((exps as ExperienceType[]) || [])
      if (edu) setEducation((edu as EducationType[]) || [])
      if (certs) setCertifications((certs as CertificationType[]) || [])
      if (cats) setCategories((cats as SkillCategoryType[]) || [])
      if (sks) setSkills((sks as SkillType[]) || [])
      if (socs) setSocialLinks((socs as SocialLinkType[]) || [])
      if (msgs) setMessages((msgs as ContactMessageType[]) || [])

      // Parse JSON from site_settings
      if (settings?.footer_note && settings.footer_note.startsWith("{")) {
        try {
          const parsed = JSON.parse(settings.footer_note)
          if (parsed.vlogs && Array.isArray(parsed.vlogs)) setVlogs(parsed.vlogs)
          if (parsed.hero) setHeroCustomizer(parsed.hero)
        } catch {
          // fallback
        }
      }
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

  // Save Vlogs and Hero Customizer to site_settings JSON
  const saveCustomSettings = async (updatedVlogs: VlogType[], updatedHero: HeroCustomizerType) => {
    setSaving(true)
    try {
      const jsonPayload = JSON.stringify({
        vlogs: updatedVlogs,
        hero: updatedHero,
      })

      const { data: existing } = await supabase.from("site_settings").select("id").maybeSingle()
      if (existing) {
        await supabase.from("site_settings").update({ footer_note: jsonPayload }).eq("id", existing.id)
      } else {
        await supabase.from("site_settings").insert([{ footer_note: jsonPayload }])
      }
      showToast("Custom settings & vlogs saved successfully!")
      await fetchData()
      return true
    } catch (err: unknown) {
      console.error("Save settings error:", err)
      showToast("Failed to save settings", "error")
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

  // Handle Project Cover Upload
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

  // Handle Project Gallery Upload
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

  // Handle Company Logo Upload
  const handleCompanyLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingExperience) return
    const url = await uploadFile(file, "projects")
    if (url) {
      setEditingExperience({
        ...editingExperience,
        logo_url: url,
      })
    }
  }

  // Handle Education Logo Upload
  const handleEduLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingEducation) return
    const url = await uploadFile(file, "projects")
    if (url) {
      setEditingEducation({
        ...editingEducation,
        logo_url: url,
      })
    }
  }

  // Handle Cert Badge Upload
  const handleCertBadgeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingCert) return
    const url = await uploadFile(file, "projects")
    if (url) {
      setEditingCert({
        ...editingCert,
        image_url: url,
      })
    }
  }

  // Handle Vlog Cover Upload
  const handleVlogCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingVlog) return
    const url = await uploadFile(file, "projects")
    if (url) {
      setEditingVlog({
        ...editingVlog,
        cover_image_url: url,
      })
    }
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
    await saveCustomSettings(vlogs, heroCustomizer)
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
            { id: "profile", label: "Hero & Profile", icon: "fas fa-user-edit" },
            { id: "projects", label: "Projects & Media", icon: "fas fa-briefcase", count: projects.length },
            { id: "experience", label: "Experience & Ventures", icon: "fas fa-building", count: experiences.length },
            { id: "education", label: "Education & Certs", icon: "fas fa-graduation-cap", count: education.length + certifications.length },
            { id: "vlog", label: "Vlogs & Notes", icon: "fas fa-video", count: vlogs.length },
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
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive ? "rgba(20, 177, 255, 0.2)" : "transparent",
                  color: isActive ? "var(--accent-color)" : "rgba(255, 255, 255, 0.75)",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  marginBottom: "4px",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              {activeTab === "profile" && "Hero & Profile Customizer"}
              {activeTab === "projects" && "Projects & Media Management"}
              {activeTab === "experience" && "Experience & Ventures"}
              {activeTab === "education" && "Education & Certifications"}
              {activeTab === "vlog" && "Vlogs & Engineering Notes"}
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {[
                { title: "Total Projects", value: projects.length, icon: "fas fa-briefcase", color: "#3b82f6", tab: "projects" },
                { title: "Experiences", value: experiences.length, icon: "fas fa-building", color: "#6366f1", tab: "experience" },
                { title: "Education & Certs", value: education.length + certifications.length, icon: "fas fa-graduation-cap", color: "#8b5cf6", tab: "education" },
                { title: "Skills Count", value: skills.length, icon: "fas fa-tools", color: "#10b981", tab: "skills" },
                { title: "Vlogs & Notes", value: vlogs.length, icon: "fas fa-video", color: "#f59e0b", tab: "vlog" },
                { title: "Unread Messages", value: messages.filter((m) => m.status === "NEW").length, icon: "fas fa-envelope-open-text", color: "#ef4444", tab: "messages" },
              ].map((stat, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab(stat.tab as typeof activeTab)}
                  style={{
                    background: "#ffffff",
                    padding: "20px",
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
                    <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>
                      {stat.title}
                    </span>
                    <h3 style={{ fontSize: "28px", color: "#1e293b", margin: "4px 0 0", fontFamily: "var(--font-heading)" }}>
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      background: `${stat.color}15`,
                      color: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    <i className={stat.icon} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Inquiries Preview */}
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Recent Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab("messages")}
                  style={{ background: "transparent", border: "none", color: "var(--primary-color)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}
                >
                  View All ({messages.length}) →
                </button>
              </div>

              {messages.length === 0 ? (
                <p style={{ color: "#64748b", textAlign: "center", padding: "30px 0" }}>
                  No messages received yet.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {messages.slice(0, 4).map((m) => (
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

        {/* 2. TAB: HERO & PROFILE CUSTOMIZER */}
        {activeTab === "profile" && (
          <div style={{ background: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)" }}>
            {/* Direct Uploads Box */}
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
              {/* CV Upload */}
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

              {/* Avatar Upload */}
              <div>
                <h4 style={{ fontSize: "15px", color: "#0369a1", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="fas fa-image" style={{ fontSize: "18px", color: "#3b82f6" }} />
                  Hero & About Portrait Upload
                </h4>
                <p style={{ fontSize: "13px", color: "#475569", marginBottom: "12px" }}>
                  Upload your high-definition profile picture.
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

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* HERO SECTION INDIVIDUAL CONTROLS */}
              <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <h3 style={{ fontSize: "16px", color: "#1e293b", margin: "0 0 16px", fontWeight: 700 }}>
                  <i className="fas fa-magic" style={{ color: "#3b82f6", marginRight: "8px" }} />
                  Hero Section Text, Hierarchy & Image Customization
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                      1. Top Greeting Line (Appears ABOVE your name)
                    </label>
                    <input
                      type="text"
                      value={heroCustomizer.greeting || profile.hero_intro || ""}
                      onChange={(e) => {
                        setHeroCustomizer({ ...heroCustomizer, greeting: e.target.value })
                        setProfile({ ...profile, hero_intro: e.target.value })
                      }}
                      placeholder="Hello, my name is"
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                      2. Full Name (Main Big Heading)
                    </label>
                    <input
                      type="text"
                      value={profile.full_name || ""}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      required
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                      3. Headline / Subtitle (Blue title)
                    </label>
                    <input
                      type="text"
                      value={profile.headline || ""}
                      onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                      placeholder="Software Developer & Full-Stack / AI Engineer"
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                      Hero Portrait Image Position & Framing
                    </label>
                    <select
                      value={heroCustomizer.avatar_position || "top center"}
                      onChange={(e) => setHeroCustomizer({ ...heroCustomizer, avatar_position: e.target.value })}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                    >
                      <option value="top center">Top Center (Focus on Face & Shoulders)</option>
                      <option value="center center">Center Center (Full Framing)</option>
                      <option value="bottom center">Bottom Center</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                    4. Hero Bio Summary Description
                  </label>
                  <textarea
                    rows={2}
                    value={heroCustomizer.description || ""}
                    onChange={(e) => setHeroCustomizer({ ...heroCustomizer, description: e.target.value })}
                    placeholder="I build intelligent software systems today and engineer intelligent physical systems for tomorrow."
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                  />
                </div>

                {/* Hero Bottom Info Cards Customizer */}
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "8px", color: "#334155" }}>
                    Hero Bottom Feature Cards (3 Cards)
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    {(heroCustomizer.cards || [
                      { icon: "fas fa-crown", title: "Founder", subtitle: "Pynimox AI Studio" },
                      { icon: "fas fa-laptop-code", title: "Specialization", subtitle: "AI, Next.js & .NET" },
                      { icon: "fas fa-graduation-cap", title: "Dual Degree", subtitle: "Mechatronics & IT" },
                    ]).map((card, idx) => (
                      <div key={idx} style={{ padding: "12px", background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                        <div style={{ marginBottom: "6px" }}>
                          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Card {idx + 1} Title</span>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const next = [...(heroCustomizer.cards || [])]
                              next[idx] = { ...next[idx], title: e.target.value }
                              setHeroCustomizer({ ...heroCustomizer, cards: next })
                            }}
                            style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12.5px" }}
                          />
                        </div>
                        <div>
                          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Subtitle</span>
                          <input
                            type="text"
                            value={card.subtitle}
                            onChange={(e) => {
                              const next = [...(heroCustomizer.cards || [])]
                              next[idx] = { ...next[idx], subtitle: e.target.value }
                              setHeroCustomizer({ ...heroCustomizer, cards: next })
                            }}
                            style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "12.5px" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* General Contact & Bio Details */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Email</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Phone Display</label>
                  <input
                    type="text"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>WhatsApp (Digits)</label>
                  <input
                    type="text"
                    value={profile.whatsapp_number || ""}
                    onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Location</label>
                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>About Section Bio</label>
                <textarea
                  rows={4}
                  value={profile.bio_long || ""}
                  onChange={(e) => setProfile({ ...profile, bio_long: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" disabled={saving} className="btn" style={{ padding: "10px 24px" }}>
                  {saving ? "Saving Changes..." : "Save Profile & Hero Settings"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. TAB: PROJECTS & MEDIA */}
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
                    category: "AI & Automation",
                    summary: "",
                    tech_stack: [],
                    repo_url: "",
                    live_url: "",
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
                        background: "#090642",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {hasCover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={proj.cover_image_url} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <i className="fas fa-briefcase" style={{ fontSize: "36px", color: "#ffffff" }} />
                      )}
                    </div>

                    <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: 0 }}>
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
                      <p style={{ fontSize: "13px", color: "#64748b", flex: 1, marginBottom: "12px" }}>
                        {proj.summary}
                      </p>

                      <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                        <button
                          onClick={() => setEditingProject({ ...proj })}
                          style={{
                            flex: 1,
                            padding: "7px",
                            borderRadius: "6px",
                            border: "1px solid var(--primary-color)",
                            background: "transparent",
                            color: "var(--primary-color)",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-edit" /> Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              await performAction("delete", "projects", undefined, proj.id)
                            }
                          }}
                          style={{
                            padding: "7px 12px",
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

            {/* PROJECT EDIT MODAL */}
            {editingProject && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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

                  {/* MEDIA UPLOAD */}
                  <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                      Cover Image / Video Demo Upload
                    </label>
                    <input
                      type="file"
                      ref={projectCoverInputRef}
                      onChange={handleProjectCoverUpload}
                      accept="image/*,video/*"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                      <button
                        type="button"
                        onClick={() => projectCoverInputRef.current?.click()}
                        disabled={uploading}
                        style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontWeight: 600, fontSize: "12.5px", cursor: "pointer" }}
                      >
                        <i className="fas fa-upload" /> Upload File
                      </button>
                      <input
                        type="text"
                        value={editingProject.cover_image_url || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, cover_image_url: e.target.value })}
                        placeholder="or paste image URL /projects/pynimox.jpg"
                        style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                      />
                    </div>

                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                      Gallery Screenshots (Multiple)
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
                      style={{ padding: "6px 14px", borderRadius: "6px", border: "1px dashed #94a3b8", background: "#ffffff", color: "#475569", fontWeight: 500, fontSize: "12.5px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <i className="fas fa-plus-circle" /> Add Gallery Photos / Videos
                    </button>
                  </div>

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
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Title</label>
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
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Slug</label>
                        <input
                          type="text"
                          value={editingProject.slug || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          required
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                        <input
                          type="text"
                          value={editingProject.category || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Summary</label>
                      <textarea
                        rows={2}
                        value={editingProject.summary || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingProject.tech_stack) ? editingProject.tech_stack.join(", ") : editingProject.tech_stack || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, tech_stack: e.target.value })}
                        placeholder="Next.js, TypeScript, Python, Supabase"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Live Website URL</label>
                        <input
                          type="text"
                          value={editingProject.live_url || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>GitHub Repo URL</label>
                        <input
                          type="text"
                          value={editingProject.repo_url || ""}
                          onChange={(e) => setEditingProject({ ...editingProject, repo_url: e.target.value })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
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

        {/* 4. TAB: EXPERIENCE & VENTURES */}
        {activeTab === "experience" && (
          <div style={{ background: "#ffffff", padding: "26px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Experience & Ventures ({experiences.length})
                </h3>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  Manage company roles, logos, bullet highlights, and venture tags.
                </span>
              </div>
              <button
                onClick={() =>
                  setEditingExperience({
                    company: "",
                    role: "",
                    company_url: "",
                    logo_url: "",
                    location: "Remote / Sri Lanka",
                    work_mode: "Remote",
                    start_date: "2025-01-01",
                    is_current: true,
                    summary: "",
                    highlights: [],
                    tech_stack: [],
                    sort_order: experiences.length + 1,
                    is_published: true,
                  })
                }
                className="btn"
                style={{ padding: "8px 20px", fontSize: "14px" }}
              >
                <i className="fas fa-plus" /> Add Experience
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  style={{
                    padding: "18px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {exp.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={exp.logo_url}
                        alt={exp.company}
                        style={{ width: "42px", height: "42px", objectFit: "contain", borderRadius: "8px", background: "#ffffff", padding: "4px", border: "1px solid #cbd5e1" }}
                      />
                    ) : (
                      <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                        <i className="fas fa-briefcase" />
                      </div>
                    )}
                    <div>
                      <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: "0 0 2px" }}>
                        {exp.role}
                      </h4>
                      <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--primary-color)", fontWeight: 500 }}>
                        {exp.company} • <span style={{ color: "#64748b", fontSize: "12.5px" }}>{exp.location}</span>
                      </p>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                        {exp.start_date} {exp.is_current ? "– Present" : exp.end_date ? `– ${exp.end_date}` : ""}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setEditingExperience({ ...exp })}
                      style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete experience "${exp.role} at ${exp.company}"?`)) {
                          await performAction("delete", "experiences", undefined, exp.id)
                        }
                      }}
                      style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fee2e2", color: "#ef4444", fontSize: "13px", cursor: "pointer" }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* EXPERIENCE MODAL */}
            {editingExperience && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    width: "100%",
                    maxWidth: "700px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", margin: 0 }}>
                      {editingExperience.id ? "Edit Experience / Venture" : "New Experience / Venture"}
                    </h3>
                    <button
                      onClick={() => setEditingExperience(null)}
                      style={{ border: "none", background: "transparent", fontSize: "20px", color: "#94a3b8", cursor: "pointer" }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>

                  {/* COMPANY LOGO UPLOAD */}
                  <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
                      Company / Organization Logo
                    </label>
                    <input
                      type="file"
                      ref={companyLogoInputRef}
                      onChange={handleCompanyLogoUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => companyLogoInputRef.current?.click()}
                        disabled={uploading}
                        style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontWeight: 600, fontSize: "12.5px", cursor: "pointer" }}
                      >
                        <i className="fas fa-upload" /> Upload Logo Image
                      </button>
                      <input
                        type="text"
                        value={editingExperience.logo_url || ""}
                        onChange={(e) => setEditingExperience({ ...editingExperience, logo_url: e.target.value })}
                        placeholder="or paste logo image URL"
                        style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                      />
                    </div>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const techArr = Array.isArray(editingExperience.tech_stack)
                        ? editingExperience.tech_stack
                        : typeof editingExperience.tech_stack === "string"
                        ? editingExperience.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
                        : []

                      const highArr = Array.isArray(editingExperience.highlights)
                        ? editingExperience.highlights
                        : typeof editingExperience.highlights === "string"
                        ? editingExperience.highlights.split("\n").map((s: string) => s.trim()).filter(Boolean)
                        : []

                      const payload = {
                        ...editingExperience,
                        tech_stack: techArr,
                        highlights: highArr,
                      }
                      const ok = await performAction("upsert", "experiences", payload, editingExperience.id)
                      if (ok) setEditingExperience(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Company / Org Name</label>
                        <input
                          type="text"
                          value={editingExperience.company || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                          required
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Job Role / Title</label>
                        <input
                          type="text"
                          value={editingExperience.role || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                          required
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Location / Work Mode</label>
                        <input
                          type="text"
                          value={editingExperience.location || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                          placeholder="Remote / Hybrid / Sri Lanka"
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Company Website URL</label>
                        <input
                          type="text"
                          value={editingExperience.company_url || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, company_url: e.target.value })}
                          placeholder="https://..."
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Role Summary Description</label>
                      <textarea
                        rows={2}
                        value={editingExperience.summary || ""}
                        onChange={(e) => setEditingExperience({ ...editingExperience, summary: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                        Key Achievements / Highlights (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={Array.isArray(editingExperience.highlights) ? editingExperience.highlights.join("\n") : editingExperience.highlights || ""}
                        onChange={(e) => setEditingExperience({ ...editingExperience, highlights: e.target.value })}
                        placeholder="Architected multi-agent LLM pipelines&#10;Engineered scalable web applications"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingExperience.tech_stack) ? editingExperience.tech_stack.join(", ") : editingExperience.tech_stack || ""}
                        onChange={(e) => setEditingExperience({ ...editingExperience, tech_stack: e.target.value })}
                        placeholder="Next.js, TypeScript, Python, Supabase"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button
                        type="button"
                        onClick={() => setEditingExperience(null)}
                        style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button type="submit" disabled={saving || uploading} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save Experience"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. TAB: EDUCATION & CERTS */}
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
                      logo_url: "",
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
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {item.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.logo_url}
                          alt={item.institution}
                          style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: "6px", background: "#ffffff", padding: "2px", border: "1px solid #cbd5e1" }}
                        />
                      ) : (
                        <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "#ede9fe", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                          <i className="fas fa-graduation-cap" />
                        </div>
                      )}
                      <div>
                        <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: "0 0 2px" }}>
                          {item.degree}
                        </h4>
                        <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--primary-color)", fontWeight: 500 }}>
                          {item.institution}
                        </p>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>
                          {item.is_current ? "In Progress" : "Completed"}
                        </span>
                      </div>
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
                      image_url: "",
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
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image_url}
                          alt={item.issuer}
                          style={{ width: "36px", height: "36px", objectFit: "contain", borderRadius: "6px", background: "#ffffff", padding: "2px", border: "1px solid #cbd5e1" }}
                        />
                      ) : (
                        <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                          <i className="fas fa-certificate" />
                        </div>
                      )}
                      <div>
                        <h4 style={{ fontSize: "16px", color: "var(--secondary-color)", margin: "0 0 2px" }}>
                          {item.title}
                        </h4>
                        <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--primary-color)", fontWeight: 500 }}>
                          {item.issuer}
                        </p>
                      </div>
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

            {/* EDUCATION MODAL */}
            {editingEducation && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    width: "100%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", margin: 0 }}>
                      {editingEducation.id ? "Edit Education Degree" : "New Education Degree"}
                    </h3>
                    <button
                      onClick={() => setEditingEducation(null)}
                      style={{ border: "none", background: "transparent", fontSize: "20px", color: "#94a3b8", cursor: "pointer" }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>

                  {/* UNIVERSITY LOGO UPLOAD */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      University / School Official Logo
                    </label>
                    <input
                      type="file"
                      ref={eduLogoInputRef}
                      onChange={handleEduLogoUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => eduLogoInputRef.current?.click()}
                        disabled={uploading}
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
                      >
                        <i className="fas fa-upload" /> Upload Logo
                      </button>
                      <input
                        type="text"
                        value={editingEducation.logo_url || ""}
                        onChange={(e) => setEditingEducation({ ...editingEducation, logo_url: e.target.value })}
                        placeholder="or paste logo image URL"
                        style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                    </div>
                  </div>

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
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Institution / University</label>
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
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingEducation(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving || uploading} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* CERTIFICATION MODAL */}
            {editingCert && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    width: "100%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", margin: 0 }}>
                      {editingCert.id ? "Edit Certification" : "New Certification"}
                    </h3>
                    <button
                      onClick={() => setEditingCert(null)}
                      style={{ border: "none", background: "transparent", fontSize: "20px", color: "#94a3b8", cursor: "pointer" }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>

                  {/* CERT BADGE UPLOAD */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      Certificate Badge / Issuer Logo
                    </label>
                    <input
                      type="file"
                      ref={certBadgeInputRef}
                      onChange={handleCertBadgeUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => certBadgeInputRef.current?.click()}
                        disabled={uploading}
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
                      >
                        <i className="fas fa-upload" /> Upload Badge
                      </button>
                      <input
                        type="text"
                        value={editingCert.image_url || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, image_url: e.target.value })}
                        placeholder="or paste badge image URL"
                        style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                    </div>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "certifications", editingCert, editingCert.id)
                      if (ok) setEditingCert(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Certification Title</label>
                      <input
                        type="text"
                        value={editingCert.title || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Issuer Organization</label>
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
                        type="url"
                        value={editingCert.credential_url || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, credential_url: e.target.value })}
                        placeholder="https://..."
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Description</label>
                      <textarea
                        rows={2}
                        value={editingCert.description || ""}
                        onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingCert(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving || uploading} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. TAB: VLOGS & ENGINEERING NOTES */}
        {activeTab === "vlog" && (
          <div style={{ background: "#ffffff", padding: "26px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Personal Vlog & Engineering Notes ({vlogs.length})
                </h3>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  Manage video walkthroughs, tech notes, and photo gallery collections.
                </span>
              </div>
              <button
                onClick={() =>
                  setEditingVlog({
                    id: `vlog-${Date.now()}`,
                    title: "",
                    category: "vlog",
                    date: "Feb 2026",
                    read_time: "5 min watch",
                    summary: "",
                    content: "",
                    video_url: "",
                    cover_image_url: "",
                    tags: [],
                  })
                }
                className="btn"
                style={{ padding: "8px 20px", fontSize: "14px" }}
              >
                <i className="fas fa-plus" /> Add Vlog / Note
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
              {vlogs.map((v) => (
                <div
                  key={v.id}
                  style={{
                    background: "#f8fafc",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "130px", background: "#090642", position: "relative", overflow: "hidden" }}>
                    {v.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={v.cover_image_url} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "32px" }}>
                        <i className={v.category === "vlog" ? "fas fa-video" : v.category === "article" ? "fas fa-newspaper" : "fas fa-camera"} />
                      </div>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(0,0,0,0.7)",
                        color: "#ffffff",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontSize: "11px",
                        textTransform: "capitalize",
                      }}
                    >
                      {v.category}
                    </span>
                  </div>

                  <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
                      {v.date} • {v.read_time}
                    </div>
                    <h4 style={{ fontSize: "15.5px", color: "var(--secondary-color)", margin: "0 0 6px" }}>
                      {v.title}
                    </h4>
                    <p style={{ fontSize: "13px", color: "#475569", flex: 1, marginBottom: "12px" }}>
                      {v.summary}
                    </p>

                    <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                      <button
                        onClick={() => setEditingVlog({ ...v })}
                        style={{ flex: 1, padding: "6px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontSize: "12.5px", fontWeight: 600, cursor: "pointer" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete "${v.title}"?`)) {
                            const next = vlogs.filter((item) => item.id !== v.id)
                            setVlogs(next)
                            await saveCustomSettings(next, heroCustomizer)
                          }
                        }}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fee2e2", color: "#ef4444", fontSize: "12.5px", cursor: "pointer" }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VLOG MODAL */}
            {editingVlog && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    width: "100%",
                    maxWidth: "650px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "20px", color: "var(--secondary-color)", margin: 0 }}>
                      Edit Vlog / Engineering Note
                    </h3>
                    <button
                      onClick={() => setEditingVlog(null)}
                      style={{ border: "none", background: "transparent", fontSize: "20px", color: "#94a3b8", cursor: "pointer" }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>

                  {/* COVER UPLOAD */}
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                      Cover Image Upload
                    </label>
                    <input
                      type="file"
                      ref={vlogCoverInputRef}
                      onChange={handleVlogCoverUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <button
                        type="button"
                        onClick={() => vlogCoverInputRef.current?.click()}
                        disabled={uploading}
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--primary-color)", background: "transparent", color: "var(--primary-color)", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
                      >
                        <i className="fas fa-upload" /> Upload Cover Photo
                      </button>
                      <input
                        type="text"
                        value={editingVlog.cover_image_url || ""}
                        onChange={(e) => setEditingVlog({ ...editingVlog, cover_image_url: e.target.value })}
                        placeholder="or paste cover URL /projects/pynimox.jpg"
                        style={{ flex: 1, padding: "6px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px" }}
                      />
                    </div>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const exists = vlogs.find((item) => item.id === editingVlog.id)
                      const next = exists
                        ? vlogs.map((item) => (item.id === editingVlog.id ? editingVlog : item))
                        : [...vlogs, editingVlog]

                      setVlogs(next)
                      const ok = await saveCustomSettings(next, heroCustomizer)
                      if (ok) setEditingVlog(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Title</label>
                      <input
                        type="text"
                        value={editingVlog.title}
                        onChange={(e) => setEditingVlog({ ...editingVlog, title: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Type / Category</label>
                        <select
                          value={editingVlog.category}
                          onChange={(e) => setEditingVlog({ ...editingVlog, category: e.target.value as VlogType["category"] })}
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        >
                          <option value="vlog">Video Vlog</option>
                          <option value="article">Engineering Note / Article</option>
                          <option value="gallery">Photo Gallery</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Date & Watch/Read Duration</label>
                        <input
                          type="text"
                          value={editingVlog.read_time || ""}
                          onChange={(e) => setEditingVlog({ ...editingVlog, read_time: e.target.value })}
                          placeholder="5 min watch / 6 min read"
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    </div>

                    {editingVlog.category === "vlog" && (
                      <div>
                        <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>
                          YouTube Embed / Video URL
                        </label>
                        <input
                          type="text"
                          value={editingVlog.video_url || ""}
                          onChange={(e) => setEditingVlog({ ...editingVlog, video_url: e.target.value })}
                          placeholder="https://www.youtube.com/embed/..."
                          style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                        />
                      </div>
                    )}

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Summary</label>
                      <textarea
                        rows={2}
                        value={editingVlog.summary}
                        onChange={(e) => setEditingVlog({ ...editingVlog, summary: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Full Content / Article Note</label>
                      <textarea
                        rows={4}
                        value={editingVlog.content || ""}
                        onChange={(e) => setEditingVlog({ ...editingVlog, content: e.target.value })}
                        placeholder="Write full article notes or description..."
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingVlog(null)} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving || uploading} className="btn" style={{ padding: "8px 20px", fontSize: "14px" }}>
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. TAB: SKILLS */}
        {activeTab === "skills" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Skill Categories ({categories.length})
                </h3>
                <button
                  onClick={() =>
                    setEditingCategory({
                      name: "",
                      icon: "fas fa-code",
                      sort_order: categories.length + 1,
                      is_published: true,
                    })
                  }
                  className="btn"
                  style={{ padding: "6px 16px", fontSize: "13px" }}
                >
                  <i className="fas fa-plus" /> Add Category
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <i className={cat.icon} style={{ color: "var(--primary-color)" }} />
                      <strong style={{ fontSize: "14px", color: "#1e293b" }}>{cat.name}</strong>
                    </div>
                    <button
                      onClick={() => setEditingCategory({ ...cat })}
                      style={{ border: "none", background: "transparent", color: "var(--primary-color)", cursor: "pointer", fontSize: "13px" }}
                    >
                      <i className="fas fa-edit" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Skills */}
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                  Skills ({skills.length})
                </h3>
                <button
                  onClick={() =>
                    setEditingSkill({
                      category_id: categories[0]?.id || "",
                      name: "",
                      icon: "fas fa-code",
                      sort_order: skills.length + 1,
                      is_published: true,
                    })
                  }
                  className="btn"
                  style={{ padding: "6px 16px", fontSize: "13px" }}
                >
                  <i className="fas fa-plus" /> Add Skill
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className={skill.icon} style={{ color: "var(--primary-color)", fontSize: "14px" }} />
                      <span style={{ fontSize: "13.5px", color: "#1e293b", fontWeight: 500 }}>{skill.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        onClick={() => setEditingSkill({ ...skill })}
                        style={{ border: "none", background: "transparent", color: "var(--primary-color)", cursor: "pointer", fontSize: "12px" }}
                      >
                        <i className="fas fa-edit" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete skill "${skill.name}"?`)) {
                            await performAction("delete", "skills", undefined, skill.id)
                          }
                        }}
                        style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: "12px" }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY MODAL */}
            {editingCategory && (
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "24px" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Edit Category</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "skill_categories", editingCategory, editingCategory.id)
                      if (ok) setEditingCategory(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Name</label>
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>FontAwesome Icon</label>
                      <input
                        type="text"
                        value={editingCategory.icon || ""}
                        onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                        placeholder="fas fa-brain"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                      <button type="button" onClick={() => setEditingCategory(null)} style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "6px 16px" }}>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* SKILL MODAL */}
            {editingSkill && (
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "24px" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Edit Skill</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "skills", editingSkill, editingSkill.id)
                      if (ok) setEditingSkill(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                      <select
                        value={editingSkill.category_id}
                        onChange={(e) => setEditingSkill({ ...editingSkill, category_id: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Skill Name</label>
                      <input
                        type="text"
                        value={editingSkill.name}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
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
                      <button type="button" onClick={() => setEditingSkill(null)} style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "6px 16px" }}>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. TAB: SOCIAL LINKS */}
        {activeTab === "socials" && (
          <div style={{ background: "#ffffff", padding: "26px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", color: "var(--secondary-color)", margin: 0 }}>
                Social Media Links ({socialLinks.length})
              </h3>
              <button
                onClick={() =>
                  setEditingSocial({
                    platform: "github",
                    label: "GitHub",
                    url: "https://github.com/",
                    icon: "fab fa-github",
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {socialLinks.map((s) => (
                <div
                  key={s.id}
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
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <i className={s.icon} style={{ fontSize: "20px", color: "var(--primary-color)" }} />
                    <div>
                      <strong style={{ fontSize: "14px", color: "#1e293b" }}>{s.label || s.platform}</strong>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "12px", color: "#64748b", textDecoration: "none" }}>
                        {s.url.length > 28 ? s.url.substring(0, 28) + "..." : s.url}
                      </a>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => setEditingSocial({ ...s })} style={{ border: "none", background: "transparent", color: "var(--primary-color)", cursor: "pointer" }}>
                      <i className="fas fa-edit" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete social link "${s.label}"?`)) {
                          await performAction("delete", "social_links", undefined, s.id)
                        }
                      }}
                      style={{ border: "none", background: "transparent", color: "#ef4444", cursor: "pointer" }}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIAL MODAL */}
            {editingSocial && (
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <div style={{ background: "#ffffff", width: "100%", maxWidth: "450px", borderRadius: "16px", padding: "24px" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Edit Social Link</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      const ok = await performAction("upsert", "social_links", editingSocial, editingSocial.id)
                      if (ok) setEditingSocial(null)
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>Label</label>
                      <input
                        type="text"
                        value={editingSocial.label || ""}
                        onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>URL</label>
                      <input
                        type="url"
                        value={editingSocial.url}
                        onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                        required
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
                      <button type="button" onClick={() => setEditingSocial(null)} style={{ padding: "6px 14px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button type="submit" disabled={saving} className="btn" style={{ padding: "6px 16px" }}>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 9. TAB: MESSAGES INBOX */}
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
                          style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#ffffff", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                        >
                          Mark as {m.status === "NEW" ? "Read" : "New"}
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm("Delete this message?")) {
                              await performAction("delete", "contact_messages", undefined, m.id)
                            }
                          }}
                          style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #fecaca", background: "#fee2e2", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}
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
