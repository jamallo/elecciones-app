package com.elecciones.backend.evento.modelo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventoDetalleDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fecha;
    private String lugar;
    private String tipo;

    //Info. partido
    private Long partidoId;
    private String partidoNombre;
    private String partidoSiglas;
    private String partidoLogoUrl;

    //Info. eleccion
    private String eleccionTipo;
    private String eleccionAmbito;
}
