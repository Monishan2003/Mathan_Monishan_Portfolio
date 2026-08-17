import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const tables = ["profile", "experiences", "education", "certifications", "projects", "skills", "social_links", "site_settings"]
for (const table of tables) {
  const { data } = await admin.from(table).select("*").limit(1)
  console.log(`Table ${table} keys:`, Object.keys(data?.[0] || {}))
}
