"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "cn";
import type { Idioma } from "@/i18n/config";
import { paginaDeRuta, ruta } from "@/i18n/rutas";
import { Logo } from "@/components/ui/logo";
import { Boton } from "@/components/ui/boton";
import { ToggleIdioma } from "@/components/toggle-idioma";
import { ToggleModo } from "@/components/toggle-modo";
import { MenuMovil } from "@/components/sitio/menu-movil";
import { linksBarra } from "@/components/sitio/links";

export function Barra({ logoAnimado = false }: { logoAnimado?: boolean }) {
  const t = useTranslations("sitio");
  const tComun = useTranslations("comun");
  const idioma = useLocale() as Idioma;
  const actual = paginaDeRuta(usePathname());

  return (
    <header className="sticky top-0 z-40 border-b border-borde/70 bg-fondo/75 backdrop-blur-md">
      <a
        href="#contenido"
        className="sr-only rounded-boton bg-superficie px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
      >
        {tComun("saltarAlContenido")}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href={ruta("inicio", idioma)} className="rounded-boton" aria-label="Nodora">
          <Logo animado={logoAnimado} />
        </Link>

        <nav aria-label={t("navegacion")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {linksBarra.map((pagina) => {
              const esActual = actual === pagina;
              return (
                <li key={pagina}>
                  <Link
                    href={ruta(pagina, idioma)}
                    aria-current={esActual ? "page" : undefined}
                    className={cn(
                      "relative rounded-boton px-3 py-2 text-sm transition-colors duration-150 ease-nodora",
                      esActual ? "font-medium text-texto" : "text-texto-suave hover:text-texto"
                    )}
                  >
                    {t(`nav.${pagina}`)}
                    {esActual && (
                      <span
                        aria-hidden
                        className="degradado-marca absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <ToggleIdioma />
          <ToggleModo />
          <Boton asChild tamano="sm" className="ml-2">
            <Link href={ruta("demo", idioma)}>{t("probarDemo")}</Link>
          </Boton>
        </div>

        <div className="ml-auto md:hidden">
          <MenuMovil actual={actual} />
        </div>
      </div>
    </header>
  );
}
