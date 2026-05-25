import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import ProductCard from "@/components/shop/ProductCard";
import { CartProvider } from "@/contexts/CartContext";
import { getFeaturedProducts } from "@/lib/sanity/queries";
import { ArrowRight, Star, Truck, RefreshCw, Heart } from "lucide-react";

export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch {
    // Sanity not yet configured — show empty state
  }

  return (
    <CartProvider>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[var(--color-crema)] via-[var(--color-crema-dark)] to-[var(--color-salvia-light)]/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-4">
                Joyería Artesanal · Cada pieza es única
              </p>
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light leading-[1.1] tracking-wide text-[var(--color-text)] mb-6">
                Hecha a mano,
                <br />
                <span className="text-[var(--color-salvia-dark)] italic">
                  pensada para ti
                </span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-md">
                Bisutería artesanal creada con resina y arcilla polimérica.
                Piezas irrepetibles que cuentan una historia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 bg-[var(--color-salvia-dark)] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia)] transition-colors"
                >
                  Ver la tienda
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/encargo"
                  className="inline-flex items-center gap-2 border-2 border-[var(--color-salvia-dark)] text-[var(--color-salvia-dark)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia-dark)] hover:text-white transition-colors"
                >
                  Encargo personalizado
                </Link>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-[var(--color-salvia-light)]/30 rounded-[40px] rotate-3" />
              <div className="relative rounded-[40px] overflow-hidden aspect-square shadow-2xl">
                <Image
                  src="/hero-image.jpg"
                  alt="Joyería artesanal Azul Mandarino"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-14 bg-[var(--color-salvia-dark)] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: Star,
                  title: "Piezas únicas",
                  desc: "Cada joya es irrepetible. Una vez vendida, no se reproduce.",
                },
                {
                  icon: Truck,
                  title: "Envío a España",
                  desc: "Enviamos con cuidado en packaging especial.",
                },
                {
                  icon: Heart,
                  title: "Hecha a mano",
                  desc: "Elaboradas con resina, arcilla polimérica y materiales de calidad.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed max-w-xs">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-20 bg-[var(--color-crema)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-3">
                Novedades
              </p>
              <h2 className="font-serif text-4xl font-bold text-[var(--color-text)]">
                Piezas destacadas
              </h2>
            </div>

            {featuredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <Link
                    href="/tienda"
                    className="inline-flex items-center gap-2 border-2 border-[var(--color-salvia-dark)] text-[var(--color-salvia-dark)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-salvia-dark)] hover:text-white transition-colors"
                  >
                    Ver toda la tienda
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-[var(--color-text-muted)]">
                <p className="font-serif text-xl mb-2">Próximamente</p>
                <p className="text-sm">
                  Las primeras piezas estarán disponibles muy pronto.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ABOUT SNIPPET */}
        <section className="py-20 bg-[var(--color-crema-dark)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/about-image.jpg"
                alt="Marina Descalzi, creadora de Azul Mandarino"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-4">
                La artesana
              </p>
              <h2 className="font-serif text-4xl font-bold text-[var(--color-text)] mb-6">
                Hola, soy Marina
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                Detrás de cada pieza de Azul Mandarino hay horas de trabajo,
                amor por los detalles y la magia de los materiales. Trabajo con
                resina y arcilla polimérica para crear joyas que no encontrarás
                en ningún otro lugar.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
                Cada pieza nace de forma intuitiva, siguiendo los colores y
                texturas que me inspiran en cada momento.
              </p>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 text-[var(--color-salvia-dark)] font-medium hover:gap-3 transition-all"
              >
                Conoce mi historia
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CUSTOM ORDER CTA */}
        <section className="py-20 bg-[var(--color-terracota)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70 mb-4">
              ¿Tienes algo en mente?
            </p>
            <h2 className="font-serif text-4xl font-bold mb-6">
              Encargo personalizado
            </h2>
            <p className="text-lg text-white/85 leading-relaxed mb-8">
              Si tienes una idea especial o quieres una pieza exclusiva hecha
              para ti, escríbeme. Me encanta trabajar en proyectos únicos.
            </p>
            <Link
              href="/encargo"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-terracota)] px-8 py-3.5 rounded-full font-semibold hover:bg-[var(--color-crema)] transition-colors"
            >
              Solicitar encargo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="py-16 bg-[var(--color-crema)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-serif text-2xl text-[var(--color-text)] mb-2">
              Sígueme en Instagram
            </p>
            <a
              href="https://www.instagram.com/azulmandarinoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-terracota)] font-medium hover:text-[var(--color-terracota-dark)] transition-colors"
            >
              @azulmandarinoo
            </a>
          </div>
        </section>

        {/* RETURNS */}
        <section className="py-10 bg-[var(--color-crema-dark)] border-t border-[var(--color-arena-light)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <RefreshCw className="w-5 h-5 text-[var(--color-salvia)]" />
              <span>
                14 días de devolución ·{" "}
                <Link
                  href="/politica-devoluciones"
                  className="underline hover:text-[var(--color-terracota)] transition-colors"
                >
                  Ver política
                </Link>
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <Truck className="w-5 h-5 text-[var(--color-salvia)]" />
              <span>Envíos a toda España</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
