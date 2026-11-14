import { describe, expect, it } from "vitest";
import { AgendarCita } from "../../src/application/agendar-cita";
import { CruceDeHorarioError, RangoInvalidoError } from "../../src/domain/errores";
import { AgendaRepositorioFalso, EventBusEspia, GeneradorIdSecuencial, hora } from "../fakes";

function armar() {
  const agendas = new AgendaRepositorioFalso();
  const eventos = new EventBusEspia();
  const caso = new AgendarCita(agendas, eventos, new GeneradorIdSecuencial());
  return { agendas, eventos, caso };
}
const cmd = (desde: string, hasta: string) => ({
  medicoId: "dra-martinez",
  pacienteId: "paciente-1",
  inicio: hora(desde),
  fin: hora(hasta),
});

describe("AgendarCita (caso de uso)", () => {
  it("guarda la cita y devuelve su id", async () => {
    const { agendas, caso } = armar();
    const id = await caso.ejecutar(cmd("09:00", "09:30"));
    expect(id).toBe("cita-1");
    const agenda = await agendas.porMedico("dra-martinez");
    expect(agenda.citas().map((c) => c.id)).toEqual(["cita-1"]);
  });

  it("emite cita.confirmada con el id de la cita", async () => {
    const { eventos, caso } = armar();
    await caso.ejecutar(cmd("09:00", "09:30"));
    expect(eventos.emitidos).toEqual([
      { nombre: "cita.confirmada", datos: { citaId: "cita-1", medicoId: "dra-martinez" } },
    ]);
  });

  it("si el horario se cruza, falla y no emite ningún evento", async () => {
    const { eventos, caso } = armar();
    await caso.ejecutar(cmd("09:00", "09:30"));
    await expect(caso.ejecutar(cmd("09:15", "09:45"))).rejects.toThrow(CruceDeHorarioError);
    expect(eventos.emitidos).toHaveLength(1);
  });

  it("si el rango es inválido, falla antes de guardar nada", async () => {
    const { agendas, caso } = armar();
    await expect(caso.ejecutar(cmd("10:00", "09:00"))).rejects.toThrow(RangoInvalidoError);
    expect((await agendas.porMedico("dra-martinez")).citas()).toHaveLength(0);
  });
});
