package com.elecciones.backend.nacional.controlador;

import com.elecciones.backend.tema.modelo.dto.TemaDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nacional")
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Nacional", description = "API para tema nacional")
public class NacionalControlador {

    @GetMapping("/tema")
    @Operation(summary = "Obtener tema visual de España")
    public ResponseEntity<TemaDTO> obtenerTemaNacional() {
        TemaDTO tema = new TemaDTO();
        tema.setColorPrincipal("#C0392B");
        tema.setColorSecundario("#F1C40F");
        tema.setColorAcento("#E67E22");
        tema.setColorFondo("#FFF8F0");
        tema.setTipo("NACIONAL");
        tema.setNombre("España");

        return ResponseEntity.ok(tema);
    }
}
