import * as React from "react";
import { cn } from "cn";
import { Slot } from "radix-ui";

type PropsCard = React.ComponentProps<"div"> & {
  /** Card clickeable: el borde cambia apenas en hover, sin sombra */
  interactiva?: boolean;
  /** Renderiza el hijo (por ejemplo un Link) con los estilos de la card */
  asChild?: boolean;
};

export function Card({ className, interactiva, asChild, ...props }: PropsCard) {
  const Componente = asChild ? Slot.Root : "div";

  return (
    <Componente
      data-slot="card"
      className={cn(
        "block rounded-card border border-borde bg-superficie p-6 text-texto",
        interactiva &&
          "transition-colors duration-150 ease-nodora hover:border-borde-fuerte",
        className
      )}
      {...props}
    />
  );
}

export function CardTitulo({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-base font-semibold", className)} {...props} />;
}

export function CardTexto({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-1 text-sm text-texto-suave", className)} {...props} />;
}
