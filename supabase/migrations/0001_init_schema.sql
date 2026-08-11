-- 0001_init_schema.sql
-- Portfolio v2 — full content schema.
-- Source of truth for the database. See PORTFOLIO_UPGRADE_PLAN.md §3.
--
-- Deviations from the plan's §3, all justified in MIGRATION_NOTES.md §6:
--   * profile.roles[]                     — the six rotating typewriter roles (§6.2)
--   * projects.icon / .accent_gradient    — cards are icon-on-gradient, not images (§6.3)
--   * projects.resource_url / _label      — the Community Project's Drive link is neither
--                                           a repo nor a live site
--   * education.icon / certifications.icon — FontAwesome classes, kept per the 2026-08-10
--                                           decision to keep FA for content icons (§6.3)
--   * certifications.is_current            — the shared timeline renders an In Progress /
--                                           Completed pill across both tables (§6.1)
--   * singleton indexes use ((id is not null)) rather than ((true)); Postgres rejects a
--     bare constant as an index expression.

-- ============ Helpers ============

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ============ 3.1 Singleton site profile ============

create table public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null,
  hero_intro text,
  roles text[] default '{}',           -- typewriter strings, Hero + About
  bio_short text,
  bio_long text,
  location text,
  email text,
  phone text,
  whatsapp_number text,                -- E.164 without the leading +, never null in UI
  whatsapp_message text,               -- prefilled wa.me text
  avatar_url text,
  og_image_url text,
  resume_url text,
  available_for_work boolean default true,
  availability_note text,
  years_experience int,
  projects_completed int,
  clients_served int,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create unique index profile_singleton on public.profile ((id is not null));

-- ============ 3.2 Social links ============

create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text,
  url text not null,
  icon text,                           -- FontAwesome class, e.g. "fab fa-linkedin-in"
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.3 Experience ============

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  employment_type text,
  location text,
  work_mode text,
  company_url text,
  logo_url text,
  icon text,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  summary text,
  highlights text[],
  tech_stack text[],
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz,
  constraint experiences_dates_ordered check (end_date is null or end_date >= start_date)
);

-- ============ 3.4 Education ============

create table public.education (
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
  icon text,                           -- FontAwesome class, e.g. "fas fa-university"
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz,
  constraint education_dates_ordered check (end_date is null or start_date is null or end_date >= start_date)
);

-- ============ 3.5 Certifications ============

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date,
  expiry_date date,
  is_current boolean default false,    -- drives the shared timeline's status pill
  description text,
  credential_id text,
  credential_url text,
  image_url text,
  icon text,                           -- FontAwesome class, e.g. "fas fa-certificate"
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.6 Projects ============

create type public.project_status as enum ('LIVE', 'IN_PROGRESS', 'ARCHIVED', 'CONCEPT');

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  category text,
  status public.project_status default 'LIVE',
  summary text not null,
  problem text,
  solution text,
  outcome text,
  body text,
  cover_image_url text,                -- preferred when set; otherwise icon + gradient
  icon text,                           -- FontAwesome class, e.g. "fas fa-hotel"
  accent_gradient text,                -- CSS gradient string for the card header
  gallery_urls text[],
  tech_stack text[],
  role text,
  client_name text,
  live_url text,
  repo_url text,
  resource_url text,                   -- a doc/folder that is neither repo nor live site
  resource_label text,                 -- e.g. "Project Folder"
  started_on date,
  completed_on date,
  is_featured boolean default false,
  sort_order int default 0,
  is_published boolean default true,
  view_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz,
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- ============ 3.7 Skills ============

create table public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.skill_categories(id) on delete cascade,
  name text not null,
  icon text,
  proficiency int check (proficiency between 1 and 5),
  years_used numeric(3,1),
  is_core boolean default false,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.8 Services ============

create table public.services (
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

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  author_company text,
  author_avatar_url text,
  quote text not null,
  rating int check (rating between 1 and 5),
  source_url text,
  sort_order int default 0,
  is_published boolean default false,  -- approve before showing
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.10 Contact inbox ============

create type public.message_status as enum ('NEW', 'READ', 'REPLIED', 'ARCHIVED', 'SPAM');

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  budget_range text,
  project_type text,
  status public.message_status default 'NEW',
  admin_notes text,
  ip_hash text,                        -- hashed, rate limiting only
  user_agent text,
  referrer text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- ============ 3.11 Lightweight analytics ============

create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  project_id uuid references public.projects(id) on delete set null,
  referrer text,
  country text,
  device text,
  created_at timestamptz default now()
);

-- ============ 3.12 Site settings / SEO ============

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text,
  site_description text,
  keywords text[],
  google_analytics_id text,
  theme_mode text default 'light',     -- light-only in v1, column kept for later
  maintenance_mode boolean default false,
  footer_note text,                    -- the footer's own bio paragraph
  created_at timestamptz default now(),
  updated_at timestamptz,
  constraint site_settings_theme_mode check (theme_mode in ('light', 'dark', 'system'))
);

create unique index site_settings_singleton on public.site_settings ((id is not null));

-- ============ 3.13 Blog (schema now, UI later) ============

create table public.posts (
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
  updated_at timestamptz,
  constraint posts_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- ============ Indexes ============
-- Foreign keys are never auto-indexed by Postgres; both FKs get one.

create index skills_category_id_idx on public.skills (category_id);
create index page_views_project_id_idx on public.page_views (project_id);
create index page_views_path_created_idx on public.page_views (path, created_at desc);

-- Every public section queries "published rows in sort order".
create index social_links_published_sort_idx on public.social_links (is_published, sort_order);
create index experiences_published_start_idx on public.experiences (is_published, start_date desc);
create index education_published_start_idx on public.education (is_published, start_date desc);
create index certifications_published_issue_idx on public.certifications (is_published, issue_date desc);
create index projects_published_sort_idx on public.projects (is_published, sort_order);
create index projects_featured_idx on public.projects (is_featured) where is_featured;
create index skill_categories_published_sort_idx on public.skill_categories (is_published, sort_order);
create index skills_published_sort_idx on public.skills (is_published, sort_order);
create index services_published_sort_idx on public.services (is_published, sort_order);
create index testimonials_published_sort_idx on public.testimonials (is_published, sort_order);
create index posts_published_at_idx on public.posts (is_published, published_at desc);

-- Inbox: unread-first listing, and the rate-limit lookup.
create index contact_messages_status_created_idx on public.contact_messages (status, created_at desc);
create index contact_messages_ip_hash_created_idx on public.contact_messages (ip_hash, created_at desc);

-- ============ updated_at triggers ============

do $$
declare
  t text;
begin
  foreach t in array array[
    'profile', 'social_links', 'experiences', 'education', 'certifications',
    'projects', 'skill_categories', 'skills', 'services', 'testimonials',
    'contact_messages', 'site_settings', 'posts'
  ]
  loop
    execute format(
      'create trigger trg_%1$s_updated before update on public.%1$I
         for each row execute function public.set_updated_at()',
      t
    );
  end loop;
end $$;
