package com.elecciones.backend.comunidad.servicio;

import com.elecciones.backend.comunidad.mapeador.ComunidadMapeador;
import com.elecciones.backend.comunidad.modelo.dto.ComunidadDTO;
import com.elecciones.backend.comunidad.modelo.entidad.ComunidadAutonoma;
import com.elecciones.backend.comunidad.repositorio.ComunidadRepositorio;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ComunidadServicio {

    private final ComunidadRepositorio comunidadRepositorio;
    private final ComunidadMapeador comunidadMapeador;

    @Transactional(readOnly = true)
    public ComunidadDTO buscarPorId(Long id) {
        ComunidadAutonoma comunidad = comunidadRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Comunidad no encontrada con id: " + id));

        return comunidadMapeador.toDTO(comunidad);
    }
}
