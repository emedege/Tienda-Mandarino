import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Soy Marina Descalzi, la artesana detrás de Azul Mandarino. Creo joyería artesanal única con resina y arcilla polimérica desde Madrid.",
};

export default function SobreMiPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[var(--color-crema)] to-[var(--color-crema-dark)] border-b border-[var(--color-arena-light)] py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-4">
                La persona detrás de las piezas
              </p>
              <h1 className="font-serif text-5xl font-bold text-[var(--color-text)] mb-6">
                Hola, soy Marina
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-6">
                Soy la artesana y alma de Azul Mandarino. Desde Madrid, creo piezas
                de bisutería artesanal únicas usando resina, arcilla polimérica y
                mi amor por los colores y las texturas.
              </p>
              <a
                href="https://www.instagram.com/azulmandarinoo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-terracota)] font-medium hover:text-[var(--color-terracota-dark)] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                Sígueme en Instagram @azulmandarinoo
              </a>
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto lg:max-w-none">
              <Image
                src="/marina-portrait.jpg"
                alt="Marina Descalzi, creadora de Azul Mandarino"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-6 text-[var(--color-text-muted)] leading-relaxed text-lg">
            <p>
              Todo comenzó con la curiosidad de crear algo con mis propias manos.
              Empecé experimentando con resina —ese material fascinante que te
              permite capturar colores, texturas y elementos naturales dentro de
              una pieza— y me enamoré del proceso desde el primer momento.
            </p>
            <p>
              Después descubrí la arcilla polimérica, y con ella la posibilidad de
              crear formas imposibles, colores imposibles, cosas que no existían
              hasta que yo las hacía. Cada pieza es un pequeño experimento, una
              aventura con el color y la forma.
            </p>
            <p>
              El nombre <strong>Azul Mandarino</strong> nació de dos colores que me
              encantan: el azul —fresco, tranquilo, profundo— y el naranja del
              mandarino —cálido, alegre, lleno de vida. Como mis piezas: una mezcla
              inesperada que de alguna forma funciona a la perfección.
            </p>
            <p>
              Lo que más me importa es que cuando llevas una pieza de Azul
              Mandarino, llevas algo que no existe en ningún otro lugar del mundo.
              Algo hecho a mano, con paciencia y con cariño, solo para ti.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: "100%", label: "Hecho a mano" },
              { number: "Único", label: "Cada pieza es irrepetible" },
              { number: "Madrid", label: "Fabricado en España" },
            ].map(({ number, label }) => (
              <div key={label} className="bg-[var(--color-crema-dark)] rounded-2xl p-6">
                <p className="font-serif text-3xl font-bold text-[var(--color-salvia-dark)] mb-1">
                  {number}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-serif text-2xl text-[var(--color-text)] mb-6">
              ¿Te apetece ver mis creaciones?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 bg-[var(--color-salvia-dark)] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia)] transition-colors"
              >
                Ir a la tienda
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/encargo"
                className="inline-flex items-center gap-2 border-2 border-[var(--color-salvia-dark)] text-[var(--color-salvia-dark)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia-dark)] hover:text-white transition-colors"
              >
                Hacer un encargo
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
