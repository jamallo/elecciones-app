package com.elecciones.backend.municipio.mapeador;

import com.elecciones.backend.municipio.modelo.dto.MunicipioDTO;
import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MunicipioMapeador {

    @Mapping(target = "fechaCreacion", ignore = true)
    MunicipioDTO toDTO(Municipio municipio);

    @Mapping(target = "fechaCreacion", ignore = true)
    Municipio toEntity(MunicipioDTO municipioDTO);
}
