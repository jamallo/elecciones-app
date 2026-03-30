package com.elecciones.backend.candidato.servicio;

import com.elecciones.backend.candidato.mapeador.CandidatoMapeador;
import com.elecciones.backend.candidato.modelo.dto.CandidatoDTO;
import com.elecciones.backend.candidato.modelo.dto.CandidatoDetalleDTO;
import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.candidato.repositorio.CandidatoRepositorio;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidatoServicio {

    private final CandidatoRepositorio candidatoRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final CandidatoMapeador candidatoMapeador;

    @Transactional(readOnly = true)
    public List<CandidatoDetalleDTO> listarPorPartidoEleccion(Long partidoEleccionId) {
        return candidatoRepositorio.findByPartidoEleccionIdOrderByPosicionListaAsc(partidoEleccionId)
                .stream()
                .map(candidatoMapeador::toDetalleDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public CandidatoDetalleDTO buscarPorId(Long id) {
        Candidato candidato = candidatoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Candidato no encontrado con id: " + id));

        return candidatoMapeador.toDetalleDTO(candidato);
    }

    @Transactional
    public CandidatoDTO crear(CandidatoDTO candidatoDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(candidatoDTO.getPartidoEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

        Candidato candidato = candidatoMapeador.toEntity(candidatoDTO);
        candidato.setPartidoEleccion(partidoEleccion);
        candidato = candidatoRepositorio.save(candidato);
        return candidatoMapeador.toDTO(candidato);
    }
}
