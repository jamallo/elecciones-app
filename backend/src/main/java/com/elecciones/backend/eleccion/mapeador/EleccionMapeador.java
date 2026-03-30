package com.elecciones.backend.eleccion.mapeador;

import com.elecciones.backend.eleccion.modelo.dto.EleccionDTO;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EleccionMapeador {

    EleccionDTO toDTO(Eleccion eleccion);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "partidosEleccion", ignore = true)
    Eleccion toEntity(EleccionDTO eleccionDTO);
}
