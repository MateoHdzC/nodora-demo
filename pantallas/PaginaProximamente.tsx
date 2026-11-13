import Link from "next/link";
import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import type { Idioma } from "@/i18n/config";
import { ruta } from "@/i18n/rutas";
import { Barra } from "@/components/sitio/barra";
import { Pie } from "@/components/sitio/pie";
import { Boton } from "@/components/ui/boton";
import { NodosSueltos } from "@/components/ui/nodos-sueltos";

// Páginas del sitio que todavía no tienen contenido
export type PaginaPendiente = "funciones" | "precios" | "preguntas" | "listaEspera" | "demo";

export async function metadataProximamente(pagina: PaginaPendiente, idioma: Idioma): Promise<Metadata> {
  const t = await getTranslations({ locale: idioma });
  return { title: t(`paginas.${pagina}`), description: t(`proximamente.textos.${pagina}`) };
}

export function PaginaProximamente({ pagina }: { pagina: PaginaPendiente }) {
  const t = useTranslations("proximamente");
  const tPaginas = useTranslations("paginas");
  const idioma = useLocale() as Idioma;

  return (
    <>
      <Barra />
      <main
        id="contenido"
        className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-xl flex-col items-center justify-center px-4 py-20 text-center"
      >
        <NodosSueltos />
        <p className="mt-8 inline-flex h-6 items-center gap-1.5 rounded-full bg-acento/12 px-2.5 text-xs font-medium text-texto">
          <span aria-hidden className="size-1.5 rounded-full bg-acento" />
          {t("etiqueta")}
        </p>
        <h1 className="titular mt-4 text-5xl font-semibold">{tPaginas(pagina)}</h1>
        <p className="mt-4 text-texto-suave">{t(`textos.${pagina}`)}</p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Boton asChild variante="secundario">
            <Link href={ruta("inicio", idioma)}>
              <ArrowLeft aria-hidden />
              {t("volver")}
            </Link>
          </Boton>
          {/* En la propia Lista de espera, este botón apuntaría a sí mismo */}
          {pagina !== "listaEspera" && (
            <Boton asChild>
              <Link href={ruta("listaEspera", idioma)}>{t("anotarme")}</Link>
            </Boton>
          )}
        </div>
      </main>
      <Pie />
    </>
  );
}
