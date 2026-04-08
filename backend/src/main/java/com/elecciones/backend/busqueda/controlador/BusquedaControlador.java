package com.elecciones.backend.busqueda.controlador;

import com.elecciones.backend.busqueda.modelo.dto.ResultadoBusquedaDTO;
import com.elecciones.backend.busqueda.servicio.BusquedaServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/busqueda")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Busqueda", description = "API para la búsqueda global")
public class BusquedaControlador {

    private final BusquedaServicio busquedaServicio;

    @GetMapping
    @Operation(summary = "Búsqueda globarl de partidos, candidatos, eventos y municipios")
    public ResponseEntity<List<ResultadoBusquedaDTO>> buscar(@RequestParam String q) {
        return ResponseEntity.ok(busquedaServicio.buscarGlobal(q));
    }
}
