-- Extensions and shared helpers used by every subsequent migration.

create extension if not exists "pgcrypto";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Resolves the org_id of the currently authenticated org_user.
-- Used throughout Section 6.9's RLS policies so every policy scopes to
-- organization membership rather than individual user id.
create or replace function current_org_id()
returns uuid as $$
  select org_id from org_users where id = auth.uid() limit 1;
$$ language sql stable security definer set search_path = public;

-- True if the currently authenticated user is PeptideReady staff (Section 7.1:
-- /(admin)/* requires role = admin, distinct from a practice's own org_users.role).
create or replace function is_platform_admin()
returns boolean as $$
  select exists (
    select 1 from platform_admins where id = auth.uid()
  );
$$ language sql stable security definer set search_path = public;
