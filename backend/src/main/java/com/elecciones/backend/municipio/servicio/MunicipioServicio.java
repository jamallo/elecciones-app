package com.elecciones.backend.municipio.servicio;

import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.municipio.mapeador.MunicipioMapeador;
import com.elecciones.backend.municipio.modelo.dto.MunicipioDTO;
import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import com.elecciones.backend.municipio.repositorio.MunicipioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MunicipioServicio {

    private final MunicipioRepositorio municipioRepositorio;
    private final MunicipioMapeador municipioMapeador;

    @Transactional(readOnly = true)
    public List<MunicipioDTO> litarTodos() {
        return municipioRepositorio
                .findAll()
                .stream()
                .map(municipioMapeador::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public MunicipioDTO buscarPorId(Long id) {
        Municipio municipio = municipioRepositorio
                .findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Municipio no encontrado con id: " + id));

        return municipioMapeador.toDTO(municipio);
    }

    @Transactional(readOnly = true)
    public MunicipioDTO buscarporNombre(String nombre) {
        Municipio municipio = municipioRepositorio
                .findByNombre(nombre)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Municipio no encontrado: " + nombre));

        return municipioMapeador.toDTO(municipio);
    }

    @Transactional
    public MunicipioDTO crear(MunicipioDTO municipioDTO) {
        if (municipioRepositorio.existsByNombre(municipioDTO.getNombre())) {
            throw new RuntimeException("Ya existe un municipio con ese nombre");
        }

        Municipio municipio = municipioMapeador.toEntity(municipioDTO);
        municipio = municipioRepositorio.save(municipio);

        return municipioMapeador.toDTO(municipio);
    }
}
