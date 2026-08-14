/**
 * Confirms .env.local is wired up correctly.
 *
 * Deliberately prints presence and pass/fail only — never a key value, not even
 * a prefix. Safe to run with someone watching your screen.
 *
 *   npm run check:env
 */

import { createClient } from "@supabase/supabase-js"

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
]

let ok = true

console.log("Environment variables")
for (const name of required) {
  const present = Boolean(process.env[name]?.trim())
  console.log(`  ${present ? "ok     " : "MISSING"}  ${name}`)
  if (!present) ok = false
}

if (!ok) {
  console.log(
    "\nFill the missing values in .env.local, then run this again.\n" +
      "SUPABASE_SERVICE_ROLE_KEY is shown as SUPABASE_SECRET_KEY in the dashboard.",
  )
  process.exit(1)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("\nConnectivity")

// Public path: anon must be able to read published content.
const anon = createClient(url, anonKey)
const anonRead = await anon.from("projects").select("id").limit(1)
console.log(
  `  ${anonRead.error ? "FAIL   " : "ok     "}  anon can read published projects` +
    (anonRead.error ? ` — ${anonRead.error.message}` : ""),
)
if (anonRead.error) ok = false

// anon must NOT be able to read the contact inbox. RLS returns zero rows rather
// than an error, so an empty result is the pass condition here.
const anonInbox = await anon.from("contact_messages").select("id")
const inboxBlocked = Boolean(anonInbox.error) || anonInbox.data?.length === 0
console.log(
  `  ${inboxBlocked ? "ok     " : "FAIL   "}  anon cannot read the contact inbox`,
)
if (!inboxBlocked) ok = false

// Privileged path: the secret key bypasses RLS, so it sees the inbox. This is
// what actually proves the key is valid and not just a copied publishable key.
const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
const privileged = await admin
  .from("contact_messages")
  .select("id", { count: "exact", head: true })
console.log(
  `  ${privileged.error ? "FAIL   " : "ok     "}  secret key bypasses RLS` +
    (privileged.error ? ` — ${privileged.error.message}` : ""),
)
if (privileged.error) ok = false

// Who is enrolled as admin? Nothing can be written through /admin until this is
// at least 1, so it is the usual reason a fresh setup appears broken.
const admins = await admin.from("admins").select("email")
if (!admins.error) {
  const count = admins.data?.length ?? 0
  console.log(
    `\nAdmin allowlist: ${count} account${count === 1 ? "" : "s"}` +
      (count === 0
        ? "\n  Create a user in the dashboard, then enrol it — see README, Database section."
        : ""),
  )
}

console.log(ok ? "\nAll checks passed." : "\nSome checks failed.")
process.exit(ok ? 0 : 1)
