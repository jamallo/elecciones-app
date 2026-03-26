package com.elecciones.backend.evento.modelo.entidad;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
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

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partido;
}
