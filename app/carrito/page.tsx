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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-[var(--color-text)]/20 mb-6" />
        <h2 className="font-serif text-2xl font-bold text-[var(--color-text)] mb-3">
          Tu carrito está vacío
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Todavía no has añadido ninguna pieza a tu carrito.
        </p>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 bg-[var(--color-salvia-dark)] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia)] transition-colors"
        >
          Explorar la tienda
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-[var(--color-text)] mb-8">
        Tu carrito
      </h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-[var(--color-arena-light)] shadow-sm"
          >
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[var(--color-crema-dark)] shrink-0">
              <Image
                src={item.image || "/placeholder-product.jpg"}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[var(--color-text)] truncate">{item.name}</h3>
              <p className="text-[var(--color-salvia-dark)] font-semibold mt-1">
                {item.price.toFixed(2)} €
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 text-[var(--color-text-muted)] hover:text-red-500 transition-colors shrink-0"
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-crema-dark)] rounded-2xl p-6 border border-[var(--color-arena-light)]">
        <div className="flex justify-between items-center mb-2 text-sm text-[var(--color-text-muted)]">
          <span>Subtotal ({items.length} pieza{items.length !== 1 ? "s" : ""})</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between items-center mb-2 text-sm text-[var(--color-text-muted)]">
          <span>Envío</span>
          <span>Calculado al pagar</span>
        </div>
        <div className="border-t border-[var(--color-arena-light)] mt-4 pt-4 flex justify-between items-center font-semibold text-[var(--color-text)]">
          <span>Total</span>
          <span className="text-xl text-[var(--color-salvia-dark)]">
            desde {totalPrice.toFixed(2)} €
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-[var(--color-salvia-dark)] text-white px-8 py-4 rounded-full font-medium hover:bg-[var(--color-salvia)] transition-colors disabled:opacity-50"
        >
          {loading ? "Procesando..." : (
            <>
              Finalizar compra
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
          Pago seguro con Stripe · Tarjeta o transferencia bancaria
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
