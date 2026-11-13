import { setRequestLocale } from "next-intl/server";
import { PaginaProximamente, metadataProximamente } from "@/pantallas/PaginaProximamente";

export const generateMetadata = () => metadataProximamente("listaEspera", "en");

export default function Page() {
  setRequestLocale("en");
  return <PaginaProximamente pagina="listaEspera" />;
}
