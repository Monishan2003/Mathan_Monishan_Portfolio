/**
 * Admin dashboard. Phase 4 replaces this with real content counts, the unread
 * message badge and the recent-views chart.
 *
 * Reaching this page at all means middleware found a valid session.
 */
export default function AdminDashboardPage() {
  return (
    <main style={{ padding: "4rem 1.5rem" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem" }}>
        Admin
      </h1>
      <p style={{ marginTop: "0.5rem" }}>
        Signed in. Dashboard is built in Phase 4.
      </p>
    </main>
  )
}
