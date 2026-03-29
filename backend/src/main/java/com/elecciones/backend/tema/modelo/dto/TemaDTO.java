package com.elecciones.backend.tema.modelo.dto;

import lombok.Data;

@Data
public class TemaDTO {
    private String colorPrincipal;
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;
    private String tipo; //MUNICIPIO, COMUNIDAD, NACIONAL, PARTIDO
    private String nombre;
    private String siglas; //solo para partidos
}
