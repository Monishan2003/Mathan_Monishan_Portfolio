import { createBrowserClient } from "@supabase/ssr"

import { publicEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Browser client. Runs as the `anon` role until a user signs in, then as
 * `authenticated`. RLS is what actually decides what it can see — this key is
 * public by design and ships in the bundle.
 */
export function createClient() {
  return createBrowserClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey,
  )
}
