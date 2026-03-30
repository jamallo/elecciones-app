package com.elecciones.backend.resultado.modelo.entidad;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "resultados_anteriores")
@Data
public class ResultadoAnterior {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer anio;

    @JoinColumn(name = "partido_nombre")
    private String partidoNombre;
    private Integer votos;
    private double porcentaje;
    private Integer concejales;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion_id")
    private Eleccion eleccion;
}
