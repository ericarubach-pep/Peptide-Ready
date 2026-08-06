import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe/client";
import { CONSUMER_TIER_BY_PRICE_ID, ORG_TIER_BY_PRICE_ID } from "@/lib/stripe/prices";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { SubscriptionStatus } from "@/types/database";

// Section 7.3 — Stripe → Supabase subscription sync. Retargeted to the
// organizations table (and, for the EMME-owned tenant, consumer_subscribers)
// instead of v3's profiles table.

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  // Idempotency via event.id: the unique (provider, event_id) constraint on
  // webhook_logs rejects a duplicate delivery before any handler runs.
  const { error: logError } = await supabase.from("webhook_logs").insert({
    provider: "stripe",
    event_id: event.id,
    event_type: event.type,
    payload: event as unknown as Record<string, unknown>,
  });

  if (logError) {
    if (logError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    return NextResponse.json({ error: logError.message }, { status: 500 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await syncSubscription(supabase, event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted": {
        await setStatusByCustomer(
          supabase,
          (event.data.object as Stripe.Subscription).customer as string,
          "canceled"
        );
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await setStatusByCustomer(supabase, invoice.customer as string, "past_due");
        await triggerDunningEmail(supabase, invoice.customer as string);
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const isFirstPayment = invoice.billing_reason === "subscription_create";
        await setStatusByCustomer(supabase, invoice.customer as string, "active");
        if (isFirstPayment) {
          await triggerOnboardingSequence(supabase, invoice.customer as string);
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function syncSubscription(
  supabase: ReturnType<typeof createServiceRoleClient>,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0]?.price.id;
  const status: SubscriptionStatus = subscription.status === "trialing" ? "trialing" : "active";

  const org = await findOrgByCustomerId(supabase, customerId);
  if (org) {
    const tier = priceId ? ORG_TIER_BY_PRICE_ID[priceId] : undefined;
    await supabase
      .from("organizations")
      .update({
        stripe_subscription_id: subscription.id,
        subscription_status: status,
        ...(tier ? { tier } : {}),
      })
      .eq("id", org.id);
    return;
  }

  const consumer = await findConsumerByCustomerId(supabase, customerId);
  if (consumer) {
    const tier = priceId ? CONSUMER_TIER_BY_PRICE_ID[priceId] : undefined;
    await supabase
      .from("consumer_subscribers")
      .update({
        stripe_subscription_id: subscription.id,
        subscription_status: status,
        ...(tier ? { tier } : {}),
      })
      .eq("id", consumer.id);
  }
}

async function setStatusByCustomer(
  supabase: ReturnType<typeof createServiceRoleClient>,
  customerId: string,
  status: SubscriptionStatus
) {
  const org = await findOrgByCustomerId(supabase, customerId);
  if (org) {
    await supabase.from("organizations").update({ subscription_status: status }).eq("id", org.id);
    return;
  }

  const consumer = await findConsumerByCustomerId(supabase, customerId);
  if (consumer) {
    await supabase.from("consumer_subscribers").update({ subscription_status: status }).eq("id", consumer.id);
  }
}

async function findOrgByCustomerId(supabase: ReturnType<typeof createServiceRoleClient>, customerId: string) {
  const { data } = await supabase
    .from("organizations")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data;
}

async function findConsumerByCustomerId(
  supabase: ReturnType<typeof createServiceRoleClient>,
  customerId: string
) {
  const { data } = await supabase
    .from("consumer_subscribers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data;
}

async function triggerDunningEmail(supabase: ReturnType<typeof createServiceRoleClient>, customerId: string) {
  // Resend dunning email to the org owner — wired up alongside the
  // onboarding sequence in lib/resend/ once that's built out.
  const org = await findOrgByCustomerId(supabase, customerId);
  if (!org) return;
  // TODO: lib/resend/dunning.ts
}

async function triggerOnboardingSequence(
  supabase: ReturnType<typeof createServiceRoleClient>,
  customerId: string
) {
  // Resend onboarding sequence, scoped per-organization (Section 4).
  const org = await findOrgByCustomerId(supabase, customerId);
  if (!org) return;
  // TODO: lib/resend/onboarding.ts
}
