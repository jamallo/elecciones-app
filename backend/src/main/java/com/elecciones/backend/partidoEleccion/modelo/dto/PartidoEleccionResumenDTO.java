package com.elecciones.backend.partidoEleccion.modelo.dto;

import lombok.Data;

@Data
public class PartidoEleccionResumenDTO {

    private Long id;
    private Long partidoId;
    private String partidoNombre;
    private String partidoSiglas;
    private String partidoLogoUrl;
    private String partidoColorPrimario;
    private Long eleccionId;
    private String eleccionTipo;
    private String eleccionAmbito;
}
