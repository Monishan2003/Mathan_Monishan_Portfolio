/**
 * Public shell. Phase 2 adds the nav, mobile drawer and footer here.
 * Pages stay thin — sections live in src/features/*.
 */
export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
