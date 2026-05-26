import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false },
};

export default function PoliticaPrivacidadPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-extralight text-[var(--color-text)] mb-2">
            Política de Privacidad
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">
            Última actualización: mayo de 2025
          </p>

          <div className="space-y-8 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                1. Responsable del tratamiento
              </h2>
              <ul className="space-y-1 list-disc pl-5">
                <li><strong>Identidad:</strong> Marina Descalzi</li>
                <li><strong>NIF:</strong> 47296050T</li>
                <li><strong>Dirección:</strong> Calle Picos de Urbión, 1, Pozuelo de Alarcón, 28224, Madrid</li>
                <li><strong>Email:</strong> <a href="mailto:arte@marinadescalzi.es" className="text-[var(--color-terracota)] hover:underline">arte@marinadescalzi.es</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                2. Finalidades y base jurídica del tratamiento
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-crema-dark)]">
                      <th className="text-left p-3 font-medium">Finalidad</th>
                      <th className="text-left p-3 font-medium">Base jurídica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-arena-light)]">
                    <tr>
                      <td className="p-3">Gestión de pedidos y compras</td>
                      <td className="p-3">Ejecución de contrato (art. 6.1.b RGPD)</td>
                    </tr>
                    <tr>
                      <td className="p-3">Gestión de encargos personalizados</td>
                      <td className="p-3">Ejecución de contrato / Consentimiento</td>
                    </tr>
                    <tr>
                      <td className="p-3">Respuesta a consultas de contacto</td>
                      <td className="p-3">Interés legítimo (art. 6.1.f RGPD)</td>
                    </tr>
                    <tr>
                      <td className="p-3">Cumplimiento de obligaciones legales</td>
                      <td className="p-3">Obligación legal (art. 6.1.c RGPD)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                3. Datos que tratamos
              </h2>
              <p>Según el contexto, podemos tratar:</p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li>Datos identificativos: nombre y apellidos</li>
                <li>Datos de contacto: dirección postal, email y teléfono</li>
                <li>Datos económicos: información de pago (procesada por Stripe, nunca almacenamos datos de tarjeta)</li>
                <li>Datos de navegación: cookies (ver Política de Cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                4. Destinatarios y transferencias internacionales
              </h2>
              <p>
                Tus datos pueden ser comunicados a:
              </p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li><strong>Stripe, Inc.</strong> — pasarela de pago. Datos protegidos por el acuerdo de transferencia estándar UE–EE.UU.</li>
                <li><strong>Transportistas</strong> — para la entrega del pedido</li>
                <li><strong>Administraciones públicas</strong> — cuando lo exija la ley</li>
              </ul>
              <p className="mt-3">No cedemos datos a terceros con fines comerciales.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                5. Plazos de conservación
              </h2>
              <ul className="space-y-1 list-disc pl-5">
                <li>Datos de pedidos: 5 años (obligaciones fiscales)</li>
                <li>Datos de contacto/encargo: hasta 1 año tras el último contacto</li>
                <li>Datos de cookies: ver Política de Cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                6. Tus derechos
              </h2>
              <p>Puedes ejercer en cualquier momento los derechos de:</p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li><strong>Acceso</strong> — saber qué datos tratamos sobre ti</li>
                <li><strong>Rectificación</strong> — corregir datos inexactos</li>
                <li><strong>Supresión</strong> — solicitar el borrado de tus datos</li>
                <li><strong>Limitación</strong> — restringir el tratamiento</li>
                <li><strong>Portabilidad</strong> — recibir tus datos en formato estructurado</li>
                <li><strong>Oposición</strong> — oponerte al tratamiento</li>
              </ul>
              <p className="mt-3">
                Para ejercerlos, escribe a{" "}
                <a href="mailto:arte@marinadescalzi.es" className="text-[var(--color-terracota)] hover:underline">
                  arte@marinadescalzi.es
                </a>{" "}
                indicando el derecho que deseas ejercer y adjuntando copia de tu DNI.
              </p>
              <p className="mt-3">
                También tienes derecho a presentar una reclamación ante la{" "}
                <strong>Agencia Española de Protección de Datos</strong> (
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[var(--color-terracota)] hover:underline">
                  www.aepd.es
                </a>
                ) si consideras que no hemos atendido correctamente tu solicitud.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[var(--color-text)] mb-3">
                7. Medidas de seguridad
              </h2>
              <p>
                Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos: cifrado SSL/TLS, acceso restringido y proveedores que cumplen el RGPD.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
