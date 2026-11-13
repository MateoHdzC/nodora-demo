import { getRequestConfig } from "next-intl/server";
import { esIdioma, idiomaPorDefecto } from "./config";

// Sin middleware (export estático): cada layout y cada página fija su idioma
// con setRequestLocale, y acá llega como requestLocale.
export default getRequestConfig(async ({ requestLocale }) => {
  const pedido = await requestLocale;
  const locale = esIdioma(pedido) ? pedido : idiomaPorDefecto;

  return {
    locale,
    messages: (await import(`../mensajes/${locale}.json`)).default,
    // Fija la zona horaria para que el render sea igual en el build y en el navegador
    timeZone: "America/Mexico_City",
  };
});
