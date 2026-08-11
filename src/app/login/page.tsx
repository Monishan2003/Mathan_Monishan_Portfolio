/**
 * Login. Phase 4 builds the real email + password form against Supabase Auth.
 * Middleware already redirects a signed-in visitor away from here to /admin.
 */
export default function LoginPage() {
  return (
    <main style={{ padding: "4rem 1.5rem" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem" }}>
        Sign in
      </h1>
      <p style={{ marginTop: "0.5rem" }}>Auth form is built in Phase 4.</p>
    </main>
  )
}
