# Portfolio v2 — Full-Stack Rebuild Plan

**Owner:** Mathan Monishan (Moni)
**Current:** React (CRA/Vite) static portfolio at [www.monishan.me](https://www.monishan.me)
**Target:** Next.js 15 (App Router) + Supabase, fully database-driven, with a private admin panel
**Design:** Keep the existing monishan.me visual identity. Change the codebase, not the look.
**Executor:** Claude Code, working phase by phase against this document.

---

## 0. Non-negotiables (read before writing any code)

1. **The design is already decided.** Before rewriting anything, extract the current design tokens from the existing React repo — colors, font families, font sizes, spacing scale, border radii, shadows, section rhythm, animation timings — and write them into `src/styles/tokens.css` (or `tailwind.config.ts`). Every new component derives from these tokens. Do not invent a new palette or typeface.
2. **Content lives in the database, not in code.** Zero hardcoded project/experience/skill arrays in components. Anything that would ever need editing goes in Supabase and is edited through the admin panel.
3. **The site must never render empty.** The reference site (nithusha-portfolio.vercel.app) currently shows `"Your Name"` and `wa.me/undefined` because its DB is unseeded — that is exactly the failure mode to avoid. Every DB-driven section needs a seed script plus a fallback/empty state that either hides the section or shows real defaults.
4. **Follow the Thriio architecture standard** for folder layout, API route structure, validation, and the "thin pages, logic in features/" rule. Deviations from that standard are listed explicitly in §2.
5. **TypeScript strict. No `any`.**

---

## 1. Scope

### Public site

Same sections as today, now DB-driven:
Hero · About · Experience · Education · Projects (with detail pages) · Skills · Certifications · Testimonials · Contact · Resume download

### Admin panel (`/admin`)

Private, single-user (you). Full CRUD over every content type, image uploads, drag-to-reorder, draft/publish toggles, contact-message inbox, and a small analytics view.

### Explicitly out of scope for v1

Multi-user roles, comments, i18n (Tamil/English toggle), payments. Design the schema so blog and i18n can be added later without a rewrite.

---

## 2. Tech stack

| Layer          | Choice                                                         | Note                                         |
| -------------- | -------------------------------------------------------------- | -------------------------------------------- |
| Framework      | Next.js 15, App Router, Turbopack in dev                       | Thriio standard                              |
| Language       | TypeScript 5 strict                                            | Thriio standard                              |
| Database       | Supabase Postgres                                              | Your call — replaces raw Prisma+Postgres     |
| DB access      | Supabase JS client (`@supabase/ssr` + `@supabase/supabase-js`) | See §2.1                                     |
| Auth           | Supabase Auth (email + password), single admin account         | Replaces Thriio's custom session-cookie auth |
| File storage   | Supabase Storage                                               | Replaces `@vercel/blob`                      |
| Public UI      | Tailwind CSS v4                                                | See §2.2 — **deliberate deviation from MUI** |
| Admin UI       | shadcn/ui on Tailwind                                          | Fast CRUD screens, no design effort wasted   |
| Forms          | `react-hook-form` + `yup` + `@hookform/resolvers`              | Thriio standard                              |
| Email          | Resend — contact form notifications                            | Thriio standard                              |
| Animation      | `framer-motion` (only if the current site already animates)    | Match existing feel                          |
| Icons          | `lucide-react`                                                 |                                              |
| Error tracking | Sentry (`@sentry/nextjs`)                                      | Thriio standard                              |
| Hosting        | Vercel                                                         |                                              |
| Lint           | ESLint + Prettier                                              | Thriio standard                              |

### 2.1 Prisma or not?

**Recommendation: skip Prisma here.** Supabase gives you Postgres + Auth + Storage + RLS in one client, and this app is CRUD over ~10 tables. Adding Prisma means running migrations in two places and losing RLS as a safety net. Use `supabase/migrations/*.sql` as the single source of truth for schema, and `supabase gen types typescript` for generated types.

If you want the Thriio codebase to stay literally identical across projects, Prisma-on-Supabase-Postgres also works — but then use the service-role key everywhere and treat RLS as belt-and-braces only. Decide once, at the start of Phase 1, and don't mix.

### 2.2 Tailwind instead of MUI — why

The Thriio standard says MUI v7, no Tailwind. A portfolio is a bespoke-design site, and rebuilding a custom visual identity inside MUI's theming means fighting the component library on every section. Tailwind maps almost 1:1 onto the CSS the current React site already has, which makes the port mechanical instead of a redesign.

This is a conscious, documented exception — record it in the repo `README` so future-you knows it wasn't an accident.

---

## 3. Database schema

All tables in `public`. All IDs `uuid default gen_random_uuid()`. All tables get `created_at timestamptz default now()` and `updated_at timestamptz` maintained by a trigger. All content tables get `sort_order int default 0` and `is_published boolean default true`.

```sql
-- ============ 3.1 Singleton site profile ============
create table profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null,              -- "Full-Stack & AI Engineer"
  hero_intro text,                     -- short hero line
  bio_short text,                      -- About section, 2-3 sentences
  bio_long text,                       -- longer About / markdown
  location text,
  email text,
  phone text,
  whatsapp_number text,                -- store E.164, no leading +, never undefined
  avatar_url text,
  og_image_url text,
  resume_url text,                     -- Supabase Storage public URL
  available_for_work boolean default true,
  availability_note text,
  years_experience int,
  projects_completed int,
  clients_served int,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Enforce single row:
create unique index profile_singleton on profile ((true));

-- ============ 3.2 Social links ============
create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,              -- github | linkedin | whatsapp | email | x | dribbble
  label text,
  url text not null,
  icon text,                           -- lucide icon name
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.3 Experience ============
create table experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  employment_type text,                -- Full-time | Part-time | Freelance | Founder | Internship
  location text,
  work_mode text,                      -- Remote | Hybrid | On-site
  company_url text,
  logo_url text,
  start_date date not null,
  end_date date,                       -- null = present
  is_current boolean default false,
  summary text,
  highlights text[],                   -- bullet points
  tech_stack text[],
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.4 Education ============
create table education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  field_of_study text,
  start_date date,
  end_date date,
  is_current boolean default false,
  grade text,
  description text,
  logo_url text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.5 Certifications ============
create table certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date,
  expiry_date date,
  credential_id text,
  credential_url text,
  image_url text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.6 Projects ============
create type project_status as enum ('LIVE', 'IN_PROGRESS', 'ARCHIVED', 'CONCEPT');

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,           -- /projects/[slug]
  title text not null,
  subtitle text,
  category text,                       -- Web App | Mobile | AI | E-Commerce | POS/ERP
  status project_status default 'LIVE',
  summary text not null,               -- card blurb, ~160 chars
  problem text,                        -- case-study fields
  solution text,
  outcome text,
  body text,                           -- long-form markdown for the detail page
  cover_image_url text,
  gallery_urls text[],
  tech_stack text[],
  role text,                           -- "Founder & Lead Engineer"
  client_name text,
  live_url text,
  repo_url text,
  started_on date,
  completed_on date,
  is_featured boolean default false,   -- show on home page
  sort_order int default 0,
  is_published boolean default true,
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.7 Skills ============
create table skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,                  -- Languages | Frameworks | Databases | Cloud & DevOps | Tools
  icon text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references skill_categories(id) on delete cascade,
  name text not null,
  icon text,                           -- devicon slug or lucide name
  proficiency int check (proficiency between 1 and 5),
  years_used numeric(3,1),
  is_core boolean default false,       -- highlight in hero/marquee
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.8 Services (optional section — you sell via Pynimox) ============
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  starting_price text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.9 Testimonials ============
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  author_company text,
  author_avatar_url text,
  quote text not null,
  rating int check (rating between 1 and 5),
  source_url text,
  sort_order int default 0,
  is_published boolean default false,  -- default false: approve before showing
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.10 Contact inbox ============
create type message_status as enum ('NEW', 'READ', 'REPLIED', 'ARCHIVED', 'SPAM');

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  budget_range text,
  project_type text,
  status message_status default 'NEW',
  admin_notes text,
  ip_hash text,                        -- hashed, for rate limiting only
  user_agent text,
  referrer text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.11 Lightweight analytics ============
create table page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  project_id uuid references projects(id) on delete set null,
  referrer text,
  country text,
  device text,
  created_at timestamptz default now()
);

create index page_views_path_created_idx on page_views (path, created_at desc);

-- ============ 3.12 Site settings / SEO ============
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text,
  site_description text,
  keywords text[],
  google_analytics_id text,
  theme_mode text default 'system',    -- light | dark | system
  maintenance_mode boolean default false,
  footer_note text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create unique index site_settings_singleton on site_settings ((true));

-- ============ 3.13 Blog (schema now, UI later) ============
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  cover_image_url text,
  tags text[],
  reading_minutes int,
  published_at timestamptz,
  is_published boolean default false,
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz
);
```

### 3.14 `updated_at` trigger

```sql
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Apply to every content table:
create trigger trg_projects_updated before update on projects
  for each row execute function set_updated_at();
-- ...repeat per table
```

### 3.15 Row Level Security

RLS **on for every table**. Pattern:

```sql
alter table projects enable row level security;

-- Public can read published rows only
create policy "public read published" on projects
  for select using (is_published = true);

-- Only authenticated admin can write
create policy "admin all" on projects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
```

Exceptions:

- `contact_messages`: public gets **insert only** (`for insert with check (true)`), never select. Admin gets full access.
- `page_views`: public insert only.
- `profile`, `site_settings`: public select all (no `is_published` column), admin write.

Since this is a single-user admin, `auth.role() = 'authenticated'` is sufficient. If you ever add a second user, switch to an `admins` table with an `is_admin` check.

---

## 4. Storage buckets

| Bucket      | Public | Contents                                       |
| ----------- | ------ | ---------------------------------------------- |
| `avatars`   | yes    | profile photo, testimonial avatars             |
| `projects`  | yes    | project covers + galleries                     |
| `logos`     | yes    | company / institution logos                    |
| `documents` | yes    | CV PDF (versioned filenames: `cv-2026-08.pdf`) |

Upload path convention: `{bucket}/{entity}/{uuid}-{slugified-filename}.{ext}`

Enforce: max 5 MB, `image/jpeg|png|webp|avif` for images, `application/pdf` for documents. Convert uploads to WebP on the server before storing.

---

## 5. Folder structure

```
src/
  app/
    (public)/
      layout.tsx                    # public shell: nav, footer, theme provider
      page.tsx                      # home — thin, composes feature sections
      projects/page.tsx
      projects/[slug]/page.tsx
      about/page.tsx
      contact/page.tsx
      resume/page.tsx               # or direct download redirect
    (admin)/
      admin/layout.tsx              # sidebar shell + auth gate
      admin/page.tsx                # dashboard
      admin/profile/page.tsx
      admin/experiences/page.tsx
      admin/education/page.tsx
      admin/certifications/page.tsx
      admin/projects/page.tsx
      admin/projects/[id]/page.tsx
      admin/skills/page.tsx
      admin/services/page.tsx
      admin/testimonials/page.tsx
      admin/messages/page.tsx
      admin/analytics/page.tsx
      admin/settings/page.tsx
    login/page.tsx
    api/
      public/
        contact/route.ts            # POST — rate-limited, sends Resend email
        views/route.ts              # POST — record page view
      admin/
        profile/route.ts
        experiences/route.ts
        experiences/[id]/route.ts
        projects/route.ts
        projects/[id]/route.ts
        projects/reorder/route.ts
        ...one folder per resource
        upload/route.ts             # multipart -> Supabase Storage
      utils/
        auth.ts                     # requireAdmin(request)
        validateBody.ts             # validateBody<T>(body, yupSchema)
        rateLimit.ts
        captureRouteError.ts
    sitemap.ts
    robots.ts
    opengraph-image.tsx
  features/
    hero/components/
    about/components/
    experience/components/
    projects/components/
    skills/components/
    contact/components/
    admin/
      components/                   # DataTable, SortableList, ImageUploader, RichTextEditor
      helpers/                      # yup schemas shared by admin forms
  components/                       # shared: Section, Container, Button, Badge, ThemeToggle
  hooks/
    useAdminAuth.ts
    useReorder.ts
  lib/
    supabase/
      client.ts                     # browser client
      server.ts                     # server component client (cookies)
      admin.ts                      # service-role client — SERVER ONLY, never imported client-side
    resend.ts
    seo.ts
    utils.ts
  resources/
    projects/schema.ts              # TS types + yup schemas
    experiences/schema.ts
    ...
  types/
    database.ts                     # generated: supabase gen types typescript
  middleware.ts                     # protects /admin/*, redirects /login when authed
  styles/
    tokens.css                      # extracted from the old site
supabase/
  migrations/                       # numbered .sql files — source of truth
  seed.sql                          # real content, not lorem ipsum
```

**Golden rule (inherited from Thriio):** pages are thin and only compose. Business logic in `features/`. Supabase calls in server components, `lib/`, or API routes — never inside a client component.

---

## 6. API route pattern

Same shape as the Thriio standard, with `requireAdmin` in place of `verifyGarageAccess`:

```typescript
// src/app/api/admin/projects/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/src/lib/supabase/server"
import { requireAdmin } from "@/src/app/api/utils/auth"
import { validateBody } from "@/src/app/api/utils/validateBody"
import { projectCreateSchema } from "@/src/resources/projects/schema"
import * as yup from "yup"

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request)
  if ("errorResponse" in auth) return auth.errorResponse

  const rawBody = await request.json()
  let body: yup.InferType<typeof projectCreateSchema>
  try {
    body = await validateBody(rawBody, projectCreateSchema)
  } catch (errorResponse) {
    return errorResponse as NextResponse
  }

  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from("projects")
    .insert(body)
    .select()
    .single()

  if (error) {
    // capture to Sentry, return a generic message — never leak the raw DB error
    return NextResponse.json(
      { message: "Could not create project" },
      { status: 500 },
    )
  }

  return NextResponse.json(data, { status: 201 })
}
```

Rules: auth first → validate → query → respond. `params` is `Promise<{...}>` in Next 15, always `await` it. Never return raw DB errors to the client.

---

## 7. Auth

- Supabase Auth, email + password. Create exactly one user (your email) via the Supabase dashboard. **Disable public sign-ups** in the Supabase Auth settings — this is the single most important switch; forgetting it leaves the admin panel open to anyone.
- `middleware.ts` refreshes the session cookie and guards `/admin/*`; unauthenticated → `/login`. Authenticated user hitting `/login` → `/admin`.
- Middleware alone is not the security boundary. Every `/api/admin/*` route re-checks with `requireAdmin`, and RLS is the final backstop.
- Service-role key: server-only, never in a `NEXT_PUBLIC_` variable, never imported into a client component.
- Enable MFA on the Supabase account itself.

---

## 8. Public site behaviour

| Concern       | Approach                                                                                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rendering     | Server Components fetch from Supabase directly. No client-side fetch waterfall on first paint.                                                                               |
| Caching       | `export const revalidate = 3600` on public pages; call `revalidatePath()` from admin write routes so edits appear immediately.                                               |
| Images        | `next/image` with Supabase Storage domain whitelisted in `next.config.ts`.                                                                                                   |
| SEO           | Per-page `generateMetadata`, JSON-LD `Person` on home and `CreativeWork` on project pages, `sitemap.ts` generated from published projects and posts, `robots.ts`.            |
| OG images     | Dynamic `opengraph-image.tsx` per project using `next/og`.                                                                                                                   |
| Empty states  | Section hides itself if its query returns zero published rows. Never render a placeholder name or `wa.me/undefined`.                                                         |
| Contact form  | Server-side yup validation, honeypot field, IP-hash rate limit (5/hour), row into `contact_messages`, Resend notification to your inbox, auto-acknowledgement to the sender. |
| Accessibility | Keyboard focus visible, `prefers-reduced-motion` respected, alt text stored per image, colour contrast checked against the existing palette.                                 |
| Resume        | `/resume` streams the latest `profile.resume_url` so the URL never changes when you upload a new CV.                                                                         |

---

## 9. Admin panel requirements

Every resource screen: list view (searchable, filterable, sortable) → create/edit form → delete with confirm → publish/unpublish toggle → drag-to-reorder writing back `sort_order`.

Screen-specific:

- **Dashboard** — counts per content type, unread messages, top 5 viewed projects, last 7 days of views, quick links.
- **Profile** — single form; all hero/about copy and stat numbers editable, avatar + CV upload.
- **Projects** — the richest editor: markdown body with live preview, cover + gallery uploader with drag-reorder, tech-stack tag input, featured toggle, slug auto-generated from title with a manual override and uniqueness check.
- **Skills** — two-level UI: categories in a sidebar, skills reorderable within a category.
- **Messages** — inbox list, detail view, status transitions, `mailto:` reply, spam/archive, unread badge in the sidebar.
- **Analytics** — views over time, top paths, top referrers, top projects. Plain Recharts on `page_views` aggregates.
- **Settings** — SEO defaults, theme mode, maintenance toggle, GA id.

Shared admin components to build once and reuse: `DataTable`, `SortableList`, `ImageUploader`, `TagInput`, `MarkdownEditor`, `ConfirmDialog`, `StatusBadge`, `FormField`.

Cross-cutting: optimistic UI with rollback on failure, toast on every mutation, unsaved-changes guard on forms, loading skeletons, mobile-usable at 390px (you will edit from your phone).

---

## 10. Migration phases

Run these as separate Claude Code sessions. Commit and deploy at the end of each — never let a phase run half-finished into the next.

**Phase 0 — Audit (no code written)**
Read the existing React repo. Produce `MIGRATION_NOTES.md` listing: every component and its purpose, all hardcoded content that becomes DB rows, the extracted design tokens, current dependencies with keep/drop/replace marked, and every asset to carry over. Review this before Phase 1.

**Phase 1 — Scaffold**
New Next.js 15 + TS + Tailwind app. Folder structure per §5. Supabase project created, all migrations in §3 applied, RLS policies on, buckets created, types generated, Supabase clients wired, env vars set, ESLint/Prettier/Sentry configured. Deploy the empty shell to Vercel and confirm it builds.

**Phase 2 — Design system port**
`tokens.css` from the audit. Base primitives (`Container`, `Section`, `Button`, `Badge`, typography scale). Public layout: nav, mobile menu, footer, theme toggle. Compare side by side against the live monishan.me at 390px, 768px, 1440px — it should be visually indistinguishable.

**Phase 3 — Public sections, DB-driven**
Port section by section, in this order: Hero → About → Experience → Education → Projects grid → Project detail → Skills → Certifications → Testimonials → Contact. Each one reads from Supabase, has an empty state, and is checked against the old site before moving on.

**Phase 4 — Auth + admin shell**
Supabase Auth, login page, middleware guard, admin layout with sidebar, dashboard with real counts. Verify: logged out, `/admin` redirects; direct `POST` to an admin API without a session returns 401.

**Phase 5 — Admin CRUD**
Build shared admin components first, then the resource screens in the same order as Phase 3. Upload route and image pipeline included here.

**Phase 6 — Content migration**
Seed script that inserts your real content from `MIGRATION_NOTES.md`, plus everything from the CV: NF Group, Pynimox, Yarl IT Hub, both degrees, four certifications, and projects (Pynimox site, SRMJ Enterprises, MediCross AI, LMS C#, Personal Expense Tracker, hotel web design). Upload the CV PDF and profile photo.

**Phase 7 — Contact, messages, analytics**
Contact API with rate limiting and Resend wiring, inbox screen, page-view tracking, analytics screen.

**Phase 8 — SEO, performance, launch**
Metadata, JSON-LD, sitemap, robots, OG images, image optimisation, Lighthouse pass (target 95+ on all four), accessibility audit, 404/500 pages, then point the `monishan.me` domain at the new deployment. Keep the old deployment live until DNS has fully propagated.

---

## 11. Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server only — never NEXT_PUBLIC_
NEXT_PUBLIC_SITE_URL=https://www.monishan.me
RESEND_API_KEY=
CONTACT_NOTIFICATION_EMAIL=mathanmonishan@gmail.com
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

Add `.env.local` to `.gitignore` and commit a `.env.example` with the keys and empty values.

---

## 12. Claude Code prompt template

One phase per session. Start each with:

```
Read PORTFOLIO_UPGRADE_PLAN.md and MIGRATION_NOTES.md before writing code.
Also read the thriio-codebase skill — folder structure, API route pattern,
and validation conventions apply to this project.

Execute Phase N only. Do not start Phase N+1.

Rules:
- TypeScript strict, no `any`
- Every content value comes from Supabase — no hardcoded arrays
- Design tokens come from tokens.css — do not invent colours or fonts
- Auth check first in every admin API route, then validate, then query
- Run `npm run build` and `npx tsc --noEmit` before you tell me you are done

When finished, list what you built, what you skipped, and what I need to
verify manually.
```

---

## 13. Decisions to make before Phase 1

1. **Prisma or pure Supabase client?** Recommendation: pure Supabase (§2.1).
2. **New repo or in-place rewrite?** Recommendation: new repo `monishan-portfolio-v2`, so the live site keeps serving until launch.
3. **Blog in v1 or later?** Recommendation: schema now, UI later — you will not have time to write posts during the semester.
4. **Personal portfolio vs Pynimox site — separate identities?** monishan.me should read as the engineer; pynimox.com as the studio. If they blur, the portfolio stops working as a job/internship application asset, which is the thing it exists for.

---

## 14. Definition of done

- [ ] Every section of the public site renders from Supabase; no hardcoded content anywhere
- [ ] Editing any field in `/admin` changes the public site without a redeploy
- [ ] Visually indistinguishable from the current monishan.me at 390 / 768 / 1440px
- [ ] `/admin` inaccessible logged out; admin APIs return 401 without a session; RLS blocks anonymous writes
- [ ] Supabase public sign-ups disabled
- [ ] Contact form delivers to your inbox and stores the message
- [ ] Lighthouse 95+ across performance, accessibility, best practices, SEO
- [ ] `npm run build` and `npx tsc --noEmit` both clean
- [ ] Sitemap, robots, OG images, JSON-LD all present
- [ ] No empty-state regressions — no `undefined` or placeholder text anywhere in production
