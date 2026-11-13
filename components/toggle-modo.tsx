"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { Boton } from "@/components/ui/boton";

const sinSuscripcion = () => () => {};

export function ToggleModo() {
  const t = useTranslations("comun.modo");
  const { resolvedTheme, setTheme } = useTheme();
  // El modo real solo se conoce en el navegador; hasta entonces, etiqueta genérica.
  // false en el HTML estático, true una vez hidratado.
  const montado = useSyncExternalStore(
    sinSuscripcion,
    () => true,
    () => false
  );

  const esOscuro = montado && resolvedTheme === "dark";
  const etiqueta = !montado ? t("cambiar") : esOscuro ? t("aClaro") : t("aOscuro");

  return (
    <Boton
      variante="terciario"
      tamano="icono"
      aria-label={etiqueta}
      title={etiqueta}
      onClick={() => setTheme(esOscuro ? "light" : "dark")}
    >
      {/* Los íconos se alternan con CSS, así no saltan al hidratar */}
      <Moon className="dark:hidden" aria-hidden />
      <Sun className="hidden dark:block" aria-hidden />
    </Boton>
  );
}
