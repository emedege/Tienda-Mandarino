import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";
import { getAllBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog · Lookbook",
  description:
    "Inspiración, novedades y el proceso creativo detrás de Azul Mandarino. Descubre el mundo de la joyería artesanal.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];
  try {
    posts = await getAllBlogPosts();
  } catch {
    // Sanity not configured
  }

  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="bg-[var(--color-crema-dark)] border-b border-[var(--color-arena-light)] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-3">
              Inspiración
            </p>
            <h1 className="font-serif text-4xl font-bold text-[var(--color-text)]">
              Blog & Lookbook
            </h1>
            <p className="mt-3 text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
              El proceso creativo, novedades, inspiración y todo lo que rodea el
              mundo de Azul Mandarino.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const imageUrl = post.mainImage
                  ? urlFor(post.mainImage).width(600).height(400).url()
                  : null;
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[var(--color-arena-light)]"
                  >
                    {imageUrl && (
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">
                        {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <h2 className="font-serif text-lg font-bold text-[var(--color-text)] mb-2 line-clamp-2 group-hover:text-[var(--color-terracota)] transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-salvia-dark)] group-hover:gap-2 transition-all">
                        Leer más <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-[var(--color-text-muted)]">
              <p className="font-serif text-2xl mb-3">Próximamente</p>
              <p className="text-sm">
                Pronto publicaré mis primeras entradas de blog con el proceso
                creativo y novedades.
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
