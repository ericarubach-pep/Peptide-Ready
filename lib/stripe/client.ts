import Stripe from "stripe";

let cached: Stripe | null = null;

// Built lazily, on first use inside a request handler — not at module load.
// Next.js imports every API route during the build's page-data-collection
// step just to analyze it, without ever calling the handler; a Stripe client
// built eagerly at module scope throws immediately if the env var isn't
// present in that build context, failing the whole deploy over a route that
// was never actually invoked.
export function getStripe(): Stripe {
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return cached;
}
