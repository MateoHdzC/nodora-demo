import { setRequestLocale } from "next-intl/server";
import { LayoutRaiz } from "@/components/layout-raiz";
import { metadataBase } from "@/lib/metadata";

export const generateMetadata = () => metadataBase("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  setRequestLocale("es");
  return <LayoutRaiz idioma="es">{children}</LayoutRaiz>;
}
