import { setRequestLocale } from "next-intl/server";
import { PaginaKit, metadataKit } from "@/pantallas/PaginaKit";

export const generateMetadata = () => metadataKit("en");

export default function Page() {
  setRequestLocale("en");
  return <PaginaKit />;
}
