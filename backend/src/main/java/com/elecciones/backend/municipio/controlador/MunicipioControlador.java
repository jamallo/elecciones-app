package com.elecciones.backend.municipio.controlador;

import com.elecciones.backend.municipio.modelo.dto.MunicipioDTO;
import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import com.elecciones.backend.municipio.servicio.MunicipioServicio;
import com.elecciones.backend.tema.modelo.dto.TemaDTO;
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

    @GetMapping("/{id}/tema")
    @Operation(summary = "Obtener tema visual de un municipio")
    public ResponseEntity<TemaDTO> obtenerTemaMunicilio(@PathVariable Long id) {
        TemaDTO tema = new TemaDTO();

        tema.setColorPrincipal(municipioServicio.buscarPorId(id).getColorPrimario());
        tema.setColorSecundario(municipioServicio.buscarPorId(id).getColorSecundario());
        tema.setColorAcento(municipioServicio.buscarPorId(id).getColorAcento());
        tema.setColorFondo(municipioServicio.buscarPorId(id).getColorFondo());
        tema.setTipo("MUNICIPIO");
        tema.setNombre(municipioServicio.buscarPorId(id).getNombre());

        return ResponseEntity.ok(tema);
    }

    @GetMapping("/comunidad/{comunidad}")
    @Operation(summary = "Obtener municipios por nombre de comunidad autónoma")
    public ResponseEntity<List<MunicipioDTO>> getMunicipiosByComunidad(@PathVariable String comunidad) {
        return ResponseEntity.ok(municipioServicio.buscarPorComunidad(comunidad));
    }
}
