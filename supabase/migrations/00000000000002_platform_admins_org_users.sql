-- platform_admins: PeptideReady staff (Section 7.1 /(admin)/* gate), distinct
-- from any practice's own org_users.

create table platform_admins (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Section 6.2: org_users — staff logins under an organization.

create type org_user_role as enum ('owner', 'staff');

create table org_users (
  id uuid primary key references auth.users (id) on delete cascade,
  org_id uuid not null references organizations (id) on delete cascade,
  role org_user_role not null default 'staff',
  created_at timestamptz not null default now()
);

create index org_users_org_id_idx on org_users (org_id);

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

-- True if the currently authenticated user owns the given org. Used instead
-- of an inline `exists (select ... from org_users ...)` in any policy defined
-- ON org_users itself: Postgres evaluates a `for all` policy on every SELECT
-- too, and a raw subquery against the same table a policy is defined on
-- re-triggers that table's policies — including the one currently being
-- evaluated — which Postgres detects as genuine infinite recursion and
-- refuses to run ("infinite recursion detected in policy for relation
-- org_users"). Wrapping the check in this security definer function avoids
-- it the same way current_org_id() and is_platform_admin() do.
create or replace function is_org_owner(target_org_id uuid)
returns boolean as $$
  select exists (
    select 1 from org_users
    where org_users.id = auth.uid()
    and org_users.org_id = target_org_id
    and org_users.role = 'owner'
  );
$$ language sql stable security definer set search_path = public;
