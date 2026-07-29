"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { SHIPPING_COST } from "@/lib/payment";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

const emptyCustomer = {
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  cp: "",
  provincia: "",
};

function CartContent() {
  const { items, totalPrice, removeItem, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof emptyCustomer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      clearCart();
      router.push(
        `/pedido-completado?ref=${data.reference}&total=${data.total}`
      );
    } catch (err) {
      console.error(err);
      setError("Error al procesar el pedido. Inténtalo de nuevo.");
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

  const total = totalPrice + SHIPPING_COST;

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
          <span>{SHIPPING_COST.toFixed(2)} €</span>
        </div>
        <div className="border-t border-[var(--color-border)] mt-4 pt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-[var(--color-text)]">Total</span>
          <span className="text-lg font-light text-[var(--color-text)]">
            {total.toFixed(2)} €
          </span>
        </div>

        {!showForm && (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-4 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
            >
              Finalizar compra
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-3 text-center text-xs font-light text-[var(--color-text-muted)]">
              Pago por transferencia bancaria
            </p>
          </>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <h2 className="text-sm font-medium text-[var(--color-text)] mb-2">
              Datos de envío
            </h2>
            <input
              required
              type="text"
              placeholder="Nombre y apellidos"
              value={customer.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={customer.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
            />
            <input
              type="tel"
              placeholder="Teléfono (opcional)"
              value={customer.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
              className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
            />
            <input
              required
              type="text"
              placeholder="Dirección"
              value={customer.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Código postal"
                value={customer.cp}
                onChange={(e) => handleChange("cp", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
              />
              <input
                required
                type="text"
                placeholder="Ciudad"
                value={customer.ciudad}
                onChange={(e) => handleChange("ciudad", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <input
              required
              type="text"
              placeholder="Provincia"
              value={customer.provincia}
              onChange={(e) => handleChange("provincia", e.target.value)}
              className="w-full px-4 py-3 text-sm border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-accent)]"
            />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[var(--color-dark)] text-[var(--color-crema)] px-8 py-4 text-sm font-medium hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
            >
              {loading ? "Procesando..." : (
                <>
                  Confirmar pedido
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-xs font-light text-[var(--color-text-muted)]">
              Te enviaremos los datos para el pago por transferencia bancaria
            </p>
          </form>
        )}
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
