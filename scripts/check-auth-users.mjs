import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data, error } = await admin.auth.admin.listUsers()
if (error) {
  console.log("Auth users error:", error.message)
} else {
  console.log(`Auth users count: ${data.users.length}`)
  data.users.forEach((u) => {
    console.log(`- ${u.id}: ${u.email}`)
  })
}
