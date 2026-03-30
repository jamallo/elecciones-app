package com.elecciones.backend.candidato.modelo.dto;

import lombok.Data;

@Data
public class CandidatoDetalleDTO {
    private Long id;
    private String nombre;
    private String cargo;
    private String fotoUrl;
    private String biografia;
    private Integer posicionLista;

    //Info. partido
    private Long partidoId;
    private String partidoNombre;
    private String partidoSiglas;
    private String partidoLogoUrl;
    private String partidoColorPrimario;

    //Info. eleccion
    private Long eleccionId;
    private String eleccionTipo;
    private String eleccionAmbito;
    private Integer eleccionAnio;
}
