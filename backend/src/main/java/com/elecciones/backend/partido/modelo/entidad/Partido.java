package com.elecciones.backend.partido.modelo.entidad;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String siglas;
    private String logoUrl;
    private String color;

    @ManyToOne
    @JoinColumn(name = "eleccion_id")
    private Eleccion eleccion;

    @OneToOne(mappedBy = "partido", cascade = CascadeType.ALL)
    private InformacionPartido informacion;

    @OneToMany(mappedBy = "partido")
    private List<Candidato> candidatos;

    @OneToMany(mappedBy = "partido")
    private List<Evento> eventos;

    @OneToMany(mappedBy = "partido")
    private List<Sede> sedes;
}
