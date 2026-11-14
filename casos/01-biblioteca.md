# Caso 1 · BiblioUCC: préstamos de la biblioteca

**Situación.** La biblioteca de una universidad quiere reemplazar su hoja de cálculo de préstamos por un sistema propio. Estudiantes y docentes buscan libros, los reservan, los piden prestados y los devuelven; el personal de la biblioteca administra el catálogo.

**Datos de la clase (inventados)**
- 6 000 estudiantes y 300 docentes; 40 000 ejemplares.
- Unos 800 préstamos y devoluciones al día; en semana de parciales sube a unos 2 500.
- Los estudiantes consultan el catálogo desde el celular, casi siempre buscando por título o autor.

**Lo que ya se sabe del negocio**
- Un estudiante puede tener hasta 5 préstamos activos; un docente, 10.
- Un préstamo dura 7 días y se puede renovar 2 veces, salvo que otra persona tenga el libro reservado.
- Devolver tarde genera una multa por día; con multas pendientes no se puede prestar.
- Para saber quién es estudiante activo, la biblioteca consulta el sistema académico de la universidad (otro sistema, ya existente).

**Tu equipo decide:** estilo, atributos de calidad y si necesita algún patrón distribuido.
