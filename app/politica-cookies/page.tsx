import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: false },
};

export default function PoliticaCookiesPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-extralight text-[var(--color-text)] mb-2">
            Política de Cookies
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">
            Última actualización: mayo de 2025
          </p>

          <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas
                un sitio web. Nos ayudan a recordar tus preferencias y a mejorar tu experiencia de navegación.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                Cookies que utilizamos
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-crema-dark)]">
                      <th className="text-left p-3 font-medium">Cookie</th>
                      <th className="text-left p-3 font-medium">Tipo</th>
                      <th className="text-left p-3 font-medium">Finalidad</th>
                      <th className="text-left p-3 font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-arena-light)]">
                    <tr>
                      <td className="p-3 font-mono text-xs">am-cart</td>
                      <td className="p-3">Técnica</td>
                      <td className="p-3">Guarda los artículos del carrito de compra</td>
                      <td className="p-3">Sesión / localStorage</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-xs">cookie-consent</td>
                      <td className="p-3">Técnica</td>
                      <td className="p-3">Recuerda tu decisión sobre las cookies</td>
                      <td className="p-3">1 año / localStorage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm bg-[var(--color-crema-dark)] p-4 rounded-xl">
                <strong>Nota:</strong> Actualmente solo usamos cookies técnicas estrictamente necesarias.
                No utilizamos cookies de rastreo, publicidad o análisis de terceros.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                Cómo gestionar las cookies
              </h2>
              <p>
                Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que
                deshabilitar las cookies técnicas puede afectar al funcionamiento del carrito de compra.
              </p>
              <ul className="mt-3 space-y-1 list-disc pl-5 text-sm">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[var(--color-terracota)] hover:underline">
                    Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noopener noreferrer" className="text-[var(--color-terracota)] hover:underline">
                    Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[var(--color-terracota)] hover:underline">
                    Safari
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                Contacto
              </h2>
              <p>
                Para cualquier consulta sobre nuestra política de cookies:{" "}
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
