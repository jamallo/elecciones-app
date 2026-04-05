package com.elecciones.backend.candidato.controlador;

import com.elecciones.backend.candidato.modelo.dto.CandidatoDTO;
import com.elecciones.backend.candidato.modelo.dto.CandidatoDetalleDTO;
import com.elecciones.backend.candidato.servicio.CandidatoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatos")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Candidatos", description = "API para la gestión de candidatos")
public class CandidatoControlador {

    private final CandidatoServicio candidatoServicio;

    //Para candidatos (CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR PARTIDO - CREATE) - SOLO ADMINISTRADORES
    @PostMapping("/admin")
    @Operation(summary = "Crear nuevo candidato (solo administradores)")
    public ResponseEntity<CandidatoDTO> crear(@RequestBody CandidatoDTO candidatoDTO) {
        return new ResponseEntity<>(candidatoServicio.crear(candidatoDTO), HttpStatus.CREATED);
    }

    //CRUD (BUSCAR LISTAR TODOS LOS CANDIDATOS - READ) - SOLO ADMINISTRADORES
    @GetMapping("/admin")
    @Operation(summary = "Listar todos los candidatos (solo administradores")
    public ResponseEntity<List<CandidatoDetalleDTO>> listarTodos() {
        return ResponseEntity.ok(candidatoServicio.listarTodos());
    }

    //CRUD (BUSCAR CANDIDATO - READ)
    @GetMapping("/{id}")
    @Operation(summary = "Obtener candidato por ID")
    public ResponseEntity<CandidatoDetalleDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(candidatoServicio.buscarPorId(id));
    }

    //CRUD (ACTUALIZAR CANDIDATO - UPDATE) - SOLO PARA ADMINISTRADORES
    @PutMapping("/admin/{id}")
    @Operation(summary = "Actualizar candidato (solo administradores")
    public ResponseEntity<CandidatoDTO> actualizar (
            @PathVariable Long id, @RequestBody CandidatoDTO candidatoDTO
    ) {

        return ResponseEntity.ok(candidatoServicio.actualizar(id, candidatoDTO));

    }

    //CRUD (ELIMINAR PARTIDO - DELETE) - SOLO ADMINISTRACION
    @DeleteMapping("/admin/{id}")
    @Operation(summary = "Eliminar candidato (solo administradores")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        candidatoServicio.eliminar(id);

        return ResponseEntity.noContent().build();

    }

    /*@GetMapping("/participacion/{partidoEleccionId}")
    @Operation(summary = "Listar candidatos por participación electoral")
    public ResponseEntity<List<CandidatoDetalleDTO>> listarPorParticipacion(@PathVariable Long partidoEleccionId) {

        return ResponseEntity.ok(candidatoServicio.listarPorPartidoEleccion(partidoEleccionId));
    }*/

    @GetMapping("/participacion/{partidoEleccionId}")
    @Operation(summary = "Obtener candidatos por ID de participación electoral")
    public ResponseEntity<List<CandidatoDetalleDTO>> getCandidatosByParticipacion(@PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(candidatoServicio.listarPorPartidoEleccion(partidoEleccionId));
    }

}
