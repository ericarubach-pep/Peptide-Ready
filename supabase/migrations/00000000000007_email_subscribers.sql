-- Section 6.7: email_subscribers — pre-signup captures on the practice sales funnel.

create type email_subscriber_source as enum ('sample_page', 'vendor_page', 'waitlist');

create table email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source email_subscriber_source not null,
  created_at timestamptz not null default now(),
  unique (email, source)
);
