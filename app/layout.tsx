import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { perfil } from "./data";

export const metadata: Metadata = {
  title: `${perfil.nombreCorto} · ${perfil.titulo}`,
  description: `${perfil.titulo} en ${perfil.ubicacion}. ${perfil.lema}`,
  openGraph: {
    title: `${perfil.nombreCorto} · ${perfil.titulo}`,
    description: "AJC OS: un portafolio que funciona como sistema operativo.",
    locale: "es_HN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  );
}
