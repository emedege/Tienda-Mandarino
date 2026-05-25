import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@sanity/client";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const sanityWrite = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productIds = session.payment_intent
      ? (
          await stripe.paymentIntents.retrieve(
            session.payment_intent as string
          )
        ).metadata.productIds?.split(",")
      : [];

    // Mark each product as sold in Sanity
    for (const productId of productIds ?? []) {
      if (!productId) continue;
      try {
        await sanityWrite.patch(productId).set({ inStock: false }).commit();
      } catch (err) {
        console.error(`Could not update product ${productId}:`, err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
