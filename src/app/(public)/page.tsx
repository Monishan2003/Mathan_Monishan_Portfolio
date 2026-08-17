import { createServerClient } from "@/lib/supabase/server"
import SidebarNav from "@/components/SidebarNav"
import Hero from "@/features/hero/Hero"
import About from "@/features/about/About"
import Skills, { type SkillCategoryItem } from "@/features/skills/Skills"
import Experience, { type ExperienceItem } from "@/features/experience/Experience"
import Projects, { type ProjectItem } from "@/features/projects/Projects"
import HowIBuild from "@/features/approach/HowIBuild"
import PersonalVlog from "@/features/vlog/PersonalVlog"
import Education, { type EducationItem } from "@/features/education/Education"
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
    { data: educationData },
    { data: _certificationsData },
    { data: projectsData },
    { data: experiencesData },
    { data: skillCategoriesData },
    { data: skillsData },
  ] = await Promise.all([
    supabase.from("profile").select("*").maybeSingle(),
    supabase.from("education").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("certifications").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("projects").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("experiences").select("*").eq("is_published", true).order("sort_order", { ascending: true }),
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

  const fullName = profile?.full_name || "Mathan Monishan"
  const roles = profile?.roles && profile.roles.length > 0 ? profile.roles : [
    "AI & Full-Stack Engineer",
    "Founder of Pynimox",
    "Mechatronics Engineer",
    "Robotics & Automation Builder",
  ]
  const avatarUrl = profile?.avatar_url || "/monishan.jpeg"
  const resumeUrl = profile?.resume_url || "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link"
  const location = profile?.location || "Thalaimannar, Mannar, Sri Lanka"
  const email = profile?.email || "mathanmonishan@gmail.com"
  const phone = profile?.phone || "+94 76 763 4359"
  const whatsappNumber = profile?.whatsapp_number || "94767634359"
  const whatsappMessage = profile?.whatsapp_message || "Hello Monishan! I visited your portfolio and would like to collaborate."

  return (
    <>
      <SidebarNav name={fullName} />

      <main className="main">
        <Hero name={fullName} roles={roles} resumeUrl={resumeUrl} />
        <About
          avatarUrl={avatarUrl}
          roles={roles}
          bioShort={profile?.bio_short || undefined}
          bioLong={profile?.bio_long || undefined}
          resumeUrl={resumeUrl}
        />
        <Skills categories={skillCategories.length > 0 ? skillCategories : undefined} />
        <Experience items={experiences.length > 0 ? experiences : undefined} />
        <Projects projects={projects.length > 0 ? projects : undefined} />
        <HowIBuild />
        <PersonalVlog />
        <Education items={educationItems.length > 0 ? educationItems : undefined} />
        <Contact
          fullName={fullName}
          location={location}
          email={email}
          phone={phone}
          whatsappNumber={whatsappNumber}
        />
        <Footer />
      </main>

      <ScrollToTop />
      <WhatsAppButton
        phoneNumber={whatsappNumber}
        message={whatsappMessage}
      />
    </>
  )
}
