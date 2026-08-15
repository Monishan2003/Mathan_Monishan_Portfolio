import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data: buckets, error } = await admin.storage.listBuckets()
if (error) {
  console.error("Storage buckets error:", error)
} else {
  console.log("Existing buckets:", buckets.map((b) => ({ id: b.id, name: b.name, public: b.public })))
}
