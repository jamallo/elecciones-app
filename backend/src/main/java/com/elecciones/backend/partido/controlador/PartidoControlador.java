package com.elecciones.backend.partido.controlador;

import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/partidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PartidoControlador {


}
