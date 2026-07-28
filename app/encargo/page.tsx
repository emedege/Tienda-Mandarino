import type { Metadata } from "next";
import EncargoClient from "./EncargoClient";

export const metadata: Metadata = {
  title: "Encargo personalizado",
  description:
    "Cuéntame tu idea y creamos juntas una pieza de joyería artesanal única, hecha a mano exactamente para ti.",
  alternates: { canonical: "/encargo" },
};

export default function EncargoPage() {
  return <EncargoClient />;
}
