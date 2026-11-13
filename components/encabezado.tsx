import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { ToggleIdioma } from "@/components/toggle-idioma";
import { ToggleModo } from "@/components/toggle-modo";

export function Encabezado({ logoAnimado = false }: { logoAnimado?: boolean }) {
  const idioma = useLocale();
  const t = useTranslations("comun");

  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/80 backdrop-blur-md">
      <a
        href="#contenido"
        className="sr-only rounded-boton bg-superficie px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
      >
        {t("saltarAlContenido")}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={idioma === "en" ? "/en/" : "/"} className="rounded-boton" aria-label="Nodora">
          <Logo animado={logoAnimado} />
        </Link>
        <div className="flex items-center gap-1">
          <ToggleIdioma />
          <ToggleModo />
        </div>
      </div>
    </header>
  );
}
