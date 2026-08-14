# monishan-portfolio-v2

Database-driven rebuild of [www.monishan.me](https://www.monishan.me) — Next.js 15 (App Router) + Supabase, with a private single-user admin panel at `/admin`.

The old CRA site lives in [`Mathan_Monishan_Portfolio`](https://github.com/Monishan2003/Mathan_Monishan_Portfolio) and keeps serving the domain until the Phase 8 DNS cutover.

## Working docs

| File                        | What it is                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `PORTFOLIO_UPGRADE_PLAN.md` | The 8-phase spec. Schema, folder layout, API pattern, definition of done.                                        |
| `MIGRATION_NOTES.md`        | Phase 0 audit of the old repo: component inventory, content → row mapping, extracted design tokens, defect list. |

One phase per session. Read both docs before writing code; never let a phase run half-finished into the next.

## Stack

Next.js 15.5 · React 19 · TypeScript 5 (strict, no `any`) · Tailwind CSS v4 · Supabase (Postgres + Auth + Storage) · react-hook-form + yup · Resend · Sentry · Vercel

### Documented exceptions to the Thriio standard

Both are deliberate. Recorded here so they don't read as accidents later.

1. **Tailwind instead of MUI v7.** This is a bespoke-design site. Tailwind maps almost 1:1 onto the CSS the old site already has, which makes the port mechanical instead of a redesign. Rebuilding a custom visual identity inside MUI's theming would mean fighting the component library on every section. (Plan §2.2)

2. **FontAwesome for content icons, not lucide-react.** Every icon on the current site — skill tiles, education timeline, project cards — is FontAwesome, and the class strings are stored in the database. Switching to lucide would visibly change three sections, which §0.1 forbids. lucide is used for admin-panel chrome only. (MIGRATION_NOTES §6.3)

A third decision worth knowing: **v1 is light-only.** The old site has never had a dark palette, so inventing one would be a redesign. The `site_settings.theme_mode` column exists for when that changes. (MIGRATION_NOTES §6.4)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

`SUPABASE_SERVICE_ROLE_KEY` comes from the Supabase dashboard → Project Settings → API keys. It is server-only — never prefix it with `NEXT_PUBLIC_`, never import `src/lib/supabase/admin.ts` from a client component.

### Scripts

| Command             | Does                                                         |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Dev server (Turbopack)                                       |
| `npm run build`     | Production build                                             |
| `npm run typecheck` | `tsc --noEmit`                                               |
| `npm run lint`      | ESLint                                                       |
| `npm run format`    | Prettier write                                               |
| `npm run verify`    | typecheck + lint + build — run before saying a phase is done |

## Database

`supabase/migrations/*.sql` is the single source of truth for schema. No Prisma: Supabase gives Postgres + Auth + Storage + RLS behind one client, and running migrations in two places would cost RLS as a safety net. (Plan §2.1)

RLS is on for every table. Policies target roles directly (`to anon` / `to authenticated`) rather than calling `auth.role()` — that function is deprecated, and role targeting is evaluated once per statement instead of once per row.

| Table group                | anon                        | admin (allowlisted) |
| -------------------------- | --------------------------- | ------------------- |
| Content tables             | select where `is_published` | all                 |
| `profile`, `site_settings` | select                      | all                 |
| `contact_messages`         | insert only                 | all                 |
| `page_views`               | insert only                 | all                 |

**Admin is an allowlist, not a role.** Being signed in is not enough — write policies call `private.is_admin()`, which checks `public.admins` for the caller's uid. A stray account that registers gets an empty database rather than full control. Rows are added to `admins` out of band via SQL; nothing writes to it through the API.

Enrol an account after creating it in the dashboard:

```sql
insert into public.admins (user_id, email)
select id, email from auth.users where email = 'your@email.com';
```

Regenerate types after every migration; `src/types/database.ts` is generated and must not be hand-edited.

## Architecture

Pages are thin and only compose. Business logic lives in `src/features/`. Supabase calls belong in Server Components, `src/lib/`, or route handlers — never inside a client component.

Admin route handlers follow one order: **auth first → validate → query → respond.**

```ts
const auth = await requireAdmin(request)
if ("errorResponse" in auth) return auth.errorResponse
```

Middleware guards `/admin`, but it is a redirect for humans, not the security boundary. Every `/api/admin/*` route re-checks with `requireAdmin`, and RLS is the final backstop.

## Security checklist

- [x] Admin access gated by the `public.admins` allowlist, not by `TO authenticated` alone (migration 0004)
- [ ] Supabase public sign-ups **disabled** — still worth doing as defence in depth, though 0004 means forgetting is no longer catastrophic
- [ ] Admin user created, and their uid inserted into `public.admins` (until then, nothing can write)
- [ ] MFA enabled on the Supabase account
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in `.env.local` and in Vercel as a server-only env var
- [x] `.env.local` gitignored, `.env.example` explicitly un-ignored
