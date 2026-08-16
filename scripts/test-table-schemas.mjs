import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log("Checking project insert...")
const testProj = {
  slug: "test-proj",
  title: "Test Project",
  summary: "Test Summary",
}
const { data, error } = await admin.from("projects").insert([testProj]).select()
if (error) {
  console.log("Projects insert error:", error)
} else {
  console.log("Projects insert success:", data)
  await admin.from("projects").delete().eq("slug", "test-proj")
}

console.log("Checking experiences insert...")
const testExp = {
  company: "Test Co",
  role: "Developer",
}
const { data: expData, error: expError } = await admin.from("experiences").insert([testExp]).select()
if (expError) {
  console.log("Experiences insert error:", expError)
} else {
  console.log("Experiences insert success:", expData)
  await admin.from("experiences").delete().eq("company", "Test Co")
}
