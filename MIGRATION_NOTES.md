# MIGRATION_NOTES.md — Phase 0 Audit

**Source:** `Monishan2003/Mathan_Monishan_Portfolio` @ `c5d5330` (CRA / React 18, deployed to Vercel as `www.monishan.me`)
**Target:** Next.js 15 App Router + Supabase, per `PORTFOLIO_UPGRADE_PLAN.md`
**Audited:** 2026-08-10 — no code written, no files modified.

---

## 1. Component inventory

Entry: `src/index.js` → `src/App.js`. Single page, hash-anchor navigation, no router.
Render order: `BackgroundAnimation · Navbar · Home · About · Education · Projects · Skills · Contact · Footer · ScrollToTop · WhatsAppButton`.

| Component                | Purpose                                                                                               | Content source today                     | v2 destination                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `App.js`                 | Shell; owns a single `scrollY` state passed to Navbar + ScrollToTop                                   | —                                        | `app/(public)/layout.tsx` + `page.tsx`                                                              |
| `Navbar.js`              | Fixed nav, 6 hash links, scroll-spy on `getBoundingClientRect`, sticky style past 20px, mobile drawer | Links hardcoded                          | `components/Navbar.tsx` (client) — links stay in code, they are structural not content              |
| `Home.js`                | Hero: eyebrow, gradient name, typing roles, "Hire Me" CTA, fixed Unsplash bg                          | Hardcoded                                | `features/hero/` ← `profile`                                                                        |
| `About.js`               | Photo + 3 paragraphs + repeat of typing roles + "Download CV" (Google Drive link)                     | Hardcoded                                | `features/about/` ← `profile`                                                                       |
| `Education.js`           | Alternating vertical timeline, 4 items — **2 degrees + 2 certifications mixed in one array**          | `educationData[]`                        | `features/education/` ← `education` **+** `certifications`, merged (see §6.1)                       |
| `Projects.js`            | Card grid; each card is icon-on-gradient, no images                                                   | `projects[]` (5)                         | `features/projects/` ← `projects`                                                                   |
| `Skills.js`              | 3 category cards, icon tiles inside                                                                   | `skillCategories[]` (3 cats / 15 skills) | `features/skills/` ← `skill_categories` + `skills`                                                  |
| `Contact.js`             | Contact details + EmailJS form with `mailto:` fallback + WhatsApp button                              | Hardcoded                                | `features/contact/` ← `profile`, POST → `/api/public/contact`                                       |
| `Footer.js`              | Bio blurb, 5 social icons, quick links, contact info, dynamic year                                    | Hardcoded                                | `components/Footer.tsx` ← `profile` + `social_links`                                                |
| `ScrollToTop.js`         | Appears past `scrollY > 500`                                                                          | —                                        | `components/ScrollToTop.tsx` (client)                                                               |
| `WhatsAppButton.js`      | Fixed floating pill, pulsing                                                                          | Number hardcoded `94767634359`           | `components/WhatsAppButton.tsx` ← `profile.whatsapp_number`                                         |
| `BackgroundAnimation.js` | Full-screen canvas, 40 falling code-token particles + 2 CSS float circles, `opacity .12`              | —                                        | `components/BackgroundAnimation.tsx` (client, `'use client'`, needs `prefers-reduced-motion` guard) |
| `TypingEffect.js`        | Typewriter: type 100ms, backspace 60ms, 2000ms hold, loop                                             | Strings passed as props, hardcoded twice | `components/TypingEffect.tsx` ← `profile.roles[]` (see §6.2)                                        |

**Not present today** (net-new sections in the plan): Experience, Testimonials, Services, project detail pages, blog, resume page, admin panel, theme toggle.

---

## 2. Hardcoded content → database rows

### 2.1 `profile` (1 row)

| Column                                                     | Value from source                                                                            |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `full_name`                                                | Mathan Monishan                                                                              |
| `hero_intro`                                               | "Hello, my name is"                                                                          |
| `headline`                                                 | derive — site has no static headline, only the rotating roles                                |
| `bio_short`                                                | About para 1 (Uva Wellassa + Moratuwa + frontend/Python/PM)                                  |
| `bio_long`                                                 | About paras 1–3 (adds the HTML/CSS/JS origin story and the internship-seeking close)         |
| `location`                                                 | Thalaimannar, Mannar, Sri Lanka                                                              |
| `email`                                                    | mathanmonishan@gmail.com                                                                     |
| `phone` / `whatsapp_number`                                | `94767634359` (displayed as +94 76 763 4359)                                                 |
| `avatar_url`                                               | `public/monishan.jpeg` → `avatars` bucket                                                    |
| `resume_url`                                               | currently Google Drive `1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY` → `documents` bucket              |
| `available_for_work`                                       | `true` — "currently seeking an internship opportunity"                                       |
| `years_experience`, `projects_completed`, `clients_served` | **no source** — the site has no stats block. Leave `null`, do not invent, hide any stats UI. |

Footer bio is a 4th distinct paragraph ("A passionate IT student and web developer…") — needs its own column or reuse `bio_short`. Recommend `footer_note` on `site_settings`, which already exists.

### 2.2 `social_links` (5 rows)

| platform  | url                                                               |
| --------- | ----------------------------------------------------------------- |
| linkedin  | https://www.linkedin.com/in/mathan-monishan2003                   |
| github    | https://github.com/Monishan2003                                   |
| x         | https://x.com/Monishan2003?t=Zqbc0FzwBRojAUvPEy4h7w&s=09          |
| instagram | https://www.instagram.com/monishan_2003?igsh=MThiNGJrd3AwYWhrNg== |
| whatsapp  | https://wa.me/94767634359                                         |

Schema §3.2 lists `instagram` outside its example platform set — the column is free text, so no change needed. Strip the tracking query strings on X/Instagram when seeding.

### 2.3 `education` (2 rows)

| institution                          | degree                                        | dates as written | needed                                 |
| ------------------------------------ | --------------------------------------------- | ---------------- | -------------------------------------- |
| Uva Wellassa University of Sri Lanka | BSc (Hons) in Science & Technology            | "2024 – Present" | real `start_date`, `is_current = true` |
| University of Moratuwa               | Bachelor of Information Technology (External) | "2025 – Present" | real `start_date`, `is_current = true` |

⚠️ Dates are display strings only. `date` columns need month precision — **ask Moni for start months.**

### 2.4 `certifications` (2 rows, currently living inside `educationData`)

| title                                      | issuer              | date     | credential_url                                                       |
| ------------------------------------------ | ------------------- | -------- | -------------------------------------------------------------------- |
| Introduction to Front-End Development      | Meta (via Coursera) | Oct 2024 | https://www.coursera.org/account/accomplishments/verify/B9JH54BPHVSO |
| Diploma of Education in Project Management | Uki (Yarl IT Hub)   | 2024     | —                                                                    |

Plan §Phase 6 says "four certifications" — only these two exist on the site. The other two must come from the CV.

### 2.5 `projects` (5 rows)

| slug                           | title                          | tech                          | repo                     | other link                                       | icon                     | gradient            |
| ------------------------------ | ------------------------------ | ----------------------------- | ------------------------ | ------------------------------------------------ | ------------------------ | ------------------- |
| `hotel-website`                | Hotel Website                  | HTML5, CSS                    | Web-design-project1      | —                                                | `fas fa-hotel`           | `#4a6fc7 → #3f51b5` |
| `portfolio-website`            | Portfolio Website              | HTML5, CSS, JavaScript        | My-Portfolio-website-    | `#` ⚠️ dead                                      | `fas fa-user`            | `#ff6b6b → #ff5252` |
| `personal-expense-tracker`     | Personal Expense Tracker       | Python, CLI                   | Personal-Expense-Tracker | —                                                | `fas fa-money-bill-wave` | `#20bf6b → #01baef` |
| `unisphere-lms`                | UniSphere LMS                  | C#, .NET, ASP.NET, SQL Server | LMS_project_C-…          | —                                                | `fas fa-graduation-cap`  | `#667eea → #764ba2` |
| `community-project-uki-jaffna` | Community Project (Uki/Jaffna) | —                             | —                        | Drive folder `1sTs55D9uDlRDtzE3LrWYNdtZxZTJf6wu` | `fas fa-hands-helping`   | `#8e44ad → #9b59b6` |

Notes:

- **`live_url` for `portfolio-website` is literally `"#"`** — renders a "Live Demo" button that goes nowhere. Fix on seed: set to `https://www.monishan.me` or null.
- The Community Project's Drive link is rendered through the `demo` field but labelled "Project Folder". It is neither a live site nor a repo — needs `resource_url` or map to `live_url` with a label override.
- `problem` / `solution` / `outcome` / `body` / `gallery_urls` / `client_name` / dates / `role` are **all net-new writing**, not migration. Detail pages have no precedent in the current site.
- Plan Phase 6 adds Pynimox site, SRMJ Enterprises, MediCross AI — not in this repo.

### 2.6 `skill_categories` + `skills` (3 / 15)

| Category                                    | Skills (FontAwesome class)                                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend Development (`fas fa-laptop-code`) | HTML5 `fab fa-html5`, CSS3 `fab fa-css3-alt`, JavaScript `fab fa-js`, React `fab fa-react`, Flutter `fab fa-android`                         |
| Backend & Databases (`fas fa-server`)       | C# `fab fa-microsoft`, Node.js `fab fa-node-js`, Python `fab fa-python`, MySQL `fas fa-database`, MongoDB `fas fa-database`                  |
| Tools & Methods (`fas fa-tools`)            | Git `fab fa-git-alt`, Figma `fab fa-figma`, Canva `fas fa-palette`, Project Management `fas fa-tasks`, Responsive Design `fas fa-mobile-alt` |

No proficiency ratings exist — leave `proficiency` null and do not render bars/levels in v1.

### 2.7 No source content

`experiences`, `testimonials`, `services`, `posts`, `contact_messages`, `page_views`, `site_settings` — all empty at migration. Every corresponding section must self-hide on zero published rows.

---

## 3. Design tokens

### 3.1 Already in `:root` (`src/index.css`)

```css
--primary-color: #2b3fa7; /* indigo — buttons, links, icons, accents */
--secondary-color: #1b0072; /* deep violet — hovers, section titles, footer */
--accent-color: #14b1ff; /* cyan — highlights, footer underlines, "in progress" */
--text-dark: #090642;
--text-light: #f8f9fa;
--bg-light: #f8f9fa;
--transition: all 0.3s ease;
```

### 3.2 Hardcoded outside `:root` — **must be tokenised or Phase 2 will drift**

| Value                                     | Used for                                                |
| ----------------------------------------- | ------------------------------------------------------- |
| `#281569`                                 | navbar sticky background, footer gradient end           |
| `#240391`                                 | navbar logo (non-sticky)                                |
| `rgb(38,38,172)`                          | navbar menu links                                       |
| `#f0f5ff`                                 | Education + Skills section gradient start               |
| `#ffffff`                                 | About, Projects, Contact section backgrounds; all cards |
| `#333` / `#555` / `#666`                  | body / paragraph / muted text                           |
| `#e0e0e0`, `#fafafa`                      | form border, form field background                      |
| `#25D366` / `#20BA5A`                     | WhatsApp green / hover                                  |
| `#28a745` / `#dc3545`                     | success / error states                                  |
| `rgba(43,63,167, .05/.1/.12/.2/.3/.4)`    | every tint of primary — encode as an alpha ramp         |
| `rgba(20,177,255, .08/.1/.15/.3/.4)`      | accent ramp                                             |
| `rgba(255,255,255, .1/.15/.8/.85/.9/.95)` | footer + navbar surfaces                                |

### 3.3 Typography

- **Body:** Poppins 300/400/500/600/700 · **Headings:** Ubuntu 400/500/700 — loaded via `<link>` in `public/index.html`; replace with `next/font/google` (self-hosted, no layout shift).
- Base `line-height: 1.6`; antialiased; `h1–h5` weight 700, `margin-bottom: 1rem`.

| Element              | 1440                                                    | 1100 | 768 | 576 |
| -------------------- | ------------------------------------------------------- | ---- | --- | --- |
| Hero eyebrow         | 26                                                      | 26   | 22  | 20  |
| Hero name            | **72** (700, lh 1.1, ls −1px, gradient-clipped)         | 62   | 48  | 40  |
| Hero role line       | 38                                                      | 32   | 28  | 24  |
| Section title        | 40 (weight **500**, colour `#1b0072`)                   | —    | 32  | 28  |
| Section subtitle     | 18, italic, 400, primary                                |      |     |     |
| Card / project title | 23 (600) · Skills h3 24 · Timeline h4 22 · Footer h3 22 |      |     |     |
| About paragraph      | 17, lh 1.85, justified (left-aligned ≤768)              |      |     |     |

### 3.4 Spacing & layout

- Container `max-width: 1300px; padding: 0 30px` (→ `0 20px` ≤576). **Navbar container is 1200px** — a real inconsistency in the original; keep or unify deliberately.
- Section rhythm `padding: 100px 0` (→ `80px 0` ≤768). Section title `margin-bottom: 60px; padding-bottom: 20px`.
- Section-title underline: `180px × 3px`, primary, centred.
- Grids: projects `auto-fit minmax(340px,1fr)` gap 35 · skills `minmax(280px,1fr)` gap 35 · skill tiles `minmax(120px,1fr)` gap 18 · contact `minmax(320px,1fr)` gap 60 · footer `minmax(250px,1fr)` gap 40.
- Timeline: centre rail 4px gradient primary→accent, 22px nodes with 4px border, cards 50% width alternating, collapses to a left rail at **991px**.

### 3.5 Radii, shadows, motion

- **Radii:** 6 (buttons, project links) · 8 (inputs, WhatsApp button, toasts) · 10 (skill tile) · 12 (all cards) · 20 (profile image, pills) · 25 (nav links) · 50% (circles).
- **Shadows:** card `0 5px 20px rgba(0,0,0,.1)` → hover `0 10px 30px rgba(0,0,0,.15)`; project hover `0 15px 40px rgba(0,0,0,.15)`; navbar `0 2px 15px rgba(0,0,0,.08)` → sticky `0 4px 20px rgba(43,63,167,.25)`; primary glow `0 4px 15px rgba(43,63,167,.3)`; photo `0 12px 35px rgba(0,0,0,.15)`.
- **Easing:** default `all .3s ease`; overshoot `cubic-bezier(.68,-.55,.265,1.55)` at `.4s` (scroll-top, WhatsApp float, mobile drawer); card lift `cubic-bezier(.175,.885,.32,1.275)` at `.4s`.
- **Keyframes:** `fadeInUp .6s ease-out both` (cards, staggered — projects `i*0.1s`, skills `cat*0.15 + i*0.05`, timeline `.1/.2/.3`), hero `fadeInUp 1s`, contact `fadeInLeft/Right .6s`, `blink 1s` cursor, `pulse 2s` WhatsApp, `float 20s/25s` background circles.
- **Hover signature:** `translateY(-5px … -12px)` + shadow bloom, project cards add `rotate(.5deg)`, icons `scale(1.1) rotate(5deg)`.
- **Breakpoints:** 1100 · 991 (timeline only) · 768 · 576.

⚠️ There is **no `prefers-reduced-motion` handling anywhere**. Plan §8 requires it — add during Phase 2, gating the canvas, pulse, float, and all fade-ins.

---

## 4. Dependencies

| Package                                | Verdict      | Note                                                                                                                                                                                                                   |
| -------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react` / `react-dom` ^18.2            | **Keep**     | → 19 with Next 15                                                                                                                                                                                                      |
| `react-scripts` 5.0.1                  | **Drop**     | replaced by Next                                                                                                                                                                                                       |
| `@emailjs/browser` ^4.4.1              | **Drop**     | client-side send → server route + Resend                                                                                                                                                                               |
| `@fortawesome/fontawesome-free` ^7.1.0 | **Decision** | see §6.3                                                                                                                                                                                                               |
| Google Fonts `<link>`                  | **Replace**  | `next/font/google`                                                                                                                                                                                                     |
| `vercel.json` SPA rewrites             | **Drop**     | Next owns routing; keep the file only if adding headers                                                                                                                                                                |
| —                                      | **Add**      | `next`, `typescript`, `tailwindcss@4`, `@supabase/supabase-js`, `@supabase/ssr`, `react-hook-form`, `yup`, `@hookform/resolvers`, `resend`, `lucide-react`, `@sentry/nextjs`, `shadcn/ui`, `recharts`, eslint/prettier |

`framer-motion`: the current site animates **entirely in CSS**. Porting the keyframes as-is is cheaper and pixel-identical. Recommend **not** adding framer-motion in v1 (plan §2 already makes it conditional).

---

## 5. Assets

| Asset                                                                               | Where                                                     | Action                                                                                 |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `public/monishan.jpeg`                                                              | repo                                                      | → `avatars` bucket, convert to WebP, keep a JPEG fallback                              |
| `monishan.jpeg` (repo root)                                                         | duplicate                                                 | drop                                                                                   |
| CV PDF                                                                              | Google Drive `1PhkGYM2Olu-UbfuuNUlzEEFxdBdROnNY`          | **download → `documents/cv-2026-08.pdf`**; `/resume` redirects to `profile.resume_url` |
| Community project doc                                                               | Drive `1sTs55D9uDlRDtzE3LrWYNdtZxZTJf6wu`                 | keep as external link                                                                  |
| Hero background                                                                     | **hotlinked** `images.unsplash.com/photo-1454117096348-…` | download, self-host, attribute — hotlinking is an uncontrolled LCP dependency          |
| `monishan portfolio.html`                                                           | legacy pre-React single file, gitignored                  | do not migrate                                                                         |
| Favicon, OG image, `manifest.json`, `robots.txt`, `sitemap.xml`, `apple-touch-icon` | **none exist**                                            | net-new in Phase 8                                                                     |
| Project screenshots                                                                 | **none exist**                                            | cards are icon-on-gradient; real covers are optional new work                          |

No `.env*` file exists and none is tracked — **no secrets to rotate.** `.gitignore` already covers `.env*`.

---

## 6. Schema mismatches — resolve before Phase 1

### 6.1 Education and certifications render as one timeline

The current design is a single alternating timeline mixing degrees and certificates, sorted chronologically, with a "In Progress / Completed" status pill. The plan splits these into two tables and Phase 3 ports them as two separate sections. **That changes the design**, which §0.1 forbids. Fix: keep both tables, and have the Education section merge + sort them into one timeline. `certifications` needs a `status`-equivalent (derivable from `expiry_date`/`issue_date`) or the pill logic moves to the component.

### 6.2 `profile` has no place for the rotating roles

Six strings drive `TypingEffect` in both Hero and About. Add `roles text[]` to `profile`. Without it, the typewriter has to be hardcoded — a §0.2 violation.

### 6.3 Project cards have icons and gradients, not images

`projects` has `cover_image_url` but no `icon` / `gradient`. All five cards are icon-on-gradient. Add `icon text` and `accent_gradient text`, and let the card prefer `cover_image_url` when present, falling back to icon+gradient. Same issue on `education.logo_url` (currently a FontAwesome class) and `skills.icon` (FontAwesome, not devicon/lucide).

**Icon-library decision — ✅ DECIDED 2026-08-10:** every icon on the site is FontAwesome. **Keep FontAwesome for content icons** (class strings stored in the DB, as today); lucide-react is for admin-panel chrome only. This is a second documented exception to the Thriio standard — record it in the v2 `README` next to the Tailwind one.

### 6.4 Dark mode — ✅ DECIDED 2026-08-10

The site is light-only. `site_settings.theme_mode` and a `ThemeToggle` (plan §2/§5) would ship a design that has never existed. **Ship light-only in v1:** keep the `theme_mode` column, build no toggle, no dark palette. Phase 2's "visually indistinguishable" check stays meaningful.

---

## 7. Defects worth fixing during the port

1. `live_url: "#"` on the Portfolio Website card → a button that does nothing.
2. `WhatsAppButton` and `ScrollToTop` are `<div onClick>` — not focusable, not keyboard-operable, no `role`. Must become `<button>`.
3. No `prefers-reduced-motion` (canvas, pulse, float, all fade-ins).
4. `.section-title::after` sets styles for `content: ""` — dead CSS, drop it.
5. `TypingEffect` puts `typingSpeed` in its own effect deps while also setting it — a self-retriggering loop. Rewrite with a ref-based timer.
6. Footer "Thalaimannar, Mannar, Sri Lanka" is an `<a href="#">` — should be plain text or a maps link.
7. `background-attachment: fixed` on the hero: already disabled ≤768 (iOS ignores it); preserve that split.
8. The contact form silently falls back to `mailto:` and shows an "EmailJS not configured yet" panel **to visitors**. This text is live on production today — highest-priority copy to kill.
9. Two `@keyframes float` definitions collide in `Home.css` (lines 45 and 69); the second wins.
10. `App.js` re-renders the whole tree on every scroll event (unthrottled `setScrollY`). Move to a CSS/IntersectionObserver approach or throttle.

---

## 8. Blockers for later phases

| Phase | Blocker                                                                                                                                                                                                                                                                                      |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | §6.1–6.3 schema additions still open. Prisma/no-Prisma: plan §2.1 already calls it — **pure Supabase client**. Repo: ✅ **new repo `monishan-portfolio-v2`**, this one stays live until DNS cuts over in Phase 8; copy `PORTFOLIO_UPGRADE_PLAN.md` + `MIGRATION_NOTES.md` across on day one. |
| 3     | Experience section has **zero** source content — needs the CV or it ships hidden                                                                                                                                                                                                             |
| 6     | **CV PDF is not in the repo.** NF Group, Pynimox, Yarl IT Hub, MediCross AI, SRMJ Enterprises, exact degree start months, and 2 of the 4 certifications all live only in that document. Phase 6 cannot complete without it.                                                                  |
| 6     | Project case-study copy (problem/solution/outcome) does not exist anywhere and must be written                                                                                                                                                                                               |
| 8     | No favicon, OG image, or brand mark exists                                                                                                                                                                                                                                                   |

---

## 9. Decisions and open questions

### Settled 2026-08-10

| #   | Decision                                                                                                           |
| --- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | **FontAwesome stays** for content icons; lucide is admin-chrome only (§6.3)                                        |
| 2   | **Light-only in v1** — keep `theme_mode`, build no toggle (§6.4)                                                   |
| 3   | **New repo `monishan-portfolio-v2`**; this repo keeps serving `monishan.me` until Phase 8 DNS cutover              |
| 4   | **No Prisma** — pure Supabase client, `supabase/migrations/*.sql` is the single source of schema truth (plan §2.1) |

### Still open — needed from Moni

1. Start **months** for the Uva Wellassa BSc (2024) and the Moratuwa BIT (2025). The current site only stores display strings.
2. **The CV PDF** — drop it into the repo or share the Drive file. Phase 6 is blocked on it, and Experience has no other source.
3. Should the "Portfolio Website" project card point at `www.monishan.me`, or leave the grid entirely once the new site _is_ the portfolio? (Today it links to `"#"`.)
4. Still to resolve before Phase 1 migrations: the three schema additions in §6.1–6.3 (merged education/certification timeline, `profile.roles[]`, `projects.icon` + `projects.accent_gradient`).
