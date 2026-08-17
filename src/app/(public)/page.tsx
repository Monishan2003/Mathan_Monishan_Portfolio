import { createServerClient } from "@/lib/supabase/server"
import SidebarNav from "@/components/SidebarNav"
import Hero from "@/features/hero/Hero"
import About from "@/features/about/About"
import Experience, { type ExperienceItem } from "@/features/experience/Experience"
import Education, { type EducationItem } from "@/features/education/Education"
import Projects, { type ProjectItem } from "@/features/projects/Projects"
import Skills, { type SkillCategoryItem } from "@/features/skills/Skills"
import PersonalVlog from "@/features/vlog/PersonalVlog"
import HowIBuild from "@/features/approach/HowIBuild"
import Contact from "@/features/contact/Contact"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import WhatsAppButton from "@/components/WhatsAppButton"
import ThemeToggle from "@/components/ThemeToggle"
import CursorGlow from "@/components/CursorGlow"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {
  const supabase = await createServerClient()

  // Fetch all content in parallel from Supabase
  const [
    { data: profile },
    { data: educationData },
    { data: certificationsData },
    { data: projectsData },
    { data: experiencesData },
    { data: skillCategoriesData },
    { data: skillsData },
    { data: socialLinksData },
    { data: siteSettingsData },
  ] = await Promise.all([
    supabase.from("profile").select("*").maybeSingle(),
    supabase.from("education").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("certifications").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("skill_categories").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("skills").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("social_links").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("site_settings").select("*").maybeSingle(),
  ])

  // Parse custom vlogs and hero settings from site_settings.footer_note JSON
  let customVlogs = []
  let customHero = undefined
  try {
    if (siteSettingsData?.footer_note && siteSettingsData.footer_note.startsWith("{")) {
      const parsed = JSON.parse(siteSettingsData.footer_note)
      if (parsed.vlogs !== undefined && Array.isArray(parsed.vlogs)) {
        customVlogs = parsed.vlogs
      }
      if (parsed.hero) customHero = parsed.hero
    }
  } catch (e) {
    console.error("Error parsing site_settings json:", e)
  }

  // Format Education Items
  const educationItems: EducationItem[] = (educationData || []).map((edu) => {
    const yearStr = edu.start_date
      ? `${new Date(edu.start_date).getFullYear()} – ${edu.is_current ? "Present" : edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}`
      : "Present"

    return {
      id: edu.id,
      title: edu.degree,
      institution: edu.institution,
      year: yearStr,
      status: edu.is_current ? "present" : "completed",
      description: edu.description || "",
      icon: edu.icon || "fas fa-university",
      logo_url: edu.logo_url,
    }
  })

  // Format Certifications
  const formattedCertifications = (certificationsData || []).map((cert) => ({
    id: cert.id,
    title: cert.title,
    issuer: cert.issuer,
    date: cert.issue_date ? new Date(cert.issue_date).getFullYear().toString() : "Verified",
    link: cert.credential_url,
    icon: cert.icon || "fas fa-certificate",
    desc: cert.description || undefined,
    image_url: cert.image_url,
  }))

  // Format Projects
  const projects: ProjectItem[] = (projectsData || []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    summary: p.summary,
    category: p.category || undefined,
    problem: p.problem,
    solution: p.solution,
    outcome: p.outcome,
    tech_stack: p.tech_stack,
    repo_url: p.repo_url,
    live_url: p.live_url,
    resource_url: p.resource_url,
    resource_label: p.resource_label,
    icon: p.icon,
    accent_gradient: p.accent_gradient,
    cover_image_url: p.cover_image_url,
    is_featured: Boolean(p.is_featured),
    role: p.role,
  }))

  // Format Experiences
  const experiences: ExperienceItem[] = (experiencesData || []).map((exp) => {
    const dateStr = exp.start_date
      ? `${new Date(exp.start_date).getFullYear()} – ${exp.is_current ? "Present" : exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}`
      : "2025 – Present"

    return {
      id: exp.id,
      company: exp.company,
      role: exp.role,
      employment_type: exp.employment_type,
      location: exp.location,
      work_mode: exp.work_mode,
      company_url: exp.company_url,
      logo_url: exp.logo_url,
      icon: exp.icon,
      start_date: dateStr,
      end_date: exp.end_date,
      is_current: Boolean(exp.is_current),
      description: exp.summary || "",
      highlights: exp.highlights,
      tech_stack: exp.tech_stack,
      is_founder: exp.company.toLowerCase().includes("pynimox"),
    }
  })

  // Group skills into categories
  const skillCategories: SkillCategoryItem[] = (skillCategoriesData || []).map((cat) => {
    const matchedSkills = (skillsData || [])
      .filter((s) => s.category_id === cat.id)
      .map((s, idx) => ({
        id: s.id,
        name: s.name,
        icon: s.icon,
        percentage: 95 - idx * 4,
      }))

    return {
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      skills: matchedSkills,
    }
  })

  // Format Social Links
  const socialLinks = (socialLinksData || []).map((s) => ({
    id: s.id,
    platform: s.platform,
    url: s.url,
    icon: s.icon || undefined,
  }))

  const fullName = profile?.full_name || "Mathan Monishan"
  const headline = profile?.headline || "Software Developer & Full-Stack / AI Engineer"
  const roles = profile?.roles && profile.roles.length > 0 ? profile.roles : [
    "Full-Stack Developer",
    "Founder of Pynimox",
    "AI & Software Engineer",
    "Mechatronics Specialist",
    "Mobile App Developer",
    "UI/UX Designer",
  ]
  const heroAvatarUrl = profile?.avatar_url || "/monishan.jpeg"
  const aboutAvatarUrl = "/about_me.jpg" // High-res black suit portrait for About Me section
  const resumeUrl = profile?.resume_url || "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link"
  const location = profile?.location || "Thalaimannar, Mannar, Sri Lanka"
  const email = profile?.email || "mathanmonishan@gmail.com"
  const phone = profile?.phone || "+94 76 763 4359"
  const whatsappNumber = profile?.whatsapp_number || "94767634359"
  const whatsappMessage = profile?.whatsapp_message || "Hello Monishan! I visited your portfolio and would like to collaborate."

  return (
    <>
      <CursorGlow />
      <SidebarNav
        name={fullName}
        hasVlogs={customVlogs.length > 0}
        hasExperience={experiences.length > 0}
        hasEducation={educationItems.length > 0 || formattedCertifications.length > 0}
        hasProjects={projects.length > 0}
        hasSkills={skillCategories.length > 0}
      />

      <main className="main">
        {/* 1. Hero Section */}
        <Hero
          name={fullName}
          headline={headline}
          description={customHero?.description || "I build intelligent software systems today and engineer intelligent physical systems for tomorrow. Combining software engineering rigor with mechatronics and AI innovation."}
          avatarUrl={heroAvatarUrl}
          resumeUrl={resumeUrl}
          socialLinks={socialLinks.length > 0 ? socialLinks : undefined}
          cards={customHero?.cards}
          imagePosition={customHero?.avatar_position || "top center"}
          imageScale={customHero?.avatar_scale || 1.0}
          location={location}
          phone={phone}
          email={email}
          whatsappNumber={whatsappNumber}
        />

        {/* 2. About Me */}
        <About
          avatarUrl={aboutAvatarUrl}
          roles={roles}
          bioShort={profile?.bio_short || undefined}
          bioLong={profile?.bio_long || undefined}
          resumeUrl={resumeUrl}
        />

        {/* 3. Work Experience / Track Record */}
        <Experience items={experiences} />

        {/* 4. Education & Certifications */}
        <Education
          items={educationItems}
          certifications={formattedCertifications}
        />

        {/* 5. Projects / Recent Works */}
        <Projects projects={projects} />

        {/* 6. Skills */}
        <Skills categories={skillCategories} />

        {/* 7. Personal Vlog & Logs */}
        <PersonalVlog items={customVlogs} />

        {/* 8. Services & Approach / How I Build */}
        <HowIBuild />

        {/* 9. Contact */}
        <Contact
          fullName={fullName}
          location={location}
          email={email}
          phone={phone}
          whatsappNumber={whatsappNumber}
        />

        {/* 10. Footer */}
        <Footer />
      </main>

      <ThemeToggle />
      <ScrollToTop />
      <WhatsAppButton
        phoneNumber={whatsappNumber}
        message={whatsappMessage}
      />
    </>
  )
}
