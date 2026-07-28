import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: false },
};

export default function AvisoLegalPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-extralight text-[var(--color-text)] mb-2">
            Aviso Legal
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">
            Última actualización: mayo de 2025
          </p>

          <div className="prose prose-stone max-w-none space-y-8 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                1. Datos identificativos del titular
              </h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de
                julio, de Servicios de la Sociedad de la Información y del
                Comercio Electrónico (LSSICE), se informa:
              </p>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>
                  <strong>Titular:</strong> F. Rodríguez
                </li>
                <li>
                  <strong>Nombre comercial:</strong> Azul Mandarino (Marina Descalzi)
                </li>
                <li>
                  <strong>NIF:</strong> 50887688G
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:arte@marinadescalzi.es"
                    className="text-[var(--color-terracota)] hover:underline"
                  >
                    arte@marinadescalzi.es
                  </a>
                </li>
                <li>
                  <strong>Web:</strong> azulmandarino.com
                </li>
                <li>
                  <strong>Actividad:</strong> Comercialización de bisutería
                  artesanal
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                2. Objeto y ámbito de aplicación
              </h2>
              <p>
                Este Aviso Legal regula el acceso y uso del sitio web
                azulmandarino.com (en adelante, «el Sitio»). El acceso al Sitio
                implica la aceptación plena de las condiciones aquí establecidas.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                3. Propiedad intelectual e industrial
              </h2>
              <p>
                Todos los contenidos del Sitio —textos, imágenes, fotografías,
                diseños, logotipos y cualquier otro elemento— son propiedad de
                Marina Descalzi o se usan bajo licencia, y están protegidos por
                la legislación española e internacional de propiedad intelectual
                e industrial.
              </p>
              <p className="mt-3">
                Queda expresamente prohibida su reproducción, distribución,
                comunicación pública o transformación sin autorización escrita
                previa de la titular.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                4. Exclusión de responsabilidad
              </h2>
              <p>
                Marina Descalzi no garantiza la disponibilidad continua del Sitio
                ni la ausencia de errores en el contenido, si bien pondrá los
                medios razonables para evitarlos. La titular no se hace
                responsable de los daños derivados de un uso incorrecto del Sitio
                o de la interrupción del servicio por causas ajenas a su control.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                5. Legislación aplicable y jurisdicción
              </h2>
              <p>
                Las relaciones entre el usuario y la titular se rigen por la
                normativa española vigente. Para cualquier controversia, ambas
                partes se someten a los Juzgados y Tribunales de Madrid, con
                renuncia expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                6. Modificaciones
              </h2>
              <p>
                La titular se reserva el derecho de modificar el presente Aviso
                Legal en cualquier momento. Se recomienda revisarlo periódicamente.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
