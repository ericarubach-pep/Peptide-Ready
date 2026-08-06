import { NextResponse } from "next/server";

// Section 6.5 / 11 — full partner Content API with webhooks is explicitly
// post-launch ("Full partner Content API with webhooks... generalizes v3's
// Phase 5 licensing spec"). This stub exists so the route shape matches
// Section 5's folder structure; it deliberately does not authenticate a
// vendor_partners.api_key_hash yet.
export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  return NextResponse.json(
    {
      error: "Partner content API is not yet available.",
      slug: params.slug,
      status: "post_launch",
    },
    { status: 501 }
  );
}
