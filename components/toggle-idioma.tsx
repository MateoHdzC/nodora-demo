"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { botonVariantes } from "@/components/ui/boton";

// Español vive sin prefijo (/kit/) e inglés bajo /en (/en/kit/).
// usePathname ya devuelve la ruta sin el basePath de GitHub Pages.
export function rutaEnOtroIdioma(ruta: string, actual: string) {
  if (actual === "en") {
    const sinPrefijo = ruta.replace(/^\/en(?=\/|$)/, "");
    return sinPrefijo === "" ? "/" : sinPrefijo;
  }
  return ruta === "/" ? "/en/" : `/en${ruta}`;
}

export function ToggleIdioma() {
  const t = useTranslations("comun.idioma");
  const idioma = useLocale();
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
