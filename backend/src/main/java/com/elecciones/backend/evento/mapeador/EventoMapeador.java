package com.elecciones.backend.evento.mapeador;

import com.elecciones.backend.evento.modelo.dto.EventoDTO;
import com.elecciones.backend.evento.modelo.dto.EventoDetalleDTO;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EventoMapeador {

    //Convierte Evento a EventoDTO
    @Mapping(target = "partidoEleccionId", source = "partidoEleccion.id")
    EventoDTO toDTO(Evento evento);

    //Convierte EventoDTO a Evento. Relación partidoElección en servicio
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "partidoEleccion", ignore = true)
    Evento toEntity(EventoDTO eventoDTO);

    //Convierte Evento a EventoDetalleDTO con info. extendida
    @Mapping(target = "partidoId", source = "partidoEleccion.partido.id")
    @Mapping(target = "partidoNombre", source = "partidoEleccion.partido.nombre")
    @Mapping(target = "partidoSiglas", source = "partidoEleccion.partido.siglas")
    @Mapping(target = "partidoLogoUrl", source = "partidoEleccion.partido.logoUrl")
    @Mapping(target = "eleccionTipo", source = "partidoEleccion.eleccion.tipo")
    @Mapping(target = "eleccionAmbito", source = "partidoEleccion.eleccion.ambito")
    EventoDetalleDTO toDetalleDTO(Evento evento);
}
