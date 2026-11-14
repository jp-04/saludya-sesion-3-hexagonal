import { describe, expect, it } from "vitest";
import { Agenda } from "../../src/domain/agenda";
import { Cita } from "../../src/domain/cita";
import { CitaNoEncontradaError, CruceDeHorarioError } from "../../src/domain/errores";
import { RangoHorario } from "../../src/domain/rango-horario";
import { hora } from "../fakes";

const cita = (id: string, desde: string, hasta: string) =>
  Cita.nueva(id, "paciente-1", RangoHorario.crear(hora(desde), hora(hasta)));

// Estas pruebas no usan base de datos, ni archivos, ni red: así se reconoce un dominio puro.
describe("Agenda (agregado)", () => {
  it("agenda citas que no se cruzan", () => {
    const agenda = new Agenda("dra-martinez");
    agenda.agendar(cita("c1", "09:00", "09:30"));
    agenda.agendar(cita("c2", "09:30", "10:00"));
    expect(agenda.citas()).toHaveLength(2);
  });

  it("rechaza una cita que se cruza con otra activa", () => {
    const agenda = new Agenda("dra-martinez");
    agenda.agendar(cita("c1", "09:00", "09:30"));
    expect(() => agenda.agendar(cita("c2", "09:15", "09:45"))).toThrow(CruceDeHorarioError);
    expect(agenda.citas()).toHaveLength(1);
  });

  it("una cita cancelada libera su horario", () => {
    const agenda = new Agenda("dra-martinez");
    agenda.agendar(cita("c1", "09:00", "09:30"));
    agenda.cancelar("c1");
    agenda.agendar(cita("c2", "09:00", "09:30"));
    expect(agenda.citas().filter((c) => c.activa())).toHaveLength(1);
  });

  it("cancelar una cita que no existe avisa con un error claro", () => {
    const agenda = new Agenda("dra-martinez");
    expect(() => agenda.cancelar("no-existe")).toThrow(CitaNoEncontradaError);
  });

  it("no deja modificar la lista de citas desde afuera", () => {
    const agenda = new Agenda("dra-martinez");
    agenda.agendar(cita("c1", "09:00", "09:30"));
    (agenda.citas() as Cita[]).pop();
    expect(agenda.citas()).toHaveLength(1);
  });
});
