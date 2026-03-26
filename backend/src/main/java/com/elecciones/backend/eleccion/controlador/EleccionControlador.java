package com.elecciones.backend.eleccion.controlador;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elecciones")
@CrossOrigin(origins = "http://localhost:4200")
public class EleccionControlador {

    private final EleccionRepositorio eleccionRepositorio;
    private final PartidoRepositorio partidoRepositorio;

    public EleccionControlador(EleccionRepositorio eleccionRepositorio, PartidoRepositorio partidoRepositorio) {
        this.eleccionRepositorio = eleccionRepositorio;
        this.partidoRepositorio = partidoRepositorio;
    }

    @GetMapping("/tipos")
    public List<Eleccion> getTiposElecciones() {
        return eleccionRepositorio.findAll();
    }

    @GetMapping("/{tipo}/{ambito}/partidos")
    public List<Partido> getPartidosByEleccion(@PathVariable String tipo, @PathVariable String ambito) {
        Eleccion eleccion = eleccionRepositorio.findByTipoAndAmbito(tipo, ambito)
                .orElseThrow( () -> new RuntimeException("Elección no encontrada"));

        return partidoRepositorio.findByEleccionId(eleccion.getId());
    }
}
