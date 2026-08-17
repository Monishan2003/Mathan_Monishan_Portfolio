import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Test if we can store custom vlogs & hero settings in site_settings
const testSettings = {
  footer_note: JSON.stringify({
    vlogs: [
      {
        id: "vlog-1",
        title: "Building Pynimox: From Concept to AI Automation Studio",
        category: "vlog",
        date: "Feb 2026",
        read_time: "5 min watch",
        summary: "A video walkthrough of how I founded Pynimox, architected the multi-agent LLM pipeline, and built the client delivery infrastructure.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        cover_image_url: "/projects/pynimox.jpg",
        tags: ["AI Studio", "Venture", "Architecture"],
        content: "In this video log, I walk through the complete journey of launching Pynimox.",
      },
      {
        id: "vlog-2",
        title: "Bridging Full-Stack Software with Mechatronics & Physical Computing",
        category: "article",
        date: "Jan 2026",
        read_time: "6 min read",
        summary: "Reflections on my dual-degree journey: Combining software engineering rigor (APIs, databases, React) with sensor robotics and hardware control.",
        cover_image_url: "/projects/unisphere.jpg",
        tags: ["Mechatronics", "Engineering", "Robotics"],
        content: "Engineering intelligent physical systems requires strong foundations in both bits and atoms.",
      },
      {
        id: "vlog-3",
        title: "Mechatronics Lab & Hardware Prototyping Showcase",
        category: "gallery",
        date: "Dec 2025",
        read_time: "Photo Gallery",
        summary: "Snapshots and insights from university robotics lab sessions, circuit breadboarding, microcontrollers, and automation experiments.",
        cover_image_url: "/projects/hotel.jpg",
        gallery_urls: [
          "/projects/pynimox.jpg",
          "/projects/medicross.jpg",
          "/projects/srmj.jpg",
          "/projects/unisphere.jpg"
        ],
        tags: ["Hardware", "Circuits", "Lab Work"],
        content: "A photo collection documenting hands-on laboratory experiments, electronic circuitry design, sensor calibrations, and mechatronic prototypes.",
      }
    ],
    hero: {
      greeting: "Hello, my name is",
      name: "Mathan Monishan",
      headline: "Software Developer & Full-Stack / AI Engineer",
      description: "I build intelligent software systems today and engineer intelligent physical systems for tomorrow.",
      avatar_position: "center center",
      avatar_scale: 1.0,
      highlight_color: "#2563eb",
      cards: [
        { icon: "fas fa-crown", title: "Founder", subtitle: "Pynimox AI Studio" },
        { icon: "fas fa-laptop-code", title: "Specialization", subtitle: "AI, Next.js & .NET" },
        { icon: "fas fa-graduation-cap", title: "Dual Degree", subtitle: "Mechatronics & IT" }
      ]
    }
  })
}

const { data: existing } = await admin.from("site_settings").select("id").maybeSingle()
if (existing) {
  const { error } = await admin.from("site_settings").update(testSettings).eq("id", existing.id)
  console.log("Update site_settings result:", error || "SUCCESS")
} else {
  const { error } = await admin.from("site_settings").insert([testSettings])
  console.log("Insert site_settings result:", error || "SUCCESS")
}
