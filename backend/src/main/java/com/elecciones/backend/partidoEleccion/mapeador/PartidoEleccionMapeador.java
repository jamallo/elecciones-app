package com.elecciones.backend.partidoEleccion.mapeador;

import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionDTO;
import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionResumenDTO;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PartidoEleccionMapeador {

    @Mapping(target = "partidoId", source = "partido.id")
    @Mapping(target = "partidoNombre", source = "partido.nombre")
    @Mapping(target = "partidoSiglas", source = "partido.siglas")
    @Mapping(target = "partidoLogoUrl", source = "partido.logoUrl")
    @Mapping(target = "partidoColorPrimario", source = "partido.colorPrimario")
    @Mapping(target = "partidoColorSecundario", source = "partido.colorSecundario")
    @Mapping(target = "eleccionId", source = "eleccion.id")
    @Mapping(target = "eleccionTipo", source = "eleccion.tipo")
    @Mapping(target = "eleccionAmbito", source = "eleccion.ambito")
    @Mapping(target = "eleccionAnio", source = "eleccion.anio")
    PartidoEleccionDTO toDTO(PartidoEleccion partidoEleccion);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "partidoId", source = "partido.id")
    @Mapping(target = "partidoNombre", source = "partido.nombre")
    @Mapping(target = "partidoSiglas", source = "partido.siglas")
    @Mapping(target = "partidoLogoUrl", source = "partido.logoUrl")
    @Mapping(target = "partidoColorPrimario", source = "partido.colorPrimario")
    @Mapping(target = "eleccionId", source = "eleccion.id")
    @Mapping(target = "eleccionTipo", source = "eleccion.tipo")
    @Mapping(target = "eleccionAmbito", source = "eleccion.ambito")
    PartidoEleccionResumenDTO toResumenDTO(PartidoEleccion partidoEleccion);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "partido", ignore = true)
    @Mapping(target = "eleccion", ignore = true)
    @Mapping(target = "informacion", ignore = true)
    @Mapping(target = "candidatos", ignore = true)
    @Mapping(target = "eventos", ignore = true)
    @Mapping(target = "sedes", ignore = true)
    PartidoEleccion toEntity(PartidoEleccionDTO partidoEleccionDTO);
}
