import { createServerClient } from "@/lib/supabase/server"
import BackgroundAnimation from "@/components/BackgroundAnimation"
import Navbar from "@/components/Navbar"
import Hero from "@/features/hero/Hero"
import About from "@/features/about/About"
import Education, { type EducationItem } from "@/features/education/Education"
import Certifications, { type CertificationItem } from "@/features/certifications/Certifications"
import Projects, { type ProjectItem } from "@/features/projects/Projects"
import Skills, { type SkillCategoryItem } from "@/features/skills/Skills"
import Contact from "@/features/contact/Contact"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import WhatsAppButton from "@/components/WhatsAppButton"

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createServerClient()

  // Fetch all content in parallel
  const [
    { data: profile },
    { data: socialLinks },
    { data: educationData },
    { data: certificationsData },
    { data: projectsData },
    { data: skillCategoriesData },
    { data: skillsData },
  ] = await Promise.all([
    supabase.from("profile").select("*").maybeSingle(),
    supabase.from("social_links").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("education").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("certifications").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("skill_categories").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("skills").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
  ])

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
    }
  })

  // Format Certifications Items
  const certItems: CertificationItem[] = (certificationsData || []).map((cert) => {
    const dateStr = cert.issue_date
      ? new Date(cert.issue_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : undefined

    return {
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      issue_date: dateStr,
      description: cert.description,
      icon: cert.icon || "fas fa-certificate",
      credential_url: cert.credential_url,
    }
  })

  // Format projects
  const projects: ProjectItem[] = (projectsData || []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    tech_stack: p.tech_stack,
    repo_url: p.repo_url,
    live_url: p.live_url,
    resource_url: p.resource_url,
    resource_label: p.resource_label,
    icon: p.icon,
    accent_gradient: p.accent_gradient,
    cover_image_url: p.cover_image_url,
  }))

  // Group skills into categories
  const skillCategories: SkillCategoryItem[] = (skillCategoriesData || []).map((cat) => {
    const matchedSkills = (skillsData || [])
      .filter((s) => s.category_id === cat.id)
      .map((s) => ({
        id: s.id,
        name: s.name,
        icon: s.icon,
      }))

    return {
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      skills: matchedSkills,
    }
  })

  const fullName = profile?.full_name || "Mathan Monishan"
  const heroIntro = profile?.hero_intro || "Hello, my name is"
  const roles = profile?.roles && profile.roles.length > 0 ? profile.roles : [
    "Full Stack Developer",
    "Mobile App Developer",
    "Coder",
    "UI/UX Designer",
    "Project Management Enthusiast",
    "Freelancer",
  ]
  const bioShort = profile?.bio_short || undefined
  const bioLong = profile?.bio_long || undefined
  const avatarUrl = profile?.avatar_url || "/monishan.jpeg"
  const resumeUrl = profile?.resume_url || undefined
  const location = profile?.location || "Thalaimannar, Mannar, Sri Lanka"
  const email = profile?.email || "mathanmonishan@gmail.com"
  const phone = profile?.phone || "+94 76 763 4359"
  const whatsappNumber = profile?.whatsapp_number || "94767634359"
  const whatsappMessage = profile?.whatsapp_message || "Hello! I visited your portfolio and would like to get in touch."

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <BackgroundAnimation />
      <Navbar name={fullName} />
      <Hero intro={heroIntro} name={fullName} roles={roles} />
      <About
        avatarUrl={avatarUrl}
        roles={roles}
        bioShort={bioShort}
        bioLong={bioLong}
        resumeUrl={resumeUrl}
      />
      <Education items={educationItems.length > 0 ? educationItems : undefined} />
      <Certifications items={certItems.length > 0 ? certItems : undefined} />
      <Projects projects={projects.length > 0 ? projects : undefined} />
      <Skills categories={skillCategories.length > 0 ? skillCategories : undefined} />
      <Contact
        fullName={fullName}
        location={location}
        email={email}
        phone={phone}
        whatsappNumber={whatsappNumber}
      />
      <Footer
        fullName={fullName}
        location={location}
        email={email}
        phone={phone}
        whatsappNumber={whatsappNumber}
        socialLinks={socialLinks || undefined}
        bioNote={bioShort}
      />
      <ScrollToTop />
      <WhatsAppButton
        phoneNumber={whatsappNumber}
        message={whatsappMessage}
      />
    </main>
  )
}
