package com.elecciones.backend.sede.modelo.dto;

import lombok.Data;

@Data
public class SedeMapaDTO {
    private Long id;
    private String nombre;
    private String direccion;
    private Double latitud;
    private Double longitud;
    private String tipo;

    //Info. partido
    private Long partidoId;
    private String partidoNombre;
    private String partidoSiglas;
    private String partidoColorPrimario;

    //Info. eleccion
    private String eleccionTipo;
    private String eleccionAmbito;
}
