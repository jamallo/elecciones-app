package com.elecciones.backend.excepcion;

public class ErrorValidacionExcepcion extends RuntimeException {
    public ErrorValidacionExcepcion(String mensaje) {
        super(mensaje);
    }
}
