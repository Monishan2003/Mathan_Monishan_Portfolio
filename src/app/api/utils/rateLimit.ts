import "server-only"

import { createHash } from "node:crypto"
import type { NextRequest } from "next/server"

import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Best-effort client IP. Vercel sets x-forwarded-for; the left-most entry is the
 * original client. Everything downstream is spoofable, which is fine here — this
 * is spam friction, not authentication.
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]!.trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

/**
 * One-way hash of an IP. We store this rather than the address itself so the
 * contact table never holds a raw identifier. Salted with the service-role key
 * so the hashes are not reversible via a rainbow table of the IPv4 space.
 */
export function hashIp(ip: string): string {
  const salt = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "unsalted"
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex")
}

export type RateLimitResult = {
  allowed: boolean
  ipHash: string
  used: number
  limit: number
}

/**
 * Sliding-window limit on contact submissions, counted straight off the
 * contact_messages table — no extra store to run. Uses the service-role client
 * because `anon` deliberately cannot read this table.
 *
 * Fails open: if the count query errors, the submission is allowed through. A
 * broken rate limiter should not take the contact form down with it.
 */
export async function checkContactRateLimit(
  request: NextRequest,
  { limit = 5, windowMinutes = 60 } = {},
): Promise<RateLimitResult> {
  const ipHash = hashIp(getClientIp(request))
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString()

  const supabase = createAdminClient()
  const { count, error } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since)

  if (error) {
    return { allowed: true, ipHash, used: 0, limit }
  }

  const used = count ?? 0
  return { allowed: used < limit, ipHash, used, limit }
}
