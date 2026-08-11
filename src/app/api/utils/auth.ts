import { NextResponse, type NextRequest } from "next/server"
import type { SupabaseClient, User } from "@supabase/supabase-js"

import { createServerClient } from "@/lib/supabase/server"
import type { Database } from "@/types/database"

type AdminOk = {
  user: User
  supabase: SupabaseClient<Database>
}

type AdminFailed = {
  errorResponse: NextResponse
}

/**
 * Gate for every /api/admin/* route. Call this first, before reading the body.
 *
 *   const auth = await requireAdmin(request)
 *   if ("errorResponse" in auth) return auth.errorResponse
 *
 * Single-admin model: any authenticated Supabase user is the admin, which holds
 * only because public sign-ups are disabled on the project. If a second user is
 * ever added, this is the one place that needs an is-admin check.
 *
 * getUser() revalidates the token against the auth server. Do not swap it for
 * getSession(), which trusts whatever the cookie claims.
 */
export async function requireAdmin(
  _request: NextRequest,
): Promise<AdminOk | AdminFailed> {
  const supabase = await createServerClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      errorResponse: NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      ),
    }
  }

  return { user, supabase }
}
