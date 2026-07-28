import Link from "next/link";
import Image from "next/image";

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/politica-privacidad", label: "Privacidad" },
  { href: "/politica-devoluciones", label: "Devoluciones" },
  { href: "/politica-cookies", label: "Cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-crema-dark)] border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/logo-icon.png"
                  alt="Azul Mandarino"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <p className="text-sm font-light uppercase tracking-[0.2em]">
                <span className="text-[var(--color-accent)]">Azul</span>{" "}
                <span className="text-[var(--color-text)]">Mandarino</span>
              </p>
            </div>
            <p className="text-xs font-light text-[var(--color-text-muted)] leading-relaxed max-w-xs mb-5">
              Joyería artesanal hecha a mano en Madrid. Cada pieza es única e irrepetible.
            </p>
            <a
              href="https://www.instagram.com/azulmandarinoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              @azulmandarinoo
            </a>
          </div>

          {/* Tienda */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-text)] mb-4">Tienda</p>
            <ul className="space-y-2.5">
              {[
                { href: "/tienda", label: "Todos los productos" },
                { href: "/tienda?categoria=pendientes", label: "Pendientes" },
                { href: "/tienda?categoria=pulseras", label: "Pulseras" },
                { href: "/tienda?categoria=anillos", label: "Anillos" },
                { href: "/encargo", label: "Encargo personalizado" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs font-light text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-text)] mb-4">Información</p>
            <ul className="space-y-2.5">
              {[
                { href: "/sobre-mi", label: "Sobre mí" },
                { href: "/faq", label: "Preguntas frecuentes" },
                { href: "/blog", label: "Blog" },
                ...legalLinks,
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs font-light text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <a href="mailto:arte@marinadescalzi.es" className="text-xs font-light text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                arte@marinadescalzi.es
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] font-light text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Azul Mandarino · Marina Descalzi</p>
          <p>Hecho con amor en Madrid</p>
        </div>
      </div>
    </footer>
  );
}
