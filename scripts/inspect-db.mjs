import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const tables = [
  "profile",
  "social_links",
  "experiences",
  "education",
  "certifications",
  "projects",
  "skill_categories",
  "skills",
  "services",
  "testimonials",
  "contact_messages",
  "site_settings",
  "admins",
]

console.log("Checking DB Tables...")
for (const table of tables) {
  const { data, count, error } = await admin.from(table).select("*", { count: "exact" })
  if (error) {
    console.log(`Table '${table}': ERROR -> ${error.message}`)
  } else {
    console.log(`Table '${table}': ${count} rows`)
    if (data && data.length > 0) {
      console.log(`  Sample:`, JSON.stringify(data[0]))
    }
  }
}
