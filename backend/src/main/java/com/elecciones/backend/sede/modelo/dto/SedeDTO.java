package com.elecciones.backend.sede.modelo.dto;

import lombok.Data;

@Data
public class SedeDTO {
    private Long id;
    private String nombre;
    private String direccion;
    private Double latitud;
    private Double longitud;
    private String tipo;
    private String municipio;
    private Long partidoEleccionId;
}
