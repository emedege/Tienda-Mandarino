"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import { CartProvider } from "@/contexts/CartContext";
import { Send, CheckCircle } from "lucide-react";

const schema = z.object({
  nombre: z.string().min(2, "Introduce tu nombre"),
  email: z.string().email("Email no válido"),
  telefono: z.string().optional(),
  tipo: z.string().optional(),
  descripcion: z
    .string()
    .min(20, "Cuéntame más sobre lo que tienes en mente (mínimo 20 caracteres)"),
  presupuesto: z.string().optional(),
  plazo: z.string().optional(),
  privacidad: z.literal(true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

type FormData = z.infer<typeof schema>;

function EncargoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/encargo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error del servidor");
      setSubmitted(true);
    } catch {
      setServerError("Ha ocurrido un error. Por favor, escríbeme directamente a arte@marinadescalzi.es");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="w-16 h-16 text-[var(--color-salvia)] mb-6" />
        <h2 className="font-serif text-3xl font-bold text-[var(--color-text)] mb-4">
          ¡Encargo recibido!
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-md leading-relaxed">
          He recibido tu solicitud y te contestaré en los próximos días. También te he
          enviado un email de confirmación. ¡Gracias por confiar en mí!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            Nombre *
          </label>
          <input
            {...register("nombre")}
            type="text"
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm"
          />
          {errors.nombre && (
            <p className="mt-1 text-xs text-red-500">{errors.nombre.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            Teléfono (opcional)
          </label>
          <input
            {...register("telefono")}
            type="tel"
            placeholder="+34 600 000 000"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            Tipo de joya
          </label>
          <select
            {...register("tipo")}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm text-[var(--color-text)]"
          >
            <option value="">Selecciona...</option>
            <option value="Pendientes">Pendientes</option>
            <option value="Pulsera">Pulsera</option>
            <option value="Anillo">Anillo</option>
            <option value="Collar/Gargantilla">Collar / Gargantilla</option>
            <option value="Broche">Broche</option>
            <option value="No lo sé aún">No lo sé aún</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
          Cuéntame tu idea *
        </label>
        <textarea
          {...register("descripcion")}
          rows={5}
          placeholder="Describe la pieza que tienes en mente: colores, estilo, si es para regalo, la persona a quien va dirigida... ¡Cuanto más detalle, mejor!"
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm resize-none"
        />
        {errors.descripcion && (
          <p className="mt-1 text-xs text-red-500">
            {errors.descripcion.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            Presupuesto aproximado
          </label>
          <select
            {...register("presupuesto")}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm text-[var(--color-text)]"
          >
            <option value="">Flexible / No lo sé</option>
            <option value="Hasta 30€">Hasta 30€</option>
            <option value="30€ - 60€">30€ – 60€</option>
            <option value="60€ - 100€">60€ – 100€</option>
            <option value="Más de 100€">Más de 100€</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
            ¿Lo necesitas para alguna fecha?
          </label>
          <input
            {...register("plazo")}
            type="text"
            placeholder="Ej: para el 15 de junio"
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-arena-light)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-salvia)] text-sm"
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3">
        <input
          {...register("privacidad")}
          type="checkbox"
          id="privacidad"
          className="mt-1 w-4 h-4 accent-[var(--color-salvia-dark)]"
        />
        <label htmlFor="privacidad" className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          He leído y acepto la{" "}
          <a
            href="/politica-privacidad"
            target="_blank"
            className="underline text-[var(--color-terracota)] hover:text-[var(--color-terracota-dark)]"
          >
            política de privacidad
          </a>{" "}
          y consiento el tratamiento de mis datos para gestionar mi solicitud. *
        </label>
      </div>
      {errors.privacidad && (
        <p className="text-xs text-red-500">{errors.privacidad.message}</p>
      )}

      {serverError && (
        <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full flex items-center justify-center gap-2 bg-[var(--color-salvia-dark)] text-white px-8 py-4 rounded-full font-medium hover:bg-[var(--color-salvia)] transition-colors disabled:opacity-50 text-sm"
      >
        {sending ? "Enviando..." : (
          <>
            <Send className="w-4 h-4" />
            Enviar solicitud de encargo
          </>
        )}
      </button>
    </form>
  );
}

export default function EncargoPage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="bg-[var(--color-crema)] min-h-screen">
        <div className="bg-[var(--color-crema-dark)] border-b border-[var(--color-arena-light)] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-terracota)] mb-3">
              ¿Tienes algo en mente?
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-text)] mb-4">
              Encargo personalizado
            </h1>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
              Cuéntame tu idea y crearemos juntas una pieza única hecha
              exactamente para ti. Respondo en los próximos días.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Info boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                emoji: "💬",
                title: "Cuéntame tu idea",
                desc: "Rellena el formulario con todos los detalles que se te ocurran.",
              },
              {
                emoji: "🎨",
                title: "Hablamos y diseñamos",
                desc: "Te contacto para afinar detalles y darte un presupuesto sin compromiso.",
              },
              {
                emoji: "✨",
                title: "Creo tu pieza",
                desc: "Una vez confirmado el encargo, creo tu joya única con todo el amor.",
              },
            ].map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-arena-light)] text-center"
              >
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-serif text-lg font-semibold text-[var(--color-text)] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <EncargoForm />
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </CartProvider>
  );
}
