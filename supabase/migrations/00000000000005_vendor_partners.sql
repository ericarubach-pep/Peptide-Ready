-- Section 6.5: vendor_partners — B2B volume-license accounts.
-- Was Phase-5-only 'licensing_partners' in v3; now core (Section 2.5, 8.3).

create type vendor_org_type as enum ('compounding_pharmacy', 'distributor', 'telehealth');

create table vendor_partners (
  id uuid primary key default gen_random_uuid(),
  org_name text not null,
  org_type vendor_org_type not null,
  annual_fee numeric(12, 2),
  contract_start date,
  contract_end date,
  content_scope text[] not null default '{}', -- which library sections are licensed
  seat_count integer, -- clinics covered under the volume license
  api_key_hash text, -- hashed; partner content API is post-launch (Section 6, 11)
  webhook_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vendor_partners_is_active_idx on vendor_partners (is_active);

create trigger vendor_partners_set_updated_at
  before update on vendor_partners
  for each row
  execute function set_updated_at();
