package com.elecciones.backend.candidato.mapeador;

import com.elecciones.backend.candidato.modelo.dto.CandidatoDTO;
import com.elecciones.backend.candidato.modelo.dto.CandidatoDetalleDTO;
import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CandidatoMapeador {

    //Convierte Candidato a CandidatoDTO
    @Mapping(target = "partidoEleccionId", source = "partidoEleccion.id")
    CandidatoDTO toDTO(Candidato candidato);

    //Convierte CandiatoDTO a Candidato. Relación partidoEleccion en servicio
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "partidoEleccion", ignore = true)
    Candidato toEntity(CandidatoDTO candidatoDTO);

    //Convierte Candidato a CandidatoDetalleDTO con info. extendida
    @Mapping(target = "partidoId", source = "partidoEleccion.partido.id")
    @Mapping(target = "partidoNombre", source = "partidoEleccion.partido.nombre")
    @Mapping(target = "partidoSiglas", source = "partidoEleccion.partido.siglas")
    @Mapping(target = "partidoLogoUrl", source = "partidoEleccion.partido.logoUrl")
    @Mapping(target = "partidoColorPrimario", source = "partidoEleccion.partido.colorPrimario")
    @Mapping(target = "eleccionId", source = "partidoEleccion.eleccion.id")
    @Mapping(target = "eleccionTipo", source = "partidoEleccion.eleccion.tipo")
    @Mapping(target = "eleccionAmbito", source = "partidoEleccion.eleccion.ambito")
    @Mapping(target = "eleccionAnio", source = "partidoEleccion.eleccion.anio")
    CandidatoDetalleDTO toDetalleDTO(Candidato candidato);
}
