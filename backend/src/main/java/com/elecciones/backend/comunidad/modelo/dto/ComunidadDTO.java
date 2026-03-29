package com.elecciones.backend.comunidad.modelo.dto;

import lombok.Data;

@Data
public class ComunidadDTO {
    private Long id;
    private String nombre;
    private String capital;
    private Integer poblacion;
    private String colorPrimario;
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;
}
