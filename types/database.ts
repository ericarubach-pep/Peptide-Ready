// Hand-written to match supabase/migrations/*.sql. Regenerate with
// `supabase gen types typescript` once a real project is linked and swap
// this out — this file exists so the app has types before that's wired up.
//
// IMPORTANT: every Row/Insert/Update shape below must be declared with
// `type`, not `interface`. postgrest-js's GenericTable/GenericSchema
// constraints check `extends Record<string, unknown>`, and a plain
// `interface` (even with identical fields) does not satisfy that check —
// TypeScript only infers the implicit index signature for `type` object
// literals. Using `interface` here silently resolves every query's Row type
// to `never` instead of erroring, which is exactly what happened the first
// time this file was written with interfaces — see git history if curious.

export type OrgType =
  | "med_spa"
  | "dermatology"
  | "plastic_surgery"
  | "functional_medicine"
  | "compounding_pharmacy"
  | "telehealth"
  | "distributor";

export type OrgMode = "b2b_practice" | "b2c_consumer";
export type OrgTier = "basic" | "pro" | "enterprise";
export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled";
export type OrgUserRole = "owner" | "staff";
export type PcacStatus = "unregulated" | "category_1" | "category_2" | "fda_approved" | "under_review";
export type RegulatoryEventType = "pcac_review" | "status_change" | "federal_register";
export type VendorOrgType = "compounding_pharmacy" | "distributor" | "telehealth";
export type EmailSubscriberSource = "sample_page" | "vendor_page" | "waitlist";
export type AiFeature = "faq" | "caption" | "script";
export type ConsumerTier = "consumer" | "professional" | "enterprise";

export type AdministrationSummary = {
  route?: string;
  dose_range?: string;
  timing?: string;
  cycling?: string;
};

export type Organization = {
  id: string;
  org_name: string;
  org_type: OrgType;
  org_mode: OrgMode;
  tier: OrgTier;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  logo_url: string | null;
  primary_color: string | null;
  display_name: string | null;
  subdomain: string | null;
  custom_domain: string | null;
  attribution_visible: boolean;
  created_at: string;
  updated_at: string;
};

export type OrgUser = {
  id: string;
  org_id: string;
  role: OrgUserRole;
  created_at: string;
};

export type Peptide = {
  id: string;
  slug: string;
  name: string;
  category: string;
  pcac_status: PcacStatus;
  administration_summary: AdministrationSummary;
  is_sample: boolean;
  min_tier: OrgTier;
  attorney_reviewed: boolean;
  last_reviewed: string | null;
  created_at: string;
  updated_at: string;
};

export type RegulatoryEvent = {
  id: string;
  peptide_id: string | null;
  event_type: RegulatoryEventType;
  event_date: string;
  summary: string;
  source_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type VendorPartner = {
  id: string;
  org_name: string;
  org_type: VendorOrgType;
  annual_fee: number | null;
  contract_start: string | null;
  contract_end: string | null;
  content_scope: string[];
  seat_count: number | null;
  api_key_hash: string | null;
  webhook_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PatientFaqLog = {
  id: string;
  org_id: string;
  question_text: string;
  matched_source: string | null;
  answered_at: string | null;
  flagged: boolean;
  created_at: string;
};

export type EmailSubscriber = {
  id: string;
  email: string;
  source: EmailSubscriberSource;
  created_at: string;
};

export type AiUsage = {
  id: string;
  org_id: string;
  feature: AiFeature;
  tokens_used: number;
  created_at: string;
};

export type ConsumerSubscriber = {
  id: string;
  org_id: string;
  tier: ConsumerTier;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  affiliate_code: string | null;
  affiliate_ref: string | null;
  created_at: string;
  updated_at: string;
};

export type WebhookLog = {
  id: string;
  provider: string;
  event_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  processed_at: string;
};

export type PlatformAdmin = {
  id: string;
  created_at: string;
};

type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

// postgrest-js's GenericTable requires Relationships (even if empty) or every
// query on the table silently resolves to `never` instead of erroring.
type Table<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: GenericRelationship[];
};

export type Database = {
  public: {
    Tables: {
      organizations: Table<Organization>;
      org_users: Table<OrgUser>;
      peptides: Table<Peptide>;
      regulatory_events: Table<RegulatoryEvent>;
      vendor_partners: Table<VendorPartner>;
      patient_faq_log: Table<PatientFaqLog>;
      email_subscribers: Table<EmailSubscriber>;
      ai_usage: Table<AiUsage>;
      consumer_subscribers: Table<ConsumerSubscriber>;
      webhook_logs: Table<WebhookLog>;
      platform_admins: Table<PlatformAdmin>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
