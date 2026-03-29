package com.elecciones.backend.comunidad.mapeador;

import com.elecciones.backend.comunidad.modelo.dto.ComunidadDTO;
import com.elecciones.backend.comunidad.modelo.entidad.ComunidadAutonoma;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ComunidadMapeador {

    ComunidadDTO toDTO(ComunidadAutonoma comunidad);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "municipios", ignore = true)
    ComunidadAutonoma toEntity(ComunidadDTO comunidadDTO);
}
