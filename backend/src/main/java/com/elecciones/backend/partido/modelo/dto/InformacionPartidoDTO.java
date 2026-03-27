package com.elecciones.backend.partido.modelo.dto;

import lombok.Data;

@Data
public class InformacionPartidoDTO {
    private String historiaResumen;
    private String historiaCompleta;
    private String programaResumen;
    private String programaCompleto;
    private String emailContacto;
    private String telefonoContacto;
    private String webUrl;
}
