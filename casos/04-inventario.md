# Caso 4 · Ferretería del Sinú: inventario de tres sedes

**Situación.** Una ferretería con tres sedes lleva el inventario en cuadernos y hojas de cálculo; a veces vende lo que ya no tiene. Quiere un sistema que muestre el inventario real en cada sede, registre compras y ventas y avise cuando algo se esté acabando.

**Datos de la clase (inventados)**
- 3 sedes, 9 000 productos distintos, 15 empleados.
- Unas 400 ventas al día entre las tres sedes; a fin de mes sube a unas 1 000.
- Una de las sedes tiene internet inestable.

**Lo que ya se sabe del negocio**
- Cada producto tiene un stock por sede y un mínimo; al bajar del mínimo se avisa al encargado de compras.
- Una venta descuenta del stock; una compra a proveedor lo aumenta; un traslado entre sedes descuenta en una y suma en otra.
- No se puede vender más de lo que hay en esa sede.
- El dueño pide reportes: lo más vendido, lo que no rota, valor total del inventario.

**Tu equipo decide:** estilo, atributos de calidad y si necesita algún patrón distribuido.
