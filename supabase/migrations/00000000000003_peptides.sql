-- Section 6.3: peptides — metadata; body content lives in MDX under content/peptides/.

create type pcac_status as enum (
  'unregulated',
  'category_1',
  'category_2',
  'fda_approved',
  'under_review'
);

create table peptides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null, -- one of the 9 categories from the Category Explainer (Section 3)
  pcac_status pcac_status not null default 'unregulated',
  -- route, dose_range, timing, cycling — imported from the reference spreadsheets (Section 3)
  administration_summary jsonb not null default '{}'::jsonb,
  is_sample boolean not null default false, -- true only for the 2-3 public sales lead-magnet pages
  min_tier org_tier not null default 'basic',
  attorney_reviewed boolean not null default false,
  last_reviewed date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index peptides_category_idx on peptides (category);
create index peptides_is_sample_idx on peptides (is_sample);
create index peptides_min_tier_idx on peptides (min_tier);

create trigger peptides_set_updated_at
  before update on peptides
  for each row
  execute function set_updated_at();
