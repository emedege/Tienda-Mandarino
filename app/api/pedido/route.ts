import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@sanity/client";
import { BANK_TRANSFER, SHIPPING_COST, generateOrderReference } from "@/lib/payment";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface Customer {
  nombre: string;
  email: string;
  telefono?: string;
  direccion: string;
  ciudad: string;
  cp: string;
  provincia: string;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const sanityWrite = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
  });

  try {
    const { items, customer }: { items: CartItem[]; customer: Customer } =
      await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No hay artículos" }, { status: 400 });
    }
    if (
      !customer?.nombre ||
      !customer?.email ||
      !customer?.direccion ||
      !customer?.ciudad ||
      !customer?.cp ||
      !customer?.provincia
    ) {
      return NextResponse.json(
        { error: "Faltan datos de envío" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce((sum, i) => sum + i.price, 0);
    const total = subtotal + SHIPPING_COST;
    const reference = generateOrderReference();

    for (const item of items) {
      try {
        await sanityWrite.patch(item.id).set({ inStock: false }).commit();
      } catch (err) {
        console.error(`No se pudo reservar el producto ${item.id}:`, err);
      }
    }

    const itemsRows = items
      .map(
        (i) =>
          `<tr><td style="padding: 6px 0;">${i.name}</td><td style="padding: 6px 0; text-align: right;">${i.price.toFixed(2)} €</td></tr>`
      )
      .join("");

    await resend.emails.send({
      from: "Azul Mandarino Web <noreply@azulmandarino.com>",
      to: "arte@marinadescalzi.es",
      replyTo: customer.email,
      subject: `Nuevo pedido ${reference} — pago por transferencia`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF7F0; border-radius: 16px;">
          <h1 style="color: #5A9080; font-size: 24px; margin-bottom: 8px;">Nuevo pedido ${reference}</h1>
          <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Pendiente de confirmar transferencia</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">${itemsRows}</table>
          <table style="width: 100%; border-collapse: collapse; border-top: 1px solid #ddd; padding-top: 8px;">
            <tr><td style="padding-top: 8px;">Envío</td><td style="padding-top: 8px; text-align: right;">${SHIPPING_COST.toFixed(2)} €</td></tr>
            <tr><td style="font-weight: bold; padding-top: 8px;">Total</td><td style="font-weight: bold; padding-top: 8px; text-align: right;">${total.toFixed(2)} €</td></tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 12px; border-left: 4px solid #7BAE9E;">
            <p style="color: #999; font-size: 13px; margin: 0 0 8px;">Datos de envío:</p>
            <p style="margin: 0; font-size: 15px;">${customer.nombre}<br/>${customer.direccion}<br/>${customer.cp} ${customer.ciudad}, ${customer.provincia}<br/>${customer.telefono ?? ""}<br/><a href="mailto:${customer.email}">${customer.email}</a></p>
          </div>

          <p style="margin-top: 24px; color: #999; font-size: 13px;">Las piezas ya se han marcado como reservadas. Cuando confirmes que ha llegado la transferencia con el concepto <strong>${reference}</strong>, prepara el envío.</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "Marina · Azul Mandarino <arte@azulmandarino.com>",
      to: customer.email,
      replyTo: "arte@marinadescalzi.es",
      subject: `Tu pedido ${reference} — instrucciones de pago`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF7F0; border-radius: 16px;">
          <h1 style="color: #5A9080; font-size: 24px;">¡Gracias, ${customer.nombre}!</h1>
          <p style="font-size: 15px; line-height: 1.7;">He reservado tu pieza. Para confirmar el pedido, solo falta que hagas la transferencia con estos datos:</p>

          <div style="margin: 24px 0; padding: 16px; background: white; border-radius: 12px; border-left: 4px solid #D4755A;">
            <p style="margin: 4px 0; font-size: 15px;"><strong>IBAN:</strong> ${BANK_TRANSFER.iban}</p>
            <p style="margin: 4px 0; font-size: 15px;"><strong>Titular:</strong> ${BANK_TRANSFER.titular}</p>
            <p style="margin: 4px 0; font-size: 15px;"><strong>Importe:</strong> ${total.toFixed(2)} €</p>
            <p style="margin: 4px 0; font-size: 15px;"><strong>Concepto:</strong> ${reference}</p>
          </div>

          <p style="font-size: 14px; color: #666;">Es importante que incluyas el concepto <strong>${reference}</strong> para poder identificar tu pago.</p>
          <p style="font-size: 15px; line-height: 1.7; margin-top: 24px;">En cuanto reciba la transferencia, preparo tu pedido y te lo envío. Cualquier duda, escríbeme a <a href="mailto:arte@marinadescalzi.es" style="color: #D4755A;">arte@marinadescalzi.es</a>.</p>
          <p style="font-size: 15px; line-height: 1.7; margin-top: 24px;">Con cariño,<br/><strong>Marina</strong><br/><span style="color: #7BAE9E;">Azul Mandarino</span></p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, reference, total });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json(
      { error: "Error al procesar el pedido" },
      { status: 500 }
    );
  }
}
