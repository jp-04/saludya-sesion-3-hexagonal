# Reglas del arquitecto para este repositorio

Este archivo lo leen los agentes de programación (Claude Code, OpenCode, Codex y otros) antes de trabajar.
Lo escribe y lo mantiene la persona que hace de arquitecto: aquí se fija lo que el agente **puede** y **no puede** hacer.

## Qué es este proyecto
Agenda de citas de **SaludYa** (red de clínicas), con **arquitectura hexagonal**. Es un ejemplo de clase:
no hay base de datos real ni servicios externos reales; todo es en memoria o en un archivo JSON.
Lenguaje: TypeScript. Pruebas: Vitest.

## Comandos
- Instalar: `npm install`
- Todas las pruebas: `npm test`
- Por etapa: `npm run test:dominio` · `test:aplicacion` · `test:memoria` · `test:arquitectura` · `test:json`
- Revisar tipos: `npm run typecheck`

## Reglas que no se pueden romper
1. **Las pruebas existentes no se editan para que pasen.** Si una prueba falla, se corrige el código en `src/`. Las pruebas nuevas van en archivos nuevos.
2. **Todo el código nuevo va en `src/`.** No toques `test/`, `casos/` ni los archivos de la raíz.
3. **Un cambio, un propósito, un commit pequeño.** Mensaje con el formato `tipo(alcance): qué cambió`, por ejemplo `feat(dominio): agrega RangoHorario`.
4. **No agregues dependencias nuevas** sin pedirlo antes.
5. **Nunca escribas claves, contraseñas ni datos personales** en el código, ni los pidas.
6. **Sin sobrediseño:** nada de clases, capas o patrones que ninguna prueba ni regla pida.

## Cómo trabajar
1. Antes de tocar código, **explica tu plan en pasos cortos y espera aprobación**.
2. Trabaja por etapas, en este orden, y no pases a la siguiente con la anterior en rojo:
   dominio → aplicación → adaptador en memoria → arquitectura → adaptador JSON.
3. Después de cada paso corre las pruebas de esa etapa. Si fallan, arregla antes de seguir.
4. Al terminar, resume qué archivos creaste, qué reglas cumpliste y qué no pudiste verificar.

## Reglas de arquitectura (la regla de dependencia)
Las dependencias de código **solo apuntan hacia adentro**: `infrastructure` → `application` → `domain`.
- `src/domain/`: reglas del negocio. **No importa nada** de fuera de `src/domain/` (ni `node:*`, ni librerías, ni otras carpetas). No usa `new Date()` sin recibirla, ni genera ids, ni lee archivos.
- `src/application/`: casos de uso. Importa **solo** de `domain/` y de `application/`. Habla con el exterior únicamente por puertos (interfaces).
- `src/infrastructure/`: adaptadores. Implementan los puertos. Un adaptador **no importa** a otro de otra carpeta.
- `src/composicion.ts`: **único** lugar donde se decide qué adaptador concreto se usa.
- Los puertos son interfaces: `AgendaRepositorio` (en `domain/`), `EventBus` y `GeneradorId` (en `application/`).
- Lenguaje ubicuo: usa los nombres del glosario del equipo (Cita, Agenda, Paciente, Médico, RangoHorario…), no `data`, `item`, `manager`.
- _(Añade aquí las reglas propias de tu equipo, en frases cortas y verificables.)_
