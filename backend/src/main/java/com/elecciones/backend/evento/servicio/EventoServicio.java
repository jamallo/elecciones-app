package com.elecciones.backend.evento.servicio;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
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

import javax.swing.plaf.PanelUI;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventoServicio {

    private final EventoRepositorio eventoRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final EventoMapeador eventoMapeador;
    private final EleccionRepositorio eleccionRepositorio;


    //PARA EVENTO (Implementar métodos CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR evento - CREATE)
    @Transactional
    public EventoDTO crear(EventoDTO eventoDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(eventoDTO.getPartidoEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

        Evento evento = eventoMapeador.toEntity(eventoDTO);
        evento.setPartidoEleccion(partidoEleccion);
        evento = eventoRepositorio.save(evento);

        return eventoMapeador.toDTO(evento);
    }

    //CRUD (BUSCAR LISTAR TODOS LOS EVENTOS - READ)
    @Transactional(readOnly = true)
    public List<EventoDetalleDTO> listarTodos() {
        return eventoRepositorio.findAll()
                .stream()
                .map(eventoMapeador::toDetalleDTO)
                .toList();
    }

    //CRUD (BUSCAR EVENTO - READ)
    @Transactional(readOnly = true)
    public EventoDTO buscarporId(Long id) {
        Evento evento = eventoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Evento no encontrado con id: " + id));

        return eventoMapeador.toDTO(evento);
    }

    //CRUD (ACTUALIZAR EVENTO - UPDATE)
    @Transactional
    public EventoDTO actualizarEvento(Long id, EventoDTO eventoDTO) {
        Evento evento = eventoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Evento no encontrado con id: " + id));

        //Actualizar campos
        evento.setTitulo(eventoDTO.getTitulo());
        evento.setDescripcion(eventoDTO.getDescripcion());
        evento.setFecha(eventoDTO.getFecha());
        evento.setLugar(eventoDTO.getLugar());
        evento.setTipo(eventoDTO.getTipo());

        evento = eventoRepositorio.save(evento);

        return eventoMapeador.toDTO(evento);
    }

    //CRUD (ELIMINAR PARTIDO - DELETE)
    @Transactional
    public void eliminarEvento(Long id) {
        Evento evento = eventoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("No se encuentra el evento con id: " + id));

        eventoRepositorio.delete(evento);
    }

    @Transactional(readOnly = true)
    public List<EventoDetalleDTO> litarPorPartidoEleccion(Long partidoEleccionId) {
        return eventoRepositorio.findByPartidoEleccionIdOrderByFechaAsc(partidoEleccionId)
                .stream()
                .map(eventoMapeador::toDetalleDTO)
                .toList();
    }

    // ========== MÉTODOS PÚBLICOS ==========

    @Transactional(readOnly = true)
    public List<EventoDetalleDTO> findByEleccionTipoAndAmbito(String tipo, String ambito) {
        // Buscar la elección por tipo y ámbito
        Eleccion eleccion = eleccionRepositorio.findByTipoAndAmbito(tipo, ambito)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada: " + tipo + " - " + ambito));

        // Buscar todas las participaciones de esa elección
        List<PartidoEleccion> participaciones = partidoEleccionRepositorio.findByEleccionId(eleccion.getId());

        // Recoger todos los eventos de esas participaciones
        return participaciones.stream()
                .flatMap(pe -> pe.getEventos().stream())
                .map(eventoMapeador::toDetalleDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EventoDetalleDTO> findTop5ByOrderByFechaDesc() {
        return eventoRepositorio.findTop5ByOrderByFechaDesc()
                .stream()
                .map(eventoMapeador::toDetalleDTO)
                .collect(Collectors.toList());
    }
}
