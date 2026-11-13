import { setRequestLocale } from "next-intl/server";
import { PaginaProximamente, metadataProximamente } from "@/pantallas/PaginaProximamente";

export const generateMetadata = () => metadataProximamente("demo", "en");

export default function Page() {
  setRequestLocale("en");
  return <PaginaProximamente pagina="demo" />;
}
