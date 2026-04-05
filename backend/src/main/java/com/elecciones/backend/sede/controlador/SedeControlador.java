package com.elecciones.backend.sede.controlador;

import com.elecciones.backend.sede.modelo.dto.SedeDTO;
import com.elecciones.backend.sede.modelo.dto.SedeMapaDTO;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import com.elecciones.backend.sede.servicio.SedeServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sedes")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Sedes", description = "API para la gestión de las sedes y colegios")
public class SedeControlador {

    private final SedeServicio servicio;

    //Para sedes (CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR SEDES - CREATE) - SOLO ADMINISTRADORES
    @PostMapping("/admin")
    @Operation(summary = "Crear nueva Sede o Colegio electoral")
    public ResponseEntity<SedeDTO> crearSede(@RequestBody SedeDTO sedeDTO) {
        return new ResponseEntity<>(servicio.crear(sedeDTO), HttpStatus.CREATED);
    }

    //CRUD (BUSCAR LISTAR TODAS LAS SEDES por partido - READ)
    @GetMapping("/partido/{partidoEleccionId}")
    @Operation(summary = "Listar sedes")
    public ResponseEntity<List<SedeMapaDTO>> listarSedesPartido(@PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(servicio.listarSedesPartido(partidoEleccionId));
    }

    //CRUD (BUSCAR LISTAR TODAS LOS COLEGIO ELECTORALES - READ)
    @GetMapping("/colegios/{municipio}")
    @Operation(summary = "Listar colegios")
    public ResponseEntity<List<Sede>> listarColegiosElectorales(@PathVariable String municipio) {
        return ResponseEntity.ok(servicio.listarColegiosElectorales(municipio));
    }

    //CRUD (BUSCAR SEDE - READ)
    @GetMapping("/admin/{id}")
    @Operation(summary = "Buscar sede por id")
    public ResponseEntity<SedeDTO> obtenerSedePorId(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.buscarSedePorId(id));
    }

    @GetMapping("/admin")
    @Operation(summary = "Listar todas las sedes (solo administradores)")
    public ResponseEntity<List<SedeDTO>> listarTodas() {
        return ResponseEntity.ok(servicio.listarTodas());
    }

    //CRUD (ACTUALIZAR SEDE - UPDATE) - SOLO PARA ADMINISTRADORES
    @PutMapping("/admin/{id}")
    @Operation(summary = "Actualizar sede existente (solo administradores")
    public ResponseEntity<SedeDTO> actualizarSede(@PathVariable Long id, @RequestBody SedeDTO sedeDTO) {
        return ResponseEntity.ok(servicio.actualizarSede(id, sedeDTO));
    }

    //CRUD (ELIMINAR SEDE - DELETE)
    @DeleteMapping("/admin/{id}")
    @Operation(summary = "Eliminar sede (solo administradores")
    public ResponseEntity<Void> eliminarSede(@PathVariable Long id) {
        servicio.eliminarSede(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/participacion/{partidoEleccionId}")
    @Operation(summary = "Obtener sedes por ID de participación electoral")
    public ResponseEntity<List<SedeMapaDTO>> getSedesByParticipacion(@PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(servicio.listarSedesPartido(partidoEleccionId));
    }
}
