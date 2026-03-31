package com.elecciones.backend.auth.modelo.dto;

import lombok.Data;

@Data
public class RegistroRequestDTO {
    private String email;
    private String password;
    private String nombre;
    private String apellidos;
}
