# nodora-demo

UI kit y demo navegable de **Nodora**, el portal de clientes para agencias y freelancers de LatAm. Es solo frontend, con datos falsos, y se publica como sitio estático en GitHub Pages.

## Correrlo

Requisitos: Node 24 (ver `.nvmrc`) y pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3100
```

El puerto es el 3100 porque el 3000 suele estar ocupado.

| Ruta | Qué hay |
|---|---|
| `/` y `/en/` | Inicio provisorio (la landing viene después) |
| `/kit/` y `/en/kit/` | Todos los componentes en sus variantes |

## Build para GitHub Pages

El sitio vive bajo `/nodora-demo/`, así que el build necesita el `basePath`:

```powershell
# PowerShell
$env:NEXT_PUBLIC_BASE_PATH = '/nodora-demo'; pnpm build
```

```bash
# Linux / CI (en Git Bash no: convierte "/nodora-demo" en una ruta de Windows)
NEXT_PUBLIC_BASE_PATH=/nodora-demo pnpm build
```

El resultado queda en `out/`. Para probarlo local, copiá `out/` a una carpeta llamada `nodora-demo` y serví la carpeta de arriba con `python -m http.server`.

> `scripts/arreglar-export-windows.mjs` corre después de `next build` y arregla un bug de Next 16 en Windows: los archivos de prefetch salen como carpetas en vez de `__next.<segmento>.__PAGE__.txt`. En Linux no hace nada.

## Cómo está armado

- **Idiomas sin middleware:** el export estático no tiene servidor, así que hay dos layouts raíz, `app/(es)` (español, sin prefijo) y `app/(en)/en` (inglés). Cada `page.tsx` es un envoltorio de una línea y la pantalla real vive en `pantallas/`. Los textos están en `mensajes/es.json` y `en.json`.
- **Tokens:** en `app/globals.css`, con los valores de DESIGN.md para claro (`:root`) y oscuro (`.dark`). Se usan como clases (`bg-fondo`, `text-texto-suave`, `border-borde`, `rounded-card`) y las variables de shadcn apuntan a los mismos tokens.
- **Movimiento:** duraciones y curva en `lib/movimiento.ts`. Con "reducir movimiento" solo quedan los fades. Se cambia la transición y no el estado inicial, para no generar diferencias de hidratación.
- **404:** `app/global-not-found.tsx` (experimental en Next 16), porque hay dos layouts raíz.

## Contraste (WCAG AA, mínimo 4.5:1)

| Texto | Sobre `fondo` | Sobre `superficie` | Sobre `superficie-2` |
|---|---|---|---|
| `texto` claro / oscuro | 17.12 / 16.62 | 18.15 / 15.56 | 15.97 / 14.38 |
| `texto-suave` claro / oscuro | 5.63 / 6.75 | 5.97 / 6.32 | 5.25 / 5.84 |
| `acento-texto` claro / oscuro | 4.73 / 8.10 | 5.01 / 7.58 | **4.41** / 7.01 |
| Tinta `#1C1410` sobre naranja / ámbar | 6.44 / 10.33 | | |

- En modo claro, **no pongas links naranjas sobre `superficie-2`**: da 4.41 y no llega a AA.
- El blanco sobre naranja da 2.82, por eso los botones naranjas llevan texto en tinta oscura.

## Lo que NO entra en esta demo

Es pública: no lleva backend, rutas de API, keys, lógica de cobros, prompts de IA ni la consola `/admin`. Los textos "de IA" son fijos y todos los datos son falsos. Lo de valor vive en el repo privado del producto.
