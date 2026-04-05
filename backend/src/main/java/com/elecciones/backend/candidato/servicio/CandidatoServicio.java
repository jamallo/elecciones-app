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
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidatoServicio {

    private final CandidatoRepositorio candidatoRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final CandidatoMapeador candidatoMapeador;

    //Para candidato (Implementar CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR CANDIDATO - CREATE)
    @Transactional
    public CandidatoDTO crear(CandidatoDTO candidatoDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(candidatoDTO.getPartidoEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

        Candidato candidato = candidatoMapeador.toEntity(candidatoDTO);
        candidato.setPartidoEleccion(partidoEleccion);
        candidato = candidatoRepositorio.save(candidato);
        return candidatoMapeador.toDTO(candidato);
    }

    //CRUD (BUSCAR LISTAR TODOS LOS CANDIDATOS - READ)
    public List<CandidatoDetalleDTO> listarTodos() {
        return candidatoRepositorio.findAll()
                .stream()
                .map(candidatoMapeador::toDetalleDTO)
                .toList();
    }

    //CRUD (BUSCAR CANDIDATO - READ)
    @Transactional(readOnly = true)
    public CandidatoDetalleDTO buscarPorId(Long id) {
        Candidato candidato = candidatoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Candidato no encontrado con id: " + id));

        return candidatoMapeador.toDetalleDTO(candidato);
    }

    //CRUD (ACTUALIZAR CANDIDATO - UPDATE)
    public CandidatoDTO actualizar(Long id, CandidatoDTO candidatoDTO) {
        Candidato candidato = candidatoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Candidato no encontrado con id: " + id));

        candidato.setNombre(candidatoDTO.getNombre());
        candidato.setCargo(candidatoDTO.getCargo());
        candidato.setFotoUrl(candidatoDTO.getFotoUrl());
        candidato.setBiografia(candidatoDTO.getBiografia());
        candidato.setPosicionLista(candidatoDTO.getPosicionLista());

        if (candidatoDTO.getPartidoEleccionId() != null) {
            PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(candidatoDTO.getPartidoEleccionId())
                    .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

            candidato.setPartidoEleccion(partidoEleccion);
        }

        candidato = candidatoRepositorio.save(candidato);

        return candidatoMapeador.toDTO(candidato);
    }

    //CRUD (ELIMINAR CANDIDATO - DELETE)
    public void eliminar(Long id) {
        if (!candidatoRepositorio.existsById(id)) {
            throw new RecursoNoEncontradoExcepcion("Candidato no encontrado con id: " + id);
        }

        candidatoRepositorio.deleteById(id);
    }


    @Transactional(readOnly = true)
    public List<CandidatoDetalleDTO> listarPorPartidoEleccion(Long partidoEleccionId) {
        return candidatoRepositorio.findByPartidoEleccionIdOrderByPosicionListaAsc(partidoEleccionId)
                .stream()
                .map(candidatoMapeador::toDetalleDTO)
                .collect(Collectors.toList());
    }


}
