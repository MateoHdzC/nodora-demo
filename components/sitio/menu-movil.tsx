"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { Menu, X } from "lucide-react";
import { cn } from "cn";
import type { Idioma } from "@/i18n/config";
import { ruta, type Pagina } from "@/i18n/rutas";
import { Boton } from "@/components/ui/boton";
import { Logo } from "@/components/ui/logo";
import { ToggleIdioma } from "@/components/toggle-idioma";
import { ToggleModo } from "@/components/toggle-modo";
import { linksPieProducto } from "@/components/sitio/links";

// Panel que baja desde arriba. El Dialog de Radix ya resuelve el foco atrapado,
// el cierre con Escape, devolver el foco al botón y aria-expanded.
export function MenuMovil({ actual }: { actual: Pagina | null }) {
  const t = useTranslations("sitio");
  const idioma = useLocale() as Idioma;
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <Dialog.Root open={abierto} onOpenChange={setAbierto}>
      <Dialog.Trigger asChild>
        <Boton variante="terciario" tamano="icono" aria-label={t("menu.abrir")}>
          <Menu aria-hidden />
        </Boton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fondo/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-50 border-b border-borde bg-superficie px-4 pb-6 data-[state=open]:animate-in data-[state=open]:slide-in-from-top-4 data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
        >
          <div className="flex h-16 items-center justify-between">
            <Link href={ruta("inicio", idioma)} onClick={cerrar} className="rounded-boton" aria-label="Nodora">
              <Logo />
            </Link>
            <Dialog.Close asChild>
              <Boton variante="terciario" tamano="icono" aria-label={t("menu.cerrar")}>
                <X aria-hidden />
              </Boton>
            </Dialog.Close>
          </div>

          <Dialog.Title className="sr-only">{t("menu.titulo")}</Dialog.Title>

          <nav aria-label={t("navegacion")}>
            <ul className="divide-y divide-borde border-y border-borde">
              {(["inicio", ...linksPieProducto] as Pagina[]).map((pagina) => (
                <li key={pagina}>
                  <Link
                    href={ruta(pagina, idioma)}
                    onClick={cerrar}
                    aria-current={actual === pagina ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-3.5 text-base",
                      actual === pagina ? "font-medium text-texto" : "text-texto-suave"
                    )}
                  >
                    {t(`nav.${pagina}`)}
                    {actual === pagina && <span aria-hidden className="size-1.5 rounded-full bg-acento" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 flex items-center gap-2">
            <ToggleIdioma />
            <ToggleModo />
            <Boton asChild className="ml-auto">
              <Link href={ruta("demo", idioma)} onClick={cerrar}>
                {t("probarDemo")}
              </Link>
            </Boton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
