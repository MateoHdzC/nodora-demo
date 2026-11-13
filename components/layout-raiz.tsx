import { NextIntlClientProvider } from "next-intl";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Idioma } from "@/i18n/config";
import { ProveedorTema } from "@/components/proveedor-tema";
import "@/app/globals.css";

// La "cáscara" HTML que comparten los dos layouts raíz (es y en)
export function LayoutRaiz({
  idioma,
  children,
}: {
  idioma: Idioma;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={idioma}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      // next-themes cambia la clase de <html> antes de que React hidrate
      suppressHydrationWarning
    >
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <ProveedorTema>{children}</ProveedorTema>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
