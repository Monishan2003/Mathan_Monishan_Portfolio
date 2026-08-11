-- 0003_storage_buckets.sql
-- Storage buckets per PORTFOLIO_UPGRADE_PLAN.md §4.
-- 5 MB ceiling everywhere. Raster images only for image buckets (no SVG — a public bucket
-- serving SVG is a stored-XSS vector). PDF only for documents.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('avatars',   'avatars',   true, 5242880, array['image/jpeg','image/png','image/webp','image/avif']),
  ('projects',  'projects',  true, 5242880, array['image/jpeg','image/png','image/webp','image/avif']),
  ('logos',     'logos',     true, 5242880, array['image/jpeg','image/png','image/webp','image/avif']),
  ('documents', 'documents', true, 5242880, array['application/pdf'])
on conflict (id) do nothing;

-- Buckets are public, so objects are readable by URL; this policy makes listing work too.
create policy "storage_public_read" on storage.objects
  for select to anon
  using (bucket_id in ('avatars', 'projects', 'logos', 'documents'));

-- Only the admin uploads, replaces or deletes.
create policy "storage_admin_all" on storage.objects
  for all to authenticated
  using (bucket_id in ('avatars', 'projects', 'logos', 'documents'))
  with check (bucket_id in ('avatars', 'projects', 'logos', 'documents'));
