package com.elecciones.backend.partido.servicio;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partido.mapeador.PartidoMapeador;
import com.elecciones.backend.partido.modelo.dto.InformacionPartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoResumenDTO;
import com.elecciones.backend.partido.modelo.entidad.InformacionPartido;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidoServicio {

    private final PartidoRepositorio partidoRepositorio;
    private final EleccionRepositorio eleccionRepositorio;
    private final PartidoMapeador partidoMapeador;

    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> listarTodos() {
        return partidoRepositorio.findAll()
                .stream()
                .map(partidoMapeador::toResumenDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PartidoDTO buscarPorId(Long id) {
        Partido partido = partidoRepositorio.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + id));

        return partidoMapeador.toDTO(partido);
    }

    @Transactional(readOnly = true)
    public PartidoResumenDTO buscarResumenPorId(Long id) {
        Partido partido = partidoRepositorio.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + id));

        return partidoMapeador.toResumenDTO(partido);
    }

    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> buscarPorEleccion(Long eleccionId) {
        return partidoRepositorio.findByEleccionId(eleccionId)
                .stream()
                .map(partidoMapeador::toResumenDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> buscarPorNombre(String nombre) {
        return partidoRepositorio.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(partidoMapeador::toResumenDTO)
                .toList();
    }

    @Transactional
    public PartidoDTO crear(PartidoDTO partidoDTO) {
        Eleccion eleccion = eleccionRepositorio.findById(partidoDTO.getEleccionId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + partidoDTO.getEleccionId()));

        Partido partido = partidoMapeador.toEntity(partidoDTO);
        partido.setEleccion(eleccion);

        //Si tiene información asociada
        if (partidoDTO.getInformacion() != null) {
            InformacionPartido informacion = partidoMapeador
                    .toInformacionEntity(partidoDTO
                            .getInformacion());
            informacion.setPartido(partido);
            partido.setInformacion(informacion);
        }

        partido = partidoRepositorio.save(partido);
        return partidoMapeador.toDTO(partido);
    }

    @Transactional
    public InformacionPartidoDTO actualizarInformacion(Long partidoId, InformacionPartidoDTO informacionDTO) {
        Partido partido = partidoRepositorio.findById(partidoId)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + partidoId));

        InformacionPartido informacion = partido.getInformacion();
        if (informacion == null) {
            informacion = new InformacionPartido();
            informacion.setPartido(partido);
        }

        informacion.setHistoriaResumen(informacionDTO.getHistoriaResumen());
        informacion.setHistoriaCompleta(informacionDTO.getHistoriaCompleta());
        informacion.setProgramaResumen(informacionDTO.getProgramaResumen());
        informacion.setProgramaCompleto(informacionDTO.getProgramaCompleto());
        informacion.setEmailContacto(informacionDTO.getEmailContacto());
        informacion.setTelefonoContacto(informacionDTO.getTelefonoContacto());
        informacion.setWebUrl(informacionDTO.getWebUrl());

        partido.setInformacion(informacion);
        partidoRepositorio.save(partido);

        return partidoMapeador.toInformacionDTO(informacion);
    }
}
