package com.elecciones.backend.resultado.servicio;

import com.elecciones.backend.resultado.modelo.dto.ResultadoDTO;
import com.elecciones.backend.resultado.modelo.entidad.ResultadoAnterior;
import com.elecciones.backend.resultado.repositorio.ResultadoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultadoServicio {

    private final ResultadoRepositorio resultadoRepositorio;

    @Transactional(readOnly = true)
    public List<ResultadoDTO> getResultadosByEleccion(Long eleccionId) {
        return resultadoRepositorio.findByEleccionId(eleccionId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ResultadoDTO convertToDTO(ResultadoAnterior resultado) {
        ResultadoDTO dto = new ResultadoDTO();
        dto.setId(resultado.getId());
        dto.setAnio(resultado.getAnio());

        // Datos del partido
        if (resultado.getPartido() != null) {
            dto.setPartidoNombre(resultado.getPartido().getNombre());
            dto.setPartidoSiglas(resultado.getPartido().getSiglas());
            dto.setPartidoColor(resultado.getPartido().getColorPrimario());
            dto.setPartidoLogoUrl(resultado.getPartido().getLogoUrl());
        } else {
            // Fallback para resultados antiguos sin relación
            dto.setPartidoNombre("Desconocido");
            dto.setPartidoSiglas("");
            dto.setPartidoColor("#6c757d");
            dto.setPartidoLogoUrl("");
        }

        dto.setVotos(resultado.getVotos());
        dto.setPorcentaje(resultado.getPorcentaje());
        dto.setConcejales(resultado.getConcejales());
        dto.setEleccionId(resultado.getEleccion().getId());
        dto.setEleccionTipo(resultado.getEleccion().getTipo());
        dto.setEleccionAmbito(resultado.getEleccion().getAmbito());

        return dto;
    }
}
