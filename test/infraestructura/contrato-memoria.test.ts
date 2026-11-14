import { AgendaRepositorioMemoria } from "../../src/infrastructure/persistence/agenda-repositorio-memoria";
import { contratoRepositorio } from "./contrato";

contratoRepositorio("memoria", () => new AgendaRepositorioMemoria());
