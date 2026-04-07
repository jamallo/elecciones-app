package com.elecciones.backend.resultado.controlador;

import com.elecciones.backend.resultado.modelo.dto.ResultadoDTO;
import com.elecciones.backend.resultado.servicio.ResultadoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resultados")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Resultados", description = "API para gestión de resultados electorales")
public class ResultadoControlador {

    private final ResultadoServicio resultadoServicio;

    @GetMapping("/eleccion/{eleccionId}")
    @Operation(summary = "Obtener resultados por elección")
    public ResponseEntity<List<ResultadoDTO>> getResultadosByEleccion(@PathVariable Long eleccionId) {
        return ResponseEntity.ok(resultadoServicio.getResultadosByEleccion(eleccionId));
    }
}
