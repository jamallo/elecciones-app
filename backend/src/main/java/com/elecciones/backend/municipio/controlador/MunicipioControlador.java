package com.elecciones.backend.municipio.controlador;

import com.elecciones.backend.municipio.modelo.dto.MunicipioDTO;
import com.elecciones.backend.municipio.servicio.MunicipioServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/municipios")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Municipios", description = "API para gestión de municipios")
public class MunicipioControlador {

    private final MunicipioServicio municipioServicio;

    @GetMapping
    @Operation(summary = "Listar todos los municipios")
    public ResponseEntity<List<MunicipioDTO>> listarTodos() {
        return ResponseEntity.ok(municipioServicio.litarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar municipio por ID")
    public ResponseEntity<MunicipioDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(municipioServicio.buscarPorId(id));
    }

    @GetMapping("/nombre/{nombre}")
    @Operation(summary = "Buscar municipio por nombre")
    public ResponseEntity<MunicipioDTO> buscarPorNombre(@PathVariable String nombre) {
        return ResponseEntity.ok(municipioServicio.buscarporNombre(nombre));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo municipio")
    public ResponseEntity<MunicipioDTO> crear(@RequestBody MunicipioDTO municipioDTO) {
        return new ResponseEntity<>(municipioServicio.crear(municipioDTO), HttpStatus.CREATED);
    }
}
