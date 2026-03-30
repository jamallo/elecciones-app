package com.elecciones.backend.evento.modelo.entidad;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "eventos")
@Data
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fecha;
    private String lugar;
    private String tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_eleccion_id")
    private PartidoEleccion partidoEleccion;
}
