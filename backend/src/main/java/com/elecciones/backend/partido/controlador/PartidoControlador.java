package com.elecciones.backend.partido.controlador;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.candidato.repositorio.CandidatoRepositorio;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.evento.repositorio.EventoRepositorio;
import com.elecciones.backend.partido.modelo.dto.InformacionPartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoResumenDTO;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import com.elecciones.backend.partido.servicio.PartidoServicio;
import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionDTO;
import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionResumenDTO;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import com.elecciones.backend.sede.repositorio.SedeRepositorio;
import com.elecciones.backend.tema.modelo.dto.TemaDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partidos")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Partidos", description = "API para gestión de partidos políticos")
public class PartidoControlador {

    private final PartidoServicio partidoServicio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final CandidatoRepositorio candidatoRepositorio;
    private final EventoRepositorio eventoRepositorio;
    private final SedeRepositorio sedeRepositorio;

    //Para partidos (CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR PARTIDO - CREATE) - SOLO ADMINISTRADORES
    @PostMapping("/admin")
    @Operation(summary = "Crear nuevo partido (solo administradores")
    public ResponseEntity<PartidoDTO> crearPartido(@RequestBody PartidoDTO partidoDTO) {
        return new ResponseEntity<>(partidoServicio.crearPartido(partidoDTO), HttpStatus.CREATED);
    }

    //CRUD (BUSCAR LISTAR TODOS LOS PARTIDOS - READ)
    @GetMapping
    @Operation(summary = "Listar todos los partidos")
    public ResponseEntity<List<PartidoResumenDTO>> listarTodos() {
        return ResponseEntity.ok(partidoServicio.listarTodos());
    }

    //CRUD (BUSCAR PARTIDO - READ)
    @GetMapping("/{id}")
    @Operation(summary = "Obtener partido por ID con toda la información")
    public ResponseEntity<PartidoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(partidoServicio.buscarPorId(id));

    }

    //CRUD (ACTUALIZAR PARTIDO - UPDATE) - SOLO PARA ADMINISTRADORES
    @PutMapping("/admin/{id}")
    @Operation(summary = "Actualizar partido existente (solo administradores")
    public ResponseEntity<PartidoDTO> actualizarPartido(
            @PathVariable Long id,
            @RequestBody PartidoDTO partidoDTO) {
        return ResponseEntity.ok(partidoServicio.actualizarPartido(id, partidoDTO));
    }

    //CRUD (ELIMINAR PARTIDO - DELETE)
    @DeleteMapping("/admin/{id}")
    @Operation(summary = "Eliminar partido (solo administradores")
    public ResponseEntity<Void> eliminarPartido(@PathVariable Long id) {
        partidoServicio.eliminarPartido(id);
        return ResponseEntity.noContent().build();
    }

    //----------------------------------------------
    //Para participación completa
    @GetMapping("/participacion/{partidoEleccionId}")
    @Operation(summary = "Obtener participación completa por ID (partido + elección + información)")
    public ResponseEntity<PartidoEleccionDTO> obtenerParticipacionCompleta(@PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(partidoServicio.obtenerParticipacionCompleta(partidoEleccionId));
    }

    //Para participación (Partido-elección)
    @PostMapping("/participacion")
    @Operation(summary = "Asociar un partido a una elección con información específica")
    public ResponseEntity<PartidoEleccionDTO> crearParticipacion(@RequestBody PartidoEleccionDTO participacionDTO) {
        return new ResponseEntity<>(partidoServicio.crearParticipacion(participacionDTO), HttpStatus.CREATED);
    }

    @GetMapping("/eleccion/{eleccionId}")
    @Operation(summary = "Listar partidos por elección")
    public ResponseEntity<List<PartidoResumenDTO>> listarPorEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(partidoServicio.buscarPorEleccion(eleccionId));
    }

    @GetMapping("/eleccion/{tipo}/{ambito}")
    @Operation(summary = "Listar partidos por tipo y ámbito de elección")
    public ResponseEntity<List<PartidoEleccionResumenDTO>> listarPorEleccionTipoAmbito(
            @PathVariable String tipo,
            @PathVariable String ambito) {
        return ResponseEntity.ok(partidoServicio.buscarPorEleccionTipoAmbito(tipo, ambito));
    }

        // Obtener información de un partido para una elección específica
    @GetMapping("/participacion/{partidoEleccionId}/informacion")
    @Operation(summary = "Obtener información detallada de un partido para una elección específica")
    public ResponseEntity<InformacionPartidoDTO> obtenerInformacionPorParticipacion(
            @PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(partidoServicio.obtenerInformacion(partidoEleccionId));
    }

    @PutMapping("/{id}/información")
    @Operation(summary = "Actualizar información de un partido")
    public ResponseEntity<InformacionPartidoDTO> actualizarInformacion(
            @PathVariable Long partidoEleccionid,
            @RequestBody InformacionPartidoDTO informacionDTO) {
        return ResponseEntity.ok(partidoServicio.actualizarInformacion(partidoEleccionid, informacionDTO));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar partidos por nombre")
    public ResponseEntity<List<PartidoResumenDTO>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(partidoServicio.buscarPorNombre(nombre));
    }

    @GetMapping("/{id}/tema")
    @Operation(summary = "Obtener tema visual de un partido")
    public ResponseEntity<TemaDTO> obtenerTemaPartido(@PathVariable Long id) {

        TemaDTO tema = new TemaDTO();

        tema.setColorPrincipal(partidoServicio.buscarPorId(id).getColorPrimario());
        tema.setColorSecundario(partidoServicio.buscarPorId(id).getColorSecundario());
        tema.setColorAcento(partidoServicio.buscarPorId(id).getColorAcento());
        tema.setColorFondo(partidoServicio.buscarPorId(id).getColorFondo());
        tema.setTipo("PARTIDO");
        tema.setNombre(partidoServicio.buscarPorId(id).getNombre());
        tema.setSiglas(partidoServicio.buscarPorId(id).getSiglas());

        return ResponseEntity.ok(tema);
    }

    @GetMapping("/{id}/resumen")
    @Operation(summary = "Obtener resumen del partido")
    public ResponseEntity<PartidoResumenDTO> obtenerResumen(@PathVariable Long id) {
        return ResponseEntity.ok(partidoServicio.buscarResumenPorId(id));
    }




    /*@GetMapping("/{id}/candidatos")
    @Operation(summary = "Obtener candidatos de un partido")
    public ResponseEntity<List<Candidato>> obtenerCandidato(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoRepositorio.findByPartidoIdOrderByPosicionListaAsc(id));
    }*/

    // Obtener candidatos de un partido para una elección específica
    @GetMapping("/{partidoId}/eleccion/{eleccionId}/candidatos")
    @Operation(summary = "Obtener candidatos de un partido para una elección específica")
    public ResponseEntity<List<Candidato>> obtenerCandidatosPorPartidoYEleccion(
            @PathVariable Long partidoId,
            @PathVariable Long eleccionId) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio
                .findByPartidoIdAndEleccionId(partidoId, eleccionId)
                .orElseThrow(() -> new RuntimeException("Participación electoral no encontrada"));
        return ResponseEntity.ok(candidatoRepositorio.findByPartidoEleccionIdOrderByPosicionListaAsc(partidoEleccion.getId()));
    }

    @GetMapping("/{id}/eventos")
    @Operation(summary = "Obtener eventos de un partido")
    public ResponseEntity<List<Evento>> obtenerEventos(@PathVariable Long id) {
        return ResponseEntity.ok(eventoRepositorio.findByPartidoEleccionIdOrderByFechaAsc(id));
    }

    // Obtener eventos de un partido para una elección específica
    @GetMapping("/{partidoId}/eleccion/{eleccionId}/eventos")
    @Operation(summary = "Obtener eventos de un partido para una elección específica")
    public ResponseEntity<List<Evento>> obtenerEventosPorPartidoYEleccion(
            @PathVariable Long partidoId,
            @PathVariable Long eleccionId) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio
                .findByPartidoIdAndEleccionId(partidoId, eleccionId)
                .orElseThrow(() -> new RuntimeException("Participación electoral no encontrada"));
        return ResponseEntity.ok(eventoRepositorio.findByPartidoEleccionIdOrderByFechaAsc(partidoEleccion.getId()));
    }

    @GetMapping("/{id}/sedes")
    @Operation(summary = "Obtener sedes de un partido")
    public ResponseEntity<List<Sede>> obtenerSedes(@PathVariable Long id) {
        return ResponseEntity.ok(sedeRepositorio.findByPartidoEleccionIdAndTipo(id, "SEDE_PARTIDO"));
    }

    // Obtener sedes de un partido para una elección específica
    @GetMapping("/{partidoId}/eleccion/{eleccionId}/sedes")
    @Operation(summary = "Obtener sedes de un partido para una elección específica")
    public ResponseEntity<List<Sede>> obtenerSedesPorPartidoYEleccion(
            @PathVariable Long partidoId,
            @PathVariable Long eleccionId) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio
                .findByPartidoIdAndEleccionId(partidoId, eleccionId)
                .orElseThrow(() -> new RuntimeException("Participación electoral no encontrada"));
        return ResponseEntity.ok(sedeRepositorio.findByPartidoEleccionIdAndTipo(partidoEleccion.getId(), "SEDE_PARTIDO"));
    }

    /*@GetMapping("/{id}/información")
    @Operation(summary = "Obtener información detallada de un partido")
    public ResponseEntity<InformacionPartidoDTO> obtenerInformacion(@PathVariable Long id) {
        PartidoDTO partido = partidoServicio.buscarPorId(id);
        return ResponseEntity.ok(partido.getInformacion());
    }*/

    // Obtener información de un partido para una elección específica
    @GetMapping("/{partidoId}/eleccion/{eleccionId}/informacion")
    @Operation(summary = "Obtener información detallada de un partido para una elección específica")
    public ResponseEntity<InformacionPartidoDTO> obtenerInformacionPorPartidoYEleccion(
            @PathVariable Long partidoId,
            @PathVariable Long eleccionId) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio
                .findByPartidoIdAndEleccionId(partidoId, eleccionId)
                .orElseThrow(() -> new RuntimeException("Participación electoral no encontrada"));
        return ResponseEntity.ok(partidoServicio.actualizarInformacion(partidoEleccion.getId(), null));
        // TODO: crear método getInformacion
    }


}
