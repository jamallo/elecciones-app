package com.elecciones.backend.eleccion.controlador;

import com.elecciones.backend.eleccion.modelo.dto.EleccionDTO;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.eleccion.servicio.EleccionServicio;
import com.elecciones.backend.partido.modelo.dto.PartidoResumenDTO;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import com.elecciones.backend.partido.servicio.PartidoServicio;
import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionResumenDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elecciones")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Elecciones", description = "API para gestión de elecciones")
public class EleccionControlador {

    //private final EleccionRepositorio eleccionRepositorio;
    private final EleccionServicio eleccionServicio;
    //private final PartidoRepositorio partidoRepositorio;
    private final PartidoServicio partidoServicio;

    //Para elección (CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR ELECCIÓN - CREATE) - SOLO ADMINISTRADORES
    @PostMapping("/admin")
    @Operation(summary = "Crear nueva elección (solo administradores")
    public ResponseEntity<EleccionDTO> crearEleccion(@RequestBody EleccionDTO eleccionDTO) {
        return new ResponseEntity<>(eleccionServicio.crearEleccion(eleccionDTO), HttpStatus.CREATED);
    }

    //CRUD (BUSCAR LISTAR TODOS LAS ELECCIONES - READ)
    @GetMapping
    @Operation(summary = "Listar todas las elecciones")
    public ResponseEntity<List<EleccionDTO>> listarTodas() {
        return ResponseEntity.ok(eleccionServicio.listarTodas());
    }

    //CRUD (BUSCAR POR TIPO DE ELECCIÓN - READ)
    @GetMapping("/tipos")
    @Operation(summary = "Listar todas las elecciones (endpoint alternativo")
    public ResponseEntity<List<EleccionDTO>> getTiposElecciones() {
        return ResponseEntity.ok(eleccionServicio.listarTodas());
    }

    //CRUD (BUSCAR POR TIPO Y ÁMBITO DE ELECCIÓN - READ)
    @GetMapping("/{tipo}/{ambito}/partidos")
    @Operation(summary = "Obtener partidos por tipo y ámbito de elección")
    public ResponseEntity<List<PartidoEleccionResumenDTO>> getPartidosByEleccion(@PathVariable String tipo, @PathVariable String ambito) {
        return ResponseEntity.ok(partidoServicio.buscarPorEleccionTipoAmbito(tipo, ambito));
    }

    //CRUD (BUSCAR ELECCIÓN - READ)
    @GetMapping("/{id}")
    @Operation(summary = "Obtener elección por ID")
    public ResponseEntity<EleccionDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(eleccionServicio.buscarPorId(id));
    }

    //CRUD (ACTUALIZAR PARTIDO - UPDATE) - SOLO PARA ADMINISTRADORES
    @PutMapping("/admin/{id}")
    @Operation(summary = "Actualizar elección existente (solo administradores")
    public ResponseEntity<EleccionDTO> actualizarEleccion(
            @PathVariable Long id,
            @RequestBody EleccionDTO eleccionDTO) {
        return ResponseEntity.ok(eleccionServicio.actualizarEleccion(id, eleccionDTO));
    }

    //CRUD (ELIMINAR ELECCIÓN - DELETE)
    @DeleteMapping("/admin/{id}")
    @Operation(summary = "Eliminar elección (solo administradores")
    public ResponseEntity<Void> eliminarEleccion(@PathVariable Long id) {
        eleccionServicio.eliminarEleccion(id);
        return ResponseEntity.noContent().build();
    }
}
