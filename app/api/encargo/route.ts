import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { nombre, email, telefono, tipo, descripcion, presupuesto, plazo } =
      body;

    if (!nombre || !email || !descripcion) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Azul Mandarino Web <noreply@azulmandarino.com>",
      to: "arte@marinadescalzi.es",
      replyTo: email,
      subject: `🎨 Nuevo encargo personalizado de ${nombre}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF7F0; border-radius: 16px;">
          <h1 style="color: #5A9080; font-size: 24px; margin-bottom: 8px;">Nuevo encargo personalizado</h1>
          <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Recibido desde azulmandarino.com</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #999; font-size: 13px; width: 140px;">Nombre</td><td style="padding: 8px 0; font-size: 15px; color: var(--color-text);">${nombre}</td></tr>
            <tr><td style="padding: 8px 0; color: #999; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #D4755A;">${email}</a></td></tr>
            ${telefono ? `<tr><td style="padding: 8px 0; color: #999; font-size: 13px;">Teléfono</td><td style="padding: 8px 0; font-size: 15px; color: var(--color-text);">${telefono}</td></tr>` : ""}
            ${tipo ? `<tr><td style="padding: 8px 0; color: #999; font-size: 13px;">Tipo de joya</td><td style="padding: 8px 0; font-size: 15px; color: var(--color-text);">${tipo}</td></tr>` : ""}
            ${presupuesto ? `<tr><td style="padding: 8px 0; color: #999; font-size: 13px;">Presupuesto</td><td style="padding: 8px 0; font-size: 15px; color: var(--color-text);">${presupuesto}</td></tr>` : ""}
            ${plazo ? `<tr><td style="padding: 8px 0; color: #999; font-size: 13px;">Plazo deseado</td><td style="padding: 8px 0; font-size: 15px; color: var(--color-text);">${plazo}</td></tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 12px; border-left: 4px solid #7BAE9E;">
            <p style="color: #999; font-size: 13px; margin: 0 0 8px;">Descripción del encargo:</p>
            <p style="color: var(--color-text); font-size: 15px; line-height: 1.6; margin: 0;">${descripcion}</p>
          </div>

          <p style="margin-top: 32px; color: #999; font-size: 12px;">Recuerda responder a ${email} en un plazo razonable.</p>
        </div>
      `,
    });

    // Confirmation email to customer
    await resend.emails.send({
      from: "Marina · Azul Mandarino <arte@azulmandarino.com>",
      to: email,
      subject: "He recibido tu encargo — Azul Mandarino",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #FAF7F0; border-radius: 16px;">
          <h1 style="color: #5A9080; font-size: 24px;">¡Hola, ${nombre}! 🌿</h1>
          <p style="color: var(--color-text); font-size: 15px; line-height: 1.7;">He recibido tu solicitud de encargo y me alegra mucho que te guste mi trabajo. Me pondré en contacto contigo en los próximos días para hablar de los detalles.</p>
          <p style="color: var(--color-text); font-size: 15px; line-height: 1.7;">Mientras tanto, si tienes alguna duda puedes escribirme directamente a <a href="mailto:arte@marinadescalzi.es" style="color: #D4755A;">arte@marinadescalzi.es</a>.</p>
          <p style="color: var(--color-text); font-size: 15px; line-height: 1.7; margin-top: 24px;">Con cariño,<br/><strong>Marina</strong><br/><span style="color: #7BAE9E;">Azul Mandarino</span></p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: "Error al enviar el encargo" },
      { status: 500 }
    );
  }
}
