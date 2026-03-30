package com.elecciones.backend.sede.repositorio;

import com.elecciones.backend.sede.modelo.entidad.Sede;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SedeRepositorio extends JpaRepository<Sede, Long> {
    //List<Sede> findByPartidoIdAndTipo(Long partidoId, String tipo);
    List<Sede> findByPartidoEleccionIdAndTipo(Long partidoEleccionId, String tipo);
    List<Sede> findByMunicipio(String municipio);
    List<Sede> findByMunicipioAndTipoIn(String municipio, List<String> tipos);
}
