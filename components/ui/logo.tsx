"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "cn";
import { curva, duracion, transicion } from "@/lib/movimiento";

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

/** Solo la marca de 3 nodos. `animado`: los puntos aparecen y las líneas se dibujan, una vez. */
export function MarcaNodos({
  animado = false,
  className,
}: {
  animado?: boolean;
  className?: string;
}) {
  const id = useId();
  const sinMovimiento = useReducedMotion();
  // ~800 ms en total: puntos escalonados y después las líneas
  const total = duracion.destacado;

  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--acento)" />
          <stop offset="1" stopColor="var(--acento-2)" />
        </linearGradient>
      </defs>
      {lineas.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={`url(#${id}-g)`}
          strokeWidth={2}
          strokeLinecap="round"
          initial={animado ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={transicion(sinMovimiento, {
            duration: total * 0.45,
            delay: total * (0.3 + i * 0.12),
            ease: curva,
          })}
        />
      ))}
      {nodos.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={`url(#${id}-g)`}
          initial={animado ? { scale: 0, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={transicion(sinMovimiento, {
            duration: total * 0.35,
            delay: total * i * 0.12,
            ease: curva,
          })}
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
