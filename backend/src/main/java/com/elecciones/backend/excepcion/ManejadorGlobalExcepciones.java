package com.elecciones.backend.excepcion;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ManejadorGlobalExcepciones {

    @ExceptionHandler(RecursoNoEncontradoExcepcion.class)
    public ResponseEntity<Map<String, Object>> manejarNoEncontrado(RecursoNoEncontradoExcepcion ex, WebRequest request) {
        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now());
        cuerpo.put("mensaje", ex.getMessage());
        cuerpo.put("path", request.getDescription(false));
        return new ResponseEntity<>(cuerpo, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ErrorValidacionExcepcion.class)
    public ResponseEntity<Map<String, Object>> manejarValidacion(ErrorValidacionExcepcion ex, WebRequest request) {
        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("rimestamp", LocalDateTime.now());
        cuerpo.put("mensaje", ex.getMessage());
        cuerpo.put("path", request.getDescription(false));
        return new ResponseEntity<>(cuerpo, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> manejarGeneral(Exception ex, WebRequest request) {
        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now());
        cuerpo.put("mensaje", "Error interno del servidor");
        cuerpo.put("detalle", ex.getMessage());
        cuerpo.put("path", request.getDescription(false));
        return new ResponseEntity<>(cuerpo, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
