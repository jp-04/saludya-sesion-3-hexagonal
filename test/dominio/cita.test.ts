import { describe, expect, it } from "vitest";
import { Cita } from "../../src/domain/cita";
import { CitaYaCanceladaError } from "../../src/domain/errores";
import { RangoHorario } from "../../src/domain/rango-horario";
import { hora } from "../fakes";

const rango = () => RangoHorario.crear(hora("09:00"), hora("09:30"));

describe("Cita (entidad)", () => {
  it("nace confirmada y activa", () => {
    const c = Cita.nueva("c1", "paciente-1", rango());
    expect(c.estado).toBe("confirmada");
    expect(c.activa()).toBe(true);
  });

  it("al cancelarla deja de estar activa pero conserva su identidad", () => {
    const c = Cita.nueva("c1", "paciente-1", rango());
    c.cancelar();
    expect(c.estado).toBe("cancelada");
    expect(c.activa()).toBe(false);
    expect(c.id).toBe("c1");
  });

  it("no se puede cancelar dos veces", () => {
    const c = Cita.nueva("c1", "paciente-1", rango());
    c.cancelar();
    expect(() => c.cancelar()).toThrow(CitaYaCanceladaError);
  });
});
