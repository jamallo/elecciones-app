package com.elecciones.backend.busqueda.servicio;

import com.elecciones.backend.busqueda.modelo.dto.ResultadoBusquedaDTO;
import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.candidato.repositorio.CandidatoRepositorio;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.evento.repositorio.EventoRepositorio;
import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import com.elecciones.backend.municipio.repositorio.MunicipioRepositorio;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusquedaServicio {

    private final PartidoRepositorio partidoRepositorio;
    private final CandidatoRepositorio candidatoRepositorio;
    private final EventoRepositorio eventoRepositorio;
    private final MunicipioRepositorio municipioRepositorio;

    public List<ResultadoBusquedaDTO> buscarGlobal(String termino) {
        List<ResultadoBusquedaDTO> resultados = new ArrayList<>();

        if (termino == null || termino.length() < 2) {
            return resultados;
        }

        String busqueda = "%" + termino.toLowerCase() + "%";

        //Buscar partidos
        List<Partido> partidos = partidoRepositorio.findByNombreContainingIgnoreCase(termino);

        for (Partido p: partidos) {
            resultados.add(new ResultadoBusquedaDTO(
                    "PARTIDO",
                    p.getId(),
                    p.getNombre(),
                    p.getSiglas(),
                    p.getLogoUrl(),
                    p.getColorPrimario(),
                    "/partido" + p.getId(),
                    "Partido político"
            ));
        }

        //Buscar candidatos
        List<Candidato> candidatos = candidatoRepositorio.findByNombreContainingIgnoreCase(termino);

        for (Candidato c : candidatos) {
            String partidoNombre = c.getPartidoEleccion() != null ?
                    c.getPartidoEleccion().getPartido().getNombre() : "";
            resultados.add(new ResultadoBusquedaDTO(
                    "CANDIDATO",
                    c.getId(),
                    c.getNombre(),
                    c.getCargo(),
                    c.getFotoUrl(),
                    c.getPartidoEleccion() != null ? c.getPartidoEleccion().getPartido().getColorPrimario() : "#666",
                    "/candidato/" + c.getId(),
                    partidoNombre
            ));
        }

        //Buscar eventos
        List<Evento> eventos = eventoRepositorio.findByTituloContainingIgnoreCase(termino);

        for (Evento e : eventos) {
            resultados.add(new ResultadoBusquedaDTO(
                    "EVENTO",
                    e.getId(),
                    e.getTitulo(),
                    e.getLugar(),
                    null,
                    "#666",
                    "/evento/" + e.getId(),
                    e.getFecha() != null ? e.getFecha().toString() : ""
            ));
        }

        //Buscar municipios
        List<Municipio> municipios = municipioRepositorio.findByNombreContainingIgnoreCase(termino);

        for (Municipio m : municipios) {
            resultados.add(new ResultadoBusquedaDTO(
                    "MUNICIPIO",
                    m.getId(),
                    m.getNombre(),
                    m.getProvincia(),
                    null,
                    m.getColorPrimario(),
                    "/municipio/" + m.getId(),
                    m.getComunidadAutonoma()
            ));
        }

        return resultados;
    }
}
