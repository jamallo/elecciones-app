package com.elecciones.backend.candidato.repositorio;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatoRepositorio extends JpaRepository<Candidato, Long> {
    List<Candidato> findByPartidoEleccionIdOrderByPosicionListaAsc(Long partidoEleccionId);
    List<Candidato> findByNombreContainingIgnoreCase(String nombre);
}
