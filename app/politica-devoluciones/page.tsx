import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Política de Devoluciones y Envíos",
  robots: { index: false },
};

export default function PoliticaDevolucionesPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-text)] mb-2">
            Política de Devoluciones y Envíos
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">
            Última actualización: mayo de 2025
          </p>

          <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-semibold text-[var(--color-text)] mb-3">
                1. Envíos
              </h2>
              <h3 className="font-medium text-[var(--color-text)] mb-2">Ámbito geográfico</h3>
              <p>Realizamos envíos a toda España (Península, Baleares, Canarias, Ceuta y Melilla).</p>

              <h3 className="font-medium text-[var(--color-text)] mt-4 mb-2">Plazos de entrega</h3>
              <p>
                De conformidad con el artículo 18.1 del Real Decreto Legislativo 1/2007 (TRLGDCU), el pedido
                se entregará en el plazo mínimo operativamente posible y, en todo caso, en un máximo de
                <strong> 30 días naturales</strong> desde la confirmación del pedido, salvo comunicación expresa de demora.
              </p>
              <p className="mt-2">
                El plazo habitual estimado es de <strong>3 a 7 días hábiles</strong> para Península y
                Baleares, y de <strong>5 a 15 días hábiles</strong> para Canarias, Ceuta y Melilla, sujeto a disponibilidad
                de transportistas.
              </p>

              <h3 className="font-medium text-[var(--color-text)] mt-4 mb-2">Costes de envío</h3>
              <p>Los costes de envío se muestran detallados durante el proceso de compra antes de confirmar el pedido.</p>

              <h3 className="font-medium text-[var(--color-text)] mt-4 mb-2">Packaging</h3>
              <p>
                Todas las piezas se envían cuidadosamente embaladas en packaging especial de Azul Mandarino para
                garantizar su protección durante el transporte.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-[var(--color-text)] mb-3">
                2. Derecho de desistimiento
              </h2>
              <p>
                De acuerdo con el artículo 102 del TRLGDCU, tienes derecho a desistir del contrato
                en un plazo de <strong>14 días naturales</strong> desde la recepción del pedido, sin necesidad
                de justificación.
              </p>

              <h3 className="font-medium text-[var(--color-text)] mt-4 mb-2">Cómo ejercer el desistimiento</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Escríbenos a{" "}
                  <a href="mailto:arte@marinadescalzi.es" className="text-[var(--color-terracota)] hover:underline">
                    arte@marinadescalzi.es
                  </a>{" "}
                  antes de que expire el plazo de 14 días indicando el número de pedido y tu deseo de desistir.
                </li>
                <li>Te indicaremos la dirección de devolución.</li>
                <li>Devuelve el producto en su estado original y embalaje adecuado.</li>
              </ol>

              <h3 className="font-medium text-[var(--color-text)] mt-4 mb-2">Condiciones de la devolución</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>El artículo debe devolverse en perfecto estado, sin uso y con su embalaje original.</li>
                <li>Los gastos de devolución corren a cargo del consumidor, salvo que el producto esté defectuoso.</li>
                <li>El reembolso se realizará en un plazo máximo de 14 días desde la recepción de la devolución, usando el mismo método de pago.</li>
              </ul>

              <h3 className="font-medium text-[var(--color-text)] mt-4 mb-2">Excepciones al derecho de desistimiento</h3>
              <p>
                Conforme al artículo 103.c del TRLGDCU, <strong>no aplica el derecho de desistimiento</strong> en
                encargos personalizados fabricados según las especificaciones del consumidor, por tratarse de
                productos claramente personalizados.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-[var(--color-text)] mb-3">
                3. Garantía legal
              </h2>
              <p>
                Todos los productos están sujetos a la garantía legal de 3 años establecida en el TRLGDCU para
                bienes de consumo. Si recibes un producto defectuoso o distinto al pedido, contáctanos en
                el plazo de 2 meses desde que detectes el defecto.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-[var(--color-text)] mb-3">
                4. Resolución de disputas
              </h2>
              <p>
                La Comisión Europea pone a disposición de los consumidores la plataforma de Resolución de
                Litigios en Línea (ODR):{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-terracota)] hover:underline"
                >
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-[var(--color-text)] mb-3">
                5. Contacto
              </h2>
              <p>
                Para cualquier consulta sobre devoluciones o envíos:{" "}
                <a href="mailto:arte@marinadescalzi.es" className="text-[var(--color-terracota)] hover:underline">
                  arte@marinadescalzi.es
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
