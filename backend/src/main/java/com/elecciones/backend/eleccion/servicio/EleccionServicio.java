package com.elecciones.backend.eleccion.servicio;

import com.elecciones.backend.eleccion.mapeador.EleccionMapeador;
import com.elecciones.backend.eleccion.modelo.dto.EleccionDTO;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.eleccion.repositorio.EleccionRepositorio;
import com.elecciones.backend.excepcion.RecursoNoEncontradoExcepcion;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.partidoEleccion.repositorio.PartidoEleccionRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EleccionServicio {

    private final EleccionRepositorio eleccionRepositorio;
    private final EleccionMapeador eleccionMapeador;
    private final PartidoEleccionRepositorio partidoEleccionRepositorio;

    //PARA ELECCIÓN (Implementar métodos CRUD - CREATE, READ, UPDATE, DELETE)

    //CRUD (CREAR ELECCIÓN - CREATE)
    @Transactional
    public EleccionDTO crearEleccion(EleccionDTO eleccionDTO) {

        Eleccion eleccion = eleccionMapeador.toEntity(eleccionDTO);
        eleccion = eleccionRepositorio.save(eleccion);
        return eleccionMapeador.toDTO(eleccion);

    }

    //CRUD (BUSCAR LISTAR TODOS LAS ELECCIONES - READ)
    @Transactional(readOnly = true)
    public List<EleccionDTO> listarTodas() {
        return eleccionRepositorio.findAll()
                .stream()
                .map(eleccionMapeador::toDTO)
                .toList();
    }

    //CRUD (BUSCAR ELECCIÓN - READ)
    @Transactional(readOnly = true)
    public EleccionDTO buscarPorId(Long id) {
        Eleccion eleccion = eleccionRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + id));
        return eleccionMapeador.toDTO(eleccion);
    }

    @Transactional(readOnly = true)
    public EleccionDTO buscarPorTipoYAmbito(String tipo, String ambito) {
        Eleccion eleccion = eleccionRepositorio.findByTipoAndAmbito(tipo, ambito)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada: " + tipo + " - " + ambito));
        return eleccionMapeador.toDTO(eleccion);
    }

    //CRUD (ACTUALIZAR PARTIDO - UPDATE)
    @Transactional
    public EleccionDTO actualizarEleccion(Long id, EleccionDTO eleccionDTO) {
        Eleccion eleccion = eleccionRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + id));

        //Actualizar campos
        eleccion.setTipo(eleccionDTO.getTipo());
        eleccion.setAmbito(eleccionDTO.getAmbito());
        eleccion.setAnio(eleccionDTO.getAnio());

        eleccion = eleccionRepositorio.save(eleccion);

        return eleccionMapeador.toDTO(eleccion);
    }

    //CRUD (ELIMINAR ELECCIÓN - DELETE)
    @Transactional
    public void eliminarEleccion(Long id) {
        Eleccion eleccion = eleccionRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("Elección no encontrada con id: " + id));

        eleccionRepositorio.delete(eleccion);
    }
}
