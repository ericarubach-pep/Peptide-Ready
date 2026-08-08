-- Extensions and shared helpers used by every subsequent migration.

create extension if not exists "pgcrypto";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- current_org_id() and is_platform_admin() live in
-- 00000000000002_platform_admins_org_users.sql, not here: both are `language
-- sql` functions, which Postgres validates against the tables they reference
-- at CREATE FUNCTION time (unlike plpgsql, which only checks at call time) —
-- so they have to be defined after org_users and platform_admins exist.
