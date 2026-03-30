package com.elecciones.backend.sede.servicio;

import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import com.elecciones.backend.sede.mapeador.SedeMapeador;
import com.elecciones.backend.sede.modelo.dto.SedeDTO;
import com.elecciones.backend.sede.modelo.dto.SedeMapaDTO;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import com.elecciones.backend.sede.repositorio.SedeRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SedeServicio {

    private final SedeRepositorio sedeRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final SedeMapeador sedeMapeador;

    @Transactional(readOnly = true)
    public List<SedeMapaDTO> listarSedesPartido(Long partidoEleccionId) {
        return sedeRepositorio.findByPartidoEleccionIdAndTipo(partidoEleccionId, "SEDE_PARTIDO")
                .stream()
                .map(sedeMapeador::toMapaDTO)
                .toList();
    }

    @Transactional
    public List<Sede> listarColegiosElectorales(String municipio) {
        return sedeRepositorio.findByMunicipioAndTipoIn(municipio, List.of("COLEGIO_ELECTORAL", "RECINTO_ELECTORAL"));
    }

    @Transactional
    public SedeDTO crear(SedeDTO sedeDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(sedeDTO.getPartidoEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

        Sede sede = sedeMapeador.toEntity(sedeDTO);
        sede.setPartidoEleccion(partidoEleccion);
        sede = sedeRepositorio.save(sede);

        return sedeMapeador.toDTO(sede);
    }
}
