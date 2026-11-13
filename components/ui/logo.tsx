import { useId } from "react";
import { cn } from "cn";

// Los 3 nodos de la marca (en un lienzo de 32×32) y las líneas que los unen
const nodos = [
  { x: 7, y: 22, r: 3.5 },
  { x: 16, y: 9, r: 4 },
  { x: 26, y: 20, r: 3 },
];
const lineas = [
  [nodos[0], nodos[1]],
  [nodos[1], nodos[2]],
];

const retraso = (ms: number) => ({ "--retraso": `${ms}ms` }) as React.CSSProperties;

/**
 * Solo la marca de 3 nodos. `animado`: los puntos aparecen y las líneas se
 * dibujan, una vez (~800 ms). La animación es CSS (ver .nodo-aparece y
 * .linea-dibuja en globals.css); con movimiento reducido queda el estado final.
 */
export function MarcaNodos({
  animado = false,
  className,
}: {
  animado?: boolean;
  className?: string;
}) {
  const id = useId();

  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--acento)" />
          <stop offset="1" stopColor="var(--acento-2)" />
        </linearGradient>
      </defs>
      {lineas.map(([a, b], i) => (
        <line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          pathLength={1}
          stroke={`url(#${id}-g)`}
          strokeWidth={2}
          strokeLinecap="round"
          className={animado ? "linea-dibuja" : undefined}
          style={animado ? retraso(240 + i * 100) : undefined}
        />
      ))}
      {nodos.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={`url(#${id}-g)`}
          className={animado ? "nodo-aparece" : undefined}
          style={animado ? retraso(i * 100) : undefined}
        />
      ))}
    </svg>
  );
}

/** Logo completo: marca + "nodora" en minúscula */
export function Logo({
  animado = false,
  className,
}: {
  animado?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-texto", className)}>
      <MarcaNodos animado={animado} className="size-7" />
      <span className="text-xl font-semibold tracking-tight">nodora</span>
    </span>
  );
}
