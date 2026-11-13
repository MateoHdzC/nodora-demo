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

/**
 * Con movimiento reducido, todo pasa al instante salvo la opacidad (un fade corto).
 * Se cambia la transición y no el estado inicial: el HTML estático no sabe la
 * preferencia del usuario, y si el estado inicial cambiara habría diferencias
 * de hidratación.
 */
export function transicion<T extends object>(sinMovimiento: boolean | null, normal: T) {
  return sinMovimiento
    ? { default: { duration: 0 }, opacity: { duration: duracion.ui, ease: curva } }
    : normal;
}

/** Entrada estándar de listas y cards: fade + sube 8 px */
export const entrada = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duracion.ui, ease: curva },
};
