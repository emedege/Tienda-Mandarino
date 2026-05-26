import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Azul Mandarino | Joyería Artesanal Única",
    template: "%s | Azul Mandarino",
  },
  description:
    "Joyería artesanal hecha a mano en España. Pendientes, pulseras, anillos, collares y broches únicos de resina y arcilla polimérica. Cada pieza es irrepetible.",
  keywords: [
    "joyería artesanal",
    "bisutería artesanal",
    "pendientes resina",
    "arcilla polimérica",
    "joyas únicas",
    "handmade jewelry Spain",
    "Azul Mandarino",
  ],
  authors: [{ name: "Marina Descalzi" }],
  creator: "Marina Descalzi",
  publisher: "Azul Mandarino",
  metadataBase: new URL("https://azulmandarino.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_GB",
    url: "https://azulmandarino.com",
    siteName: "Azul Mandarino",
    title: "Azul Mandarino | Joyería Artesanal Única",
    description:
      "Joyería artesanal hecha a mano. Cada pieza es única e irrepetible.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Azul Mandarino - Joyería Artesanal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Azul Mandarino | Joyería Artesanal",
    description: "Joyería artesanal hecha a mano. Cada pieza es única.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={montserrat.variable}
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
