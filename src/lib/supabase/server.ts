import { createServerClient as createSSRClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import { publicEnv } from "@/lib/env"
import type { Database } from "@/types/database"

/**
 * Server client for Server Components, Route Handlers and Server Actions.
 * Reads the session from cookies, so it runs as `authenticated` for a signed-in
 * admin and `anon` for everyone else.
 *
 * `cookies()` is async in Next 15 — always await this function.
 */
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSSRClient<Database>(
    publicEnv.supabaseUrl,
    publicEnv.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch {
            // Server Components cannot set cookies. Middleware refreshes the
            // session instead, so this is safe to swallow.
          }
        },
      },
    },
  )
}
