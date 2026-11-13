import { setRequestLocale } from "next-intl/server";
import { PaginaKit, metadataKit } from "@/pantallas/PaginaKit";

export const generateMetadata = () => metadataKit("es");

export default function Page() {
  setRequestLocale("es");
  return <PaginaKit />;
}
