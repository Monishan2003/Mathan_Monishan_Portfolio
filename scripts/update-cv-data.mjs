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

console.log("Updating Supabase with latest CV data...")

// 1. Update Profile
const profileData = {
  full_name: "Mathan Monishan",
  headline: "Software Developer & Full-Stack / AI Engineer",
  hero_intro: "Hello, my name is",
  roles: [
    "Full-Stack Developer",
    "Founder of Pynimox",
    "AI & Software Engineer",
    "Mechatronics Specialist",
    "Mobile App Developer",
    "UI/UX Designer",
  ],
  bio_short:
    "I am an enthusiastic undergraduate pursuing a Bachelor of Science in Science & Technology at Uva Wellassa University of Sri Lanka, specializing in Mechatronics. I am also pursuing a Bachelor of Information Technology (External) at the University of Moratuwa and hold a Diploma in Project Management from UKI Coding School. Founder & Lead Engineer at Pynimox.",
  bio_long:
    "I am an enthusiastic undergraduate pursuing a Bachelor of Science in Science & Technology at Uva Wellassa University of Sri Lanka, specializing in Mechatronics. I am also pursuing a Bachelor of Information Technology (External) at the University of Moratuwa and hold a Diploma in Project Management from UKI Coding School. I am passionate about learning emerging technologies and applying them to solve real-world engineering and technology challenges.\n\nMy interests include mechatronics, software development, automation, artificial intelligence, and full-stack application development. I have experience with Python, JavaScript, Flutter, C#, MySQL, HTML, and CSS, along with strong analytical and problem-solving skills. I am a quick learner, an effective team player, and eager to contribute my technical knowledge and continuously grow in the fields of engineering and technology.",
  location: "Thalaimannar, Mannar, Sri Lanka",
  email: "mathanmonishan@gmail.com",
  phone: "+94 76 763 4359",
  whatsapp_number: "94767634359",
  whatsapp_message: "Hello Monishan! I visited your portfolio and would like to collaborate on a project.",
  avatar_url: "/monishan.jpeg",
  resume_url: "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
  updated_at: new Date().toISOString(),
}

await admin.from("profile").delete().neq("id", "00000000-0000-0000-0000-000000000000")
await admin.from("profile").insert([profileData])
console.log("Profile updated.")

// 2. Update Education
await admin.from("education").delete().neq("id", "00000000-0000-0000-0000-000000000000")
await admin.from("education").insert([
  {
    degree: "BSc (Hons) in Science & Technology",
    institution: "Uva Wellassa University of Sri Lanka",
    field_of_study: "Mechatronics Specialization",
    start_date: "2024-01-01",
    is_current: true,
    description:
      "Currently pursuing a comprehensive degree program specializing in Mechatronics, automation, robotics, computational science, and emerging engineering technologies.",
    icon: "fas fa-robot",
    sort_order: 1,
    is_published: true,
  },
  {
    degree: "Bachelor of Information Technology (External Degree)",
    institution: "University of Moratuwa",
    field_of_study: "Information Technology",
    start_date: "2025-01-01",
    is_current: true,
    description:
      "External degree program focusing on software engineering principles, database architecture, network systems, and enterprise application development.",
    icon: "fas fa-laptop-code",
    sort_order: 2,
    is_published: true,
  },
  {
    degree: "G.C.E. A/L - Physical Science",
    institution: "Mn/Thalaimannar Pier G.T.M.S",
    field_of_study: "Physical Science",
    start_date: "2009-01-01",
    end_date: "2022-12-01",
    is_current: false,
    description:
      "Completed secondary education with specialization in Physical Science (Combined Mathematics, Physics, and Chemistry).",
    icon: "fas fa-graduation-cap",
    sort_order: 3,
    is_published: true,
  },
])
console.log("Education updated.")

// 3. Update Certifications
await admin.from("certifications").delete().neq("id", "00000000-0000-0000-0000-000000000000")
await admin.from("certifications").insert([
  {
    title: "Diploma of Education in Project Management",
    issuer: "Uki (Yarl IT Hub)",
    issue_date: "2024-08-01",
    description:
      "Comprehensive training in Agile, Scrum, and Waterfall methodologies, cross-functional team leadership, stakeholder communication, and project delivery.",
    icon: "fas fa-tasks",
    sort_order: 1,
    is_published: true,
  },
  {
    title: "Python (Programming Language)",
    issuer: "Uki (Yarl IT Hub)",
    issue_date: "2025-03-01",
    description:
      "Intensive programming course covering core Python, OOP, data structures, algorithm design, file processing, and backend development.",
    icon: "fab fa-python",
    sort_order: 2,
    is_published: true,
  },
  {
    title: "Front-End Development",
    issuer: "Meta (via Coursera)",
    issue_date: "2024-10-01",
    credential_url: "https://www.coursera.org/account/accomplishments/verify/B9JH54BPHVSO",
    description:
      "Professional front-end certification covering HTML5, CSS3, JavaScript, React.js, UI/UX design principles, and responsive web applications.",
    icon: "fab fa-react",
    sort_order: 3,
    is_published: true,
  },
  {
    title: "Artificial Intelligence with Python",
    issuer: "NoviTech R&D Pvt Ltd",
    issue_date: "2024-04-01",
    description:
      "Practical course exploring artificial intelligence fundamentals, machine learning models, neural networks, and Python-based AI development.",
    icon: "fas fa-brain",
    sort_order: 4,
    is_published: true,
  },
])
console.log("Certifications updated.")

// 4. Update Projects with relevant images & details
await admin.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000")
await admin.from("projects").insert([
  {
    slug: "pynimox-ai-website",
    title: "Pynimox AI Website",
    subtitle: "AI Automation & Full-Stack Engineering Studio",
    category: "AI & Web Development",
    status: "LIVE",
    summary:
      "Modern business website for Pynimox featuring responsive UI, optimized performance, and an integrated AI Assistant for intelligent customer support and interactive user experience.",
    problem:
      "Businesses needed an automated, intelligent web platform to discover, configure, and orchestrate custom AI agent workflows and production engineering services.",
    solution:
      "Developed a high-performance Next.js and Supabase platform with custom LLM API integrations, interactive AI agent chat, secure API endpoints, and cloud deployment.",
    outcome:
      "Successfully launched studio website serving international clients with seamless AI agent onboarding and real-time interactive inquiries.",
    tech_stack: ["Next.js", "TypeScript", "Node.js", "Supabase", "SQL", "LLM APIs"],
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
    slug: "srmj-enterprises-ecommerce",
    title: "SRMJ Enterprises – E-Commerce Platform",
    subtitle: "Modern Retail & Fashion Online Store",
    category: "E-Commerce",
    status: "LIVE",
    summary:
      "Designed and developed a modern full-stack e-commerce platform for fashion and retail products with product catalog, shopping cart, authentication, and Stripe payment integration.",
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
    sort_order: 2,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "medicross-ai-healthcare",
    title: "MediCross AI – AI Healthcare Management",
    subtitle: "Full-Stack Healthcare & Patient Management System",
    category: "AI & Healthcare",
    status: "LIVE",
    summary:
      "Full-stack healthcare management system with secure authentication, role-based access, patient registration, appointment scheduling, and electronic medical records.",
    problem:
      "Clinics and hospitals needed a centralized, secure digital system to manage patient appointments, digital health records, and medical workflows efficiently.",
    solution:
      "Implemented a comprehensive health portal with doctor-patient role dashboards, scheduling calendars, health analytics, and cloud database architecture.",
    outcome:
      "Deployed a responsive, intuitive healthcare solution on AWS and Vercel with high data security and automated appointment booking.",
    tech_stack: ["Next.js", "React.js", "Node.js", "PostgreSQL", "Prisma", "Supabase", "AWS", "Vercel"],
    role: "Lead Full-Stack Developer",
    client_name: "MediCross Health",
    live_url: "https://medicross-wine.vercel.app",
    cover_image_url: "/projects/medicross.jpg",
    icon: "fas fa-heartbeat",
    accent_gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
    sort_order: 3,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "unisphere-lms",
    title: "UniSphere LMS – Learning Management System",
    subtitle: "Enterprise Educational Portal (C# & .NET)",
    category: "Enterprise Software",
    status: "COMPLETED",
    summary:
      "Designed and implemented a comprehensive Learning Management System using C# and .NET, featuring structured user roles (Admin, Staff, Lecturers, Students) and course management.",
    problem:
      "Educational institutions needed a robust desktop and web system to handle student enrolments, multi-tier user permissions, assignment submissions, and grading.",
    solution:
      "Architected clean OOP structure using C#, ASP.NET, and SQL Server with course management modules, grading systems, and role-based access control.",
    outcome:
      "Strengthened enterprise software development skills in OOP, database normalization, data handling, and scalable system design.",
    tech_stack: ["C#", ".NET", "ASP.NET", "SQL Server"],
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
    title: "Hotel Website (Web Design Project)",
    subtitle: "Responsive Luxury Boutique Hotel Showcase",
    category: "Web Design",
    status: "COMPLETED",
    summary:
      "Designed and developed a fully responsive hotel website using HTML5 and CSS3 showcasing rooms, amenities, and booking information with clean, modern design.",
    problem:
      "Creating an attractive, mobile-friendly landing experience that showcases hotel amenities and drives reservation inquiries.",
    solution:
      "Built clean semantic HTML5 markup, custom CSS grid layouts, smooth CSS animations, and optimized media assets.",
    outcome:
      "Gained hands-on experience in front-end web development, responsive design best practices, and cross-browser styling.",
    tech_stack: ["HTML5", "CSS3", "Web Design", "Responsive UI"],
    role: "Front-End Developer",
    client_name: "Web Design Project",
    repo_url: "https://github.com/Monishan2003/Web-design-project1",
    cover_image_url: "/projects/hotel.jpg",
    icon: "fas fa-hotel",
    accent_gradient: "linear-gradient(135deg, #4a6fc7 0%, #3f51b5 100%)",
    sort_order: 5,
    is_featured: true,
    is_published: true,
  },
  {
    slug: "personal-expense-tracker",
    title: "Personal Expense Tracker (Python CLI)",
    subtitle: "Financial Management & Spending Analytics",
    category: "Python Application",
    status: "COMPLETED",
    summary:
      "Python command-line application to track and manage personal daily expenses, generate reports, and analyze spending patterns.",
    problem:
      "Managing daily expenses without bloated software tools while getting accurate spending analysis.",
    solution:
      "Implemented a lightweight Python CLI with persistent data storage, categorized expense logging, and summary analytics.",
    outcome:
      "Strengthened core Python programming, data manipulation, file handling, and CLI user interaction.",
    tech_stack: ["Python", "CLI", "Data Structures", "File I/O"],
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
])
console.log("Projects updated with custom preview images.")

// 5. Update Skill Categories and Skills
await admin.from("skills").delete().neq("id", "00000000-0000-0000-0000-000000000000")
await admin.from("skill_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000")

const { data: cat1 } = await admin
  .from("skill_categories")
  .insert({ name: "AI & Machine Learning", icon: "fas fa-brain", sort_order: 1, is_published: true })
  .select()
  .single()

const { data: cat2 } = await admin
  .from("skill_categories")
  .insert({ name: "Frontend Development", icon: "fas fa-laptop-code", sort_order: 2, is_published: true })
  .select()
  .single()

const { data: cat3 } = await admin
  .from("skill_categories")
  .insert({ name: "Backend & Databases", icon: "fas fa-server", sort_order: 3, is_published: true })
  .select()
  .single()

const { data: cat4 } = await admin
  .from("skill_categories")
  .insert({ name: "Cloud, Tools & Hardware", icon: "fas fa-tools", sort_order: 4, is_published: true })
  .select()
  .single()

if (cat1 && cat2 && cat3 && cat4) {
  await admin.from("skills").insert([
    // AI Category
    { category_id: cat1.id, name: "AI/ML Integration (LLM APIs)", icon: "fas fa-robot", sort_order: 1, is_published: true },
    { category_id: cat1.id, name: "AI Automation Agents", icon: "fas fa-network-wired", sort_order: 2, is_published: true },
    { category_id: cat1.id, name: "Prompt Engineering", icon: "fas fa-terminal", sort_order: 3, is_published: true },

    // Frontend Category
    { category_id: cat2.id, name: "Next.js", icon: "fab fa-react", sort_order: 1, is_published: true },
    { category_id: cat2.id, name: "React.js", icon: "fab fa-react", sort_order: 2, is_published: true },
    { category_id: cat2.id, name: "JavaScript / TypeScript", icon: "fab fa-js", sort_order: 3, is_published: true },
    { category_id: cat2.id, name: "HTML5 & CSS3", icon: "fab fa-html5", sort_order: 4, is_published: true },
    { category_id: cat2.id, name: "Flutter (Mobile)", icon: "fab fa-android", sort_order: 5, is_published: true },
    { category_id: cat2.id, name: "Angular", icon: "fab fa-angular", sort_order: 6, is_published: true },

    // Backend Category
    { category_id: cat3.id, name: "Python", icon: "fab fa-python", sort_order: 1, is_published: true },
    { category_id: cat3.id, name: "C# & .NET", icon: "fab fa-microsoft", sort_order: 2, is_published: true },
    { category_id: cat3.id, name: "ASP.NET Core", icon: "fas fa-code", sort_order: 3, is_published: true },
    { category_id: cat3.id, name: "Node.js", icon: "fab fa-node-js", sort_order: 4, is_published: true },
    { category_id: cat3.id, name: "PostgreSQL & Supabase", icon: "fas fa-database", sort_order: 5, is_published: true },
    { category_id: cat3.id, name: "MySQL & MongoDB", icon: "fas fa-database", sort_order: 6, is_published: true },
    { category_id: cat3.id, name: "Prisma ORM", icon: "fas fa-layer-group", sort_order: 7, is_published: true },

    // Cloud & Tools Category
    { category_id: cat4.id, name: "AWS & Google Cloud", icon: "fab fa-aws", sort_order: 1, is_published: true },
    { category_id: cat4.id, name: "Git & GitHub", icon: "fab fa-github", sort_order: 2, is_published: true },
    { category_id: cat4.id, name: "REST APIs", icon: "fas fa-exchange-alt", sort_order: 3, is_published: true },
    { category_id: cat4.id, name: "Figma & Canva", icon: "fab fa-figma", sort_order: 4, is_published: true },
    { category_id: cat4.id, name: "Electronics & Circuit Fundamentals", icon: "fas fa-microchip", sort_order: 5, is_published: true },
    { category_id: cat4.id, name: "Project Management (Agile/Scrum)", icon: "fas fa-tasks", sort_order: 6, is_published: true },
  ])
  console.log("Skill categories and skills updated.")
}

// 6. Update Work Experiences
await admin.from("experiences").delete().neq("id", "00000000-0000-0000-0000-000000000000")
await admin.from("experiences").insert([
  {
    company: "NF Group of Companies",
    role: "Full-Stack Developer",
    location: "Hybrid, Sri Lanka",
    start_date: "2025-01-01",
    is_current: true,
    description:
      "Developed full-stack web and mobile applications using ASP.NET Core, Next.js, React.js, Node.js, Angular, Flutter, SQL Server, MySQL, MongoDB, Supabase, and AWS. Built and maintained NFPlantation.com, NaturePlantation.lk, NFFarming.lk, the NF Farming App, and modules for a POS & ERP System.",
    sort_order: 1,
    is_published: true,
  },
  {
    company: "Pynimox",
    role: "Founder & Lead Full-Stack / AI Engineer",
    location: "Remote, Global (www.pynimox.com)",
    start_date: "2025-01-01",
    is_current: true,
    description:
      "Founded and lead Pynimox, an AI automation and full-stack engineering studio serving international clients. Built production systems end-to-end: architecture, AI integration, deployment, and client delivery using Next.js, Python, Supabase, and LLM APIs.",
    sort_order: 2,
    is_published: true,
  },
  {
    company: "Yarl IT Hub",
    role: "Volunteer",
    location: "Mannar District, Sri Lanka",
    start_date: "2024-07-01",
    end_date: "2024-10-01",
    is_current: false,
    description:
      "Contributed to a social impact project addressing school dropout rates and drug usage in Mannar District. Assisted in project planning, requirement analysis, documentation, and stakeholder coordination.",
    sort_order: 3,
    is_published: true,
  },
])
console.log("Work experiences updated.")

console.log("ALL CV DATA UPDATED IN SUPABASE POSTGRES SUCCESSFULLY!")
