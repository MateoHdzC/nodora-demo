import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { cn } from "cn";
import { BadgeEstado, type EstadoProyecto } from "@/components/ui/badge-estado";
import { LineaNodos } from "@/components/ui/linea-nodos";
import { MarcaNodos } from "@/components/ui/logo";

// Vista previa del panel de la agencia, armada con componentes reales del kit.
// Para lectores de pantalla es una sola imagen con su descripción.

const metricas = [
  { clave: "activos", valor: "12" },
  { clave: "porAprobar", valor: "3" },
  { clave: "aCobrar", valor: "$4,200" },
  { clave: "clientes", valor: "18" },
] as const;

const proyectos: { clave: "p1" | "p2" | "p3"; estado: EstadoProyecto; etapa: number }[] = [
  { clave: "p1", estado: "esperandoCliente", etapa: 2 },
  { clave: "p2", estado: "enCurso", etapa: 1 },
  { clave: "p3", estado: "entregado", etapa: 4 },
];

export function MaquetaPanel({ className }: { className?: string }) {
  const t = useTranslations("inicio.maqueta");

  return (
    <div role="img" aria-label={t("descripcion")} className={cn("relative", className)}>
      {/* Brillo naranja suave detrás */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--acento)_35%,transparent),transparent_65%)] blur-2xl"
      />

      <div aria-hidden className="overflow-hidden rounded-modal border border-borde bg-fondo text-left shadow-[0_24px_80px_-32px_color-mix(in_srgb,var(--acento)_45%,transparent)]">
        {/* Barra de ventana */}
        <div className="flex items-center gap-2 border-b border-borde bg-superficie px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-borde-fuerte" />
          <span className="size-2.5 rounded-full bg-borde-fuerte" />
          <span className="size-2.5 rounded-full bg-borde-fuerte" />
          <span className="mx-auto rounded-md bg-superficie-2 px-3 py-0.5 font-mono text-[11px] text-texto-suave">
            app.nodora.com
          </span>
        </div>

        {/* Barra del panel */}
        <div className="flex items-center gap-5 border-b border-borde bg-superficie px-5 py-3 text-xs">
          <MarcaNodos className="size-5" />
          <span className="font-medium text-texto">{t("nav.inicio")}</span>
          <span className="hidden text-texto-suave sm:inline">{t("nav.proyectos")}</span>
          <span className="hidden text-texto-suave sm:inline">{t("nav.clientes")}</span>
          <span className="hidden text-texto-suave sm:inline">{t("nav.facturas")}</span>
          <span className="degradado-marca ml-auto size-6 rounded-full" />
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div>
            <p className="text-lg font-semibold text-texto">{t("saludo")}</p>
            <p className="text-xs text-texto-suave">{t("fecha")}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metricas.map((m) => (
              <div key={m.clave} className="rounded-card border border-borde bg-superficie p-4">
                <p className="text-xs text-texto-suave">{t(`metricas.${m.clave}`)}</p>
                <p className="cifras mt-1 text-2xl font-semibold text-texto">{m.valor}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-card border border-borde bg-superficie lg:col-span-2">
              <div className="flex items-center justify-between border-b border-borde px-4 py-3">
                <p className="text-sm font-medium text-texto">{t("proyectos")}</p>
                <p className="text-xs text-acento-texto">{t("verTodos")}</p>
              </div>
              <ul className="divide-y divide-borde">
                {proyectos.map((p, i) => (
                  <li
                    key={p.clave}
                    className={cn("grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[1.4fr_auto_1fr]", i === 2 && "hidden sm:grid")}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-texto">{t(`datos.${p.clave}.nombre`)}</p>
                      <p className="truncate text-xs text-texto-suave">{t(`datos.${p.clave}.cliente`)}</p>
                    </div>
                    <BadgeEstado estado={p.estado} />
                    <LineaNodos actual={p.etapa} compacta className="col-span-2 sm:col-span-1" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden rounded-card bg-[linear-gradient(135deg,color-mix(in_srgb,var(--acento)_60%,transparent),var(--borde)_70%)] p-px sm:block">
              <div className="h-full rounded-[calc(var(--radius-card)-1px)] bg-superficie p-4">
                <div className="flex items-center gap-2">
                  <span className="degradado-marca grid size-6 place-items-center rounded-md text-tinta">
                    <Sparkles className="size-3.5" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm font-medium text-texto">{t("ia.titulo")}</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-texto-suave">{t("ia.texto")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
