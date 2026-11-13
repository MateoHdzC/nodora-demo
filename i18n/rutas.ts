import type { Idioma } from "./config";

// Cada página del sitio con su ruta en cada idioma.
// Para sumar una página: agregala acá, creá sus dos envoltorios y su pantalla.
export const rutas = {
  inicio: { es: "/", en: "/en/" },
  funciones: { es: "/funciones/", en: "/en/features/" },
  precios: { es: "/precios/", en: "/en/pricing/" },
  preguntas: { es: "/preguntas/", en: "/en/faq/" },
  listaEspera: { es: "/lista-de-espera/", en: "/en/waitlist/" },
  demo: { es: "/demo/", en: "/en/demo/" },
  kit: { es: "/kit/", en: "/en/kit/" },
} as const satisfies Record<string, Record<Idioma, string>>;

export type Pagina = keyof typeof rutas;

export function ruta(pagina: Pagina, idioma: Idioma) {
  return rutas[pagina][idioma];
}

// usePathname puede venir con o sin barra final según la navegación
function normalizar(r: string) {
  return r.endsWith("/") ? r : `${r}/`;
}

/** Qué página del mapa es esta ruta (o null si no está en el mapa) */
export function paginaDeRuta(rutaActual: string): Pagina | null {
  const buscada = normalizar(rutaActual);
  for (const [pagina, porIdioma] of Object.entries(rutas)) {
    if (porIdioma.es === buscada || porIdioma.en === buscada) return pagina as Pagina;
  }
  return null;
}

/** La misma página en el otro idioma, aunque el slug cambie */
export function rutaEnOtroIdioma(rutaActual: string, actual: Idioma) {
  const otro: Idioma = actual === "en" ? "es" : "en";
  const pagina = paginaDeRuta(rutaActual);
  if (pagina) return rutas[pagina][otro];

  // Fuera del mapa: sacar o poner el prefijo /en
  const r = normalizar(rutaActual);
  if (actual === "en") return r.replace(/^\/en(?=\/)/, "") || "/";
  return `/en${r}`;
}
