package com.elecciones.backend.partido.mapeador;

import com.elecciones.backend.partido.modelo.dto.InformacionPartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoResumenDTO;
import com.elecciones.backend.partido.modelo.entidad.InformacionPartido;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PartidoMapeador {

/*    @Mapping(target = "candidatos", ignore = true)
    @Mapping(target = "eventos", ignore = true)
    @Mapping(target = "sedes", ignore = true)*/
    @Mapping(target = "eleccionId", source = "eleccion.id")
    PartidoDTO toDTO(Partido partido);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "eleccion", ignore = true)
    @Mapping(target = "candidatos", ignore = true)
    @Mapping(target = "eventos", ignore = true)
    @Mapping(target = "sedes", ignore = true)
    @Mapping(target = "informacion", ignore = true)
    Partido toEntity(PartidoDTO partidoDTO);

    PartidoResumenDTO toResumenDTO(Partido partido);

    InformacionPartidoDTO toInformacionDTO(InformacionPartido informacion);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "partido", ignore = true)
    InformacionPartido toInformacionEntity(InformacionPartidoDTO informacionDTO);
}
