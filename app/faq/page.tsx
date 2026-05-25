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
        a: "El plazo habitual es de 3 a 7 días hábiles para Península y Baleares. Para Canarias, Ceuta y Melilla puede ser de 5 a 15 días hábiles. En todo caso, nunca más de 30 días naturales.",
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
        a: "Aceptamos pago con tarjeta (Visa, Mastercard, Amex) a través de Stripe, y transferencia bancaria. Puedes elegir al finalizar la compra.",
      },
      {
        q: "¿Es seguro pagar en vuestra web?",
        a: "Sí. El pago con tarjeta se procesa a través de Stripe, una de las pasarelas de pago más seguras del mundo, con cifrado SSL. Nunca almacenamos datos de tu tarjeta.",
      },
    ],
  },
  {
    category: "Devoluciones",
    items: [
      {
        q: "¿Puedo devolver mi pedido?",
        a: "Sí. Tienes 14 días naturales desde la recepción para ejercer tu derecho de desistimiento, sin necesidad de dar explicaciones. El artículo debe estar en perfecto estado y sin uso.",
      },
      {
        q: "¿Quién paga los gastos de devolución?",
        a: "Los gastos de devolución corren a cargo del cliente, salvo que la pieza llegue defectuosa o sea un error nuestro.",
      },
      {
        q: "¿Se pueden devolver los encargos personalizados?",
        a: "No. Los encargos hechos a medida y según tus especificaciones están excluidos del derecho de desistimiento según la ley, al ser productos personalizados.",
      },
    ],
  },
  {
    category: "Encargos personalizados",
    items: [
      {
        q: "¿Puedo pedir una pieza personalizada?",
        a: "¡Por supuesto! Es algo que me encanta hacer. Rellena el formulario de encargo personalizado y hablamos de tu idea.",
      },
      {
        q: "¿Cuánto tarda un encargo personalizado?",
        a: "Depende de la complejidad de la pieza. Una vez que hablemos de los detalles, te daré un plazo estimado. Suele ser de 1 a 3 semanas.",
      },
      {
        q: "¿Cuánto cuesta un encargo personalizado?",
        a: "El precio varía según la pieza. Sin compromiso, cuéntame tu idea a través del formulario y te hago un presupuesto.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="bg-[var(--color-crema-dark)] border-b border-[var(--color-arena-light)] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-3">
              Resolvemos tus dudas
            </p>
            <h1 className="font-serif text-4xl font-bold text-[var(--color-text)]">
              Preguntas frecuentes
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          {faqs.map(({ category, items }) => (
            <div key={category}>
              <h2 className="font-serif text-2xl font-bold text-[var(--color-salvia-dark)] mb-6 pb-3 border-b border-[var(--color-arena-light)]">
                {category}
              </h2>
              <div className="space-y-6">
                {items.map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="font-medium text-[var(--color-text)] mb-2">{q}</h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-[var(--color-terracota)]/10 rounded-2xl p-8 text-center border border-[var(--color-terracota)]/20">
            <p className="font-serif text-xl text-[var(--color-text)] mb-2">
              ¿No encuentras tu respuesta?
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Escríbeme directamente y te respondo lo antes posible.
            </p>
            <a
              href="mailto:arte@marinadescalzi.es"
              className="inline-flex items-center gap-2 bg-[var(--color-terracota)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--color-terracota-dark)] transition-colors"
            >
              Contactar por email
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
