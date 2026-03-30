package com.elecciones.backend.partido.repositorio;

import com.elecciones.backend.partido.modelo.entidad.InformacionPartido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InformacionPartidoRepositorio extends JpaRepository<InformacionPartido, Long> {
    Optional<InformacionPartido> findByPartidoEleccionId(Long partidoEleccionId);
}
