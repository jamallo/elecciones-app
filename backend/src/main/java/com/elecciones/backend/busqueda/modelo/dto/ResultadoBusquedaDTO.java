package com.elecciones.backend.busqueda.modelo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultadoBusquedaDTO {

    private String tipo; //PARTIDO, CANDIDATO, EVENTO, MUNICIPIO
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagenUrl;
    private String color;
    private String link;
    private String subtitulo;
}
