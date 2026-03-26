package com.elecciones.backend.municipio.modelo.dto;

import lombok.Data;

@Data
public class MunicipioDTO {
    private Long id;
    private String nombre;
    private String provincia;
    private String comunidadAutonoma;
    private Double latitud;
    private Double longitud;
    private Integer poblacion;
}
