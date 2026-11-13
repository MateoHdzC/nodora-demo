import { useTranslations } from "next-intl";
import { cn } from "cn";

// Las animaciones son CSS (ver .nodo-aparece y .tramo-llena en globals.css)
const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

const etapasPorDefecto = ["diseno", "desarrollo", "revision", "entrega"] as const;

/**
 * Etapas del proyecto como nodos conectados.
 * `actual` es el índice de la etapa en curso; si es igual a la cantidad de etapas,
 * el proyecto está terminado y todas se ven llenas.
 */
export function LineaNodos({
  actual,
  etapas,
  compacta = false,
  className,
}: {
  actual: number;
  /** Sin nombres visibles (siguen para lectores de pantalla), para filas de tablas */
  compacta?: boolean;
  /** Nombres ya traducidos; si no se pasan, usa Diseño → Desarrollo → Revisión → Entrega */
  etapas?: string[];
  className?: string;
}) {
  const t = useTranslations("avance");
  const nombres = etapas ?? etapasPorDefecto.map((e) => t(`etapas.${e}`));

  return (
    <ol
      aria-label={t("etiqueta")}
      className={cn("grid", className)}
      style={{ gridTemplateColumns: `repeat(${nombres.length}, minmax(0, 1fr))` }}
    >
      {nombres.map((nombre, i) => {
        const estado = i < actual ? "hecha" : i === actual ? "actual" : "pendiente";
        const esUltima = i === nombres.length - 1;
        // El tramo hacia la siguiente etapa se llena si esta ya está hecha
        const tramoLleno = i < actual;

        return (
          <li
            key={nombre}
            className="relative flex flex-col items-center text-center"
            aria-current={estado === "actual" ? "step" : undefined}
          >
            {!esUltima && (
              <span
                aria-hidden
                className="absolute top-[7px] left-1/2 h-0.5 w-full overflow-hidden rounded-full bg-borde"
              >
                {tramoLleno && (
                  <span
                    className="tramo-llena degradado-marca absolute inset-0"
                    style={retraso(150 + i * 220)}
                  />
                )}
              </span>
            )}

            <span
              aria-hidden
              className={cn(
                "nodo-aparece relative z-10 grid size-4 place-items-center rounded-full border-2",
                estado === "hecha" && "border-acento bg-acento",
                estado === "actual" && "animate-latido border-acento bg-superficie",
                estado === "pendiente" && "border-borde-fuerte bg-superficie"
              )}
              style={retraso(i * 220)}
            >
              {estado === "actual" && <span className="size-1.5 rounded-full bg-acento" />}
            </span>

            <span
              className={cn(
                "mt-2 text-xs",
                estado === "pendiente" ? "text-texto-suave" : "font-medium text-texto",
                compacta && "sr-only"
              )}
            >
              {nombre}
              <span className="sr-only">, {t(`estadoEtapa.${estado}`)}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
