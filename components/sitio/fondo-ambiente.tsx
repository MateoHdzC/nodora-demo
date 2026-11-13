import { FondoNodos } from "@/components/sitio/fondo-nodos";

// Aurora (CSS) + red de nodos (Canvas) + grano. Va detrás del hero.
// Decorativo: invisible para lectores de pantalla y no captura clics.
export function FondoAmbiente() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      {/* Las manchas quedan a los costados y arriba, lejos del texto central */}
      <div className="absolute inset-0">
        <div className="aurora-mancha -top-40 -left-32 size-[34rem] bg-acento" />
        <div className="aurora-mancha -top-24 -right-40 size-[30rem] bg-acento-2" />
        <div className="aurora-mancha top-[28rem] left-[calc(50%-18rem)] size-[36rem] bg-acento" />
      </div>
      <FondoNodos />
      <div className="grano absolute inset-0" />
    </div>
  );
}
