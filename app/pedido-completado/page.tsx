"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { ArrowRight } from "lucide-react";

function OrderSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="bg-[var(--color-crema)] min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-px h-16 bg-[var(--color-accent)] mx-auto mb-12" />
        <h1 className="text-4xl font-extralight text-[var(--color-text)] mb-6">
          Pedido confirmado
        </h1>
        <p className="text-base font-light text-[var(--color-text-muted)] leading-relaxed mb-4">
          Gracias por tu compra. Recibirás un email de confirmación en breve
          con todos los detalles de tu pedido.
        </p>
        <p className="text-sm font-light text-[var(--color-text-muted)] mb-14">
          Preparo tu pieza con todo el cuidado y te la envío lo antes posible.
          Cualquier duda, escríbeme a{" "}
          <a
            href="mailto:arte@marinadescalzi.es"
            className="text-[var(--color-accent)] hover:underline"
          >
            arte@marinadescalzi.es
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-3 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-3 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
          >
            Seguir explorando
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PedidoCompletadoPage() {
  return (
    <CartProvider>
      <Navbar />
      <OrderSuccess />
      <Footer />
    </CartProvider>
  );
}
