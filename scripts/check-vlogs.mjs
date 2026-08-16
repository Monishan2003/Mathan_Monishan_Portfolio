import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data, error } = await admin.from("vlogs").select("*").limit(1)
if (error) {
  console.log("vlogs table check:", error.message)
} else {
  console.log("vlogs table exists!", data)
}
