import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Idioma } from "@/i18n/config";

// Metadata base de cada idioma (título y descripción del sitio)
export async function metadataBase(idioma: Idioma): Promise<Metadata> {
  const t = await getTranslations({ locale: idioma, namespace: "inicio" });
  return {
    title: { default: t("titulo"), template: "%s · Nodora" },
    description: t("descripcion"),
  };
}
