import { setRequestLocale } from "next-intl/server";
import { LayoutRaiz } from "@/components/layout-raiz";
import { metadataBase } from "@/lib/metadata";

export const generateMetadata = () => metadataBase("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  setRequestLocale("en");
  return <LayoutRaiz idioma="en">{children}</LayoutRaiz>;
}
