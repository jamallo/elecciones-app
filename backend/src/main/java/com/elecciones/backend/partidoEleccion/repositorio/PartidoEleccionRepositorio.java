package com.elecciones.backend.partidoEleccion.repositorio;

import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PartidoEleccionRepositorio extends JpaRepository<PartidoEleccion, Long> {
    List<PartidoEleccion> findByEleccionId(Long eleccionId);

    List<PartidoEleccion> findByPartidoId(Long partidoId);

    Optional<PartidoEleccion> findByPartidoIdAndEleccionId(Long partidoId, Long eleccionId);

    @Query("SELECT pe FROM PartidoEleccion pe " +
    "JOIN FETCH pe.partido p " +
    "JOIN FETCH pe.eleccion e " +
    "WHERE e.tipo = :tipo AND e.ambito = :ambito")
    List<PartidoEleccion> findByEleccionTipoAndAmbito(@Param("tipo") String tipo, @Param("ambito") String ambito);

    @Query("SELECT pe FROM PartidoEleccion pe " +
            "JOIN FETCH pe.eleccion e " +
            "WHERE pe.partido.id = :partidoId")
    List<PartidoEleccion> findByPartidoIdWithEleccion(@Param("partidoId") Long partidoId);
}
