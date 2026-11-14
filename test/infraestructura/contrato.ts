// «Prueba de contrato»: la misma batería se corre contra CADA adaptador del puerto AgendaRepositorio.
// Si un adaptador nuevo la pasa, se puede intercambiar por los otros sin tocar el dominio.
import { describe, expect, it } from "vitest";
import { Agenda } from "../../src/domain/agenda";
import { AgendaRepositorio } from "../../src/domain/agenda-repositorio";
import { Cita } from "../../src/domain/cita";
import { RangoHorario } from "../../src/domain/rango-horario";
import { hora } from "../fakes";

export function contratoRepositorio(nombre: string, fabrica: () => AgendaRepositorio | Promise<AgendaRepositorio>) {
  describe(`Contrato de AgendaRepositorio · ${nombre}`, () => {
    it("devuelve una agenda vacía si el médico no tiene citas", async () => {
      const repo = await fabrica();
      const agenda = await repo.porMedico("nadie");
      expect(agenda.medicoId).toBe("nadie");
      expect(agenda.citas()).toHaveLength(0);
    });

    it("lo que se guarda se recupera igual (id, paciente, horas y estado)", async () => {
      const repo = await fabrica();
      const agenda = new Agenda("m1");
      agenda.agendar(Cita.nueva("c1", "p1", RangoHorario.crear(hora("09:00"), hora("09:30"))));
      agenda.agendar(Cita.nueva("c2", "p2", RangoHorario.crear(hora("10:00"), hora("10:30"))));
      agenda.cancelar("c2");
      await repo.guardar(agenda);

      const leida = await repo.porMedico("m1");
      expect(leida.citas().map((c) => [c.id, c.pacienteId, c.estado])).toEqual([
        ["c1", "p1", "confirmada"],
        ["c2", "p2", "cancelada"],
      ]);
      expect(leida.citas()[0].rango.inicio.toISOString()).toBe("2026-11-16T09:00:00.000Z");
      expect(leida.citas()[0].rango.duracionMinutos()).toBe(30);
    });

    it("las agendas de médicos distintos no se mezclan", async () => {
      const repo = await fabrica();
      const a = new Agenda("m1");
      a.agendar(Cita.nueva("c1", "p1", RangoHorario.crear(hora("09:00"), hora("09:30"))));
      await repo.guardar(a);
      expect((await repo.porMedico("m2")).citas()).toHaveLength(0);
    });

    it("cambiar la agenda leída no cambia lo guardado hasta que se guarda", async () => {
      const repo = await fabrica();
      const a = new Agenda("m1");
      a.agendar(Cita.nueva("c1", "p1", RangoHorario.crear(hora("09:00"), hora("09:30"))));
      await repo.guardar(a);

      const leida = await repo.porMedico("m1");
      leida.agendar(Cita.nueva("c2", "p2", RangoHorario.crear(hora("11:00"), hora("11:30"))));
      expect((await repo.porMedico("m1")).citas()).toHaveLength(1);
    });
  });
}
