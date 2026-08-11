-- 0002_rls_policies.sql
-- RLS is on for every table. See PORTFOLIO_UPGRADE_PLAN.md §3.15.
--
-- Policies target roles explicitly (`to anon` / `to authenticated`) instead of calling
-- auth.role() in the USING clause. Role targeting is evaluated once per statement by the
-- planner; auth.role() would be called once per row.
--
-- Single-admin model: any authenticated user is the admin. If a second user is ever added,
-- replace `to authenticated using (true)` with a check against an `admins` table.

alter table public.profile            enable row level security;
alter table public.social_links       enable row level security;
alter table public.experiences        enable row level security;
alter table public.education          enable row level security;
alter table public.certifications     enable row level security;
alter table public.projects           enable row level security;
alter table public.skill_categories   enable row level security;
alter table public.skills             enable row level security;
alter table public.services           enable row level security;
alter table public.testimonials       enable row level security;
alter table public.contact_messages   enable row level security;
alter table public.page_views         enable row level security;
alter table public.site_settings      enable row level security;
alter table public.posts              enable row level security;

-- ---- Content tables: anon reads published rows, admin does everything ----

do $$
declare
  t text;
begin
  foreach t in array array[
    'social_links', 'experiences', 'education', 'certifications', 'projects',
    'skill_categories', 'skills', 'services', 'testimonials', 'posts'
  ]
  loop
    execute format(
      'create policy "%1$s_public_read" on public.%1$I
         for select to anon using (is_published = true)', t);
    execute format(
      'create policy "%1$s_admin_all" on public.%1$I
         for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ---- Singletons: no is_published column, so anon reads the whole row ----

create policy "profile_public_read" on public.profile
  for select to anon using (true);
create policy "profile_admin_all" on public.profile
  for all to authenticated using (true) with check (true);

create policy "site_settings_public_read" on public.site_settings
  for select to anon using (true);
create policy "site_settings_admin_all" on public.site_settings
  for all to authenticated using (true) with check (true);

-- ---- Contact inbox: the public may write, and may never read ----

create policy "contact_messages_public_insert" on public.contact_messages
  for insert to anon with check (true);
create policy "contact_messages_admin_all" on public.contact_messages
  for all to authenticated using (true) with check (true);

-- ---- Analytics: write-only for the public ----

create policy "page_views_public_insert" on public.page_views
  for insert to anon with check (true);
create policy "page_views_admin_all" on public.page_views
  for all to authenticated using (true) with check (true);
