package com.elecciones.backend.resultado.modelo.entidad;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ResultadoAnterior {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer anio;
    private String partidoNombre;
    private Integer votos;
    private double porcentaje;
    private Integer concejales;

    @ManyToOne
    @JoinColumn(name = "eleccion_id")
    private Eleccion eleccion;
}
