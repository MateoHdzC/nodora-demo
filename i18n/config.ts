export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];

export const idiomaPorDefecto: Idioma = "es";

export function esIdioma(valor: string | undefined): valor is Idioma {
  return idiomas.includes(valor as Idioma);
}
