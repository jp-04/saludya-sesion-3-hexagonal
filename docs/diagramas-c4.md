# Diagramas C4 en Mermaid (plantilla)

GitHub dibuja estos bloques directamente en cualquier `.md`. Cambia los nombres por los de tu sistema.

## Nivel 1 · Contexto: quién usa el sistema y con qué otros sistemas habla
```mermaid
flowchart TB
  paciente(["Paciente<br/>[Persona]"])
  recepcion(["Recepcionista<br/>[Persona]"])
  saludya["SaludYa · Agenda de citas<br/>[Sistema]"]
  correo["Servicio de correo<br/>[Sistema externo]"]
  paciente -->|pide y cancela citas| saludya
  recepcion -->|administra agendas| saludya
  saludya -->|envía confirmaciones| correo
```

## Nivel 2 · Contenedores: las piezas que se despliegan
```mermaid
flowchart TB
  web["Aplicación web<br/>[Contenedor: navegador]"]
  api["API de citas<br/>[Contenedor: servicio]"]
  bd[("Base de datos<br/>[Contenedor: BD]")]
  correo["Servicio de correo<br/>[Externo]"]
  web -->|HTTPS/JSON| api
  api -->|lee y escribe| bd
  api -->|envía correos| correo
```
Cada flecha lleva un verbo y, si importa, la tecnología. Si dos cajas hacen lo mismo, probablemente sobra una.
