import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !secretKey) {
  console.error("Missing Supabase credentials in environment")
  process.exit(1)
}

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log("Seeding all Projects and Experiences into Supabase...")

// 1. Seed Projects
const projects = [
  {
    slug: "pynimox-ai-website",
    title: "Pynimox AI Studio",
    subtitle: "AI Automation & Full-Stack Engineering Studio (Founder Venture)",
    category: "AI & Automation",
    status: "LIVE",
    summary:
      "Engineered an automated AI studio platform enabling global clients to orchestrate intelligent AI agent workflows, dynamic LLM integrations, and production web systems.",
    problem:
      "Businesses needed an automated, intelligent web platform to discover, configure, and orchestrate custom AI agent workflows and production engineering services.",
    solution:
      "Developed a high-performance Next.js and Supabase platform with custom LLM API integrations, interactive AI agent chat, secure API endpoints, and cloud deployment.",
    outcome:
      "Successfully launched studio website serving international clients with seamless AI agent onboarding and real-time interactive inquiries.",
    tech_stack: ["Next.js", "TypeScript", "Python", "Supabase", "LLM APIs"],
    role: "Founder & Lead Engineer",
    client_name: "Pynimox (Global)",
    live_url: "https://www.pynimox.com",
    cover_image_url: "/projects/pynimox.jpg",
    icon: "fas fa-robot",
    accent_gradient: "linear-gradient(135deg, #090642 0%, #1b0072 50%, #14b1ff 100%)",
    sort_order: 1,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "medicross-ai-healthcare",
    title: "MediCross AI — Healthcare Platform",
    subtitle: "Clinical Operations & Patient Management System",
    category: "Full-Stack Web",
    status: "LIVE",
    summary:
      "Full-stack healthcare management system with multi-role access control, patient record indexing, appointment scheduling, and health metrics analytics.",
    problem:
      "Clinics and hospitals needed a centralized, secure digital system to manage patient appointments, digital health records, and medical workflows efficiently.",
    solution:
      "Implemented a comprehensive health portal with doctor-patient role dashboards, scheduling calendars, health analytics, and cloud database architecture.",
    outcome:
      "Deployed a responsive, intuitive healthcare solution on AWS and Vercel with high data security and automated appointment booking.",
    tech_stack: ["Next.js", "React.js", "Node.js", "PostgreSQL", "AWS"],
    role: "Lead Full-Stack Developer",
    client_name: "MediCross Health",
    live_url: "https://medicross-wine.vercel.app",
    cover_image_url: "/projects/medicross.jpg",
    icon: "fas fa-heartbeat",
    accent_gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
    sort_order: 2,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "srmj-enterprises-ecommerce",
    title: "SRMJ Enterprises E-Commerce",
    subtitle: "Modern Retail & Fashion Online Store",
    category: "Full-Stack Web",
    status: "LIVE",
    summary:
      "Production-grade e-commerce web application featuring high-speed catalog filtering, interactive cart drawer, secure authentication, and Stripe payment processing.",
    problem:
      "Retail fashion business required a fast, responsive digital storefront with seamless checkout, inventory display, and secure payments.",
    solution:
      "Engineered an optimized shopping experience across desktop and mobile using Next.js, Stripe checkout, PostgreSQL database, Prisma ORM, and Supabase auth.",
    outcome:
      "Delivered a production-ready e-commerce solution enabling smooth customer purchasing, fast page loads, and automated order processing.",
    tech_stack: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Supabase"],
    role: "Full-Stack Developer",
    client_name: "SRMJ Enterprises",
    live_url: "https://www.srmjenterprises.com",
    cover_image_url: "/projects/srmj.jpg",
    icon: "fas fa-shopping-bag",
    accent_gradient: "linear-gradient(135deg, #2b3fa7 0%, #4a6fc7 100%)",
    sort_order: 3,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "unisphere-lms",
    title: "UniSphere LMS — Academic Portal",
    subtitle: "Enterprise Learning Management System (C# & .NET)",
    category: "Enterprise & Systems",
    status: "LIVE",
    summary:
      "Comprehensive educational management system supporting 4 distinct user tiers (Admin, Staff, Lecturers, Students) with course workflows, assignments, and grading.",
    problem:
      "Educational institutions needed a robust desktop and web system to handle student enrolments, multi-tier user permissions, assignment submissions, and grading.",
    solution:
      "Architected clean OOP structure using C#, ASP.NET, and SQL Server with course management modules, grading systems, and role-based access control.",
    outcome:
      "Strengthened enterprise software development skills in OOP, database normalization, data handling, and scalable system design.",
    tech_stack: ["C#", ".NET", "ASP.NET", "SQL Server", "Architecture"],
    role: "Software Developer",
    client_name: "Educational Project",
    repo_url: "https://github.com/Monishan2003/LMS_project_C-_-Learning_Management_Systam-.git",
    cover_image_url: "/projects/unisphere.jpg",
    icon: "fas fa-graduation-cap",
    accent_gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    sort_order: 4,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "hotel-website",
    title: "Luxury Hotel Web Platform",
    subtitle: "Responsive Boutique Resort Showcase",
    category: "Full-Stack Web",
    status: "LIVE",
    summary:
      "Fully responsive booking and amenities showcase website built with HTML5, CSS3, and modern UI best practices.",
    problem:
      "Creating an attractive, mobile-friendly landing experience that showcases hotel amenities and drives reservation inquiries.",
    solution:
      "Built a semantic HTML5, CSS3 grid/flexbox responsive layout with smooth transitions, image carousels, and contact touchpoints.",
    outcome:
      "Delivered a lightweight, highly performant hotel portal optimized for all modern browsers.",
    tech_stack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    role: "Frontend Developer",
    client_name: "Hospitality Showcase",
    repo_url: "https://github.com/Monishan2003/Web-design-project1",
    cover_image_url: "/projects/hotel.jpg",
    icon: "fas fa-hotel",
    accent_gradient: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    sort_order: 5,
    is_featured: false,
    is_published: true,
  },
  {
    slug: "personal-expense-tracker",
    title: "Personal Expense Tracker",
    subtitle: "Python CLI Financial Management Tool",
    category: "Enterprise & Systems",
    status: "LIVE",
    summary:
      "Command-line application to track personal expenses, categorize spending, and generate visual financial reports.",
    problem:
      "Users needed a simple, lightweight, dependency-free utility to record daily expenses and generate summaries directly from terminal.",
    solution:
      "Implemented a structured Python CLI with file I/O persistence, input validation, categorization algorithms, and balance calculations.",
    outcome:
      "Provided an intuitive local tool for personal financial tracking and automated reporting.",
    tech_stack: ["Python", "CLI", "Data Handling", "File I/O"],
    role: "Python Developer",
    client_name: "Personal Project",
    repo_url: "https://github.com/Monishan2003/Personal-Expense-Tracker",
    cover_image_url: "/projects/expense.jpg",
    icon: "fas fa-money-bill-wave",
    accent_gradient: "linear-gradient(135deg, #20bf6b 0%, #01baef 100%)",
    sort_order: 6,
    is_featured: false,
    is_published: true,
  },
]

await admin.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000")
const { data: projData, error: projErr } = await admin.from("projects").insert(projects).select()
if (projErr) {
  console.error("Error inserting projects:", projErr)
} else {
  console.log(`Successfully inserted ${projData.length} projects!`)
}

// 2. Seed Experiences
const experiences = [
  {
    company: "Pynimox",
    role: "Founder & Lead Full-Stack / AI Engineer",
    company_url: "https://www.pynimox.com",
    location: "Remote / Global",
    work_mode: "Remote",
    start_date: "2025-01-01",
    is_current: true,
    summary:
      "Founded and lead Pynimox, an AI automation studio delivering multi-agent LLM systems, streaming APIs, and production full-stack web applications for global clients.",
    highlights: [
      "Architected multi-agent LLM pipelines with real-time streaming and custom business automations.",
      "Engineered scalable web applications using Next.js, TypeScript, Supabase, and cloud services.",
    ],
    tech_stack: ["Next.js", "TypeScript", "Python", "Supabase", "LLM APIs", "Tailwind CSS"],
    icon: "fas fa-crown",
    sort_order: 1,
    is_published: true,
  },
  {
    company: "NF Group of Companies",
    role: "Full-Stack Developer",
    company_url: "https://nfplantation.com",
    location: "Hybrid, Sri Lanka",
    work_mode: "Hybrid",
    start_date: "2025-01-01",
    is_current: true,
    summary:
      "Develop enterprise web applications, RESTful APIs, and ERP modules for retail, agricultural, and management systems.",
    highlights: [
      "Engineered backend RESTful APIs and modules for enterprise POS & ERP using ASP.NET Core & SQL Server.",
      "Built core web properties: NFPlantation.com, NaturePlantation.lk, NFFarming.lk, and Flutter mobile apps.",
    ],
    tech_stack: ["ASP.NET Core", "Next.js", "React", "Flutter", "SQL Server", "AWS"],
    icon: "fas fa-briefcase",
    sort_order: 2,
    is_published: true,
  },
  {
    company: "Yarl IT Hub",
    role: "Project Volunteer (Social Impact)",
    company_url: "https://yarlithub.org",
    location: "Mannar District, Sri Lanka",
    work_mode: "On-site",
    start_date: "2024-07-01",
    end_date: "2024-10-01",
    is_current: false,
    summary:
      "Contributed to structured project planning, requirement analysis, and youth empowerment initiatives in Mannar District.",
    highlights: [
      "Assisted in Agile sprint planning, stakeholder alignment, and initiative documentation.",
    ],
    tech_stack: ["Project Management", "Agile / Scrum", "Community Engagement"],
    icon: "fas fa-hands-helping",
    sort_order: 3,
    is_published: true,
  },
]

await admin.from("experiences").delete().neq("id", "00000000-0000-0000-0000-000000000000")
const { data: expData, error: expErr } = await admin.from("experiences").insert(experiences).select()
if (expErr) {
  console.error("Error inserting experiences:", expErr)
} else {
  console.log(`Successfully inserted ${expData.length} experiences!`)
}

console.log("Seeding complete!")
