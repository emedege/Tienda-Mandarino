"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { BANK_TRANSFER } from "@/lib/payment";
import { ArrowRight } from "lucide-react";

function OrderSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");
  const total = searchParams.get("total");

  return (
    <main className="bg-[var(--color-crema)] min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-px h-16 bg-[var(--color-accent)] mx-auto mb-12" />
        <h1 className="text-4xl font-extralight text-[var(--color-text)] mb-6">
          Pedido reservado
        </h1>
        <p className="text-base font-light text-[var(--color-text-muted)] leading-relaxed mb-4">
          Recibirás un email con estos mismos datos. Para confirmar el
          pedido, haz la transferencia con estos datos:
        </p>

        {reference && (
          <div className="text-left mx-auto max-w-sm border border-[var(--color-border)] bg-[var(--color-crema-dark)] p-6 mb-8">
            <p className="text-sm mb-2">
              <span className="text-[var(--color-text-muted)]">IBAN:</span>{" "}
              <strong>{BANK_TRANSFER.iban}</strong>
            </p>
            <p className="text-sm mb-2">
              <span className="text-[var(--color-text-muted)]">Titular:</span>{" "}
              <strong>{BANK_TRANSFER.titular}</strong>
            </p>
            {total && (
              <p className="text-sm mb-2">
                <span className="text-[var(--color-text-muted)]">Importe:</span>{" "}
                <strong>{Number(total).toFixed(2)} €</strong>
              </p>
            )}
            <p className="text-sm">
              <span className="text-[var(--color-text-muted)]">Concepto:</span>{" "}
              <strong>{reference}</strong>
            </p>
          </div>
        )}

        <p className="text-sm font-light text-[var(--color-text-muted)] mb-14">
          En cuanto reciba la transferencia, preparo tu pieza y te la envío.
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
      <Suspense fallback={null}>
        <OrderSuccess />
      </Suspense>
      <Footer />
    </CartProvider>
  );
}
