package com.elecciones.backend.municipio.modelo.entidad;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "municipios")
@Data
public class Municipio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false)
    private String provincia;

    @Column(nullable = false)
    private String comunidadAutonoma;

    private Double latitud;

    private Double longitud;

    private Integer poblacion;

    // Colores personalizados para el municipio
    private String colorPrimario;
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        //Colores por defecto si no se especifican
        if (colorPrimario == null) colorPrimario = "#00236C";
        if (colorSecundario == null) colorSecundario = "#1985FF";
        if (colorAcento == null) colorAcento = "#00A86B";
        if (colorFondo == null) colorFondo = "#F0F7FF";
    }
}
