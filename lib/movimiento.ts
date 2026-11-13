// Valores de movimiento de Nodora (DESIGN.md → Movimiento).
// Los mismos números viven en globals.css para las animaciones hechas con CSS.

/** Curva de todas las animaciones: arranca rápido y frena suave */
export const curva = [0.22, 1, 0.36, 1] as const;

/** Duraciones en segundos (Motion trabaja en segundos) */
export const duracion = {
  hover: 0.15,
  ui: 0.25,
  destacado: 0.8, // momentos "uff": logo, nodos que se conectan
} as const;

/** Entrada estándar de listas y cards: fade + sube 8 px */
export const entrada = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duracion.ui, ease: curva },
};
