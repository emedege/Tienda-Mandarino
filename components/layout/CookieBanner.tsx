"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[var(--color-text)] text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm leading-relaxed flex-1">
          Usamos cookies propias para mejorar tu experiencia de compra. Puedes
          aceptarlas o rechazarlas. Más info en nuestra{" "}
          <Link
            href="/politica-cookies"
            className="underline text-[var(--color-arena-light)] hover:text-white transition-colors"
          >
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="text-sm px-4 py-2 border border-white/40 rounded hover:bg-white/10 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 bg-[var(--color-salvia)] rounded hover:bg-[var(--color-salvia-dark)] transition-colors font-medium"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
