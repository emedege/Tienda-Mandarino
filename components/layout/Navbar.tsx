"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { href: "/tienda", label: "Tienda" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/encargo", label: "Encargo" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-crema)]/95 backdrop-blur-sm border-b border-[var(--color-border-light)]">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-7 h-7">
              <Image
                src="/logo.png"
                alt="Azul Mandarino"
                fill
                className="object-contain"
                sizes="28px"
                priority
              />
            </div>
            <span className="text-sm font-semibold tracking-wide text-[var(--color-text)]">
              Azul Mandarino
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link
              href="/carrito"
              className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-accent)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-[var(--color-text-muted)]"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[var(--color-border-light)] py-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
