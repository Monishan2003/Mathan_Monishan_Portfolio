import { createServerClient } from "@/lib/supabase/server"

export const revalidate = 3600

/**
 * Phase 1 shell.
 *
 * This page exists to prove one thing: a Server Component can reach Supabase
 * through RLS as the `anon` role. Phase 3 replaces it with the real sections
 * (Hero, About, Experience, Education, Projects, Skills, Certifications,
 * Testimonials, Contact), each composed from src/features/*.
 */
export default async function HomePage() {
  const supabase = await createServerClient()

  const [{ count: projectCount }, { data: profile }] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("profile").select("full_name").maybeSingle(),
  ])

  return (
    <main
      style={{ padding: "4rem 1.5rem", maxWidth: "48rem", margin: "0 auto" }}
    >
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem" }}>
        monishan-portfolio-v2
      </h1>
      <p style={{ marginTop: "0.5rem" }}>
        Phase 1 scaffold. Design system lands in Phase 2, content in Phase 3.
      </p>
      <ul style={{ marginTop: "1.5rem", lineHeight: 2 }}>
        <li>Supabase reachable from a Server Component: yes</li>
        <li>Published projects visible to anon: {projectCount ?? 0}</li>
        <li>Profile row seeded: {profile ? profile.full_name : "not yet"}</li>
      </ul>
    </main>
  )
}
