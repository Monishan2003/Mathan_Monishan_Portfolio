import { NextResponse } from "next/server"

/**
 * Records an error and returns a generic response.
 *
 * Raw Postgres errors leak column names, constraint names and sometimes row
 * data, so they never reach the client. The detail goes to Sentry (or the
 * server log when no DSN is configured) and the caller gets a flat message.
 */
export async function captureRouteError(
  error: unknown,
  context: { route: string; message?: string; status?: number },
): Promise<NextResponse> {
  const { route, message = "Something went wrong", status = 500 } = context

  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    try {
      const Sentry = await import("@sentry/nextjs")
      Sentry.captureException(error, { tags: { route } })
    } catch {
      console.error(`[${route}] Sentry unavailable`, error)
    }
  } else {
    console.error(`[${route}]`, error)
  }

  return NextResponse.json({ message }, { status })
}
