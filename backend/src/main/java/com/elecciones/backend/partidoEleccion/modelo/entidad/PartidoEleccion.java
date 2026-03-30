package com.elecciones.backend.partidoEleccion.modelo.entidad;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.partido.modelo.entidad.InformacionPartido;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "partidos_elecciones", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"partido_id", "eleccion_id"})
})
@Data
public class PartidoEleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_id", nullable = false)
    private Partido partido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion_id", nullable = false)
    private Eleccion eleccion;

    //Listas específicas para esta elección
    @OneToMany(mappedBy = "partidoEleccion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidato> candidatos = new ArrayList<>();

    @OneToMany(mappedBy = "partidoEleccion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evento> eventos = new ArrayList<>();

    @OneToMany(mappedBy = "partidoEleccion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sede> sedes = new ArrayList<>();

    //Información específica para esta elección
    @OneToOne(mappedBy = "partidoEleccion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private InformacionPartido informacion;
}
