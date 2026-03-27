package com.elecciones.backend.resultado.repositorio;

import com.elecciones.backend.resultado.modelo.entidad.ResultadoAnterior;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultadoRepositorio extends JpaRepository <ResultadoAnterior, Long> {
}
