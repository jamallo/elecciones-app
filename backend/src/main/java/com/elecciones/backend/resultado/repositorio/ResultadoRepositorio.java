package com.elecciones.backend.resultado.repositorio;

import com.elecciones.backend.resultado.modelo.entidad.ResultadoAnterior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResultadoRepositorio extends JpaRepository <ResultadoAnterior, Long> {

    @Query("SELECT r FROM ResultadoAnterior r " +
            "JOIN FETCH r.partido p " +
            "JOIN FETCH r.eleccion e " +
            "WHERE e.id = :eleccionId")

    List<ResultadoAnterior> findByEleccionId(Long eleccionId);

    List<ResultadoAnterior> findByEleccionTipoAndEleccionAmbito(String tipo, String ambito);
}
