package com.elecciones.backend.eleccion.modelo.entidad;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.resultado.modelo.entidad.ResultadoAnterior;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Eleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo; //Municipal, autonómica, nacional
    private String ambito; //Oviedo, Asturias, España
    private int anio;

    @OneToMany(mappedBy = "eleccion")
    private List<Partido> partidos;

    @OneToMany(mappedBy = "eleccion")
    private List<ResultadoAnterior> resultadosAnteriores;
}
