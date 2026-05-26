import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import ProductCard from "@/components/shop/ProductCard";
import { CartProvider } from "@/contexts/CartContext";
import { getFeaturedProducts } from "@/lib/sanity/queries";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch {
    // Sanity not yet configured
  }

  return (
    <CartProvider>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="min-h-[92vh] bg-[var(--color-crema)] flex flex-col">
          <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-0 items-center py-16">

            {/* Text */}
            <div className="order-2 lg:order-1">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-10">
                Bisutería artesanal · Madrid
              </p>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-extralight leading-[0.95] tracking-tight text-[var(--color-text)] mb-8">
                Cada pieza<br />
                <em className="not-italic text-[var(--color-accent)]">es única.</em>
              </h1>
              <p className="text-base font-light text-[var(--color-text-muted)] leading-relaxed max-w-xs mb-12">
                Pendientes, pulseras y collares hechos a mano con resina y arcilla polimérica. Irrepetibles.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-3 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-3 text-sm font-medium tracking-wide hover:bg-[var(--color-accent)] transition-colors"
                >
                  Ver la tienda
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/encargo"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors group"
                >
                  Encargo personalizado
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none overflow-hidden bg-[var(--color-crema-dark)]">
                <Image
                  src="/hero-image.jpg"
                  alt="Joyería artesanal Azul Mandarino"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center justify-center pb-8 gap-3">
            <div className="w-px h-10 bg-[var(--color-border)]" />
          </div>
        </section>

        {/* ── STRIP ── */}
        <section className="bg-[var(--color-dark)] text-[var(--color-crema)] py-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-2 text-[11px] font-medium tracking-[0.14em]">
              <span>Envío a España</span>
              <span className="text-[var(--color-accent)]">·</span>
              <span>Piezas únicas e irrepetibles</span>
              <span className="text-[var(--color-accent)]">·</span>
              <span>Materiales de calidad</span>
              <span className="text-[var(--color-accent)]">·</span>
              <span>14 días de devolución</span>
            </div>
          </div>
        </section>

        {/* ── PRODUCTOS DESTACADOS ── */}
        <section className="py-24 bg-[var(--color-crema)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-3">
                  Colección
                </p>
                <h2 className="text-5xl font-extralight text-[var(--color-text)]">
                  Piezas destacadas
                </h2>
              </div>
              <Link
                href="/tienda"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors group"
              >
                Ver todas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-[var(--color-border)] bg-[var(--color-crema-dark)]">
                <p className="text-3xl font-extralight text-[var(--color-text)] mb-2">Próximamente</p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Las primeras piezas estarán disponibles muy pronto.
                </p>
              </div>
            )}

            <div className="mt-6 sm:hidden text-center">
              <Link href="/tienda" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                Ver todas las piezas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SOBRE MÍ ── */}
        <section className="bg-[var(--color-crema-dark)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] bg-[var(--color-border)]">
              <Image
                src="/about-image.jpg"
                alt="Marina Descalzi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-0 lg:px-16 py-16">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-6">
                La artesana
              </p>
              <h2 className="text-5xl font-extralight text-[var(--color-text)] mb-6 leading-tight">
                Hola,<br />soy Marina
              </h2>
              <p className="text-sm font-light text-[var(--color-text-muted)] leading-relaxed mb-3">
                Detrás de cada pieza de Azul Mandarino hay horas de trabajo, amor por los detalles y la magia de los materiales.
              </p>
              <p className="text-sm font-light text-[var(--color-text-muted)] leading-relaxed mb-10">
                Trabajo con resina y arcilla polimérica para crear joyas que no encontrarás en ningún otro lugar.
              </p>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors group w-fit"
              >
                Conoce mi historia
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── ENCARGO ── */}
        <section className="bg-[var(--color-dark)] py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--color-accent)] mb-6">
                ¿Tienes algo en mente?
              </p>
              <h2 className="text-5xl font-extralight text-[var(--color-crema)] mb-6 leading-tight">
                Una pieza<br />solo para ti
              </h2>
              <p className="text-sm font-light text-[var(--color-crema)]/60 leading-relaxed max-w-sm">
                Si tienes una idea especial, escríbeme. Me encanta trabajar en proyectos únicos y dar vida a tu visión.
              </p>
            </div>
            <div>
              <Link
                href="/encargo"
                className="inline-flex items-center gap-3 border border-[var(--color-crema)]/20 text-[var(--color-crema)] px-10 py-4 text-sm font-medium tracking-wide hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              >
                Solicitar encargo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── INSTAGRAM ── */}
        <section className="py-16 bg-[var(--color-crema)] border-b border-[var(--color-border-light)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-light text-[var(--color-text-muted)]">
              Sígueme en Instagram para ver el proceso
            </p>
            <a
              href="https://www.instagram.com/azulmandarinoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              @azulmandarinoo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
