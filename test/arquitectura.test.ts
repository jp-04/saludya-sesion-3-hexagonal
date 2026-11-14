// Función de aptitud («fitness function»): una prueba que vigila la ARQUITECTURA, no una funcionalidad.
// Si alguien (o un agente) hace que el dominio importe infraestructura, esta prueba se pone en rojo.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(RAIZ, "src");

function archivos(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const ruta = join(dir, n);
    return statSync(ruta).isDirectory() ? archivos(ruta) : ruta.endsWith(".ts") ? [ruta] : [];
  });
}

function importaciones(archivo: string): string[] {
  const texto = readFileSync(archivo, "utf-8");
  return [...texto.matchAll(/(?:import|export)[^;]*?from\s+["']([^"']+)["']/g)].map((m) => m[1]);
}

/** Convierte un import relativo en la carpeta de src a la que apunta (p. ej. "domain"). */
function destino(archivo: string, imp: string): string {
  return relative(SRC, resolve(dirname(archivo), imp)).split(/[\\/]/).join("/");
}

describe("Reglas de arquitectura", () => {
  it("hay código del dominio y de la aplicación que revisar", () => {
    expect(archivos(join(SRC, "domain")).length).toBeGreaterThan(0);
    expect(archivos(join(SRC, "application")).length).toBeGreaterThan(0);
  });

  it("el dominio no importa nada de afuera de sí mismo (ni de Node ni de otras capas)", () => {
    const malos: string[] = [];
    for (const a of archivos(join(SRC, "domain"))) {
      for (const imp of importaciones(a)) {
        const propio = imp.startsWith(".") && destino(a, imp).startsWith("domain");
        if (!propio) malos.push(`${relative(RAIZ, a)} importa «${imp}»`);
      }
    }
    expect(malos).toEqual([]);
  });

  it("la aplicación solo importa del dominio y de sí misma", () => {
    const malos: string[] = [];
    for (const a of archivos(join(SRC, "application"))) {
      for (const imp of importaciones(a)) {
        const ok = imp.startsWith(".") && /^(domain|application)(\/|$)/.test(destino(a, imp));
        if (!ok) malos.push(`${relative(RAIZ, a)} importa «${imp}»`);
      }
    }
    expect(malos).toEqual([]);
  });

  it("los adaptadores no se conocen entre sí: cada carpeta de infrastructure solo importa de domain, application o de sí misma", () => {
    const malos: string[] = [];
    for (const a of archivos(join(SRC, "infrastructure"))) {
      const carpeta = relative(join(SRC, "infrastructure"), a).split(/[\\/]/)[0];
      for (const imp of importaciones(a)) {
        if (!imp.startsWith(".")) continue; // node:fs etc. son válidos aquí, es la infraestructura
        const d = destino(a, imp);
        const ok = /^(domain|application)(\/|$)/.test(d) || d.startsWith(`infrastructure/${carpeta}`);
        if (!ok) malos.push(`${relative(RAIZ, a)} importa «${imp}»`);
      }
    }
    expect(malos).toEqual([]);
  });

  it("solo composicion.ts decide qué adaptador concreto se usa", () => {
    const malos: string[] = [];
    for (const a of archivos(SRC)) {
      const nombre = relative(SRC, a).split(/[\\/]/).join("/");
      if (nombre === "composicion.ts" || nombre.startsWith("infrastructure/")) continue;
      for (const imp of importaciones(a)) {
        if (imp.startsWith(".") && destino(a, imp).startsWith("infrastructure")) malos.push(`${nombre} importa «${imp}»`);
      }
    }
    expect(malos).toEqual([]);
  });
});
