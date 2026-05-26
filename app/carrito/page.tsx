"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

function CartContent() {
  const { items, totalPrice, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Error al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag className="w-10 h-10 text-[var(--color-border)] mb-6" />
        <h2 className="text-2xl font-extralight text-[var(--color-text)] mb-3">
          Tu carrito está vacío
        </h2>
        <p className="text-sm font-light text-[var(--color-text-muted)] mb-10">
          Todavía no has añadido ninguna pieza.
        </p>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-3 bg-[var(--color-text)] text-[var(--color-crema)] px-8 py-3 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
        >
          Explorar la tienda
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-4xl font-extralight text-[var(--color-text)] mb-12">
        Tu carrito
      </h1>

      <div className="space-y-px mb-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 bg-[var(--color-crema-dark)] p-4 border border-[var(--color-border)]"
          >
            <div className="relative w-18 h-18 overflow-hidden bg-[var(--color-border)] shrink-0" style={{ width: 72, height: 72 }}>
              <Image
                src={item.image || "/placeholder-product.jpg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[var(--color-text)] truncate">{item.name}</h3>
              <p className="text-sm font-light text-[var(--color-accent)] mt-1">
                {item.price.toFixed(2)} €
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors shrink-0"
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border border-[var(--color-border)] bg-[var(--color-crema-dark)] p-8">
        <div className="flex justify-between items-center mb-2 text-sm font-light text-[var(--color-text-muted)]">
          <span>{items.length} pieza{items.length !== 1 ? "s" : ""}</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between items-center mb-2 text-sm font-light text-[var(--color-text-muted)]">
          <span>Envío</span>
          <span>Calculado al pagar</span>
        </div>
        <div className="border-t border-[var(--color-border)] mt-4 pt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-[var(--color-text)]">Total</span>
          <span className="text-lg font-light text-[var(--color-text)]">
            desde {totalPrice.toFixed(2)} €
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-3 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-4 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
        >
          {loading ? "Procesando..." : (
            <>
              Finalizar compra
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs font-light text-[var(--color-text-muted)]">
          Pago seguro con Stripe
        </p>
      </div>
    </div>
  );
}

export default function CarritoPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <CartContent />
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
