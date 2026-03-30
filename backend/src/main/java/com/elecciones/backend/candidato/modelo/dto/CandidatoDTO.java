package com.elecciones.backend.candidato.modelo.dto;

import lombok.Data;

@Data
public class CandidatoDTO {
    private Long id;
    private String nombre;
    private String cargo;
    private String fotoUrl;
    private String biografia;
    private Integer posicionLista;
    private Long partidoEleccionId;
}
