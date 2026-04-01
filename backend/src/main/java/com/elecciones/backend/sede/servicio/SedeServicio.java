package com.elecciones.backend.sede.servicio;

import com.elecciones.backend.eleccion.modelo.dto.EleccionDTO;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import com.elecciones.backend.sede.mapeador.SedeMapeador;
import com.elecciones.backend.sede.modelo.dto.SedeDTO;
import com.elecciones.backend.sede.modelo.dto.SedeMapaDTO;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import com.elecciones.backend.sede.repositorio.SedeRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SedeServicio {

    private final SedeRepositorio sedeRepositorio;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final SedeMapeador sedeMapeador;

    //PARA SEDE (Implementar métodos CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR SEDE - CREATE)
    @Transactional
    public SedeDTO crear(SedeDTO sedeDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(sedeDTO.getPartidoEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada"));

        Sede sede = sedeMapeador.toEntity(sedeDTO);
        sede.setPartidoEleccion(partidoEleccion);
        sede = sedeRepositorio.save(sede);

        return sedeMapeador.toDTO(sede);
    }


    //CRUD (BUSCAR LISTAR TODOS LAS SEDES POR PARTIDOS - READ)
    @Transactional(readOnly = true)
    public List<SedeMapaDTO> listarSedesPartido(Long partidoEleccionId) {
        return sedeRepositorio.findByPartidoEleccionIdAndTipo(partidoEleccionId, "SEDE_PARTIDO")
                .stream()
                .map(sedeMapeador::toMapaDTO)
                .toList();
    }

    //CRUD (BUSCAR LISTAR TODOS LOS COLEGIOS ELECTORALES - READ)
    @Transactional
    public List<Sede> listarColegiosElectorales(String municipio) {
        return sedeRepositorio.findByMunicipioAndTipoIn(municipio, List.of("COLEGIO_ELECTORAL", "RECINTO_ELECTORAL"));
    }

    //CRUD (BUSCAR SEDE - READ)
    @Transactional(readOnly = true)
    public SedeDTO buscarSedePorId(Long id) {
        Sede sede = sedeRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Sede no encontrada con id: " + id));

        return sedeMapeador.toDTO(sede);
    }

    @Transactional(readOnly = true)
    public List<SedeDTO> listarTodas() {
        return sedeRepositorio.findAll()
                .stream()
                .map(sedeMapeador::toDTO)
                .toList();
    }

    //CRUD (ACTUALIZAR PARTIDO - UPDATE)
    @Transactional
    public SedeDTO actualizarSede(Long id, SedeDTO sedeDTO) {
        Sede sede = sedeRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Sede no encontrada con id: " + id));

        //Actualizar campos
        sede.setNombre(sedeDTO.getNombre());
        sede.setTipo(sedeDTO.getTipo());
        sede.setMunicipio(sedeDTO.getMunicipio());
        sede.setLatitud(sedeDTO.getLatitud());
        sede.setLongitud(sedeDTO.getLongitud());
        sede.setDireccion(sedeDTO.getDireccion());

        sede = sedeRepositorio.save(sede);

        return sedeMapeador.toDTO(sede);
    }

    //CRUD (ELIMINAR SEDE - DELETE)
    @Transactional
    public void eliminarSede(Long id) {
        Sede sede = sedeRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("No encontrada sede con id: " + id));

        sedeRepositorio.delete(sede);
    }

}
