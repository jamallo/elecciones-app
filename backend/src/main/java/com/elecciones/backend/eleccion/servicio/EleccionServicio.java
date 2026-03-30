package com.elecciones.backend.eleccion.servicio;

import com.elecciones.backend.eleccion.mapeador.EleccionMapeador;
import com.elecciones.backend.eleccion.modelo.dto.EleccionDTO;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EleccionServicio {

    private final EleccionRepositorio eleccionRepositorio;
    private final EleccionMapeador eleccionMapeador;

    @Transactional(readOnly = true)
    public List<EleccionDTO> listarTodas() {
        return eleccionRepositorio.findAll()
                .stream()
                .map(eleccionMapeador::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public EleccionDTO buscarPorId(Long id) {
        Eleccion eleccion = eleccionRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + id));
        return eleccionMapeador.toDTO(eleccion);
    }

    @Transactional(readOnly = true)
    public EleccionDTO buscarPorTipoYAmbito(String tipo, String ambito) {
        Eleccion eleccion = eleccionRepositorio.findByTipoAndAmbito(tipo, ambito)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada: " + tipo + " - " + ambito));
        return eleccionMapeador.toDTO(eleccion);
    }
}
