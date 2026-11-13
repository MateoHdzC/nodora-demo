import { useTranslations } from "next-intl";
import { cn } from "cn";

export const estadosProyecto = [
  "borrador",
  "enCurso",
  "esperandoCliente",
  "entregado",
  "pausado",
] as const;
export type EstadoProyecto = (typeof estadosProyecto)[number];

// El color va en el punto y en el fondo tenue; el texto queda en `texto`
// para que siempre pase contraste y el estado se entienda sin el color.
const colorPorEstado: Record<EstadoProyecto, string> = {
  borrador: "var(--texto-suave)",
  enCurso: "var(--acento)",
  esperandoCliente: "var(--alerta)",
  entregado: "var(--exito)",
  pausado: "var(--texto-suave)",
};

export function BadgeEstado({
  estado,
  className,
}: {
  estado: EstadoProyecto;
  className?: string;
}) {
  const t = useTranslations("estados");
  const color = colorPorEstado[estado];

  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap text-texto",
        className
      )}
      style={{ backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          // Pausado: punto hueco, para distinguirlo de Borrador sin depender del color
          estado === "pausado" && "bg-transparent ring-1 ring-current ring-inset"
        )}
        style={estado === "pausado" ? { color } : { backgroundColor: color }}
      />
      {t(estado)}
    </span>
  );
}
