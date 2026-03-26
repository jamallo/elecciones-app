package com.elecciones.backend.sede.modelo.entidad;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sede {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String direccion;
    private Double latitud;
    private Double longitud;
    private String tipo; //SEDE_PARTIDO, COLEGIO_ELECTORAL, RECINTO_ELECTORAL

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partido;
}
