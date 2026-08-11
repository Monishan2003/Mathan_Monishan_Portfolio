import { withSentryConfig } from "@sentry/nextjs"
import type { NextConfig } from "next"

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined

const nextConfig: NextConfig = {
  images: {
    // Only Supabase Storage is whitelisted. The old site hotlinked its hero
    // background from images.unsplash.com; that asset gets self-hosted in
    // Phase 2 rather than adding a third-party origin here.
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    // Never ship a build that does not typecheck.
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

/*
 * Sentry wraps the config unconditionally, but without SENTRY_AUTH_TOKEN it
 * skips source-map upload, and without a DSN the SDK itself no-ops. That keeps
 * local and preview builds quiet while production stays instrumented.
 */
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  widenClientFileUpload: false,
})
