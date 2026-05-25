import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No hay artículos" }, { status: 400 });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          metadata: { productId: item.id },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/pedido-completado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/tienda`,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["ES"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 395, currency: "eur" },
            display_name: "Envío estándar (España)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "eur" },
            display_name: "Transferencia bancaria",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      payment_intent_data: {
        metadata: {
          productIds: items.map((i) => i.id).join(","),
        },
      },
      locale: "es",
      custom_text: {
        submit: {
          message:
            "Cada pieza es única. Una vez confirmado el pago, reservarás tu pieza.",
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Error al crear la sesión de pago" },
      { status: 500 }
    );
  }
}
