import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Encabezado } from "@/components/encabezado";
import { Boton } from "@/components/ui/boton";

// Inicio provisorio hasta que llegue la landing (próximo cambio)
export function PaginaInicio() {
  const t = useTranslations("inicio");
  const idioma = useLocale();

  return (
    <>
      <Encabezado logoAnimado />
      <main id="contenido" className="mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6">
        <h1 className="titular max-w-3xl text-5xl font-semibold sm:text-6xl">{t("descripcion")}</h1>
        <p className="mt-4 max-w-xl text-texto-suave">{t("proximamente")}</p>
        <Boton asChild tamano="lg" className="mt-8">
          <Link href={idioma === "en" ? "/en/kit/" : "/kit/"}>
            {t("verKit")}
            <ArrowRight aria-hidden />
          </Link>
        </Boton>
      </main>
    </>
  );
}
