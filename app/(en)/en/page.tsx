import { setRequestLocale } from "next-intl/server";
import { PaginaInicio } from "@/pantallas/PaginaInicio";

export default function Page() {
  setRequestLocale("en");
  return <PaginaInicio />;
}
