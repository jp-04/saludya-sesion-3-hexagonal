import { describe, expect, it } from "vitest";
import { AgendarCita } from "../../src/application/agendar-cita";
import { CancelarCita } from "../../src/application/cancelar-cita";
import { AgendaRepositorioFalso, EventBusEspia, GeneradorIdSecuencial, hora } from "../fakes";

describe("CancelarCita (caso de uso)", () => {
  it("cancela la cita, libera el horario y emite cita.cancelada", async () => {
    const agendas = new AgendaRepositorioFalso();
    const eventos = new EventBusEspia();
    const agendar = new AgendarCita(agendas, eventos, new GeneradorIdSecuencial());
    const cancelar = new CancelarCita(agendas, eventos);

    const id = await agendar.ejecutar({ medicoId: "m1", pacienteId: "p1", inicio: hora("09:00"), fin: hora("09:30") });
    await cancelar.ejecutar({ medicoId: "m1", citaId: id });

    const agenda = await agendas.porMedico("m1");
    expect(agenda.citas()[0].estado).toBe("cancelada");
    expect(eventos.emitidos.map((e) => e.nombre)).toEqual(["cita.confirmada", "cita.cancelada"]);
    // el horario quedó libre
    await expect(
      agendar.ejecutar({ medicoId: "m1", pacienteId: "p2", inicio: hora("09:00"), fin: hora("09:30") }),
    ).resolves.toBe("cita-2");
  });
});
