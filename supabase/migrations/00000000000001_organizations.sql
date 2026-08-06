-- Section 6.1: organizations — replaces v3's individual-subscriber gating.
-- A practice (or, for exactly one row, EMME's own consumer tenant per Section 2.8)
-- is the billing and branding unit; staff log in under it.

create type org_type as enum (
  'med_spa',
  'dermatology',
  'plastic_surgery',
  'functional_medicine',
  'compounding_pharmacy',
  'telehealth',
  'distributor'
);

create type org_mode as enum ('b2b_practice', 'b2c_consumer');

create type org_tier as enum ('basic', 'pro', 'enterprise');

create type subscription_status as enum ('active', 'trialing', 'past_due', 'canceled');

create table organizations (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  org_type org_type not null,
  org_mode org_mode not null default 'b2b_practice',
  tier org_tier not null default 'basic',
  subscription_status subscription_status not null default 'trialing',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  logo_url text,
  primary_color text,
  display_name text,
  subdomain text unique,
  custom_domain text unique,
  attribution_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Exactly one b2c_consumer row is expected (Section 2.8 / 6.1) — enforced at the
-- application layer during org creation, not here, since a partial unique index
-- on org_mode would block legitimate multi-row b2b_practice inserts.
create index organizations_org_mode_idx on organizations (org_mode);
create index organizations_subdomain_idx on organizations (subdomain);
create index organizations_stripe_customer_id_idx on organizations (stripe_customer_id);

create trigger organizations_set_updated_at
  before update on organizations
  for each row
  execute function set_updated_at();
