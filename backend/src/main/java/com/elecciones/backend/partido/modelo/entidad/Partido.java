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

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String siglas;

    private String logoUrl;

    //Colores personalizados del partido
    @Column(nullable = false)
    private String colorPrimario;

    @Column(nullable = false)
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;

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

    @PrePersist
    protected void onCreate() {
        if (colorAcento == null) colorAcento = colorPrimario;
        if (colorFondo == null) colorFondo = "#FFFFFF";
    }
}
