-- 0004_admin_allowlist.sql
--
-- Replaces "any authenticated user is the admin" with an explicit allowlist.
--
-- Why: 0002 granted full read/write on every table to the `authenticated` role.
-- That is only safe while public sign-ups are disabled in the Supabase dashboard
-- — a setting that lives outside this repo, is on by default, and that nothing
-- here can enforce. One forgotten toggle and anyone who registers owns the
-- content. `TO authenticated` is authentication, not authorization.
--
-- After this migration a signed-in user can still reach the API, but sees and
-- writes nothing unless their uid is in public.admins. Disabling sign-ups is
-- still worth doing; this just means forgetting to is no longer catastrophic.

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  note text,
  created_at timestamptz default now()
);

alter table public.admins enable row level security;

-- An admin may confirm their own membership. Nobody enumerates the list, and
-- nobody writes to it through the API — rows are added out of band via SQL.
create policy "admins_read_self" on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));

-- Helper lives in an unexposed schema so it is not reachable over PostgREST.
-- SECURITY DEFINER is required: the policies below call it while reading
-- public.admins, which is itself protected by RLS.
create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke all on schema private from public;
revoke all on function private.is_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

-- Swap every admin policy over to the allowlist. Wrapped in (select ...) so the
-- planner evaluates it once per statement rather than once per row.
do $$
declare
  t text;
begin
  foreach t in array array[
    'profile', 'social_links', 'experiences', 'education', 'certifications',
    'projects', 'skill_categories', 'skills', 'services', 'testimonials',
    'contact_messages', 'page_views', 'site_settings', 'posts'
  ]
  loop
    execute format('drop policy if exists "%1$s_admin_all" on public.%1$I', t);
    execute format(
      'create policy "%1$s_admin_all" on public.%1$I
         for all to authenticated
         using ((select private.is_admin()))
         with check ((select private.is_admin()))', t);
  end loop;
end $$;

-- Storage too, or a stray account could overwrite the CV and every image.
drop policy if exists "storage_admin_all" on storage.objects;
create policy "storage_admin_all" on storage.objects
  for all to authenticated
  using (
    bucket_id in ('avatars', 'projects', 'logos', 'documents')
    and (select private.is_admin())
  )
  with check (
    bucket_id in ('avatars', 'projects', 'logos', 'documents')
    and (select private.is_admin())
  );

-- To enrol the admin account once it exists:
--   insert into public.admins (user_id, email)
--   select id, email from auth.users where email = 'mathanmonishan@gmail.com';
