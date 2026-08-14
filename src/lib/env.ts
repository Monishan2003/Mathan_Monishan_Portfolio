/**
 * Typed environment access.
 *
 * NEXT_PUBLIC_* vars must be referenced as literal `process.env.NEXT_PUBLIC_X`
 * expressions so Next can inline them at build time — a dynamic lookup would
 * silently produce `undefined` in the browser bundle.
 *
 * Every field is a getter, so a missing variable throws where it is actually
 * used rather than at import. That matters on a first deploy: the Vercel
 * project has to exist before its env vars can be set, so the initial build
 * necessarily runs without them. Eager validation would turn that into a failed
 * build instead of one route reporting a clear, specific error.
 */

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in, ` +
        `or set it in the Vercel project settings.`,
    )
  }
  return value
}

/** Safe to read in the browser. */
export const publicEnv = {
  get supabaseUrl(): string {
    return required(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "NEXT_PUBLIC_SUPABASE_URL",
    )
  },
  get supabaseAnonKey(): string {
    return required(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    )
  },
  get siteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  },
  get sentryDsn(): string {
    return process.env.NEXT_PUBLIC_SENTRY_DSN ?? ""
  },
} as const

/**
 * Server-only. Importing this from a client component is a build error waiting
 * to happen — these values must never reach the browser.
 */
export const serverEnv = {
  get supabaseServiceRoleKey(): string {
    // Shown as SUPABASE_SECRET_KEY (sb_secret_...) in the Supabase dashboard.
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
