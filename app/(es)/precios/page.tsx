import { setRequestLocale } from "next-intl/server";
import { PaginaProximamente, metadataProximamente } from "@/pantallas/PaginaProximamente";

export const generateMetadata = () => metadataProximamente("precios", "es");

export default function Page() {
  setRequestLocale("es");
  return <PaginaProximamente pagina="precios" />;
}
