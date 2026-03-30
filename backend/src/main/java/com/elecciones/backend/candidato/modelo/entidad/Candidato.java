package com.elecciones.backend.candidato.modelo.entidad;

import com.elecciones.backend.eleccion.modelo.entidad.Eleccion;
import com.elecciones.backend.partido.modelo.entidad.Partido;
import com.elecciones.backend.partidoEleccion.modelo.entidad.PartidoEleccion;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "candidatos")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partido_eleccion_id")
    private PartidoEleccion partidoEleccion;



}
