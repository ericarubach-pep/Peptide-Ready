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
