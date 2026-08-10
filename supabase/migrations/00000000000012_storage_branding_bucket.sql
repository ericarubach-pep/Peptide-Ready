-- Section 8.1 — the "branding" storage bucket the logo upload feature needs.
-- Logos are stored under a path like <org_id>/logo-<timestamp>.png, so a
-- practice can only ever write into its own folder, but the files
-- themselves are publicly readable (patients need to see the logo without
-- logging in).

insert into storage.buckets (id, name, public)
values ('branding', 'branding', true)
on conflict (id) do nothing;

create policy "public can view branding assets"
  on storage.objects for select
  using (bucket_id = 'branding');

create policy "org staff can upload into own org branding folder"
  on storage.objects for insert
  with check (
    bucket_id = 'branding'
    and (storage.foldername(name))[1] = current_org_id()::text
  );

create policy "org staff can update own org branding assets"
  on storage.objects for update
  using (
    bucket_id = 'branding'
    and (storage.foldername(name))[1] = current_org_id()::text
  );
