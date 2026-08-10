-- Section 6.9: Row-Level Security — apply to all tables, scoped to organization
-- membership, not individual user id. Service-role clients (used by API routes
-- for webhooks, lead capture, and admin operations) bypass RLS entirely, so
-- these policies govern direct client access only.

alter table organizations enable row level security;
alter table org_users enable row level security;
alter table peptides enable row level security;
alter table regulatory_events enable row level security;
alter table vendor_partners enable row level security;
alter table patient_faq_log enable row level security;
alter table email_subscribers enable row level security;
alter table ai_usage enable row level security;
alter table consumer_subscribers enable row level security;
alter table webhook_logs enable row level security;
alter table platform_admins enable row level security;

-- organizations

create policy "org staff can read own org"
  on organizations for select using (
    id = current_org_id() or is_platform_admin()
  );

create policy "org owner can update own org"
  on organizations for update using (
    (id = current_org_id() and is_org_owner(id)) or is_platform_admin()
  );

create policy "platform admin manages organizations"
  on organizations for all using (is_platform_admin());

-- org_users

create policy "org staff can read own org roster"
  on org_users for select using (
    org_id = current_org_id() or is_platform_admin()
  );

create policy "org owner manages own org roster"
  on org_users for all using (
    is_org_owner(org_id) or is_platform_admin()
  );

-- peptides — Section 6.9's worked example: readable by org staff whose org
-- tier meets the peptide's min_tier, plus the public is_sample set (Section 7.2).

create policy "public can read sample peptides"
  on peptides for select using (is_sample = true);

create policy "org staff can read own org content"
  on peptides for select using (
    exists (
      select 1 from org_users
      where org_users.id = auth.uid()
      and org_users.org_id = current_org_id()
    )
    and peptides.min_tier <= (select tier from organizations where id = current_org_id())
  );

create policy "platform admin manages peptides"
  on peptides for all using (is_platform_admin());

-- regulatory_events — visible wherever the underlying peptide is visible.

create policy "readable if peptide is readable"
  on regulatory_events for select using (
    exists (
      select 1 from peptides
      where peptides.id = regulatory_events.peptide_id
    )
  );

create policy "platform admin manages regulatory_events"
  on regulatory_events for all using (is_platform_admin());

-- vendor_partners — PeptideReady-internal accounts, not org-scoped content.

create policy "platform admin manages vendor_partners"
  on vendor_partners for all using (is_platform_admin());

-- patient_faq_log — org-scoped.

create policy "org staff can read own org faq log"
  on patient_faq_log for select using (
    org_id = current_org_id() or is_platform_admin()
  );

create policy "org staff can insert own org faq log"
  on patient_faq_log for insert with check (
    org_id = current_org_id()
  );

create policy "platform admin manages patient_faq_log"
  on patient_faq_log for all using (is_platform_admin());

-- email_subscribers — captured server-side via service role; admin-read only.

create policy "platform admin manages email_subscribers"
  on email_subscribers for all using (is_platform_admin());

-- ai_usage — org-scoped read.

create policy "org staff can read own org ai_usage"
  on ai_usage for select using (
    org_id = current_org_id() or is_platform_admin()
  );

create policy "platform admin manages ai_usage"
  on ai_usage for all using (is_platform_admin());

-- consumer_subscribers — individuals read/update their own row.

create policy "consumer reads own subscription"
  on consumer_subscribers for select using (
    id = auth.uid() or is_platform_admin()
  );

create policy "platform admin manages consumer_subscribers"
  on consumer_subscribers for all using (is_platform_admin());

-- webhook_logs / platform_admins — admin-internal only.

create policy "platform admin manages webhook_logs"
  on webhook_logs for all using (is_platform_admin());

create policy "platform admin manages platform_admins"
  on platform_admins for all using (is_platform_admin());
