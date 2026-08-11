/**
 * Admin shell. Phase 4 adds the sidebar and the auth gate.
 * Access is already redirected by src/middleware.ts.
 */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
