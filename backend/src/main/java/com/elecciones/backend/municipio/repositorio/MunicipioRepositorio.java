package com.elecciones.backend.municipio.repositorio;

import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MunicipioRepositorio extends JpaRepository<Municipio, Long> {
    Optional<Municipio> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}
