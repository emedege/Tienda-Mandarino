import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import ProductCard from "@/components/shop/ProductCard";
import { CartProvider } from "@/contexts/CartContext";
import { getAllProducts, getAllCategories } from "@/lib/sanity/queries";
import ShopFilters from "@/components/shop/ShopFilters";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Descubre nuestra colección de joyería artesanal única: pendientes, pulseras, anillos, collares y broches de resina y arcilla polimérica. Cada pieza es irrepetible.",
};

export const revalidate = 60;

interface ShopPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { categoria } = await searchParams;
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];

  try {
    [products, categories] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
    ]);
  } catch {
    // Sanity not configured yet
  }

  const filtered = categoria
    ? products.filter((p) => p.category?.slug?.current === categoria)
    : products;

  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-crema)]">
        {/* Header */}
        <div className="bg-[var(--color-crema-dark)] border-b border-[var(--color-arena-light)] py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-2">
              Joyería Artesanal
            </p>
            <h1 className="font-serif text-4xl font-bold text-[var(--color-text)]">
              Tienda
            </h1>
            <p className="mt-2 text-[var(--color-text-muted)] text-sm">
              {filtered.length} pieza{filtered.length !== 1 ? "s" : ""} —{" "}
              {filtered.filter((p) => p.inStock).length} disponible
              {filtered.filter((p) => p.inStock).length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <Suspense>
            <ShopFilters categories={categories} active={categoria} />
          </Suspense>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-20 text-center text-[var(--color-text-muted)]">
              <p className="font-serif text-2xl mb-3">Próximamente</p>
              <p className="text-sm">
                {categoria
                  ? "No hay piezas en esta categoría todavía."
                  : "Las primeras piezas estarán disponibles muy pronto."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
