import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
        <section className="bg-[var(--color-crema-dark)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="flex flex-col justify-center py-20 lg:pr-16 order-2 lg:order-1">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-6">
                La persona detrás de las piezas
              </p>
              <h1 className="text-6xl font-extralight text-[var(--color-text)] mb-8 leading-tight">
                Hola,<br />soy Marina
              </h1>
              <p className="text-base font-light text-[var(--color-text-muted)] leading-relaxed mb-6 max-w-sm">
                Soy la artesana y alma de Azul Mandarino. Desde Madrid, creo piezas
                de bisutería artesanal únicas usando resina, arcilla polimérica y
                mi amor por los colores y las texturas.
              </p>
              <a
                href="https://www.instagram.com/azulmandarinoo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors w-fit"
              >
                @azulmandarinoo
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[560px] bg-[var(--color-border)] order-1 lg:order-2">
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
        </section>

        {/* Story */}
        <section className="py-24 bg-[var(--color-crema)]">
          <div className="max-w-2xl mx-auto px-6 lg:px-12">
            <div className="space-y-6 text-base font-light text-[var(--color-text-muted)] leading-relaxed">
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
                El nombre <strong className="font-medium text-[var(--color-text)]">Azul Mandarino</strong> nació de dos colores que me
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

            {/* Stats */}
            <div className="mt-20 grid grid-cols-3 gap-0 border border-[var(--color-border)]">
              {[
                { number: "100%", label: "Hecho a mano" },
                { number: "Único", label: "Cada pieza" },
                { number: "Madrid", label: "España" },
              ].map(({ number, label }, i) => (
                <div key={label} className={`p-8 text-center ${i < 2 ? "border-r border-[var(--color-border)]" : ""}`}>
                  <p className="text-2xl font-extralight text-[var(--color-accent)] mb-1">{number}</p>
                  <p className="text-xs font-medium text-[var(--color-text-muted)]">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-20 flex flex-wrap gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-3 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-3 text-sm font-medium tracking-wide hover:bg-[var(--color-accent)] transition-colors"
              >
                Ver la tienda
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/encargo"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Hacer un encargo
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
