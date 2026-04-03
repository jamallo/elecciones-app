package com.elecciones.backend.comunidad.controlador;

import com.elecciones.backend.comunidad.modelo.dto.ComunidadDTO;
import com.elecciones.backend.comunidad.servicio.ComunidadServicio;
import com.elecciones.backend.tema.modelo.dto.TemaDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comunidades")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Comunidades", description = "API para gestión de comunidades autónomas")
public class ComunidadControlador {

    private final ComunidadServicio comunidadServicio;

    @GetMapping
    @Operation(summary = "Listar todas las comunidades autónomas")
    public ResponseEntity<List<ComunidadDTO>> listarTodas() {
        return ResponseEntity.ok(comunidadServicio.listarTodas());
    }

    @GetMapping("{id}")
    @Operation(summary = "Obtener comunidad por ID")
    public ResponseEntity<ComunidadDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(comunidadServicio.buscarPorId(id));
    }

    @GetMapping("/{id}/tema")
    @Operation(summary = "Obtener tema visual de una comunidad")
    public ResponseEntity<TemaDTO> obtenerTemaComunidad(@PathVariable Long id) {
        ComunidadDTO comunidad = comunidadServicio.buscarPorId(id);

        TemaDTO tema = new TemaDTO();
        tema.setColorPrincipal(comunidad.getColorPrimario());
        tema.setColorSecundario(comunidad.getColorSecundario());
        tema.setColorAcento(comunidad.getColorAcento());
        tema.setColorFondo(comunidad.getColorFondo());
        tema.setTipo("COMUNIDAD");
        tema.setNombre(comunidad.getNombre());

        return ResponseEntity.ok(tema);
    }
}
