# Caso 5 · ParqueUCC: control de parqueaderos

**Situación.** Una universidad tiene dos parqueaderos con barrera. Hoy se cobra a mano y no se sabe cuántos cupos quedan. Quiere registrar entradas y salidas por placa, cobrar según el tiempo y mostrar los cupos disponibles.

**Datos de la clase (inventados)**
- 2 parqueaderos con 300 y 120 cupos; 2 barreras de entrada y 2 de salida.
- Unos 1 500 ingresos al día, concentrados entre las 6:30 y las 8:00 a. m.
- Hay 400 mensualidades (docentes y administrativos) y el resto paga por hora o fracción.

**Lo que ya se sabe del negocio**
- Cada ingreso se registra con la placa y la hora; al salir se calcula el valor según la tarifa.
- Quien tiene mensualidad vigente no paga al salir.
- Si no quedan cupos, la barrera de entrada no abre.
- El pago se hace en caja o con una pasarela (simulada en la clase).

**Tu equipo decide:** estilo, atributos de calidad y si necesita algún patrón distribuido.
