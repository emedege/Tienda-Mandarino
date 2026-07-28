import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";
import { getProductBySlug } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch {
    //
  }
  if (!product) return { title: "Pieza no encontrada" };

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(1200).url()
    : undefined;

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/tienda/${slug}` },
    openGraph: {
      title: `${product.name} | Azul Mandarino`,
      description: product.description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 1200, alt: product.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Azul Mandarino`,
      description: product.description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <CartProvider>
      <Navbar />
      <ProductDetailClient slug={slug} />
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
