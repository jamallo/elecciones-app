package com.elecciones.backend.eleccion.controlador;

import com.elecciones.backend.eleccion.modelo.dto.EleccionDTO;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.eleccion.servicio.EleccionServicio;
import com.elecciones.backend.partido.modelo.dto.PartidoResumenDTO;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import com.elecciones.backend.partido.servicio.PartidoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eleccion")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Elecciones", description = "API para gestión de elecciones")
public class EleccionControlador {

    //private final EleccionRepositorio eleccionRepositorio;
    private final EleccionServicio eleccionServicio;
    //private final PartidoRepositorio partidoRepositorio;
    private final PartidoServicio partidoServicio;

    @GetMapping
    @Operation(summary = "Listar todas las elecciones")
    public ResponseEntity<List<EleccionDTO>> listarTodas() {
        return ResponseEntity.ok(eleccionServicio.listarTodas());
    }

    @GetMapping("/tipos")
    @Operation(summary = "Listar todas las elecciones (endpoint alternativo")
    public ResponseEntity<List<EleccionDTO>> getTiposElecciones() {
        return ResponseEntity.ok(eleccionServicio.listarTodas());
    }

    @GetMapping("/{tipo}/{ambito}/partidos")
    @Operation(summary = "Obtener partidos por tipo y ámbito de elección")
    public ResponseEntity<List<PartidoResumenDTO>> getPartidosByEleccion(@PathVariable String tipo, @PathVariable String ambito) {
        return ResponseEntity.ok(partidoServicio.buscarPorEleccionTipoAmbito(tipo, ambito));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener elección por ID")
    public ResponseEntity<EleccionDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(eleccionServicio.buscarPorId(id));
    }
}
