import type { ConsumerTier, OrgTier } from "@/types/database";

// Per-Section 2.4: retires v3's individual-subscriber Stripe products
// (Consumer $149/yr, Professional $749/yr, Enterprise $2,499/yr as the
// platform-wide model) in favor of per-practice license tiers. Those same
// numbers come back in Section 2.8, but scoped only to the EMME-owned
// b2c_consumer org via ORG_PRICE_IDS's consumer counterpart below — see
// CONSUMER_PRICE_IDS.

export const ORG_PRICE_IDS: Record<Exclude<OrgTier, "enterprise">, string> = {
  basic: process.env.STRIPE_PRICE_ORG_BASIC!,
  pro: process.env.STRIPE_PRICE_ORG_PRO!,
};

// Enterprise is $1,500+/mo and sales-assisted (Section 2.5) — no fixed
// self-serve price ID; contract value is set per-deal in the Stripe Dashboard
// and stored on organizations.stripe_subscription_id after signup.

export const CONSUMER_PRICE_IDS: Record<ConsumerTier, string> = {
  consumer: process.env.STRIPE_PRICE_CONSUMER!,
  professional: process.env.STRIPE_PRICE_CONSUMER_PROFESSIONAL!,
  enterprise: process.env.STRIPE_PRICE_CONSUMER_ENTERPRISE!,
};

export const ORG_TIER_BY_PRICE_ID: Record<string, OrgTier> = Object.fromEntries(
  Object.entries(ORG_PRICE_IDS).map(([tier, priceId]) => [priceId, tier])
) as Record<string, OrgTier>;

export const CONSUMER_TIER_BY_PRICE_ID: Record<string, ConsumerTier> = Object.fromEntries(
  Object.entries(CONSUMER_PRICE_IDS).map(([tier, priceId]) => [priceId, tier])
) as Record<string, ConsumerTier>;
