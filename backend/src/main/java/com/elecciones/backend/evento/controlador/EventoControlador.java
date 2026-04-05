package com.elecciones.backend.evento.controlador;

import com.elecciones.backend.evento.modelo.dto.EventoDTO;
import com.elecciones.backend.evento.modelo.dto.EventoDetalleDTO;
import com.elecciones.backend.evento.servicio.EventoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Eventos", description = "API para gestión de eventos")
public class EventoControlador {

    private final EventoServicio eventoServicio;

    //Para eventos (CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR EVENTO - CREATE) - SOLO ADMINISTRADORES
    @PostMapping("/admin")
    @Operation(summary = "Crear nuevo evento (solo administradores")
    public ResponseEntity<EventoDTO> crear(@RequestBody EventoDTO eventoDTO) {
        return new ResponseEntity<>(eventoServicio.crear(eventoDTO), HttpStatus.CREATED);
    }

    //CRUD (BUSCAR LISTAR TODOS LOS EVENTOS -READ)
    @GetMapping("/admin")
    @Operation(summary = "Listar todos los eventos (solo Administradores")
    public ResponseEntity<List<EventoDetalleDTO>> listarTodos() {
        return ResponseEntity.ok(eventoServicio.listarTodos());
    }

    //CRUD (BUSCAR EVENTO -READ)
    @GetMapping("{id}")
    @Operation(summary = "Obtener evento por ID")
    public ResponseEntity<EventoDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(eventoServicio.buscarporId(id));
    }

    //CRUD (ACTUALIZAR EVENTO - UPDATE) - SOLO PARA ADMINISTRADORES
    @PutMapping("/admin/{id}")
    public ResponseEntity<EventoDTO> actualizar(@PathVariable Long id, @RequestBody EventoDTO eventoDTO) {
        return ResponseEntity.ok(eventoServicio.actualizarEvento(id, eventoDTO));
    }

    //CRUD (ELIMINAR PARTIDO - DELETE)
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        eventoServicio.eliminarEvento(id);
        return ResponseEntity.noContent().build();
    }

    /*@GetMapping("/participacion/{partidoEleccionId}")
    public ResponseEntity<List<EventoDetalleDTO>> listarPorParticipacion(@PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(eventoServicio.litarPorPartidoEleccion(partidoEleccionId));
    }*/

    // ========== ENDPOINTS PÚBLICOS ==========

    @GetMapping("/eleccion/{tipo}/{ambito}")
    @Operation(summary = "Obtener eventos por tipo y ámbito de elección")
    public ResponseEntity<List<EventoDetalleDTO>> getEventosByEleccion(
            @PathVariable String tipo,
            @PathVariable String ambito) {
        List<EventoDetalleDTO> eventos = eventoServicio.findByEleccionTipoAndAmbito(tipo, ambito);
        System.out.println("Eventos encontrados para " + tipo + " - " + ambito + ": " + eventos.size());
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/ultimos")
    @Operation(summary = "Obtener últimos 5 eventos")
    public ResponseEntity<List<EventoDetalleDTO>> getUltimosEventos() {
        return ResponseEntity.ok(eventoServicio.findTop5ByOrderByFechaDesc());
    }

    @GetMapping("/participacion/{partidoEleccionId}")
    @Operation(summary = "Obtener eventos por ID de participación electoral")
    public ResponseEntity<List<EventoDetalleDTO>> getEventosByParticipacion(@PathVariable Long partidoEleccionId) {
        return ResponseEntity.ok(eventoServicio.listarPorPartidoEleccion(partidoEleccionId));
    }
}
