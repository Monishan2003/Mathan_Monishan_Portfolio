/**
 * Typed environment access.
 *
 * NEXT_PUBLIC_* vars must be referenced as literal `process.env.NEXT_PUBLIC_X`
 * expressions so Next can inline them at build time — a dynamic lookup would
 * silently produce `undefined` in the browser bundle.
 */

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    )
  }
  return value
}

/** Safe to read in the browser. */
export const publicEnv = {
  supabaseUrl: required(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL",
  ),
  supabaseAnonKey: required(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? "",
} as const

/**
 * Server-only. Importing this from a client component is a build error waiting
 * to happen — these values must never reach the browser.
 */
export const serverEnv = {
  get supabaseServiceRoleKey(): string {
    return required(
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      "SUPABASE_SERVICE_ROLE_KEY",
    )
  },
  get resendApiKey(): string {
    return required(process.env.RESEND_API_KEY, "RESEND_API_KEY")
  },
  get contactNotificationEmail(): string {
    return required(
      process.env.CONTACT_NOTIFICATION_EMAIL,
      "CONTACT_NOTIFICATION_EMAIL",
    )
  },
} as const
