import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { ArrowLeft } from "lucide-react";
import { ProveedorTema } from "@/components/proveedor-tema";
import { Boton } from "@/components/ui/boton";
import { MarcaNodos } from "@/components/ui/logo";
import "./globals.css";

// Hay dos layouts raíz (es y en), así que el 404 vive fuera de ambos.
// GitHub Pages sirve out/404.html para cualquier ruta que no existe.
export const metadata: Metadata = {
  title: "Página no encontrada · Nodora",
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={GeistSans.variable} suppressHydrationWarning>
      <body className="min-h-dvh">
        <ProveedorTema>
          <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4 text-center">
            <MarcaNodos className="size-14 opacity-80" />
            <h1 className="titular mt-6 text-3xl font-semibold">No encontramos esta página</h1>
            <p className="mt-3 text-texto-suave">
              Puede que el link esté mal escrito o que la página ya no exista.
            </p>
            <p lang="en" className="mt-1 text-sm text-texto-suave">
              We couldn&apos;t find this page.
            </p>
            <Boton asChild className="mt-8">
              <Link href="/">
                <ArrowLeft aria-hidden />
                Volver al inicio
              </Link>
            </Boton>
          </main>
        </ProveedorTema>
      </body>
    </html>
  );
}
