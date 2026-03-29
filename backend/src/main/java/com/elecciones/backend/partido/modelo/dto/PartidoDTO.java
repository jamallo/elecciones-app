package com.elecciones.backend.partido.modelo.dto;

import lombok.Data;

@Data
public class PartidoDTO {
    private Long id;
    private String nombre;
    private String siglas;
    private String logoUrl;
    private String colorPrimario;
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;
    private Long eleccionId;
    private InformacionPartidoDTO informacion;
}
