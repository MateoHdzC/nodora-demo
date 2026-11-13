"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Boton } from "@/components/ui/boton";

// Solo para el kit: vuelve a montar el logo para ver la animación otra vez
export function LogoRepetible({ textoBoton }: { textoBoton: string }) {
  const [vuelta, setVuelta] = useState(0);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Logo key={vuelta} animado className="[&_svg]:size-10 [&>span:last-child]:text-3xl" />
      <Boton variante="secundario" tamano="sm" onClick={() => setVuelta((v) => v + 1)}>
        <RotateCcw aria-hidden />
        {textoBoton}
      </Boton>
    </div>
  );
}
