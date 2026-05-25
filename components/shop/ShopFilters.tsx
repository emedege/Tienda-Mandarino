"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Category } from "@/lib/sanity/queries";

interface ShopFiltersProps {
  categories: Category[];
  active?: string;
}

export default function ShopFilters({ categories, active }: ShopFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/tienda"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !active
            ? "bg-[var(--color-salvia-dark)] text-white"
            : "bg-[var(--color-crema-dark)] text-[var(--color-text)] hover:bg-[var(--color-arena-light)]"
        }`}
      >
        Todas
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat._id}
          href={`/tienda?categoria=${cat.slug.current}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === cat.slug.current
              ? "bg-[var(--color-salvia-dark)] text-white"
              : "bg-[var(--color-crema-dark)] text-[var(--color-text)] hover:bg-[var(--color-arena-light)]"
          }`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
