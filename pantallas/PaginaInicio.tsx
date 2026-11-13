import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, CheckCheck, Sparkles, UsersRound } from "lucide-react";
import type { Idioma } from "@/i18n/config";
import { ruta } from "@/i18n/rutas";
import { Barra } from "@/components/sitio/barra";
import { Pie } from "@/components/sitio/pie";
import { FondoAmbiente } from "@/components/sitio/fondo-ambiente";
import { Boton } from "@/components/ui/boton";
import { Card, CardTexto, CardTitulo } from "@/components/ui/card";
import { MaquetaPanel } from "@/pantallas/inicio/maqueta-panel";

const funciones = [
  { clave: "portal", Icono: UsersRound },
  { clave: "aprobaciones", Icono: CheckCheck },
  { clave: "ia", Icono: Sparkles },
] as const;

// `--orden` escalona las entradas (ver .entrada y .revelar en globals.css)
const orden = (n: number) => ({ "--orden": n }) as React.CSSProperties;

function Botones({ idioma }: { idioma: Idioma }) {
  const t = useTranslations("inicio.hero");
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
      <Boton asChild tamano="lg">
        <Link href={ruta("demo", idioma)}>
          {t("probar")}
          <ArrowRight aria-hidden />
        </Link>
      </Boton>
      <Boton asChild tamano="lg" variante="secundario">
        <Link href={ruta("listaEspera", idioma)}>{t("unirme")}</Link>
      </Boton>
    </div>
  );
}

export function PaginaInicio() {
  const t = useTranslations("inicio");
  const idioma = useLocale() as Idioma;

  return (
    <>
      <Barra logoAnimado />
      <main id="contenido">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <FondoAmbiente />
          <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 text-center sm:px-6 sm:pt-20">
            <p
              className="entrada inline-flex h-7 items-center gap-2 rounded-full border border-borde bg-superficie/70 px-3 text-xs font-medium text-texto-suave backdrop-blur"
              style={orden(0)}
            >
              <span aria-hidden className="size-1.5 rounded-full bg-acento" />
              {t("hero.etiqueta")}
            </p>
            <h1
              className="entrada titular mt-5 max-w-4xl text-5xl font-semibold sm:text-6xl"
              style={orden(1)}
            >
              {t.rich("hero.titular", {
                destacado: (trozo) => <span className="texto-degradado">{trozo}</span>,
              })}
            </h1>
            <p className="entrada mt-5 max-w-2xl text-base text-texto-suave sm:text-xl" style={orden(2)}>
              {t("hero.subtitulo")}
            </p>
            <div className="entrada mt-8 w-full sm:w-auto" style={orden(3)}>
              <Botones idioma={idioma} />
            </div>

            <MaquetaPanel className="entrada mt-14 w-full max-w-5xl sm:mt-16" />
          </div>
        </section>

        {/* Funciones destacadas */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="revelar mx-auto max-w-2xl text-center">
            <h2 className="titular text-3xl font-semibold sm:text-5xl">{t("funciones.titulo")}</h2>
            <p className="mt-4 text-texto-suave">{t("funciones.subtitulo")}</p>
          </div>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {funciones.map(({ clave, Icono }, i) => (
              <li key={clave} className="revelar" style={orden(i)}>
                <Card className="h-full">
                  <span className="grid size-10 place-items-center rounded-boton bg-acento/12 text-acento-texto">
                    <Icono className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <CardTitulo className="mt-5">{t(`funciones.${clave}.titulo`)}</CardTitulo>
                  <CardTexto className="mt-2 leading-relaxed">{t(`funciones.${clave}.texto`)}</CardTexto>
                </Card>
              </li>
            ))}
          </ul>
          <div className="revelar mt-10 text-center">
            <Link
              href={ruta("funciones", idioma)}
              className="inline-flex items-center gap-1.5 rounded-boton text-sm font-medium text-acento-texto underline-offset-4 hover:underline"
            >
              {t("funciones.verTodas")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        {/* Llamado final */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="revelar relative isolate overflow-hidden rounded-modal border border-borde bg-superficie px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden
              className="absolute inset-x-0 -bottom-40 -z-10 mx-auto h-72 max-w-2xl rounded-full bg-acento/20 blur-3xl"
            />
            <h2 className="titular text-3xl font-semibold sm:text-5xl">{t("final.titulo")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-texto-suave">{t("final.texto")}</p>
            <div className="mt-8 flex justify-center">
              <Botones idioma={idioma} />
            </div>
          </div>
        </section>
      </main>
      <Pie />
    </>
  );
}
