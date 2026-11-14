import { describe, expect, it } from "vitest";
import { RangoHorario } from "../../src/domain/rango-horario";
import { RangoInvalidoError } from "../../src/domain/errores";
import { hora } from "../fakes";

describe("RangoHorario (objeto de valor)", () => {
  it("se crea cuando el fin es posterior al inicio", () => {
    const r = RangoHorario.crear(hora("09:00"), hora("09:30"));
    expect(r.duracionMinutos()).toBe(30);
  });

  it("no se crea si el fin es igual o anterior al inicio", () => {
    expect(() => RangoHorario.crear(hora("09:00"), hora("09:00"))).toThrow(RangoInvalidoError);
    expect(() => RangoHorario.crear(hora("10:00"), hora("09:00"))).toThrow(RangoInvalidoError);
  });

  it("se cruza con otro rango que comparte algún minuto", () => {
    const a = RangoHorario.crear(hora("09:00"), hora("10:00"));
    expect(a.seCruzaCon(RangoHorario.crear(hora("09:30"), hora("10:30")))).toBe(true);
    expect(a.seCruzaCon(RangoHorario.crear(hora("08:00"), hora("09:01")))).toBe(true);
  });

  it("no se cruza cuando uno termina justo donde empieza el otro", () => {
    const a = RangoHorario.crear(hora("09:00"), hora("10:00"));
    expect(a.seCruzaCon(RangoHorario.crear(hora("10:00"), hora("11:00")))).toBe(false);
    expect(a.seCruzaCon(RangoHorario.crear(hora("08:00"), hora("09:00")))).toBe(false);
  });

  it("dos rangos con las mismas horas son iguales (se definen por sus atributos)", () => {
    const a = RangoHorario.crear(hora("09:00"), hora("10:00"));
    const b = RangoHorario.crear(hora("09:00"), hora("10:00"));
    expect(a.igualA(b)).toBe(true);
  });

  it("es inmutable: cambiar la fecha original no cambia el rango", () => {
    const inicio = hora("09:00");
    const r = RangoHorario.crear(inicio, hora("10:00"));
    inicio.setUTCHours(23);
    expect(r.duracionMinutos()).toBe(60);
  });
});
