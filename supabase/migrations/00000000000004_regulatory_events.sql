-- Section 6.4: regulatory_events — PCAC / FDA status changes.

create type regulatory_event_type as enum ('pcac_review', 'status_change', 'federal_register');

create table regulatory_events (
  id uuid primary key default gen_random_uuid(),
  peptide_id uuid references peptides (id) on delete cascade,
  event_type regulatory_event_type not null,
  event_date date not null,
  summary text not null,
  source_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index regulatory_events_peptide_id_idx on regulatory_events (peptide_id);
create index regulatory_events_is_active_idx on regulatory_events (is_active);
