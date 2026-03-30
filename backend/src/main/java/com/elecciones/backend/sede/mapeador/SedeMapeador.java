package com.elecciones.backend.sede.mapeador;

import com.elecciones.backend.sede.modelo.dto.SedeDTO;
import com.elecciones.backend.sede.modelo.dto.SedeMapaDTO;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SedeMapeador {

    //Convierte Sede a SedeDTO
    @Mapping(target = "partidoEleccionId", source = "partidoEleccion.id")
    SedeDTO toDTO(Sede sede);

    //Convierte SedeDTO a Sede. La relación partidoEleccion en servicio.
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "partidoEleccion", ignore = true)
    Sede toEntity(SedeDTO sedeDTO);

    //Convierte Sede a SedeMapaDTO para visualizar en mapa
    @Mapping(target = "partidoId", source = "partidoEleccion.partido.id")
    @Mapping(target = "partidoNombre", source = "partidoEleccion.partido.nombre")
    @Mapping(target = "partidoSiglas", source = "partidoEleccion.partido.siglas")
    @Mapping(target = "partidoColorPrimario", source = "partidoEleccion.partido.colorPrimario")
    @Mapping(target = "eleccionTipo", source = "partidoEleccion.eleccion.tipo")
    @Mapping(target = "eleccionAmbito", source = "partidoEleccion.eleccion.ambito")
    SedeMapaDTO toMapaDTO(Sede sede);
}
