import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const testProject = {
  slug: "pynimox-ai-website",
  title: "Pynimox AI Website",
  subtitle: "AI Automation & Full-Stack Engineering Studio",
  category: "AI & Web Development",
  status: "LIVE",
  summary:
    "Modern business website for Pynimox featuring responsive UI, optimized performance, and an integrated AI Assistant for intelligent customer support.",
  tech_stack: ["Next.js", "TypeScript", "Node.js", "Supabase", "SQL", "LLM APIs"],
  live_url: "https://www.pynimox.com",
  cover_image_url: "/projects/pynimox.jpg",
  role: "Founder & Lead Engineer",
  sort_order: 1,
  is_featured: true,
  is_published: true,
}

const { data, error } = await admin.from("projects").insert([testProject]).select()
if (error) {
  console.error("PROJECT INSERT ERROR:", error)
} else {
  console.log("PROJECT INSERT SUCCESS:", data)
}
