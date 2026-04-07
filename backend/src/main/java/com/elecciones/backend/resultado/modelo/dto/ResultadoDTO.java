package com.elecciones.backend.resultado.modelo.dto;

import lombok.Data;

@Data
public class ResultadoDTO {

    private Long id;
    private Integer anio;
    private String partidoNombre;
    private String partidoSiglas;
    private String partidoColor;
    private String partidoLogoUrl;
    private Integer votos;
    private Double porcentaje;
    private Integer concejales;
    private Long eleccionId;
    private String eleccionTipo;
    private String eleccionAmbito;
}
