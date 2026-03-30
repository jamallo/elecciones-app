package com.elecciones.backend.eleccion.modelo.entidad;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import com.elecciones.backend.resultado.modelo.entidad.ResultadoAnterior;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "elecciones")
@Data
public class Eleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo; //Municipal, autonómica, nacional
    private String ambito; //Oviedo, Asturias, España
    private int anio;

    @OneToMany(mappedBy = "eleccion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PartidoEleccion> partidosEleccion = new ArrayList<>();

}
