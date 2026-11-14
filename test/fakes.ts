// Dobles de prueba: viven en test/, no en src/. Sirven para probar sin base de datos ni red.
import { Agenda } from "../src/domain/agenda";
import { AgendaRepositorio } from "../src/domain/agenda-repositorio";
import { Cita } from "../src/domain/cita";
import { EventBus, GeneradorId } from "../src/application/puertos";

export class AgendaRepositorioFalso implements AgendaRepositorio {
  private readonly datos = new Map<string, Agenda>();
  async porMedico(medicoId: string): Promise<Agenda> {
    const a = this.datos.get(medicoId);
    return a ? new Agenda(a.medicoId, a.citas().map((c) => Cita.reconstruir(c.id, c.pacienteId, c.rango, c.estado))) : new Agenda(medicoId);
  }
  async guardar(agenda: Agenda): Promise<void> {
    this.datos.set(agenda.medicoId, agenda);
  }
}

export class EventBusEspia implements EventBus {
  readonly emitidos: Array<{ nombre: string; datos: Record<string, unknown> }> = [];
  async emit(nombre: string, datos: Record<string, unknown>): Promise<void> {
    this.emitidos.push({ nombre, datos });
  }
}

export class GeneradorIdSecuencial implements GeneradorId {
  private n = 0;
  nuevo(): string {
    this.n += 1;
    return `cita-${this.n}`;
  }
}

/** Atajo para escribir horas sin repetir fechas: hora("09:00") */
export function hora(hhmm: string): Date {
  return new Date(`2026-11-16T${hhmm}:00Z`);
}
