package com.elecciones.backend.partido.modelo.entidad;

import com.elecciones.backend.candidato.modelo.entidad.Candidato;
import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.evento.modelo.entidad.Evento;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.sede.modelo.entidad.Sede;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "partidos")
@Data
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String siglas;

    private String logoUrl;

    //Colores personalizados del partido
    private String colorPrimario;
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;


    //Relación con las participaciones en elecciones
    @OneToMany(mappedBy = "partido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PartidoEleccion> participaciones = new ArrayList<>();


    @PrePersist
    protected void onCreate() {
        if (colorAcento == null) colorAcento = colorPrimario;
        if (colorFondo == null) colorFondo = "#FFFFFF";
    }

    /*@ManyToMany
    @JoinTable(
            name = "partido_eleccion",
            joinColumns = @JoinColumn(name = "partido_id"),
            inverseJoinColumns = @JoinColumn(name = "eleccion_id")
    )*/

/*    @OneToMany(mappedBy = "partido")
    private List<PartidoEleccion> partidosEleccion;

    @OneToOne(mappedBy = "partido", cascade = CascadeType.ALL)
    private InformacionPartido informacion;

    @OneToMany(mappedBy = "partido")
    private List<Candidato> candidatos;

    @OneToMany(mappedBy = "partido")
    private List<Evento> eventos;

    @OneToMany(mappedBy = "partido")
    private List<Sede> sedes;*/
}
