import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(600).height(600).url()
    : "/placeholder-product.jpg";

  return (
    <Link href={`/tienda/${product.slug.current}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-crema-dark)]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
            <span className="bg-white/90 text-[var(--color-text)] text-sm font-medium px-4 py-1.5 rounded-full">
              Vendida
            </span>
          </div>
        )}
        {product.featured && product.inStock && (
          <div className="absolute top-3 left-3">
            <span className="bg-[var(--color-terracota)] text-white text-xs font-medium px-3 py-1 rounded-full">
              Destacada
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 px-1">
        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
          {product.category?.title}
        </p>
        <h3 className="font-serif text-base font-semibold text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-terracota)] transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 font-medium text-[var(--color-salvia-dark)]">
          {product.price.toFixed(2)} €
        </p>
      </div>
    </Link>
  );
}
