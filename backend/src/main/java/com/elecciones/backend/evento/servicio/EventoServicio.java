package com.elecciones.backend.evento.servicio;

import com.elecciones.backend.evento.mapeador.EventoMapeador;
import com.elecciones.backend.evento.modelo.dto.EventoDTO;
import com.elecciones.backend.evento.modelo.dto.EventoDetalleDTO;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.evento.repositorio.EventoRepositorio;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoServicio {

    private final EventoRepositorio eventoRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final EventoMapeador eventoMapeador;

    @Transactional(readOnly = true)
    public List<EventoDetalleDTO> litarPorPartidoEleccion(Long partidoEleccionId) {
        return eventoRepositorio.findByPartidoEleccionIdOrderByFechaAsc(partidoEleccionId)
                .stream()
                .map(eventoMapeador::toDetalleDTO)
                .toList();
    }

    @Transactional
    public EventoDTO crear(EventoDTO eventoDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(eventoDTO.getPartidoEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

        Evento evento = eventoMapeador.toEntity(eventoDTO);
        evento.setPartidoEleccion(partidoEleccion);
        evento = eventoRepositorio.save(evento);

        return eventoMapeador.toDTO(evento);
    }
}
