import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";
import { getBlogPostBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    //
  }
  if (!post) return { title: "Post no encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post = null;
  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    //
  }
  if (!post) notFound();

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null;

  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        {imageUrl && (
          <div className="relative h-64 sm:h-96 w-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-[#2D2D2D]/60 hover:text-[var(--color-terracota)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          <p className="text-xs text-[#2D2D2D]/40 mb-4">
            {new Date(post.publishedAt).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <h1 className="font-serif text-4xl font-bold text-[#2D2D2D] mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-[#2D2D2D]/70 leading-relaxed mb-8 border-l-4 border-[var(--color-salvia)] pl-4">
              {post.excerpt}
            </p>
          )}

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-[var(--color-crema-dark)] px-3 py-1 rounded-full text-[#2D2D2D]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-stone max-w-none text-[#2D2D2D]/80 leading-relaxed">
            <p className="text-[#2D2D2D]/50 italic">
              [Contenido del artículo — se renderiza desde Sanity CMS]
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
