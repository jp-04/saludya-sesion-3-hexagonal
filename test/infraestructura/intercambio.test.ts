import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { crearApp, Persistencia } from "../../src/composicion";

// La prueba de cambio de repositorio: el MISMO escenario, solo cambia la opción de composición.
function persistencias(): Array<[string, Persistencia]> {
  const ruta = join(mkdtempSync(join(tmpdir(), "intercambio-")), "agendas.json");
  return [
    ["memoria", { tipo: "memoria" }],
    ["json", { tipo: "json", ruta }],
  ];
}

describe("Intercambio de repositorio (solo cambia la composición)", () => {
  for (const [nombre, persistencia] of persistencias()) {
    it(`mismo comportamiento con ${nombre}`, async () => {
      const app = crearApp(persistencia);
      const base = { medicoId: "dra-martinez", pacienteId: "paciente-1" };

      const ok = await app.controller.post({ ...base, inicio: "2026-11-16T09:00:00Z", fin: "2026-11-16T09:30:00Z" });
      expect(ok.status).toBe(201);

      const cruce = await app.controller.post({ ...base, inicio: "2026-11-16T09:15:00Z", fin: "2026-11-16T09:45:00Z" });
      expect(cruce.status).toBe(409);

      const mala = await app.controller.post({ ...base, inicio: "2026-11-16T10:00:00Z", fin: "2026-11-16T09:00:00Z" });
      expect(mala.status).toBe(400);

      const incompleta = await app.controller.post({ medicoId: "dra-martinez" });
      expect(incompleta.status).toBe(400);

      const agenda = await app.agendas.porMedico("dra-martinez");
      expect(agenda.citas()).toHaveLength(1);
      expect(app.eventos.emitidos.map((e) => e.nombre)).toEqual(["cita.confirmada"]);
    });
  }
});
