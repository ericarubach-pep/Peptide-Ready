// Hand-written to match supabase/migrations/*.sql. Regenerate with
// `supabase gen types typescript` once a real project is linked and swap
// this out — this file exists so the app has types before that's wired up.

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

export interface AdministrationSummary {
  route?: string;
  dose_range?: string;
  timing?: string;
  cycling?: string;
}

export interface Organization {
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
}

export interface OrgUser {
  id: string;
  org_id: string;
  role: OrgUserRole;
  created_at: string;
}

export interface Peptide {
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
}

export interface RegulatoryEvent {
  id: string;
  peptide_id: string | null;
  event_type: RegulatoryEventType;
  event_date: string;
  summary: string;
  source_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface VendorPartner {
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
}

export interface PatientFaqLog {
  id: string;
  org_id: string;
  question_text: string;
  matched_source: string | null;
  answered_at: string | null;
  flagged: boolean;
  created_at: string;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  source: EmailSubscriberSource;
  created_at: string;
}

export interface AiUsage {
  id: string;
  org_id: string;
  feature: AiFeature;
  tokens_used: number;
  created_at: string;
}

export interface ConsumerSubscriber {
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
}

export interface WebhookLog {
  id: string;
  provider: string;
  event_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  processed_at: string;
}

export interface Database {
  public: {
    Tables: {
      organizations: { Row: Organization; Insert: Partial<Organization>; Update: Partial<Organization> };
      org_users: { Row: OrgUser; Insert: Partial<OrgUser>; Update: Partial<OrgUser> };
      peptides: { Row: Peptide; Insert: Partial<Peptide>; Update: Partial<Peptide> };
      regulatory_events: { Row: RegulatoryEvent; Insert: Partial<RegulatoryEvent>; Update: Partial<RegulatoryEvent> };
      vendor_partners: { Row: VendorPartner; Insert: Partial<VendorPartner>; Update: Partial<VendorPartner> };
      patient_faq_log: { Row: PatientFaqLog; Insert: Partial<PatientFaqLog>; Update: Partial<PatientFaqLog> };
      email_subscribers: { Row: EmailSubscriber; Insert: Partial<EmailSubscriber>; Update: Partial<EmailSubscriber> };
      ai_usage: { Row: AiUsage; Insert: Partial<AiUsage>; Update: Partial<AiUsage> };
      consumer_subscribers: { Row: ConsumerSubscriber; Insert: Partial<ConsumerSubscriber>; Update: Partial<ConsumerSubscriber> };
      webhook_logs: { Row: WebhookLog; Insert: Partial<WebhookLog>; Update: Partial<WebhookLog> };
    };
  };
}
