import "server-only"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"

import { publicEnv, serverEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Service-role client. Bypasses RLS entirely.
 *
 * SERVER ONLY. The `server-only` import above turns any client-component import
 * of this file into a build error, which is the point — leaking this key would
 * hand anyone full read/write on the database.
 *
 * Only reach for this where RLS genuinely gets in the way: storage uploads and
 * the seed script. Ordinary admin routes should use `createServerClient()` and
 * let RLS back up the `requireAdmin` check.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    publicEnv.supabaseUrl,
    serverEnv.supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}
