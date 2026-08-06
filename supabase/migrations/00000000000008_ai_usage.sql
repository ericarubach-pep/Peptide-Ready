-- Section 6.8: ai_usage — Claude API rate limiting (post-launch, Section 11).

create type ai_feature as enum ('faq', 'caption', 'script');

create table ai_usage (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations (id) on delete cascade,
  feature ai_feature not null,
  tokens_used integer not null default 0,
  created_at timestamptz not null default now()
);

create index ai_usage_org_id_idx on ai_usage (org_id);
create index ai_usage_org_id_created_at_idx on ai_usage (org_id, created_at);
