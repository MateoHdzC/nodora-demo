import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowRight, Upload } from "lucide-react";
import type { Idioma } from "@/i18n/config";
import { Encabezado } from "@/components/encabezado";
import { Boton } from "@/components/ui/boton";
import { BadgeEstado, estadosProyecto } from "@/components/ui/badge-estado";
import { Card, CardTexto, CardTitulo } from "@/components/ui/card";
import { CardIa } from "@/components/ui/card-ia";
import { LineaNodos } from "@/components/ui/linea-nodos";
import { Logo } from "@/components/ui/logo";
import { LogoRepetible } from "@/pantallas/kit/logo-repetible";

export async function metadataKit(idioma: Idioma): Promise<Metadata> {
  const t = await getTranslations({ locale: idioma, namespace: "kit" });
  return { title: t("titulo"), description: t("descripcion") };
}

// Tokens de DESIGN.md con sus dos valores, para revisarlos a ojo
const tokens = [
  { nombre: "fondo", claro: "#FAF8F5", oscuro: "#141210" },
  { nombre: "superficie", claro: "#FFFFFF", oscuro: "#1C1916" },
  { nombre: "superficie-2", claro: "#F3F0EB", oscuro: "#24201C" },
  { nombre: "borde", claro: "#E7E2DA", oscuro: "#2E2924" },
  { nombre: "texto", claro: "#1C1410", oscuro: "#F5F1EC" },
  { nombre: "texto-suave", claro: "#6B625A", oscuro: "#A39A90" },
  { nombre: "acento", claro: "#FF6B4A", oscuro: "#FF6B4A" },
  { nombre: "acento-2", claro: "#FFB547", oscuro: "#FFB547" },
  { nombre: "acento-texto", claro: "#C2461F", oscuro: "#FF8A6B" },
  { nombre: "exito", claro: "#3F9A6B", oscuro: "#3F9A6B" },
  { nombre: "alerta", claro: "#D99A2B", oscuro: "#D99A2B" },
  { nombre: "error", claro: "#D2553F", oscuro: "#D2553F" },
];

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-borde py-12 first:border-t-0">
      <h2 className="mb-6 text-sm font-medium tracking-wide text-texto-suave uppercase">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export function PaginaKit() {
  const t = useTranslations("kit");

  return (
    <>
      <Encabezado />
      <main id="contenido" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="py-16">
          <h1 className="titular text-5xl font-semibold">{t("titulo")}</h1>
          <p className="mt-3 max-w-xl text-texto-suave">{t("descripcion")}</p>
        </div>

        <Seccion titulo={t("secciones.colores")}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {tokens.map((token) => (
              <li key={token.nombre} className="overflow-hidden rounded-card border border-borde bg-superficie">
                <div className="h-16 border-b border-borde" style={{ background: `var(--${token.nombre})` }} />
                <div className="p-3">
                  <p className="text-sm font-medium">{token.nombre}</p>
                  <p className="cifras font-mono text-xs text-texto-suave">
                    <span className="dark:hidden">{token.claro}</span>
                    <span className="hidden dark:inline">{token.oscuro}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="degradado-marca mt-3 h-16 rounded-card" aria-hidden />
        </Seccion>

        <Seccion titulo={t("secciones.tipografia")}>
          <div className="space-y-4">
            <p className="titular text-5xl font-semibold sm:text-6xl">
              {t.rich("tipografia.titular", {
                destacado: (trozo) => <span className="texto-degradado">{trozo}</span>,
              })}
            </p>
            <p className="max-w-2xl text-xl">{t("tipografia.cuerpo")}</p>
            <p className="text-sm text-texto-suave">{t("tipografia.suave")}</p>
            <p>
              <a href="#contenido" className="text-acento-texto underline-offset-4 hover:underline">
                {t("tipografia.link")}
              </a>
            </p>
            <p className="cifras text-3xl font-semibold">
              $ 12.480,00 <span className="text-base font-normal text-texto-suave">· {t("tipografia.cifras")}</span>
            </p>
          </div>
        </Seccion>

        <Seccion titulo={t("secciones.botones")}>
          <div className="flex flex-wrap items-center gap-3">
            <Boton>
              {t("botones.principal")}
              <ArrowRight aria-hidden />
            </Boton>
            <Boton variante="secundario">{t("botones.secundario")}</Boton>
            <Boton variante="terciario">{t("botones.terciario")}</Boton>
            <Boton variante="secundario">
              <Upload aria-hidden />
              {t("botones.conIcono")}
            </Boton>
            <Boton disabled>{t("botones.deshabilitado")}</Boton>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Boton tamano="sm">{t("botones.chico")}</Boton>
            <Boton tamano="lg">{t("botones.grande")}</Boton>
          </div>
        </Seccion>

        <Seccion titulo={t("secciones.estados")}>
          <div className="flex flex-wrap gap-2">
            {estadosProyecto.map((estado) => (
              <BadgeEstado key={estado} estado={estado} />
            ))}
          </div>
        </Seccion>

        <Seccion titulo={t("secciones.cards")}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardTitulo>{t("cards.estatica")}</CardTitulo>
              <CardTexto>{t("cards.estaticaTexto")}</CardTexto>
            </Card>
            <Card interactiva asChild>
              <a href="#contenido">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitulo>{t("cards.interactiva")}</CardTitulo>
                    <CardTexto>{t("cards.cliente")}</CardTexto>
                  </div>
                  <BadgeEstado estado="esperandoCliente" />
                </div>
                <LineaNodos actual={2} className="mt-6" />
                <CardTexto className="mt-4">{t("cards.interactivaTexto")}</CardTexto>
              </a>
            </Card>
          </div>
        </Seccion>

        <Seccion titulo={t("secciones.ia")}>
          <CardIa titulo={t("ia.titulo")} pie={t("ia.pie")} className="max-w-xl">
            {t("ia.texto")}
          </CardIa>
        </Seccion>

        <Seccion titulo={t("secciones.avance")}>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { titulo: t("avance.recienEmpieza"), actual: 0 },
              { titulo: t("avance.enRevision"), actual: 2 },
              { titulo: t("avance.terminado"), actual: 4 },
            ].map((ejemplo) => (
              <Card key={ejemplo.titulo}>
                <CardTitulo className="mb-6 text-sm">{ejemplo.titulo}</CardTitulo>
                <LineaNodos actual={ejemplo.actual} />
              </Card>
            ))}
          </div>
        </Seccion>

        <Seccion titulo={t("secciones.logo")}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardTexto className="mt-0 mb-6">{t("logo.animado")}</CardTexto>
              <LogoRepetible textoBoton={t("logo.repetir")} />
            </Card>
            <Card>
              <CardTexto className="mt-0 mb-6">{t("logo.estatico")}</CardTexto>
              <Logo className="[&_svg]:size-10 [&>span:last-child]:text-3xl" />
            </Card>
          </div>
        </Seccion>
      </main>
    </>
  );
}
