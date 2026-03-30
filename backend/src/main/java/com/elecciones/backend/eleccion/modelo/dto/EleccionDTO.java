package com.elecciones.backend.eleccion.modelo.dto;

import lombok.Data;

@Data
public class EleccionDTO {
    private Long id;
    private String tipo;
    private String ambito;
    private Integer anio;
}
