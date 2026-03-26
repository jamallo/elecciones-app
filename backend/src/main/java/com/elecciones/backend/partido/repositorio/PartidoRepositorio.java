package com.elecciones.backend.partido.repositorio;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartidoRepositorio extends JpaRepository<Partido, Long> {
    List<Partido> findByEleccionId(Long eleccionId);
}
