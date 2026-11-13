import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Idioma } from "@/i18n/config";
import { ruta, type Pagina } from "@/i18n/rutas";
import { Logo } from "@/components/ui/logo";
import { linksPieProducto, linksPieRecursos } from "@/components/sitio/links";

function Columna({ titulo, paginas }: { titulo: string; paginas: Pagina[] }) {
  const t = useTranslations("sitio.nav");
  const idioma = useLocale() as Idioma;

  return (
    <div>
      <h2 className="text-sm font-medium text-texto">{titulo}</h2>
      <ul className="mt-3 space-y-2">
        {paginas.map((pagina) => (
          <li key={pagina}>
            <Link
              href={ruta(pagina, idioma)}
              className="text-sm text-texto-suave transition-colors duration-150 hover:text-texto"
            >
              {t(pagina)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Pie() {
  const t = useTranslations("sitio.pie");

  return (
    <footer className="border-t border-borde">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-texto-suave">{t("lema")}</p>
        </div>
        <Columna titulo={t("producto")} paginas={linksPieProducto} />
        <Columna titulo={t("recursos")} paginas={linksPieRecursos} />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-borde px-4 py-6 text-xs text-texto-suave sm:flex-row sm:justify-between sm:px-6">
        <p>{t("aclaracion")}</p>
        <p>{t("hecho")}</p>
      </div>
    </footer>
  );
}
