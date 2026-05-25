"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { getProductBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { ShoppingBag, ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";

function ProductDetailContent({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Awaited<ReturnType<typeof getProductBySlug>>>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    getProductBySlug(slug).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-salvia)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    notFound();
    return null;
  }

  const images = product.images || [];
  const imageUrl = (img: (typeof images)[0]) =>
    urlFor(img).width(800).height(800).url();

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: images[0] ? imageUrl(images[0]) : "/placeholder-product.jpg",
      slug: product.slug.current,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = async () => {
    setBuyingNow(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: product._id, name: product.name, price: product.price, image: images[0] ? imageUrl(images[0]) : "" }],
        }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setBuyingNow(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images[0] ? imageUrl(images[0]) : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      seller: { "@type": "Organization", name: "Azul Mandarino" },
    },
    brand: { "@type": "Brand", name: "Azul Mandarino" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back */}
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1 text-sm text-[#2D2D2D]/60 hover:text-[var(--color-terracota)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la tienda
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[var(--color-crema-dark)] shadow-lg">
                {images.length > 0 ? (
                  <Image
                    src={imageUrl(images[activeImage])}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2D2D2D]/30">
                    Sin imagen
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl">
                    <span className="bg-white/90 text-[#2D2D2D] font-medium px-6 py-2 rounded-full">
                      Vendida
                    </span>
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((i) => Math.max(0, i - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition-colors"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImage((i) => Math.min(images.length - 1, i + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white transition-colors"
                      aria-label="Foto siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {images.map((img, i) => (
                    <button
                      key={img._key}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                        i === activeImage
                          ? "border-[var(--color-salvia-dark)]"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={urlFor(img).width(100).height(100).url()}
                        alt={`${product.name} foto ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-2">
                {product.category?.title}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[var(--color-salvia-dark)] mb-6">
                {product.price.toFixed(2)} €
              </p>
              <p className="text-[#2D2D2D]/70 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Materials */}
              {product.materials?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#2D2D2D] mb-2">
                    Materiales:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((m) => (
                      <span
                        key={m}
                        className="text-xs bg-[var(--color-crema-dark)] px-3 py-1.5 rounded-full text-[#2D2D2D]/70"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {(product.dimensions || product.weight) && (
                <div className="mb-6 flex gap-6 text-sm text-[#2D2D2D]/60">
                  {product.dimensions && <span>📏 {product.dimensions}</span>}
                  {product.weight && <span>⚖️ {product.weight}</span>}
                </div>
              )}

              {/* CTA */}
              {product.inStock ? (
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all ${
                      added
                        ? "bg-green-500 text-white"
                        : "border-2 border-[var(--color-salvia-dark)] text-[var(--color-salvia-dark)] hover:bg-[var(--color-salvia-dark)] hover:text-white"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" /> Añadida al carrito
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Añadir al carrito
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={buyingNow}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium bg-[var(--color-salvia-dark)] text-white hover:bg-[var(--color-salvia)] transition-colors disabled:opacity-50"
                  >
                    {buyingNow ? "Procesando..." : "Comprar ahora"}
                  </button>
                </div>
              ) : (
                <div className="mt-2 p-4 rounded-2xl bg-[var(--color-crema-dark)] text-center">
                  <p className="text-[#2D2D2D]/60 text-sm mb-3">
                    Esta pieza ya está vendida. Cada joya es única, pero puedes
                    pedirme algo similar.
                  </p>
                  <Link
                    href="/encargo"
                    className="inline-block text-sm font-medium text-[var(--color-terracota)] hover:underline"
                  >
                    Solicitar encargo personalizado →
                  </Link>
                </div>
              )}

              {/* Trust */}
              <div className="mt-8 pt-6 border-t border-[var(--color-arena-light)] space-y-2 text-sm text-[#2D2D2D]/60">
                <p>✓ Pieza artesanal única e irrepetible</p>
                <p>✓ Envío a toda España · packaging cuidado</p>
                <p>
                  ✓{" "}
                  <Link
                    href="/politica-devoluciones"
                    className="underline hover:text-[var(--color-terracota)] transition-colors"
                  >
                    14 días de devolución
                  </Link>
                </p>
                <p>✓ Pago seguro con Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return (
      <CartProvider>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--color-salvia)] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </CartProvider>
    );
  }

  return (
    <CartProvider>
      <Navbar />
      <ProductDetailContent slug={slug} />
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
