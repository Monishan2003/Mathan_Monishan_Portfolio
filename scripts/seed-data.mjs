import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !secretKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

async function seed() {
  console.log("🌱 Starting Database Seed for Mathan Monishan Portfolio...")

  // 1. Profile
  console.log("Seeding profile...")
  const profileData = {
    full_name: "Mathan Monishan",
    headline: "Full Stack Developer | Mobile App Developer | UI/UX Designer",
    hero_intro: "Hello, my name is",
    roles: [
      "Full Stack Developer",
      "Mobile App Developer",
      "Coder",
      "UI/UX Designer",
      "Project Management Enthusiast",
      "Freelancer",
    ],
    bio_short:
      "Hello! I'm Monishan, an undergraduate Science and Technology student at Uva Wellassa University and a driven Information Technology student at the University of Moratuwa, with strong skills in frontend development, Python programming, and project management.",
    bio_long:
      "I started my journey with HTML, CSS, and JavaScript, and have continued to deepen my expertise in building responsive, user-friendly web interfaces. With hands-on experience in managing projects and collaborating in team environments, I'm passionate about creating solutions that make a difference.\n\nI'm currently seeking an internship opportunity where I can apply and grow my skills while contributing to impactful and innovative projects.",
    location: "Thalaimannar, Mannar, Sri Lanka",
    email: "mathanmonishan@gmail.com",
    phone: "+94 76 763 4359",
    whatsapp_number: "94767634359",
    whatsapp_message:
      "Hello! I visited your portfolio and would like to get in touch.",
    avatar_url: "/monishan.jpeg",
    resume_url:
      "https://drive.google.com/file/d/1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY/view?usp=drive_link",
    available_for_work: true,
    availability_note: "Seeking an internship opportunity",
  }

  const { data: existingProfile } = await admin
    .from("profile")
    .select("id")
    .maybeSingle()

  if (existingProfile) {
    await admin
      .from("profile")
      .update({ ...profileData, updated_at: new Date().toISOString() })
      .eq("id", existingProfile.id)
    console.log("  ✓ Profile updated")
  } else {
    await admin.from("profile").insert(profileData)
    console.log("  ✓ Profile created")
  }

  // 2. Social Links
  console.log("Seeding social links...")
  await admin.from("social_links").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  const socialLinks = [
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mathan-monishan2003",
      icon: "fab fa-linkedin-in",
      sort_order: 1,
      is_published: true,
    },
    {
      platform: "github",
      label: "GitHub",
      url: "https://github.com/Monishan2003",
      icon: "fab fa-github",
      sort_order: 2,
      is_published: true,
    },
    {
      platform: "x",
      label: "Twitter / X",
      url: "https://x.com/Monishan2003",
      icon: "fab fa-twitter",
      sort_order: 3,
      is_published: true,
    },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/monishan_2003",
      icon: "fab fa-instagram",
      sort_order: 4,
      is_published: true,
    },
    {
      platform: "whatsapp",
      label: "WhatsApp",
      url: "https://wa.me/94767634359",
      icon: "fab fa-whatsapp",
      sort_order: 5,
      is_published: true,
    },
  ]
  await admin.from("social_links").insert(socialLinks)
  console.log(`  ✓ Inserted ${socialLinks.length} social links`)

  // 3. Education
  console.log("Seeding education...")
  await admin.from("education").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  const educationItems = [
    {
      institution: "Uva Wellassa University of Sri Lanka",
      degree: "BSc (Hons) in Science & Technology",
      field_of_study: "Science & Technology",
      start_date: "2024-01-01",
      is_current: true,
      description:
        "Currently pursuing a comprehensive degree program focused on scientific principles and technological applications.",
      icon: "fas fa-university",
      sort_order: 1,
      is_published: true,
    },
    {
      institution: "University of Moratuwa",
      degree: "Bachelor of Information Technology (External)",
      field_of_study: "Information Technology",
      start_date: "2025-01-01",
      is_current: true,
      description:
        "External degree program focusing on core IT concepts, software development, and information systems.",
      icon: "fas fa-university",
      sort_order: 2,
      is_published: true,
    },
  ]
  await admin.from("education").insert(educationItems)
  console.log(`  ✓ Inserted ${educationItems.length} education entries`)

  // 4. Certifications
  console.log("Seeding certifications...")
  await admin.from("certifications").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  const certifications = [
    {
      title: "Introduction to Front-End Development",
      issuer: "Meta (via Coursera)",
      issue_date: "2024-10-01",
      is_current: false,
      description:
        "Comprehensive course covering front-end development fundamentals including HTML, CSS, JavaScript, React.js, Bootstrap, and responsive web design. Skills gained: Web Development Tools, React.js, UI/UX, Responsive Design, and JavaScript Frameworks.",
      credential_url:
        "https://www.coursera.org/account/accomplishments/verify/B9JH54BPHVSO",
      icon: "fas fa-certificate",
      sort_order: 1,
      is_published: true,
    },
    {
      title: "Diploma of Education in Project Management",
      issuer: "Uki (Yarl IT Hub)",
      issue_date: "2024-01-01",
      is_current: false,
      description:
        "Comprehensive training in project management methodologies including Agile, Scrum, and Waterfall. Practical experience with stakeholder management and team leadership.",
      icon: "fas fa-graduation-cap",
      sort_order: 2,
      is_published: true,
    },
  ]
  await admin.from("certifications").insert(certifications)
  console.log(`  ✓ Inserted ${certifications.length} certifications`)

  // 5. Projects
  console.log("Seeding projects...")
  await admin.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  const projects = [
    {
      slug: "hotel-website",
      title: "Hotel Website",
      category: "Web Design",
      status: "LIVE",
      summary:
        "A responsive website for a hotel showcasing rooms, amenities, and booking information with a clean, modern design.",
      tech_stack: ["HTML5", "CSS"],
      repo_url: "https://github.com/Monishan2003/Web-design-project1",
      live_url: null,
      icon: "fas fa-hotel",
      accent_gradient: "linear-gradient(135deg, #4a6fc7 0%, #3f51b5 100%)",
      sort_order: 1,
      is_featured: true,
      is_published: true,
    },
    {
      slug: "portfolio-website",
      title: "Portfolio Website",
      category: "Frontend",
      status: "LIVE",
      summary:
        "A personal portfolio website showcasing skills, projects, and experience with interactive elements and responsive design.",
      tech_stack: ["HTML5", "CSS", "JavaScript"],
      repo_url: "https://github.com/Monishan2003/My-Portfolio-website-.git",
      live_url: "https://www.monishan.me",
      icon: "fas fa-user",
      accent_gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
      sort_order: 2,
      is_featured: true,
      is_published: true,
    },
    {
      slug: "personal-expense-tracker",
      title: "Personal Expense Tracker",
      category: "CLI / Python",
      status: "LIVE",
      summary:
        "A command-line application to track personal expenses, generate reports, and analyze spending patterns.",
      tech_stack: ["Python", "CLI"],
      repo_url: "https://github.com/Monishan2003/Personal-Expense-Tracker.git",
      live_url: null,
      icon: "fas fa-money-bill-wave",
      accent_gradient: "linear-gradient(135deg, #20bf6b 0%, #01baef 100%)",
      sort_order: 3,
      is_featured: true,
      is_published: true,
    },
    {
      slug: "unisphere-lms",
      title: "UniSphere LMS - Learning Management System",
      category: "Full Stack / C#",
      status: "LIVE",
      summary:
        "A comprehensive Learning Management System built with C# supporting 4 user roles (Admin, Staff, Lecturers, Students). Features include course management, assignments, grading, and all essential learning activities for educational institutions.",
      tech_stack: ["C#", ".NET", "ASP.NET", "SQL Server"],
      repo_url:
        "https://github.com/Monishan2003/LMS_project_C-_-Learning_Management_Systam-.git",
      live_url: null,
      icon: "fas fa-graduation-cap",
      accent_gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      sort_order: 4,
      is_featured: true,
      is_published: true,
    },
    {
      slug: "community-project-uki-jaffna",
      title: "Community Project (Uki/Jaffna)",
      category: "Community Initiative",
      status: "LIVE",
      summary:
        "Tackling school dropout and drug abuse in Mannar via stakeholder engagement and community initiatives.",
      tech_stack: [],
      repo_url: null,
      resource_url:
        "https://drive.google.com/file/d/1sTs55D9uDlRDtzE3LrWYNdtZxZTJf6wu/view?usp=drive_link",
      resource_label: "Project Folder",
      icon: "fas fa-hands-helping",
      accent_gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
      sort_order: 5,
      is_featured: true,
      is_published: true,
    },
  ]
  await admin.from("projects").insert(projects)
  console.log(`  ✓ Inserted ${projects.length} projects`)

  // 6. Skill Categories & Skills
  console.log("Seeding skill categories and skills...")
  await admin.from("skills").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  await admin.from("skill_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000")

  const categories = [
    {
      name: "Frontend Development",
      icon: "fas fa-laptop-code",
      sort_order: 1,
      skills: [
        { name: "HTML5", icon: "fab fa-html5", sort_order: 1 },
        { name: "CSS3", icon: "fab fa-css3-alt", sort_order: 2 },
        { name: "JavaScript", icon: "fab fa-js", sort_order: 3 },
        { name: "React", icon: "fab fa-react", sort_order: 4 },
        { name: "Flutter", icon: "fab fa-android", sort_order: 5 },
      ],
    },
    {
      name: "Backend & Databases",
      icon: "fas fa-server",
      sort_order: 2,
      skills: [
        { name: "C#", icon: "fab fa-microsoft", sort_order: 1 },
        { name: "Node.js", icon: "fab fa-node-js", sort_order: 2 },
        { name: "Python", icon: "fab fa-python", sort_order: 3 },
        { name: "MySQL", icon: "fas fa-database", sort_order: 4 },
        { name: "MongoDB", icon: "fas fa-database", sort_order: 5 },
      ],
    },
    {
      name: "Tools & Methods",
      icon: "fas fa-tools",
      sort_order: 3,
      skills: [
        { name: "Git", icon: "fab fa-git-alt", sort_order: 1 },
        { name: "Figma", icon: "fab fa-figma", sort_order: 2 },
        { name: "Canva", icon: "fas fa-palette", sort_order: 3 },
        { name: "Project Management", icon: "fas fa-tasks", sort_order: 4 },
        { name: "Responsive Design", icon: "fas fa-mobile-alt", sort_order: 5 },
      ],
    },
  ]

  for (const cat of categories) {
    const { data: insertedCat, error: catErr } = await admin
      .from("skill_categories")
      .insert({
        name: cat.name,
        icon: cat.icon,
        sort_order: cat.sort_order,
      })
      .select()
      .single()

    if (catErr) {
      console.error("Error inserting category:", catErr)
      continue
    }

    const skillsToInsert = cat.skills.map((s) => ({
      category_id: insertedCat.id,
      name: s.name,
      icon: s.icon,
      sort_order: s.sort_order,
      is_published: true,
    }))

    await admin.from("skills").insert(skillsToInsert)
    console.log(`  ✓ Inserted category "${cat.name}" with ${cat.skills.length} skills`)
  }

  // 7. Site Settings
  console.log("Seeding site settings...")
  const siteSettings = {
    site_title: "Mathan Monishan | Portfolio",
    site_description:
      "Personal portfolio website of Mathan Monishan - Full Stack Developer, Mobile App Developer & UI/UX Designer.",
    keywords: [
      "Mathan Monishan",
      "Portfolio",
      "Full Stack Developer",
      "Next.js",
      "React",
      "Sri Lanka",
    ],
    theme_mode: "light",
    maintenance_mode: false,
    footer_note:
      "A passionate IT student and web developer focused on creating meaningful digital experiences through innovative solutions.",
  }
  const { data: existingSettings } = await admin
    .from("site_settings")
    .select("id")
    .maybeSingle()

  if (existingSettings) {
    await admin.from("site_settings").update(siteSettings).eq("id", existingSettings.id)
  } else {
    await admin.from("site_settings").insert(siteSettings)
  }
  console.log("  ✓ Site settings configured")

  // 8. Admin User Setup
  console.log("Ensuring admin user account...")
  const adminEmail = "mathanmonishan@gmail.com"
  const adminPassword = "AdminPassword2026!" // Default initial password that user can change

  const { data: listData } = await admin.auth.admin.listUsers()
  let user = listData?.users?.find((u) => u.email === adminEmail)

  if (!user) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    })
    if (createErr) {
      console.warn("Note: Admin auth user creation message:", createErr.message)
    } else {
      user = created.user
      console.log(`  ✓ Created Supabase Auth user for ${adminEmail}`)
    }
  } else {
    console.log(`  ✓ Supabase Auth user already exists for ${adminEmail}`)
  }

  if (user) {
    const { error: adminInsertErr } = await admin.from("admins").upsert({
      user_id: user.id,
      email: user.email,
      note: "Primary Admin",
    })
    if (!adminInsertErr) {
      console.log(`  ✓ Enrolled ${adminEmail} into public.admins table`)
    } else {
      console.warn("  Admin enrol warning:", adminInsertErr.message)
    }
  }

  console.log("\n🎉 Database Seed Completed Successfully!")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
