import Link from "next/link";
// Instagram SVG icon (not in lucide-react)

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso Legal" },
  { href: "/politica-privacidad", label: "Privacidad" },
  { href: "/politica-devoluciones", label: "Devoluciones" },
  { href: "/politica-cookies", label: "Cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-crema-dark)] border-t border-[var(--color-arena-light)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--color-salvia-dark)] mb-2">
              Azul Mandarino
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Joyería artesanal hecha a mano con amor. Cada pieza es única e
              irrepetible, creada con resina y arcilla polimérica.
            </p>
            <a
              href="https://www.instagram.com/azulmandarinoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--color-terracota)] hover:text-[var(--color-terracota-dark)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              @azulmandarinoo
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              Tienda
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/tienda", label: "Todos los productos" },
                { href: "/tienda?categoria=pendientes", label: "Pendientes" },
                { href: "/tienda?categoria=pulseras", label: "Pulseras" },
                { href: "/tienda?categoria=anillos", label: "Anillos" },
                { href: "/tienda?categoria=collares", label: "Collares" },
                { href: "/encargo", label: "Encargo personalizado" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-terracota)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
              Información
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/sobre-mi", label: "Sobre mí" },
                { href: "/faq", label: "Preguntas frecuentes" },
                { href: "/blog", label: "Blog" },
                ...legalLinks,
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-terracota)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              <a
                href="mailto:arte@marinadescalzi.es"
                className="hover:text-[var(--color-terracota)] transition-colors"
              >
                arte@marinadescalzi.es
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-arena-light)] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Azul Mandarino · Marina Descalzi</p>
          <p>Hecho con ♥ en Madrid</p>
        </div>
      </div>
    </footer>
  );
}
