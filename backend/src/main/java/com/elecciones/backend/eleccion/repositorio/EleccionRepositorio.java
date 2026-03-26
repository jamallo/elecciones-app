package com.elecciones.backend.eleccion.repositorio;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EleccionRepositorio extends JpaRepository<Eleccion, Long> {
    Optional<Eleccion> findByTipoAndAmbito(String tipo, String ambito);
    List<Eleccion> findByTipo(String tipo);
}
