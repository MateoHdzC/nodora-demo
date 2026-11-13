import { cn } from "cn";

// Ilustración de estados vacíos: nodos sueltos "esperando conectarse".
// Las líneas punteadas son las conexiones que todavía no existen.
const nodos = [
  { x: 24, y: 70, r: 5 },
  { x: 62, y: 30, r: 6 },
  { x: 104, y: 62, r: 7, activo: true },
  { x: 142, y: 26, r: 5 },
  { x: 150, y: 92, r: 4 },
];

export function NodosSueltos({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 176 120" aria-hidden className={cn("w-44", className)}>
      <g stroke="var(--borde-fuerte)" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" fill="none">
        <line x1="24" y1="70" x2="62" y2="30" />
        <line x1="104" y1="62" x2="142" y2="26" />
        <line x1="104" y1="62" x2="150" y2="92" />
      </g>
      {/* La única conexión real, en naranja */}
      <line x1="62" y1="30" x2="104" y2="62" stroke="var(--acento)" strokeWidth="2" strokeLinecap="round" />
      {nodos.map((n) =>
        n.activo ? (
          <g key={n.x}>
            <circle cx={n.x} cy={n.y} r={n.r + 6} fill="var(--acento)" opacity="0.15" className="animate-pulse" />
            <circle cx={n.x} cy={n.y} r={n.r} fill="var(--acento)" />
          </g>
        ) : (
          <circle
            key={n.x}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--superficie)"
            stroke={n.x === 62 ? "var(--acento)" : "var(--borde-fuerte)"}
            strokeWidth="2"
          />
        )
      )}
    </svg>
  );
}
