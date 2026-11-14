import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AgendaRepositorioJson } from "../../src/infrastructure/persistence/agenda-repositorio-json";
import { contratoRepositorio } from "./contrato";

contratoRepositorio("archivo JSON", () => {
  const carpeta = mkdtempSync(join(tmpdir(), "agendas-"));
  return new AgendaRepositorioJson(join(carpeta, "agendas.json"));
});
