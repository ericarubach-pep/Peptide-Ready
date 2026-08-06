-- Referenced in Section 7.3: log all Stripe events; event.id gives idempotency.

create table webhook_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'stripe',
  event_id text not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz not null default now(),
  unique (provider, event_id)
);

create index webhook_logs_event_type_idx on webhook_logs (event_type);
