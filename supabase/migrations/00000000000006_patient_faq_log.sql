-- Section 6.6: patient_faq_log — supports the patient Q&A feature (Section 8.4).

create table patient_faq_log (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations (id) on delete cascade,
  question_text text not null,
  matched_source text, -- peptide slug or FAQ doc id
  answered_at timestamptz,
  -- anything the compliance linter/rules catch — see Section 9
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);

create index patient_faq_log_org_id_idx on patient_faq_log (org_id);
create index patient_faq_log_flagged_idx on patient_faq_log (flagged);
