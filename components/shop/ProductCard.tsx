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
      <div className="relative aspect-square overflow-hidden bg-[var(--color-crema-dark)]">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-103"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-[var(--color-crema)]/70 flex items-center justify-center">
            <span className="bg-[var(--color-text)] text-[var(--color-crema)] text-xs font-medium px-4 py-1.5 tracking-wide">
              Vendida
            </span>
          </div>
        )}
        {product.featured && product.inStock && (
          <div className="absolute top-3 left-3">
            <span className="bg-[var(--color-accent)] text-white text-[10px] font-semibold px-3 py-1 tracking-wider">
              Destacada
            </span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-[10px] font-semibold tracking-widest text-[var(--color-text-muted)] mb-1">
          {product.category?.title}
        </p>
        <h3 className="text-sm font-light text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
          {product.price.toFixed(2)} €
        </p>
      </div>
    </Link>
  );
}
