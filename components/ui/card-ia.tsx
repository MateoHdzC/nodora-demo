import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { cn } from "cn";

// Card normal con un borde que brilla sutil en el degradado de marca.
// En la demo el texto es fijo: no llama a ninguna IA.
export function CardIa({
  titulo,
  children,
  pie,
  className,
}: {
  titulo: string;
  children: React.ReactNode;
  pie?: string;
  className?: string;
}) {
  const t = useTranslations("ia");

  return (
    <section
      aria-label={t("etiqueta")}
      className={cn(
        // El "borde" es un fondo con degradado detrás de 1 px de padding
        "relative rounded-card p-px",
        "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--acento)_70%,transparent),color-mix(in_srgb,var(--acento-2)_45%,transparent)_45%,var(--borde)_75%)]",
        "shadow-[0_0_32px_-14px_var(--acento)]",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[calc(var(--radius-card)-1px)] bg-superficie p-6">
        {/* Brillo muy suave en la esquina */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -left-16 size-40 rounded-full bg-acento/10 blur-3xl"
        />
        <div className="relative flex items-center gap-2">
          <span className="degradado-marca grid size-7 place-items-center rounded-boton text-tinta">
            <Sparkles className="size-4" strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="text-base font-semibold">{titulo}</h3>
        </div>
        <div className="relative mt-3 text-sm leading-relaxed text-texto">{children}</div>
        {pie && <p className="relative mt-4 text-xs text-texto-suave">{pie}</p>}
      </div>
    </section>
  );
}
