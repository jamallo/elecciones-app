package com.elecciones.backend.evento.repositorio;

import com.elecciones.backend.evento.modelo.entidad.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventoRepositorio extends JpaRepository<Evento, Long> {
    //List<Evento> findByPartidoIdOrderByFechaAsc(Long partidoId);
    List<Evento> findByPartidoEleccionIdOrderByFechaAsc(Long partidoEleccionId);
    List<Evento> findByFechaBetween(LocalDateTime inicio, LocalDateTime fin);
}
