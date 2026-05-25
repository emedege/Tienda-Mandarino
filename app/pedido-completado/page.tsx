"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { CheckCircle, ArrowRight } from "lucide-react";

function OrderSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="bg-[var(--color-crema)] min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-[var(--color-salvia-light)]/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-[var(--color-salvia-dark)]" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-[var(--color-text)] mb-4">
          ¡Pedido confirmado!
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-4">
          Gracias por tu compra. Recibirás un email de confirmación en breve
          con todos los detalles de tu pedido.
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mb-10">
          Preparo tu pieza con todo el cuidado y te la envío lo antes posible.
          Si tienes alguna duda, escríbeme a{" "}
          <a
            href="mailto:arte@marinadescalzi.es"
            className="text-[var(--color-terracota)] hover:underline"
          >
            arte@marinadescalzi.es
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-[var(--color-salvia-dark)] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia)] transition-colors"
          >
            Seguir comprando
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-[var(--color-salvia-dark)] text-[var(--color-salvia-dark)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-salvia-dark)] hover:text-white transition-colors"
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
