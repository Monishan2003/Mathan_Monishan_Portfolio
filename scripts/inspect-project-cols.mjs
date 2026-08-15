import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data: sampleProj, error } = await admin.from("projects").select("*").limit(1)
if (error) {
  console.error("Error:", error)
} else {
  console.log("Project columns:", Object.keys(sampleProj[0] || {}))
}
