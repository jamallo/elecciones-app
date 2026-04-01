package com.elecciones.backend.partido.servicio;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.excepcion.ErrorValidacionExcepcion;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partido.mapeador.PartidoMapeador;
import com.elecciones.backend.partido.modelo.dto.InformacionPartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoDTO;
import com.elecciones.backend.partido.modelo.dto.PartidoResumenDTO;
import com.elecciones.backend.partido.modelo.entidad.InformacionPartido;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partido.repositorio.InformacionPartidoRepositorio;
import com.elecciones.backend.partido.repositorio.PartidoRepositorio;
import com.elecciones.backend.partidoEleccion.mapeador.PartidoEleccionMapeador;
import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionDTO;
import com.elecciones.backend.partidoEleccion.modelo.dto.PartidoEleccionResumenDTO;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidoServicio {

    private final PartidoRepositorio partidoRepositorio;
    private final EleccionRepositorio eleccionRepositorio;
    private final InformacionPartidoRepositorio informacionPartidoRepositorio;
    private final PartidoMapeador partidoMapeador;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;
    private final PartidoEleccionMapeador partidoEleccionMapeador;


    //PARA PARTIDO (Implementar métodos CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR PARTIDO - CREATE)
    @Transactional
    public PartidoDTO crearPartido(PartidoDTO partidoDTO) {
        //Verificar si existe por siglas
        if (partidoRepositorio.findBySiglas(partidoDTO.getSiglas()).isPresent()) {
            throw new ErrorValidacionExcepcion(("Ya existe un partido con las siglas: " + partidoDTO.getSiglas()));
        }
        Partido partido = partidoMapeador.toEntity(partidoDTO);
        partido = partidoRepositorio.save(partido);
        return partidoMapeador.toDTO(partido);
    }

    //CRUD (BUSCAR LISTAR TODOS LOS PARTIDOS - READ)
    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> listarTodos() {
        return partidoRepositorio.findAll()
                .stream()
                .map(partidoMapeador::toResumenDTO)
                .toList();
    }

    //CRUD (BUSCAR PARTIDO - READ)
    @Transactional(readOnly = true)
    public PartidoDTO buscarPorId(Long id) {
        Partido partido = partidoRepositorio.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + id));

        return partidoMapeador.toDTO(partido);
    }

    //CRUD (ACTUALIZAR PARTIDO - UPDATE)
    @Transactional
    public PartidoDTO actualizarPartido(Long id, PartidoDTO partidoDTO) {
        Partido partido = partidoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + id));

        //Actuarlizar campos
        partido.setNombre(partidoDTO.getNombre());
        partido.setSiglas(partidoDTO.getSiglas());
        partido.setLogoUrl(partidoDTO.getLogoUrl());
        partido.setColorPrimario(partidoDTO.getColorPrimario());
        partido.setColorSecundario(partidoDTO.getColorSecundario());
        partido.setColorAcento(partidoDTO.getColorAcento());
        partido.setColorFondo(partidoDTO.getColorFondo());

        partido = partidoRepositorio.save(partido);

        return partidoMapeador.toDTO(partido);
    }

    //CRUD (ELIMINAR PARTIDO - DELETE)
    @Transactional
    public void eliminarPartido(Long id) {
        Partido partido = partidoRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + id));

        //Verificar si tiene participaciones
        if (!partido.getParticipaciones().isEmpty()) {
            throw  new ErrorValidacionExcepcion("No se puede eliminar el partido porque tiene participaciones en elecciones");
        }

        partidoRepositorio.delete(partido);
    }

    //------------------------------------------

    //PARA PARTICIPACIÓN (PARTIDO-ELECCIÓN)
    @Transactional
    public PartidoEleccionDTO crearParticipacion(PartidoEleccionDTO participacionDTO) {
        // Buscar el partido
        Partido partido = partidoRepositorio.findById(participacionDTO.getPartidoId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + participacionDTO.getPartidoId()));

        // Buscar la elección
        Eleccion eleccion = eleccionRepositorio.findById(participacionDTO.getEleccionId())
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + participacionDTO.getEleccionId()));

        // Verificar si ya existe la relación
        if (partidoEleccionRepositorio.findByPartidoIdAndEleccionId(partido.getId(), eleccion.getId()).isPresent()) {
            throw new RuntimeException("El partido ya está asociado a esta elección");
        }

        // Crear la relación PartidoEleccion
        PartidoEleccion partidoEleccion = new PartidoEleccion();
        partidoEleccion.setPartido(partido);
        partidoEleccion.setEleccion(eleccion);

        // Si tiene información específica, guardarla
        if (participacionDTO.getInformacion() != null) {
            InformacionPartido informacion = partidoMapeador.toInformacionEntity(participacionDTO.getInformacion());
            informacion.setPartidoEleccion(partidoEleccion);
            partidoEleccion.setInformacion(informacion);
        }

        partidoEleccion = partidoEleccionRepositorio.save(partidoEleccion);

        return partidoEleccionMapeador.toDTO(partidoEleccion);
    }


    @Transactional
    public InformacionPartidoDTO actualizarInformacion(Long partidoEleccionId, InformacionPartidoDTO informacionDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(partidoEleccionId)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Participación electoral no encontrada con id: " + partidoEleccionId));

        InformacionPartido informacion = partidoEleccion.getInformacion();
        if (informacion == null) {
            informacion = new InformacionPartido();
            informacion.setPartidoEleccion(partidoEleccion);
        }

        informacion.setHistoriaResumen(informacionDTO.getHistoriaResumen());
        informacion.setHistoriaCompleta(informacionDTO.getHistoriaCompleta());
        informacion.setProgramaResumen(informacionDTO.getProgramaResumen());
        informacion.setProgramaCompleto(informacionDTO.getProgramaCompleto());
        informacion.setEmailContacto(informacionDTO.getEmailContacto());
        informacion.setTelefonoContacto(informacionDTO.getTelefonoContacto());
        informacion.setWebUrl(informacionDTO.getWebUrl());

        informacion = informacionPartidoRepositorio.save(informacion);
        partidoEleccion.setInformacion(informacion);
        partidoEleccionRepositorio.save(partidoEleccion);

        return partidoMapeador.toInformacionDTO(informacion);
    }

    @Transactional(readOnly = true)
    public InformacionPartidoDTO obtenerInformacion(Long partidoEleccionId) {
        InformacionPartido informacion = informacionPartidoRepositorio.findByPartidoEleccionId(partidoEleccionId)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Información no encontrada para la participación electoral: " + partidoEleccionId));
        return partidoMapeador.toInformacionDTO(informacion);
    }

    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> buscarPorEleccion(Long eleccionId) {
        return partidoEleccionRepositorio.findByEleccionId(eleccionId)
                .stream()
                .map(pe -> partidoMapeador.toResumenDTO(pe.getPartido()))
                .toList();
    }


    @Transactional(readOnly = true)
    public PartidoResumenDTO buscarResumenPorId(Long id) {
        Partido partido = partidoRepositorio.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + id));

        return partidoMapeador.toResumenDTO(partido);
    }


    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> buscarPorEleccionTipoAmbito(String tipo, String ambito) {
        return partidoEleccionRepositorio.findByEleccionTipoAndAmbito(tipo, ambito)
                .stream()
                .map(pe -> partidoMapeador.toResumenDTO(pe.getPartido()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<PartidoResumenDTO> buscarPorNombre(String nombre) {
        return partidoRepositorio.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(partidoMapeador::toResumenDTO)
                .toList();
    }

    /*@Transactional
    public PartidoDTO crear(PartidoDTO partidoDTO) {
        //Buscar elección
        Eleccion eleccion = eleccionRepositorio.findById(partidoDTO.getEleccionId())
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + partidoDTO.getEleccionId()));

        // Buscar si el partido ya existe (por siglas)
        Partido partido = partidoRepositorio.findBySiglas(partidoDTO.getSiglas())
                .orElse(null);

        //Crear partido
        if (partido == null) {
            // Crear nuevo partido
            partido = partidoMapeador.toEntity(partidoDTO);
            partido = partidoRepositorio.save(partido);
        }

        // Verificar si ya existe la relación partido-elección
        if (partidoEleccionRepositorio.findByPartidoIdAndEleccionId(
                partido.getId(),
                eleccion.getId()).
                isEmpty()) {
            //Crear relación PartidoElección
            PartidoEleccion pe = new PartidoEleccion();
            pe.setPartido(partido);
            pe.setEleccion(eleccion);

            //Guardar
            partidoEleccionRepositorio.save(pe);
        }
        return partidoMapeador.toDTO(partido);
    }*/

    /*@Transactional
    public InformacionPartidoDTO actualizarInformacion(Long partidoEleccionId, InformacionPartidoDTO informacionDTO) {
        PartidoEleccion partidoEleccion = partidoEleccionRepositorio.findById(partidoEleccionId)
                .orElseThrow(() ->
                        new RecursoNoEncontradoExcepcion("Partido no encontrado con id: " + partidoEleccionId));

        InformacionPartido informacion = partidoEleccion.getInformacion();
        if (informacion == null) {
            informacion = new InformacionPartido();
            informacion.setPartidoEleccion(partidoEleccion);
        }

        informacion.setHistoriaResumen(informacionDTO.getHistoriaResumen());
        informacion.setHistoriaCompleta(informacionDTO.getHistoriaCompleta());
        informacion.setProgramaResumen(informacionDTO.getProgramaResumen());
        informacion.setProgramaCompleto(informacionDTO.getProgramaCompleto());
        informacion.setEmailContacto(informacionDTO.getEmailContacto());
        informacion.setTelefonoContacto(informacionDTO.getTelefonoContacto());
        informacion.setWebUrl(informacionDTO.getWebUrl());

        informacion = informacionPartidoRepositorio.save(informacion);

        partidoEleccion.setInformacion(informacion);
        partidoEleccionRepositorio.save(partidoEleccion);

        return partidoMapeador.toInformacionDTO(informacion);
    }*/

    /*@Transactional(readOnly = true)
    public InformacionPartidoDTO obtenerInformacion(Long partidoEleccionId) {
        InformacionPartido informacion = informacionPartidoRepositorio.findByPartidoEleccionId(partidoEleccionId)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Información no encontrada para la participación electoral: " + partidoEleccionId));
        return partidoMapeador.toInformacionDTO(informacion);
    }*/

    @Transactional(readOnly = true)
    public List<PartidoEleccionResumenDTO> listarParticipacionesPorEleccion(Long eleccionId) {
        return partidoEleccionRepositorio.findByEleccionId(eleccionId)
                .stream()
                .map(partidoEleccionMapeador::toResumenDTO)
                .toList();
    }
}
