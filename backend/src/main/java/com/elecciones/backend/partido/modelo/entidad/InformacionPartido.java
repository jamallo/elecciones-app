package com.elecciones.backend.partido.modelo.entidad;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class InformacionPartido {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "partido_id")
    private Partido partido;

    @Column(columnDefinition = "TEXT")
    private String historiaResumen;

    @Column(columnDefinition = "TEXT")
    private String historiaCompleta;

    @Column(columnDefinition = "TEXT")
    private String programaResumen;

    @Column(columnDefinition = "TEXT")
    private String programaCompleto;

    private String emailContacto;
    private String telefonoContacto;
    private String webUrl;
}
