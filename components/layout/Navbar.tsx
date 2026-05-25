"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { href: "/tienda", label: "Tienda" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/encargo", label: "Encargo personalizado" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-crema)] border-b border-[var(--color-arena-light)] shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Azul Mandarino"
                fill
                className="object-contain"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-sm font-bold text-[var(--color-salvia-dark)] tracking-wider uppercase">
                Azul
              </span>
              <span className="font-serif text-sm font-bold text-[var(--color-terracota)] tracking-wider uppercase -mt-1">
                Mandarino
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-terracota)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/carrito"
              className="relative p-2 text-[var(--color-text)] hover:text-[var(--color-terracota)] transition-colors"
              aria-label="Carrito de compra"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-terracota)] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[var(--color-text)]"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[var(--color-arena-light)] py-4">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-2 py-1 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-terracota)] transition-colors"
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
