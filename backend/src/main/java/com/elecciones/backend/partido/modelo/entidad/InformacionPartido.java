package com.elecciones.backend.partido.modelo.entidad;

import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "informacion_partidos")
@Data
public class InformacionPartido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_eleccion_id")
    private PartidoEleccion partidoEleccion;
}
