package com.elecciones.backend.partido.modelo.dto;

import lombok.Data;

@Data
public class PartidoResumenDTO {
    private Long id;
    private String nombre;
    private String siglas;
    private String logoUrl;
    private String color;
}
