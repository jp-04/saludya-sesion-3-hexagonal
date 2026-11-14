# SaludYa · agenda de citas hexagonal (repositorio base de la sesión 3)

Repositorio de práctica del Módulo 1 del Diplomado en Desarrollo de Software Avanzado y Arquitectura de Aplicaciones.
No hay base de datos real, correo real ni datos reales: todo es en memoria o en un archivo JSON.

## Para empezar
Requisitos: Node.js 20 o superior, Git y un agente de programación (Claude Code, OpenCode o Codex).

```bash
npm install
npm test
```

**Las pruebas empiezan en rojo.** Aquí no hay código del negocio todavía: la carpeta `src/` no existe. Las pruebas de `test/` describen lo que el sistema debe hacer; el equipo (con su agente) lo construye.

## Qué hay aquí
| Carpeta o archivo | Para qué |
| --- | --- |
| `AGENTS.md` | Reglas del arquitecto para el agente (incluye la **regla de dependencia**). Claude Code lo lee desde `CLAUDE.md`; OpenCode y Codex lo leen directamente |
| `test/dominio/` | Etapa 1. Pruebas de `RangoHorario`, `Cita` y `Agenda`. No usan base de datos |
| `test/aplicacion/` | Etapa 2. Pruebas de los casos de uso `AgendarCita` y `CancelarCita` con dobles de prueba (`test/fakes.ts`) |
| `test/infraestructura/` | Etapas 3 y 5. Una misma «prueba de contrato» que cada repositorio debe pasar, y la prueba de intercambio |
| `test/arquitectura.test.ts` | Etapa 4. Vigila la **regla de dependencia**: no se edita |
| `casos/` | Cinco casos para el caso práctico (un sistema por equipo) |
| `docs/` | Plantillas: ADR, escenario de calidad y diagramas |

## Estructura que se espera construir
```
src/
├── domain/             # Reglas del negocio puras: rango-horario, cita, agenda, errores, agenda-repositorio (puerto)
├── application/        # Casos de uso: agendar-cita, cancelar-cita, puertos (EventBus, GeneradorId)
├── infrastructure/     # Adaptadores: persistence/, messaging/, http/, id/
└── composicion.ts      # Único lugar que elige los adaptadores: crearApp({ tipo: "memoria" | "json" })
```

## Cómo se trabaja
1. El equipo hace de **arquitecto**: glosario, modelo y reglas.
2. Abre una **issue** por etapa, con los criterios «qué prueba debe quedar en verde».
3. El agente propone un plan; el arquitecto lo aprueba o lo corrige.
4. El agente trabaja en una rama y abre un **pull request**.
5. El arquitecto **revisa**: pruebas en verde, reglas de `AGENTS.md`, nombres del glosario.

> Nunca compartas claves ni datos personales con un agente. Este repositorio solo contiene datos inventados.

Material de clase. Nada de lo que hay aquí acredita que la sesión se haya impartido.
