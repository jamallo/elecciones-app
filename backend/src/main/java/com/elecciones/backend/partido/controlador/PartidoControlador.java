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
import com.elecciones.backend.sede.modelo.entidad.Sede;
import com.elecciones.backend.sede.repositorio.SedeRepositorio;
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
    private final CandidatoRepositorio candidatoRepositorio;
    private final EventoRepositorio eventoRepositorio;
    private final SedeRepositorio sedeRepositorio;

    @GetMapping
    @Operation(summary = "Listar todos los partidos")
    public ResponseEntity<List<PartidoResumenDTO>> listarTodos() {
        return ResponseEntity.ok(partidoServicio.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener partido por ID con toda la información")
    public ResponseEntity<PartidoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(partidoServicio.buscarPorId(id));
    }

    @GetMapping("/{id}/resumen")
    @Operation(summary = "Obtener resumen del partido")
    public ResponseEntity<PartidoResumenDTO> obtenerResumen(@PathVariable Long id) {
        return ResponseEntity.ok(partidoServicio.buscarResumenPorId(id));
    }

    @GetMapping("/eleccion/{eleccionId}")
    @Operation(summary = "Listar partidos por elección")
    public ResponseEntity<List<PartidoResumenDTO>> listarPorEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(partidoServicio.buscarPorEleccion(eleccionId));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar partidos por nombre")
    public ResponseEntity<List<PartidoResumenDTO>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(partidoServicio.buscarPorNombre(nombre));
    }

    @GetMapping("/{id}/candidatos")
    @Operation(summary = "Obtener candidatos de un partido")
    public ResponseEntity<List<Candidato>> obtenerCandidato(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoRepositorio.findByPartidoIdOrderByPosicionListaAsc(id));
    }

    @GetMapping("/{id}/eventos")
    @Operation(summary = "Obtener eventos de un partido")
    public ResponseEntity<List<Evento>> obtenerEventos(@PathVariable Long id) {
        return ResponseEntity.ok(eventoRepositorio.findByPartidoIdOrderByFechaAsc(id));
    }

    @GetMapping("/{id}/sedes")
    @Operation(summary = "Obtener sedes de un partido")
    public ResponseEntity<List<Sede>> obtenerSedes(@PathVariable Long id) {
        return ResponseEntity.ok(sedeRepositorio.findByPartidoIdAndTipo(id, "SEDE_PARTIDO"));
    }

    @GetMapping("/{id}/información")
    @Operation(summary = "Obtener información detallada de un partido")
    public ResponseEntity<InformacionPartidoDTO> obtenerInformacion(@PathVariable Long id) {
        PartidoDTO partido = partidoServicio.buscarPorId(id);
        return ResponseEntity.ok(partido.getInformacion());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo partido")
    public ResponseEntity<PartidoDTO> crear(@RequestBody PartidoDTO partidoDTO) {
        return new ResponseEntity<>(partidoServicio.crear(partidoDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/información")
    @Operation(summary = "Actualizar información de un partido")
    public ResponseEntity<InformacionPartidoDTO> actualizarInformacion(
            @PathVariable Long id,
            @RequestBody InformacionPartidoDTO informacionDTO) {
        return ResponseEntity.ok(partidoServicio.actualizarInformacion(id, informacionDTO));
    }


}
