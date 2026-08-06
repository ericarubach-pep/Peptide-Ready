-- Section 6.10: consumer_subscribers — individual end users, EMME-owned
-- consumer tenant only (org_id always points at the single b2c_consumer row).

create type consumer_tier as enum ('consumer', 'professional', 'enterprise');

create table consumer_subscribers (
  id uuid primary key references auth.users (id) on delete cascade,
  org_id uuid not null references organizations (id),
  tier consumer_tier not null default 'consumer',
  subscription_status subscription_status not null default 'trialing',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  affiliate_code text,
  affiliate_ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index consumer_subscribers_org_id_idx on consumer_subscribers (org_id);

create trigger consumer_subscribers_set_updated_at
  before update on consumer_subscribers
  for each row
  execute function set_updated_at();
