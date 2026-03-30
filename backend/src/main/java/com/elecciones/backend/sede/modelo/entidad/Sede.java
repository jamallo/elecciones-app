package com.elecciones.backend.sede.modelo.entidad;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sedes")
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
    private String municipio;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_eleccion_id")
    private PartidoEleccion partidoEleccion;
}
