# Caso 3 · Barrio Express: domicilios de tiendas del barrio

**Situación.** Un grupo de tiendas de barrio en una ciudad intermedia quiere una aplicación propia de domicilios para no depender de las grandes plataformas. El cliente pide, paga, y un repartidor lo lleva.

**Datos de la clase (inventados)**
- 80 tiendas, 150 repartidores, 12 000 clientes registrados.
- Unos 600 pedidos al día; los viernes y sábados por la noche llegan 5 veces más en dos horas.
- El pago se hace con una pasarela externa (simulada en la clase).

**Lo que ya se sabe del negocio**
- Un pedido pasa por: creado, pagado, aceptado por la tienda, en camino, entregado. También puede cancelarse.
- Si el pago falla, el pedido no se envía a la tienda.
- Si la tienda no acepta en 5 minutos, el pedido se cancela y el cliente recibe su dinero de vuelta.
- El cliente ve en el celular dónde va su pedido.

**Tu equipo decide:** estilo, atributos de calidad y si necesita algún patrón distribuido.
