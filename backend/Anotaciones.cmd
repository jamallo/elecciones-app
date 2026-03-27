Creación de proyecto para ayudar a la ciudadanía a conocer los diferentes partidos políticos.

Creación del proyecto con JAVA 26, Spring Boot 4.0.4 el 26/03/2026.

Estructura del proyecto (backend):

src/main/java/com/elecciones/backend/
│
├── BackendApplication.java
│
├── config/                          # Configuración global
│   ├── CorsConfig.java [x] *****
│   ├── SwaggerConfig.java [x] *****
│   └── SeguridadConfig.java
│
├── excepcion/                        # Manejo de errores
│   ├── RecursoNoEncontradoExcepcion.java [x] *****
│   ├── ErrorValidacionExcepcion.java [x] *****
│   └── ManejadorGlobalExcepciones.java [x] *****
│
├── seguridad/                        # Autenticación y autorización
│   ├── JwtUtilidad.java
│   ├── FiltroAutenticacion.java
│   └── ServicioDetalleUsuario.java
│
├── util/                             # Utilidades comunes
│   └── FechaUtilidad.java
│
├── municipio/                        # Módulo municipio
│   ├── controlador/
│   │   └── MunicipioControlador.java [X] *****
│   ├── servicio/
│   │   └── MunicipioServicio.java [x] *****
│   ├── repositorio/
│   │   └── MunicipioRepositorio.java [x] *****
│   ├── modelo/
│   │   ├── entidad/
│   │   │   └── Municipio.java [x]  *****
│   │   └── dto/
│   │       └── MunicipioDTO.java [x] *****
│   └── mapeador/
│       └── MunicipioMapeador.java [x] *****
│
├── eleccion/                         # Módulo elección
│   ├── controlador/
│   │   └── EleccionControlador.java [x] *****
│   ├── servicio/
│   │   └── EleccionServicio.java
│   ├── repositorio/
│   │   └── EleccionRepositorio.java [x] *****
│   ├── modelo/
│   │   ├── entidad/
│   │   │   └── Eleccion.java [x] *****
│   │   └── dto/
│   │       ├── EleccionDTO.java
│   │       └── EleccionRespuestaDTO.java
│   └── mapeador/
│       └── EleccionMapeador.java
│
├── partido/                          # Módulo partido
│   ├── controlador/
│   │   └── PartidoControlador.java [x] *****
│   ├── servicio/
│   │   └── PartidoServicio.java [x] *****
│   ├── repositorio/
│   │   └── PartidoRepositorio.java [x] *****
│   ├── modelo/
│   │   ├── entidad/
│   │   │   ├── Partido.java [x] *****
│   │   │   └── InformacionPartido.java [x] *****
│   │   └── dto/
│   │       ├── PartidoDTO.java [x] *****
│   │       ├── PartidoResumenDTO.java [x] *****
│   │       └── InformacionPartidoDTO.java [x] *****
│   └── mapeador/
│       └── PartidoMapeador.java [x] *****
│
├── candidato/                        # Módulo candidato
│   ├── controlador/
│   │   └── CandidatoControlador.java
│   ├── servicio/
│   │   └── CandidatoServicio.java
│   ├── repositorio/
│   │   └── CandidatoRepositorio.java [x] *****
│   ├── modelo/
│   │   ├── entidad/
│   │   │   └── Candidato.java [x] *****
│   │   └── dto/
│   │       ├── CandidatoDTO.java
│   │       └── CandidatoDetalleDTO.java
│   └── mapeador/
│       └── CandidatoMapeador.java
│
├── evento/                           # Módulo evento
│   ├── controlador/
│   │   └── EventoControlador.java
│   ├── servicio/
│   │   └── EventoServicio.java
│   ├── repositorio/
│   │   └── EventoRepositorio.java [x] *****
│   ├── modelo/
│   │   ├── entidad/
│   │   │   └── Evento.java [x] *****
│   │   └── dto/
│   │       ├── EventoDTO.java
│   │       └── EventoCalendarioDTO.java
│   └── mapeador/
│       └── EventoMapeador.java
│
├── sede/                             # Módulo sede (incluye colegios electorales)
│   ├── controlador/
│   │   └── SedeControlador.java
│   ├── servicio/
│   │   └── SedeServicio.java
│   ├── repositorio/
│   │   └── SedeRepositorio.java [x] *****
│   ├── modelo/
│   │   ├── entidad/
│   │   │   └── Sede.java [x] *****
│   │   └── dto/
│   │       ├── SedeDTO.java
│   │       └── SedeMapaDTO.java
│   └── mapeador/
│       └── SedeMapeador.java
│
├── resultado/                        # Módulo resultados electorales
│   ├── controlador/
│   │   └── ResultadoControlador.java
│   ├── servicio/
│   │   └── ResultadoServicio.java
│   ├── repositorio/
│   │   └── ResultadoRepositorio.java
│   ├── modelo/
│   │   ├── entidad/
│   │   │   └── ResultadoAnterior.java [x] *****
│   │   └── dto/
│   │       ├── ResultadoDTO.java
│   │       └── GraficoResultadoDTO.java
│   └── mapeador/
│       └── ResultadoMapeador.java
│
└── censo/                            # Módulo censo electoral
    ├── controlador/
    │   └── CensoControlador.java
    ├── servicio/
    │   └── CensoServicio.java
    ├── repositorio/
    │   └── CensoRepositorio.java
    ├── modelo/
    │   ├── entidad/
    │   │   └── Censo.java
    │   └── dto/
    │       ├── CensoDTO.java
    │       └── MesaElectoralDTO.java
    └── mapeador/
        └── CensoMapeador.java

------------------------------------------------------

¿Por qué esta estructura?
Ventajas del enfoque por módulos:
Escalabilidad: Cada módulo es independiente. Si crece el proyecto, puedo añadir asamblea/, votacion/, etc.

Mantenibilidad: Si hay que modificar algo de partidos, todo está en partido/

Separación clara: Cada módulo tiene su propia responsabilidad

Facilidad para trabajar en equipo: Diferentes personas pueden trabajar en módulos distintos sin conflictos

Patrón interno dentro de cada módulo:
controlador/: Endpoints REST (capa de presentación)

servicio/: Lógica de negocio

repositorio/: Acceso a datos (Spring Data JPA)

modelo/entidad/: Entidades JPA (tablas de BD)

modelo/dto/: Objetos de transferencia (para API)

mapeador/: Conversión entre entidad ↔ DTO


----------------------------------------
#DÍA 2 (27/03/2026)

-> Creación de los repositorios (JPA)
-> Inicialización de datos
-> Ajustes de entidades
-> Actualización de mapeadores (MapStruct)
-> Modificación de DTOs
-> Primera prueba en swagger: funcionando correctamente.

##Estado actual del proyecto
-> API arranca correctamente
-> Base de datos conectada
-> Repositiriios funcionando
-> Swagger operativo
-> Primera capa funcional completa