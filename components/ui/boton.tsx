import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const botonVariantes = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 rounded-boton",
    // Sin outline-none: el anillo naranja de foco viene de globals.css
    "font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,filter,transform] duration-150 ease-nodora",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variante: {
        // Degradado de marca, tinta oscura (el blanco sobre naranja no pasa AA)
        principal: [
          "degradado-marca text-tinta",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
          "hover:brightness-[1.04] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_0_0_4px_color-mix(in_srgb,var(--acento)_14%,transparent),0_8px_24px_-10px_var(--acento)]",
        ],
        secundario:
          "border border-borde bg-superficie text-texto hover:border-borde-fuerte hover:bg-superficie-2",
        terciario: "text-texto hover:bg-superficie-2",
      },
      tamano: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icono: "size-9 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variante: "principal",
      tamano: "md",
    },
  }
);

type PropsBoton = React.ComponentProps<"button"> &
  VariantProps<typeof botonVariantes> & {
    /** Renderiza el hijo (por ejemplo un Link) con los estilos del botón */
    asChild?: boolean;
  };

function Boton({ className, variante, tamano, asChild = false, ...props }: PropsBoton) {
  const Componente = asChild ? Slot.Root : "button";

  return (
    <Componente
      data-slot="boton"
      className={cn(botonVariantes({ variante, tamano }), className)}
      {...props}
    />
  );
}

export { Boton, botonVariantes };
