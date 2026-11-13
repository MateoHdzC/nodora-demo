"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { botonVariantes } from "@/components/ui/boton";
import type { Idioma } from "@/i18n/config";
import { rutaEnOtroIdioma } from "@/i18n/rutas";

export function ToggleIdioma() {
  const t = useTranslations("comun.idioma");
  const idioma = useLocale() as Idioma;
  // usePathname ya devuelve la ruta sin el basePath de GitHub Pages
  const ruta = usePathname();
  const otro = idioma === "en" ? "es" : "en";

  return (
    <Link
      href={rutaEnOtroIdioma(ruta, idioma)}
      hrefLang={otro}
      lang={otro}
      aria-label={t("irAlOtro")}
      title={t("irAlOtro")}
      className={botonVariantes({ variante: "terciario", tamano: "icono" })}
    >
      <span className="text-xs font-semibold">{t("otro")}</span>
    </Link>
  );
}
