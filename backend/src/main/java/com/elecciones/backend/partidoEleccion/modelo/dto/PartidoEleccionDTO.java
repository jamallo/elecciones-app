package com.elecciones.backend.partidoEleccion.modelo.dto;

import com.elecciones.backend.candidato.modelo.dto.CandidatoDTO;
import com.elecciones.backend.evento.modelo.dto.EventoDTO;
import com.elecciones.backend.partido.modelo.dto.InformacionPartidoDTO;
import com.elecciones.backend.sede.modelo.dto.SedeDTO;
import lombok.Data;

import java.util.List;

@Data
public class PartidoEleccionDTO {

    private Long id;

    // Información del partido
    private Long partidoId;
    private String partidoNombre;
    private String partidoSiglas;
    private String partidoLogoUrl;
    private String partidoColorPrimario;
    private String partidoColorSecundario;

    // Información de la elección
    private Long eleccionId;
    private String eleccionTipo;
    private String eleccionAmbito;
    private Integer eleccionAnio;

    // Información específica para esta elección
    private InformacionPartidoDTO informacion;

    // Listas específicas para esta elección
    private List<CandidatoDTO> candidatos;
    private List<EventoDTO> eventos;
    private List<SedeDTO> sedes;
}
