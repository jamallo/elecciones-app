package com.elecciones.backend.candidato.modelo.entidad;

import com.elecciones.backend.partido.modelo.entidad.Partido;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Candidato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String cargo;
    private String fotoUrl;
    private String biografia;
    private Integer posicionLista;

    @ManyToOne
    @JoinColumn(name = "partido_id")
    private Partido partido;

}
