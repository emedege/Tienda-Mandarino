import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos todas tus dudas sobre envíos, materiales, encargos y devoluciones de Azul Mandarino.",
};

const faqs = [
  {
    category: "Productos",
    items: [
      {
        q: "¿Las piezas son realmente únicas?",
        a: "Sí, absolutamente. Cada pieza de Azul Mandarino se crea una sola vez. Una vez vendida, no se repite nunca. No hay dos iguales.",
      },
      {
        q: "¿De qué materiales están hechas las joyas?",
        a: "Trabajo principalmente con resina epóxica y arcilla polimérica, junto con herrajes de acero inoxidable, metal dorado o plateado. En cada ficha de producto encontrarás los materiales exactos de esa pieza.",
      },
      {
        q: "¿Las piezas son aptas para pieles sensibles?",
        a: "Los herrajes que uso son de acero inoxidable o latón sin níquel, que son los más seguros. De todas formas, si tienes alergia muy específica, consúltame antes de comprar.",
      },
      {
        q: "¿Cómo cuido mis joyas?",
        a: "Evita el contacto con agua, perfumes, cremas y productos químicos. Guárdalas en una cajita o bolsita cuando no las uses. Límpialas con un paño suave y seco.",
      },
    ],
  },
  {
    category: "Envíos",
    items: [
      {
        q: "¿A dónde enviáis?",
        a: "Enviamos a toda España: Península, Baleares, Canarias, Ceuta y Melilla.",
      },
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: "El plazo habitual es de 3 a 7 días hábiles para Península y Baleares. Para Canarias, Ceuta y Melilla puede ser de 5 a 15 días hábiles.",
      },
      {
        q: "¿Cómo va embalado el pedido?",
        a: "Con mucho mimo. Cada pieza va en su cajita o bolsita de Azul Mandarino, protegida para que llegue perfecta.",
      },
      {
        q: "¿Puedo seguir mi pedido?",
        a: "Sí. Una vez enviado, te mando el número de seguimiento por email para que puedas saber dónde está en cada momento.",
      },
    ],
  },
  {
    category: "Pagos",
    items: [
      {
        q: "¿Qué formas de pago aceptáis?",
        a: "Aceptamos pago con tarjeta (Visa, Mastercard, Amex) a través de Stripe, y transferencia bancaria.",
      },
      {
        q: "¿Es seguro pagar en vuestra web?",
        a: "Sí. El pago con tarjeta se procesa a través de Stripe, con cifrado SSL. Nunca almacenamos datos de tu tarjeta.",
      },
    ],
  },
  {
    category: "Devoluciones",
    items: [
      {
        q: "¿Puedo devolver mi pedido?",
        a: "Sí. Tienes 14 días naturales desde la recepción para ejercer tu derecho de desistimiento. El artículo debe estar en perfecto estado y sin uso.",
      },
      {
        q: "¿Quién paga los gastos de devolución?",
        a: "Los gastos de devolución corren a cargo del cliente, salvo que la pieza llegue defectuosa o sea un error nuestro.",
      },
      {
        q: "¿Se pueden devolver los encargos personalizados?",
        a: "No. Los encargos hechos a medida están excluidos del derecho de desistimiento por ser productos personalizados.",
      },
    ],
  },
  {
    category: "Encargos personalizados",
    items: [
      {
        q: "¿Puedo pedir una pieza personalizada?",
        a: "Sí. Rellena el formulario de encargo personalizado y hablamos de tu idea.",
      },
      {
        q: "¿Cuánto tarda un encargo personalizado?",
        a: "Depende de la complejidad. Suele ser de 1 a 3 semanas una vez confirmados los detalles.",
      },
      {
        q: "¿Cuánto cuesta un encargo personalizado?",
        a: "El precio varía según la pieza. Cuéntame tu idea y te hago un presupuesto sin compromiso.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">

        {/* Header */}
        <div className="bg-[var(--color-crema-dark)] border-b border-[var(--color-border)] py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-4">
              Dudas frecuentes
            </p>
            <h1 className="text-5xl font-extralight text-[var(--color-text)]">
              Preguntas frecuentes
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-20 space-y-16">
          {faqs.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-xs font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-8 pb-4 border-b border-[var(--color-border)]">
                {category}
              </h2>
              <div className="space-y-8">
                {items.map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-base font-medium text-[var(--color-text)] mb-2">{q}</h3>
                    <p className="text-sm font-light text-[var(--color-text-muted)] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="border border-[var(--color-border)] p-10 text-center bg-[var(--color-crema-dark)]">
            <p className="text-xl font-extralight text-[var(--color-text)] mb-2">
              ¿No encuentras tu respuesta?
            </p>
            <p className="text-sm font-light text-[var(--color-text-muted)] mb-6">
              Escríbeme directamente y te respondo lo antes posible.
            </p>
            <a
              href="mailto:arte@marinadescalzi.es"
              className="inline-flex items-center gap-2 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-3 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
            >
              arte@marinadescalzi.es
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
