# Caso 2 · Salones UCC: reserva de aulas y auditorios

**Situación.** Hoy los salones se reservan por WhatsApp y por correo, y a veces dos grupos llegan al mismo salón. La universidad quiere un sistema donde docentes y administrativos reserven aulas y auditorios, con aprobación cuando haga falta.

**Datos de la clase (inventados)**
- 120 salones y 3 auditorios en 2 sedes; 400 docentes y 60 administrativos.
- Unas 300 reservas por semana; el primer lunes del semestre llegan más de 1 500.
- Los auditorios necesitan aprobación de la coordinación; las aulas no.

**Lo que ya se sabe del negocio**
- Un salón no se puede reservar dos veces en el mismo horario.
- Una reserva se puede cancelar hasta 24 horas antes; después queda registrada como «no asistió».
- Cada salón tiene capacidad y recursos (proyector, aire, computadores).
- Se avisa por correo cuando una reserva se aprueba, se rechaza o se cancela.

**Tu equipo decide:** estilo, atributos de calidad y si necesita algún patrón distribuido.
