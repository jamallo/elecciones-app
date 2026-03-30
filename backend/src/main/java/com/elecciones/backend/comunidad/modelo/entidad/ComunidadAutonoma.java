package com.elecciones.backend.comunidad.modelo.entidad;

import com.elecciones.backend.municipio.modelo.entidad.Municipio;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comunidades_autonomas")
@Data
public class ComunidadAutonoma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    private String capital;
    private Integer poblacion;

    //Colores personalizados para la comunidad
    private String colorPrimario;
    private String colorSecundario;
    private String colorAcento;
    private String colorFondo;

    @OneToMany(mappedBy = "comunidadAutonoma")
    private List<Municipio> municipios = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (colorPrimario == null) colorPrimario = "#4B0082";
        if (colorSecundario == null) colorSecundario = "#9B59B6";
        if (colorAcento == null) colorAcento = "#F39C12";
        if (colorFondo == null) colorFondo = "#F5F0FF";
    }

}
