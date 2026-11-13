// Arregla un bug de Next 16 al exportar en Windows.
//
// El router pide los datos de prefetch como `__next.<segmento>.__PAGE__.txt`
// (con puntos), pero en Windows Next los escribe como carpetas
// (`__next.<segmento>/__PAGE__.txt`) porque arma el nombre con path.relative,
// que devuelve `\`, y después solo reemplaza `/` por `.`.
// En Linux (GitHub Actions) no pasa, y este script no encuentra nada que mover.

import { readdir, rename, rm, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const salida = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

/** Junta todos los archivos .txt que quedaron adentro de una carpeta `__next.*` */
async function archivosDentro(carpeta) {
  const encontrados = [];
  for (const entrada of await readdir(carpeta, { withFileTypes: true })) {
    const ruta = join(carpeta, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...(await archivosDentro(ruta)));
    else if (entrada.name.endsWith(".txt")) encontrados.push(ruta);
  }
  return encontrados;
}

async function recorrer(carpeta) {
  let movidos = 0;
  for (const entrada of await readdir(carpeta, { withFileTypes: true })) {
    if (!entrada.isDirectory() || entrada.name === "_next") continue;
    const ruta = join(carpeta, entrada.name);

    if (entrada.name.startsWith("__next.")) {
      // __next.!KGVzKQ/__PAGE__.txt  →  __next.!KGVzKQ.__PAGE__.txt
      for (const archivo of await archivosDentro(ruta)) {
        const resto = relative(ruta, archivo).split(sep).join(".");
        await rename(archivo, join(carpeta, `${entrada.name}.${resto}`));
        movidos++;
      }
      await rm(ruta, { recursive: true });
    } else {
      movidos += await recorrer(ruta);
    }
  }
  return movidos;
}

if (!(await stat(salida).catch(() => null))) {
  console.error("No existe out/: corré el build primero.");
  process.exit(1);
}
const movidos = await recorrer(salida);
if (movidos > 0) console.log(`arreglar-export-windows: ${movidos} archivos de prefetch renombrados`);
