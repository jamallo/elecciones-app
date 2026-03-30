package com.elecciones.backend.partido.repositorio;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PartidoRepositorio extends JpaRepository<Partido, Long> {
    //List<Partido> findByEleccionId(Long eleccionId);
    Optional<Partido> findBySiglas(String sigras);
    List<Partido> findByNombreContainingIgnoreCase(String nombre);
}
