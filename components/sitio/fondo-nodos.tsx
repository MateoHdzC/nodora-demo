"use client";

import { useEffect, useRef } from "react";

// Red de nodos del fondo: puntos que se mueven despacio y se unen con líneas
// finas cuando están cerca. Canvas 2D propio, sin librerías.
// Solo dibuja mientras se ve en pantalla y la pestaña está activa.

type Nodo = { x: number; y: number; vx: number; vy: number; acento: boolean };

const DISTANCIA_MAX = 140; // px: más lejos que esto no se unen
const VELOCIDAD = 0.18; // px por cuadro

export function FondoNodos() {
  const lienzoRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const lienzo = lienzoRef.current;
    const ctx = lienzo?.getContext("2d");
    if (!lienzo || !ctx) return;

    const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let nodos: Nodo[] = [];
    let ancho = 0;
    let alto = 0;
    let colores = { linea: "", nodo: "", acento: "" };
    let visible = true;
    let pedido = 0;
    let cuadros = 0;

    const leerColores = () => {
      const estilos = getComputedStyle(document.documentElement);
      colores = {
        linea: estilos.getPropertyValue("--texto-suave").trim(),
        nodo: estilos.getPropertyValue("--texto-suave").trim(),
        acento: estilos.getPropertyValue("--acento").trim(),
      };
    };

    const crearNodos = () => {
      const cantidad = ancho < 768 ? 18 : 40;
      nodos = Array.from({ length: cantidad }, (_, i) => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        vx: (Math.random() - 0.5) * 2 * VELOCIDAD,
        vy: (Math.random() - 0.5) * 2 * VELOCIDAD,
        acento: i % 7 === 0,
      }));
    };

    const ajustarTamano = () => {
      // Densidad de píxeles limitada a 2: más no se nota y cuesta el doble
      const densidad = Math.min(window.devicePixelRatio || 1, 2);
      const caja = lienzo.getBoundingClientRect();
      // El ResizeObserver avisa una vez al empezar: si no cambió nada, no se rearma
      if (caja.width === ancho && caja.height === alto) return;
      ancho = caja.width;
      alto = caja.height;
      lienzo.width = Math.round(ancho * densidad);
      lienzo.height = Math.round(alto * densidad);
      ctx.setTransform(densidad, 0, 0, densidad, 0, 0);
      crearNodos();
      dibujar();
    };

    const dibujar = () => {
      ctx.clearRect(0, 0, ancho, alto);

      ctx.lineWidth = 1;
      ctx.strokeStyle = colores.linea;
      for (let i = 0; i < nodos.length; i++) {
        for (let j = i + 1; j < nodos.length; j++) {
          const dx = nodos[i].x - nodos[j].x;
          const dy = nodos[i].y - nodos[j].y;
          const distancia = Math.hypot(dx, dy);
          if (distancia > DISTANCIA_MAX) continue;
          ctx.globalAlpha = (1 - distancia / DISTANCIA_MAX) * 0.16;
          ctx.beginPath();
          ctx.moveTo(nodos[i].x, nodos[i].y);
          ctx.lineTo(nodos[j].x, nodos[j].y);
          ctx.stroke();
        }
      }

      for (const n of nodos) {
        ctx.globalAlpha = n.acento ? 0.55 : 0.3;
        ctx.fillStyle = n.acento ? colores.acento : colores.nodo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.acento ? 2 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      cuadros++;
      lienzo.dataset.cuadros = String(cuadros); // para verificar la pausa en las pruebas
    };

    const mover = () => {
      for (const n of nodos) {
        n.x += n.vx;
        n.y += n.vy;
        // Rebotan contra los bordes
        if (n.x < 0 || n.x > ancho) n.vx *= -1;
        if (n.y < 0 || n.y > alto) n.vy *= -1;
      }
    };

    const cuadro = () => {
      mover();
      dibujar();
      pedido = requestAnimationFrame(cuadro);
    };

    const arrancar = () => {
      if (sinMovimiento || pedido || !visible || document.hidden) return;
      pedido = requestAnimationFrame(cuadro);
    };
    const pausar = () => {
      cancelAnimationFrame(pedido);
      pedido = 0;
    };

    leerColores();
    ajustarTamano();
    arrancar();

    const observadorTamano = new ResizeObserver(ajustarTamano);
    observadorTamano.observe(lienzo);

    // Fuera de pantalla no se dibuja
    const observadorVista = new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
      if (visible) arrancar();
      else pausar();
    });
    observadorVista.observe(lienzo);

    // Pestaña oculta tampoco
    const alCambiarPestana = () => (document.hidden ? pausar() : arrancar());
    document.addEventListener("visibilitychange", alCambiarPestana);

    // Al cambiar de modo, los colores cambian: se releen y se redibuja
    const observadorTema = new MutationObserver(() => {
      leerColores();
      dibujar();
    });
    observadorTema.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      pausar();
      observadorTamano.disconnect();
      observadorVista.disconnect();
      observadorTema.disconnect();
      document.removeEventListener("visibilitychange", alCambiarPestana);
    };
  }, []);

  return (
    <canvas
      ref={lienzoRef}
      aria-hidden
      // La red se desvanece en el centro, detrás del titular y el subtítulo:
      // un nodo gris detrás de texto gris bajaría el contraste en ese punto.
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_44%_32%_at_50%_27%,transparent_55%,black_100%)]"
    />
  );
}
