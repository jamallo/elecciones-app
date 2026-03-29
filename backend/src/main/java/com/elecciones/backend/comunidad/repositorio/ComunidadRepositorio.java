package com.elecciones.backend.comunidad.repositorio;

import com.elecciones.backend.comunidad.modelo.entidad.ComunidadAutonoma;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComunidadRepositorio extends JpaRepository<ComunidadAutonoma, Long> {
    Optional<ComunidadAutonoma> findByNombre(String nombre);
}
